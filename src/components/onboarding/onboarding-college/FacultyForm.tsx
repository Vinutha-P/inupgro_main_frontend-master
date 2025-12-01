import React, { useState, useEffect } from "react";
import RoundedButton from "../../atom/buttons/RoundedButton";
import OnboardingFormTemplate from "../OnboardingFormTemplate";
import { FaChevronLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";
import AddFacultyModal from "./AddFacultyModal";
import FacilitiesSection from "./FacilitiesSection";
// import { additionalFacilitiesData, facilitiesData } from "@/utils/constants";
import { facilitiesData } from "@/utils/constants";
import { getCurrentYear } from "@/utils/helper";
import SolidButton from "@/components/atom/buttons/SolidButton";
import CardList from "@/components/molecule/cards/CardList";
import CustomModal from "@/components/atom/modals/CustomFormModal";
import { addStudentValidationSchema } from "@/utils/validationSchema";
import { collegeFaculty } from "@/utils/fields/inputFields";
import LoaderTextButton from "@/components/atom/buttons/LoaderTextButton";

type Student = {
    fullName: string;
    age: string;
    designation: string;
    department: string;
    profile_picture: string;
};

const initialStudent = { fullName: "", age: "", designation: "", department: "", profile_picture: "" };

const FacultyForm = () => {
    const router = useRouter();
    const currentYear = getCurrentYear().toString();
    const [skipLoader, setSkipLoader] = useState(false);
    const [loading, setLoading] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [studentList, setStudentList] = useState<any[]>([]);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [studentData, setStudentData] = useState(initialStudent);
    const [facilityErrors, setFacilityErrors] = useState<string>("");
    const [editingItem, setEditingItem] = useState<any | null>(null);
    const [checkedFacilities, setCheckedFacilities] = useState<{ [key: string]: boolean }>({});

    useEffect(() => {
        const collegeData = JSON.parse(localStorage.getItem("college-data") || "{}");
        const facilitiesFromStorage = collegeData?.facilities || {};

        const checkedMap: { [key: string]: boolean } = {};

        Object.values(facilitiesFromStorage).forEach((category: any) => {
            category.forEach((facility: any) => {
                if (facility.is_available) {
                    checkedMap[facility.facility_type] = true;
                }
            });
        });

        setCheckedFacilities(checkedMap);

        // Extract and transform faculty data
        if (collegeData?.faculty?.length) {
            const transformedFaculty = collegeData.faculty.map((f: any) => ({
                fullName: f.name,
                designation: f.title,
                department: f.department,
                profile_picture: f.image,
            }));

            setStudentList(transformedFaculty);
        }

    }, []);

    const closeModal = () => {
        setIsModalOpen(false);
        setStudentData(initialStudent);
    };

    const openModal = (student?: any, index?: number) => {
        if (student !== undefined && index !== undefined) {
            setEditingItem(student);
            setActiveIndex(index);
            setStudentData(student);
        } else {
            setEditingItem(null);
            setActiveIndex(null);
            setStudentData({
                fullName: "", age: "", designation: "", department: "",
                profile_picture: ""
            });
        }
        setIsModalOpen(true);
    };

    const handleAddFaculty = (updatedFaculty: any) => {
        if (activeIndex !== null) {
            // Update existing student by index
            const updatedList = [...studentList];
            updatedList[activeIndex] = updatedFaculty;
            setStudentList(updatedList);
        } else {
            // Add new student
            const enrichedStudent = {
                ...updatedFaculty,
            };
            setStudentList((prev) => [...prev, enrichedStudent]);
        }
        setActiveIndex(null);  // Reset editing index after save
        closeModal();
    };

    const persistStudentListToStorage = () => {
        const prevStored = JSON.parse(localStorage.getItem("studentData") || "{}");
        // const currentKey = getStorageKey();
        prevStored[currentYear] = studentList;
        localStorage.setItem("studentData", JSON.stringify(prevStored));
    };

    const handleCheckboxChange = () => {
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        let anyChecked = false;

        // Check all checkboxes in both facilitiesData and additionalFacilitiesData
        checkboxes?.forEach((checkbox) => {
            if ((checkbox as HTMLInputElement).checked) {
                anyChecked = true;
            }
        });

        // If any checkbox is checked, remove the error message
        if (anyChecked) {
            setFacilityErrors("");
        } else {
            setFacilityErrors("Please select at least one facility before proceeding.");
        }
    };

    const handlePreviousPage = () => {
        router.push("/onboarding-college/result-display");
    };

    const handleSkip = () => {
        setSkipLoader(true);
        setTimeout(() => {
            try {
                router.push("/onboarding-college/principal-profile");
            } catch (error) {
                console.error("FacultyForm-145, Navigation error:", error);
                setSkipLoader(false);
            }
        }, 0);
    };

    const handleContinue = () => {
        if (studentList.length > 0) {
            persistStudentListToStorage();
        }
        const existingData = JSON.parse(localStorage.getItem("college-data") || "{}");
        const studentData = JSON.parse(localStorage.getItem("studentData") || "{}");
        const allFacilitiesData = [...facilitiesData];
        const allYears = Object.keys(studentData);
        const firstYearKey = allYears[0]; // "2025"
        const studentListForYear = studentData[firstYearKey] || [];

        const facilities: Record<string, { facility_type: string; is_available: boolean }[]> = {};
        let anyFacilitySelected = false;
        allFacilitiesData.forEach((category) => {
            const group: { facility_type: string; is_available: boolean }[] = [];

            category?.options?.forEach((option: any) => {
                const checkboxes = document.querySelectorAll(`label:has(input[type="checkbox"])`);
                checkboxes?.forEach((label) => {
                    const text = (label as HTMLLabelElement).textContent?.trim();
                    const input = label.querySelector("input[type='checkbox']") as HTMLInputElement;

                    if (text === option) {
                        const isChecked = input?.checked || false;
                        group.push({
                            facility_type: option,
                            is_available: isChecked,
                        });
                        if (isChecked) {
                            anyFacilitySelected = true; // <<== if any checkbox is checked
                        }
                    }
                });
            });

            facilities[category?.heading] = group;
        });

        if (!anyFacilitySelected) {
            setFacilityErrors("Please select at least one facility before proceeding.");
            setLoading(false)
            return;
        }
        setFacilityErrors("");
        setLoading(true)
        try {
            const transformedStudents = studentListForYear.map((student: any) => ({
                name: student.fullName || "",
                title: student.designation || "",
                department: student.department || "",
                image: student.profile_picture || ""
            }));

            const updatedData = {
                ...existingData,
                faculty: transformedStudents,
                facilities
            };

            localStorage.setItem("college-data", JSON.stringify(updatedData));
            setTimeout(() => {
                router.push("/onboarding-college/principal-profile");
                setLoading(false)
            }, 500)
            localStorage.removeItem("studentData")
        } catch {
            setLoading(false)
        }
    };

    return (
        <OnboardingFormTemplate>
            <div className="w-full p-4 text-deepBlue bg-white rounded-xl">
                <div className="w-full text-deepBlue">
                    <h4 className="text-md lg:text-[0.9rem] font-semibold text-left">
                        Add College
                    </h4>
                    <hr className="border-t border-gray-300" />
                </div>
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                    <h5 className="text-xs font-bold mt-5">Faculty</h5>
                    <div className="flex items-center gap-2 flex-wrap mt-5">
                        <SolidButton buttonName={currentYear} />
                    </div>
                </div>

                <CardList
                    list={studentList}
                    onAdd={(newStudent) => {
                        const enrichedStudent = {
                            ...newStudent,
                        };
                        setStudentList((prev) => [...prev, enrichedStudent])
                    }}
                    openModal={openModal}
                    label="Add Faculty"
                    getTitle={(item) => item?.fullName || "Faculty Name"}
                    getSubtitle={(item) => item?.designation || "Designation"}
                    getSubtitle1={(item) => item?.department || "Department"}
                />

                <FacilitiesSection
                    checkedFacilities={checkedFacilities}
                    setCheckedFacilities={setCheckedFacilities}
                    onChange={handleCheckboxChange}
                />

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
                {facilityErrors && (
                    <p className="text-red-500 text-sm mt-2">{facilityErrors}</p>
                )}

                <CustomModal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    title="Add Faculty"
                    sectionTitle="Faculty Info"
                    fields={collegeFaculty}
                    formData={studentData}
                    setFormData={setStudentData}
                    validationSchema={addStudentValidationSchema}
                    showImageUpload={true}
                    imageKey="profile_picture"
                    folderName="profile-photo"
                    onSubmit={handleAddFaculty}
                />

            </div>
        </OnboardingFormTemplate>
    );
};

export default FacultyForm;
