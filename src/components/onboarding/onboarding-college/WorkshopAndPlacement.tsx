import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import OnboardingFormTemplate from "../OnboardingFormTemplate";
import RoundedButton from "../../atom/buttons/RoundedButton";
import { FaChevronLeft, FaPlus } from "react-icons/fa";
import CollegeDropdowns from "./CollegeDropdowns";
import PlacementHighlights from "./PlacementHighlights";
import { validateField } from "@/utils/formValidation";
import { FiUpload } from "react-icons/fi";
import { uploadImageToS3 } from "@/utils/uploadImageToS3";
import { getAcademicYear, getCurrentYear } from "@/utils/helper";
import CampusCompany from "./CampusCompany";
import CampusOpportunity from "./CampusOpportunity";
import ImageUrlInput from "@/components/atom/inputs/ImageUrlInput";
import LoaderTextButton from "@/components/atom/buttons/LoaderTextButton";

type Workshop = {
    id: number;
    name: string;
    students: string;
    image: string;
    batch: string;
};

type Placement = {
    id: number;
    totalCompanies: string;
    totalRegistration: string;
    totalOffers: string;
    achievements: string;
};

type CompanyProps = {
    id: any;
    name: string;
    package: string;
    category: string;
    company: string;
    company_image: any;
};


type CampusProps = {
    id: any;
    company_name: string;
    company_logo: any;
};

const WorkshopAndPlacement = () => {
    const router = useRouter();
    const currentYear = getCurrentYear().toString();
    const currentSession = getAcademicYear()
    const [loading, setLoading] = useState(false)
    const [skipLoader, setSkipLoader] = useState(false);

    const [errors, setErrors] = useState<any>({});
    const [placementData, setPlacementData] = useState({
        highestCTC: "",
        lowestCTC: "",
    });

    const [workShops, setWorkShops] = useState<Workshop[]>([
        { id: Date.now(), name: "", students: "", image: "", batch: currentSession },
    ]);

    const [placementWorkshops, setPlacementWorkshops] = useState([
        { id: Date.now(), totalCompanies: "", totalRegistration: "", totalOffers: "", achievements: "" }
    ]);

    const [studentCompany, setStudentCompany] = useState([{ id: Date.now(), name: "", package: "", category: "", company: "", company_image: "" }]);
    const [campusOpportunity, setCampusOpportunity] = useState([{ id: Date.now(), company_name: "", company_logo: "" }]);
    const [uploadingLogos, setUploadingLogos] = useState({});
    const [workshipLoading, setWorkshopLoading] = useState<Record<number, boolean>>({});
    const [companyLoading, setCompanyLoading] = useState<Record<number, boolean>>({});

    useEffect(() => {
        const storedCollegeData = localStorage.getItem("college-data");
        if (storedCollegeData) {
            try {
                const parsedData = JSON.parse(storedCollegeData);
                // Workshops prefill
                if (parsedData?.workshops && Array.isArray(parsedData.workshops)) {
                    const mappedWorkshops = parsedData.workshops.map((workshop: any, index: number) => ({
                        id: Date.now() + index, // ensure unique ID
                        name: workshop.name || "",
                        students: workshop.totalStudents || "",
                        image: workshop.image || "",
                        batch: workshop.batch || currentSession,
                    }));

                    setWorkShops(mappedWorkshops);
                }

                // Placement Highlights prefill
                const placement = parsedData?.placement_highlights?.[currentYear];
                if (placement) {
                    setPlacementWorkshops([
                        {
                            id: Date.now(),
                            totalCompanies: placement.total_company?.toString() || "",
                            totalRegistration: placement.total_registration?.toString() || "",
                            totalOffers: placement.total_offers?.toString() || "",
                            achievements: "", // Optional: You can generate summary here if needed
                        },
                    ]);

                    setPlacementData({
                        highestCTC: placement.highest_CTC?.toString() || "",
                        lowestCTC: placement.lowest_CTC?.toString() || "",
                    });

                    // Prefill studentCompany list as well if you want:
                    if (placement.students && Array.isArray(placement.students)) {
                        const mappedStudents = placement.students.map((student: any, index: number) => ({
                            id: Date.now() + index,
                            name: student.name || "",
                            package: student.package || "",
                            category: student.category || "",
                            company: student.company || "",
                            company_image: student.image || "",
                        }));
                        setStudentCompany(mappedStudents);
                    }
                }

                // Campus Opportunities prefill
                if (parsedData?.campus_opportunities && parsedData.campus_opportunities?.[currentYear]?.companies) {
                    const companies = parsedData.campus_opportunities[currentYear].companies;

                    const mappedOpportunities = companies?.map((item: any, index: number) => ({
                        id: Date.now() + index,
                        company_name: item.company_name || "",
                        company_logo: item.company_logo || "",
                    }));
                    setCampusOpportunity(mappedOpportunities);
                }
            } catch (error) {
                console.error("Error parsing college-data:", error);
            }
        }
    }, []);

    const handleWorkshopChange = (
        index: number,
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { id, value } = e.target;
        setWorkShops((prev) => {
            const updated = [...prev];
            updated[index] = {
                ...updated[index],
                [id]: value,
            };
            return updated;
        });

        setErrors((prevErrors: any) => {
            const updatedErrors = { ...prevErrors };
            if (updatedErrors[index]) {
                updatedErrors[index] = {
                    ...updatedErrors[index],
                    [id]: ""
                };
            }
            return updatedErrors;
        });
    };

    const handleStudentChange = (
        index: number,
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { id, value } = e.target;
        setStudentCompany((prev) => {
            const updated = [...prev];
            updated[index] = {
                ...updated[index],
                [id]: value,
            };
            return updated;
        });

        setErrors((prevErrors: any) => {
            const updatedErrors = { ...prevErrors };
            if (updatedErrors.studentCompany && updatedErrors.studentCompany[index]) {
                updatedErrors.studentCompany[index][id] = "";
            }
            return updatedErrors;
        });
    };

    const handleOpportunityChange = (
        index: number,
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { id, value } = e.target;
        setCampusOpportunity((prev) => {
            const updated = [...prev];
            updated[index] = {
                ...updated[index],
                [id]: value,
            };
            return updated;
        });

        setErrors((prevErrors: any) => {
            const updatedErrors = { ...prevErrors };
            if (updatedErrors.campusOpportunity && updatedErrors.campusOpportunity[index]) {
                updatedErrors.campusOpportunity[index][id] = "";
            }
            return updatedErrors;
        });
    };

    const handleImageChange = async (
        e: React.ChangeEvent<HTMLInputElement>,
        index: number
    ) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setCompanyLoading((prev) => ({ ...prev, [index]: true }))
        try {
            const { url, error }: any = await uploadImageToS3(file, "uploads");
            setStudentCompany((prev) => {
                const updated = [...prev];
                updated[index] = {
                    ...updated[index],
                    company_image: url,
                };
                return updated;
            });

            setErrors((prevErrors: any) => {
                const updatedErrors = { ...prevErrors };
                if (updatedErrors.studentCompany && updatedErrors.studentCompany[index]) {
                    updatedErrors.studentCompany[index] = {
                        ...updatedErrors?.studentCompany?.[index],
                        company_image: ""
                    };
                }
                return updatedErrors;
            });
        } finally {
            setCompanyLoading((prev) => ({ ...prev, [index]: false }))
        }
    };

    const handleOpportunityImage = async (
        e: React.ChangeEvent<HTMLInputElement>,
        index: number
    ) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setUploadingLogos((prev) => ({ ...prev, [index]: true }));
        try {
            const { url, error }: any = await uploadImageToS3(file, "uploads");
            setCampusOpportunity((prev) => {
                const updated = [...prev];
                updated[index] = {
                    ...updated[index],
                    company_logo: url,
                };
                return updated;
            });

            setErrors((prevErrors: any) => {
                const updatedErrors = { ...prevErrors };
                if (updatedErrors.campusOpportunity && updatedErrors.campusOpportunity[index]) {
                    updatedErrors.campusOpportunity[index] = {
                        ...updatedErrors?.campusOpportunity?.[index],
                        company_logo: ""
                    };
                }
                return updatedErrors;
            });
        } finally {
            setUploadingLogos((prev) => ({ ...prev, [index]: false }));

        }
    };

    const handleAddOpportunity = () => {
        setCampusOpportunity(prev => [
            ...prev,
            { id: Date.now(), company_name: "", company_logo: "" }
        ]);
    };

    const updateWorkshopField = (
        index: number,
        field: keyof Workshop,
        value: any
    ) => {
        setWorkShops((prev) => {
            const updated = [...prev];
            updated[index] = {
                ...updated[index],
                [field]: value,
            };
            return updated;
        });

        setErrors((prevErrors: any) => {
            const updatedErrors = { ...prevErrors };
            if (updatedErrors[index]) {
                updatedErrors[index] = {
                    ...updatedErrors[index],
                    [field]: ""
                };
            }
            return updatedErrors;
        });
    };

    const handlePlacementChange = (
        index: number,
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { id, value } = e.target;
        setPlacementWorkshops(prev => {
            const updated = [...prev];
            updated[index] = {
                ...updated[index],
                [id]: value,
            };
            return updated;
        });
        setErrors((prevErrors: any) => {
            const updatedErrors = { ...prevErrors };
            if (updatedErrors.placementWorkshops && updatedErrors.placementWorkshops[index]) {
                updatedErrors.placementWorkshops[index][id] = "";
            }
            return updatedErrors;
        });
    };

    const handlePlacementFieldChange = (e: any) => {
        const { id, value } = e.target;
        setPlacementData(prev => ({
            ...prev,
            [id]: value
        }));
        setErrors((prev: any) => ({
            ...prev,
            placementData: {
                ...prev.placementData,
                [id]: value.trim() === "" ? `${id === "highestCTC" ? "Highest CTC" : "Lowest CTC"} is required` : ""
            }
        }));
    };

    const handleAddCompanies = () => {
        setStudentCompany(prev => [
            ...prev,
            { id: Date.now(), name: "", package: "", category: "", company: "", company_image: "" }
        ]);
    };

    const handleClubImageUpload = async (
        e: React.ChangeEvent<HTMLInputElement>,
        index: number
    ) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setWorkshopLoading((prev) => ({ ...prev, [index]: true }));
        try {
            const { url, error } = await uploadImageToS3(file, "uploads");
            updateWorkshopField(index, "image", url); // Save URL to club?.image
        } finally {
            setWorkshopLoading((prev) => ({ ...prev, [index]: false }));
        }
    };

    const validateForm = () => {
        const newErrors: any = {};

        workShops.forEach((workshop, idx) => {
            const workshopErrors: any = {};

            const fieldsToValidate = [
                { name: "name", label: "Workshop Name" },
                { name: "students", label: "Total Students" },
                { name: "image", label: "Upload Image" },
            ];

            fieldsToValidate.forEach((field) => {
                const value = String(workshop[field.name as keyof Workshop] || "");
                const errorMessage = validateField(field.name, value, field.label);
                if (errorMessage) {
                    workshopErrors[field.name] = errorMessage;
                }
            });

            if (Object.keys(workshopErrors).length > 0) {
                newErrors[idx] = workshopErrors;
            }
        });

        // Validate placement highlights (main CTC fields)
        const placementFields = [
            { name: "highestCTC", label: "Highest CTC" },
            { name: "lowestCTC", label: "Lowest CTC" },
        ];

        placementFields.forEach((field) => {
            const value = String(placementData[field.name as keyof typeof placementData] || "");
            const errorMessage = validateField(field.name, value, field.label);
            if (errorMessage) {
                if (!newErrors.placementData) newErrors.placementData = {};
                newErrors.placementData[field.name] = errorMessage;
            }
        });

        //company
        studentCompany.forEach((student, idx) => {
            const fieldsToValidate = [
                { name: "name", label: "Name" },
                { name: "package", label: "Package" },
                { name: "category", label: "Category" },
                { name: "company", label: "Company Name" },
                { name: "company_image", label: "Company Image" },
            ];

            fieldsToValidate.forEach((field) => {
                const value = String(student[field.name as keyof CompanyProps] || "");
                const errorMessage = validateField(field.name, value, field.label);
                if (errorMessage) {
                    if (!newErrors.studentCompany) newErrors.studentCompany = {};
                    if (!newErrors.studentCompany[idx]) newErrors.studentCompany[idx] = {};
                    newErrors.studentCompany[idx][field.name] = errorMessage;
                }
            });
        });

        // Optionally, validate placement workshops (if required)
        placementWorkshops.forEach((workshop, idx) => {
            const fieldsToValidate = [
                { name: "totalCompanies", label: "Total Companies" },
                { name: "totalRegistration", label: "Total Registration" },
                { name: "totalOffers", label: "Total Offers" },
                { name: "achievements", label: "Achievements" },
            ];
            fieldsToValidate.forEach((field) => {
                const value = String(workshop[field.name as keyof Placement] || "");
                const errorMessage = validateField(field.name, value, field.label);
                if (errorMessage) {
                    if (!newErrors.placementWorkshops) newErrors.placementWorkshops = {};
                    if (!newErrors.placementWorkshops[idx]) newErrors.placementWorkshops[idx] = {};
                    newErrors.placementWorkshops[idx][field.name] = errorMessage;
                }
            });
        });

        campusOpportunity.forEach((campus, idx) => {
            const fieldsToValidate = [
                { name: "company_name", label: "Company Name" },
                { name: "company_logo", label: "Company Logo" },
            ];

            fieldsToValidate.forEach((field) => {
                const value = String(campus[field.name as keyof CampusProps] || "");
                const errorMessage = validateField(field.name, value, field.label);
                if (errorMessage) {
                    if (!newErrors.campusOpportunity) newErrors.campusOpportunity = {};
                    if (!newErrors.campusOpportunity[idx]) newErrors.campusOpportunity[idx] = {};
                    newErrors.campusOpportunity[idx][field.name] = errorMessage;
                }
            });
        });

        return newErrors;
    };

    const handleAddWorkshop = () => {
        setWorkShops((prev: any) => [
            ...prev,
            { id: Date.now(), name: "", students: "", image: "", batch: currentSession }
        ]);
    };

    const handlePreviousPage = () => router.push("/onboarding-college/principal-profile");

    const handleSkip = () => {
        setSkipLoader(true);
        setTimeout(() => {
            try {
                router.push("/onboarding-college/clubs-gallery");
            } catch (error) {
                console.error("WorkshopAndPlacement-489 , Navigation error:", error);
                setSkipLoader(false);
            }
        }, 0);
    };

    const handleContinue = () => {
        const existingData = JSON.parse(localStorage.getItem("college-data") || "{}");
        const formErrors = validateForm();
        setErrors(formErrors);

        if (Object.keys(formErrors).length > 0) {
            setLoading(false)
            return;
        }
        setLoading(true)
        try {
            let workshops = workShops?.map((w: any) => ({
                name: w?.name,
                totalStudents: w?.students,
                batch: w?.batch,
                image: w?.image,
            }));

            let totalPlacement = placementWorkshops?.reduce(
                (acc: any, elem: any) => {
                    acc.total_company += Number(elem?.totalCompanies) || 0;
                    acc.total_registration += Number(elem?.totalRegistration) || 0;
                    acc.total_offers += Number(elem?.totalOffers) || 0;
                    return acc;
                },
                { total_company: 0, total_registration: 0, total_offers: 0 }
            );

            let placement_highlights = {
                [currentYear]: {
                    year: currentYear,
                    ...totalPlacement,
                    highest_CTC: placementData?.highestCTC || "",
                    lowest_CTC: placementData?.lowestCTC || "",
                    students: studentCompany?.map((w: any) => ({
                        name: w?.name,
                        package: w?.package,
                        category: w?.category,
                        company: w?.company,
                        image: w?.company_image,
                        isGraduate: true
                    }))
                }
            };

            const updatedData = {
                ...existingData,
                workshops,
                placement_highlights,
                campus_opportunities: {
                    [currentYear]: {
                        placement_count: 250,
                        companies: campusOpportunity?.map((elem: any) => ({
                            company_name: elem?.company_name,
                            company_logo: elem?.company_logo,
                        }))
                    }
                },
            };

            localStorage.setItem("college-data", JSON.stringify(updatedData));
            setTimeout(() => {
                router.push("/onboarding-college/clubs-gallery");
                setLoading(false)
            }, 500)
        } catch {
            setLoading(false)
        }
    }

    const workshopFields: {
        id: string;
        label: string;
        key: keyof Workshop;
        placeholder: string;
    }[] = [
            { id: "name", label: "Workshop Name", key: "name", placeholder: "Enter Name" },
            { id: "students", label: "Total Students", key: "students", placeholder: "Enter Students" },
        ];

    return (
        <OnboardingFormTemplate className="bg-white p-5">
            <div className="w-full text-deepBlue">
                <h4 className="text-md lg:text-[0.9rem] font-semibold text-left">
                    Add College
                </h4>
                <hr className="border-t border-gray-300" />
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                <h5 className="text-xs font-bold mt-5">Workshops</h5>
                {/* <div className="flex items-center gap-2 flex-wrap mt-5">
                    <div className="w-fit text-[0.8rem]">
                        <CollegeDropdowns showSessionDropdown={false} selectedSession=""
                            setSelectedSession={() => { }}
                            selectedCourse=""
                            setSelectedCourse={() => { }}
                            selectedBranch=""
                            setSelectedBranch={() => { }}
                            selectedYear=""
                            setSelectedYear={() => { }} />
                    </div>
                </div> */}
            </div>

            {
                workShops?.map((workshop: any, index: any) => (
                    <div className="w-full text-deepBlue mb-6" key={index}>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                            {workshopFields?.map(({ id, label, placeholder }) => (
                                <div key={id}>
                                    <label
                                        htmlFor={id}
                                        className="block text-xs font-medium text-gray-700 mb-1"
                                    >
                                        {label} <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        id={id}
                                        name={id}
                                        type="text"
                                        placeholder={placeholder}
                                        value={workshop[id as keyof Workshop]}
                                        onChange={(e) => handleWorkshopChange(index, e)}
                                        className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-200"
                                    />
                                    {errors[index]?.[id] && (
                                        <p className="text-xs text-red-500 mt-1">
                                            {errors[index]?.[id]}
                                        </p>
                                    )}
                                </div>
                            ))}

                            <ImageUrlInput
                                index={index}
                                name="company_image"
                                placeholder="Upload image"
                                value={workShops[index]?.image || ""}
                                onChange={handleClubImageUpload}
                                error={errors[index]?.image}
                                loading={workshipLoading?.[index]}
                                label="Upload Image"
                            />
                        </div>

                        <div className="mt-4">
                            <label
                                htmlFor={`batch-${index}`}
                                className="block text-[0.7rem] font-medium"
                            >
                                Batch
                            </label>
                            <input
                                id={`batch-${index}`}
                                name={`batch-${index}`}
                                // type="text"
                                // placeholder="Enter batch"
                                value={workshop?.batch}
                                disabled
                                // onChange={(e) => handleWorkshopChange(index, e)}
                                className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-200"
                            />
                            {/* {errors[index]?.achievements && (
                                <p className="text-red-500 text-xs mt-1">{errors[index].achievements}</p>
                            )} */}
                        </div>
                    </div>
                ))}

            <div className="mt-2 flex justify-center">
                <button
                    type="button"
                    onClick={handleAddWorkshop}
                    className="text-xs font-semibold text-darkBlue flex items-right gap-2"
                >
                    <FaPlus className="text-sm" /> Add Additional Workshops
                </button>
            </div>

            <PlacementHighlights
                placementWorkshops={placementWorkshops}
                handleWorkshopChange={handlePlacementChange}
                handleAdd={handleAddCompanies}
                formData={placementData}
                handleFieldChange={handlePlacementFieldChange}
                errors={errors.placementData || {}}
                workshopErrors={errors.placementWorkshops || {}}
                handleStudentChange={handleStudentChange}
                studentCompany={studentCompany}
                companyErrors={errors.studentCompany || {}}
                handleImageChange={handleImageChange}
                companyLoader={companyLoading}
            />

            <CampusOpportunity
                formData={campusOpportunity}
                handleChange={handleOpportunityChange}
                handleUploadImg={handleOpportunityImage}
                error={errors.campusOpportunity}
                loading={uploadingLogos}
            />

            <div className="mt-7 flex justify-center">
                <button
                    type="button"
                    onClick={handleAddOpportunity}
                    className="text-xs font-semibold text-darkBlue flex items-right gap-2"
                >
                    <FaPlus className="text-sm" /> Add Additional Campus Opportunities
                </button>
            </div>
            <div className="flex justify-end mt-6 gap-5 text-xs">
                <LoaderTextButton
                    withBackground={false}
                    fontBold={true}
                    buttonName="Skip"
                    textColor="#2E90FA"
                    textSize="0.7rem"
                    width="6rem"
                    height="2.37rem"
                    onClick={handleSkip}
                    isLoading={skipLoader}
                />
                <RoundedButton
                    withBackground={false}
                    buttonName="Go Back"
                    textColor="#2E90FA"
                    fontBold={true}
                    icon={FaChevronLeft}
                    width="6rem"
                    height="2.37rem"
                    onClick={handlePreviousPage}
                />
                <LoaderTextButton
                    withBackground={true}
                    buttonName="Save & Continue"
                    textSize="0.7rem"
                    onClick={handleContinue}
                    isLoading={loading}
                />
            </div>
        </OnboardingFormTemplate>
    );
}

export default WorkshopAndPlacement;
