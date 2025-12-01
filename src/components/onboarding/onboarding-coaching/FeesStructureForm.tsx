import React, { useEffect, useState } from "react";
import RoundedButton from "../../atom/buttons/RoundedButton";
import OnboardingFormTemplate from "../OnboardingFormTemplate";
import { LiaSave } from "react-icons/lia";
import { FiEdit2 } from "react-icons/fi";
import { FaChevronLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";
import SubjectsAndFees from "./SubjectsAndFees";
import SubjectAndFeesTable from "./SubjectAndFeesTable";
import { getAcademicYear } from "@/utils/helper";
import SingleSelectCourseBranchDropdown from "@/components/atom/dropdowns/SingleSelectCourseBranch";
import { collegeCoachingMap, competitiveExamMap, k12Map } from "@/utils/data/collegeOnBoard/data";
import CourseBranchDropdown from "@/components/atom/dropdowns/CourseBranch";
import ClassBranchDropdown from "@/components/atom/dropdowns/ClassBranch";
import LoaderTextButton from "@/components/atom/buttons/LoaderTextButton";
import { getClassBranchMapping } from "@/utils/parseFeeData";

type SubjectData = {
    subjectName: string;
    seats: string;
    fees: string;
    batch: string;
    duration: string;
};

const emptySubject: SubjectData = {
    subjectName: "",
    seats: "",
    fees: "",
    batch: "",
    duration: "",
};

const FeesStructureForm = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [skipLoader, setSkipLoader] = useState(false);
    const [coachingType, setCoachingType] = useState<string>("");
    const [addedClasses, setAddedClasses] = useState<string[]>([]);
    const [branchName, setBranchName] = useState<string[] | null>(null);
    const [allClassFees, setAllClassFees] = useState<{ [key: string]: any }>({});
    const [selectedClass, setSelectedClass] = useState<string>("");
    const [selectedClasses, setSelectedClasses] = useState<string[]>([]);
    const [dropdownResetKey, setDropdownResetKey] = useState(0);
    const [isEditMode, setIsEditMode] = useState(false);
    const [editClassName, setEditClassName] = useState("");
    const [classError, setClassError] = useState<string>("");
    const [selectedBranch, setSelectedBranch] = useState<string>("");
    const [classBranchMap, setClassBranchMap] = useState<{ [key: string]: string[] }>({});
    const [typesOfCoaching, setTypesOfCoaching] = useState<string>("");
    const [branchError, setBranchError] = React.useState("");
    const [feeFormData, setFeeFormData] = useState<SubjectData[]>([
        {
            subjectName: "",
            seats: "",
            fees: "",
            batch: "",
            duration: "",
        },
        {
            subjectName: "",
            seats: "",
            fees: "",
            batch: "",
            duration: "",
        },
        {
            subjectName: "",
            seats: "",
            fees: "",
            batch: "",
            duration: "",
        },
    ]);

    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const currentYear = new Date().getFullYear();
    const current_session = getAcademicYear();

    useEffect(() => {
        let feeMap = localStorage.getItem("class_branch_map");
        const { mapping: classBranchData } = getClassBranchMapping();
        let storedMap: any = null;
        let finalClassBranchMap: any = {};

        try {
            finalClassBranchMap = feeMap ? JSON.parse(feeMap) : classBranchData
        } catch (error) {
            console.error("Failed to parse class_branch_map from localStorage:", error);
            finalClassBranchMap = classBranchData
        }

        setClassBranchMap(finalClassBranchMap);

        // Extract unique class names (keys of the object)
        const classNames = Object.keys(finalClassBranchMap);
        const uniqueClasses = [...new Set(classNames)];
        setAddedClasses(uniqueClasses);
        if (classNames.length > 0) {
            const first = classNames[0];
            setSelectedClass(first);
            setSelectedBranch(finalClassBranchMap[first][0] || "");
        }
    }, [dropdownResetKey])

    const totalFees = feeFormData.reduce((sum, item) => {
        const fee = parseFloat(item.fees) || 0;
        return sum + fee;
    }, 0);

    const tenMonthTotal = totalFees * 10;
    const averagePerItem = tenMonthTotal / feeFormData.length;

    useEffect(() => {
        const type = sessionStorage.getItem("coachingType");
        const coaching_types = localStorage.getItem("types_of_coaching");
        if (type) {
            setCoachingType(type);
        }
        if (coaching_types) {
            let data = JSON.parse(coaching_types)
            setTypesOfCoaching(data)
        }
    }, []);

    const getClassCourseBranchMap = (type: string): { [key: string]: string[] | null } => {
        switch (type) {
            case "competitive_exam":
                return competitiveExamMap;
            case "college_coaching":
                return collegeCoachingMap;
            case "k_12":
                return k12Map;
            default:
                return k12Map;
        }
    };

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};

        feeFormData.forEach((subject, index) => {
            if (!subject.subjectName.trim()) newErrors[`subjectName-${index}`] = "Subject Name is required";
            if (!subject.seats.trim()) newErrors[`seats-${index}`] = "Seat is required";
            if (!subject.fees.trim()) newErrors[`fees-${index}`] = "Fees is required";
            if (!subject.batch.trim()) newErrors[`batch-${index}`] = "Batch is required";
            if (!subject.duration.trim()) newErrors[`duration-${index}`] = "Duration is required";
        });

        setErrors(newErrors);
        const hasFormErrors = Object.keys(newErrors).length > 0;

        return !hasFormErrors;
    };

    const handleAddClass = () => {
        setClassError("");

        if (selectedClasses.length === 0) {
            setClassError("Please select at least one class before adding.");
            return;
        }
        if (Object.keys(feeFormData).length === 0) {
            setClassError("Please fill the fee form before adding a class.");
            return;
        }

        //  DUPLICATE CHECK LOGIC START
        const courseBranchMap = JSON.parse(localStorage.getItem("class_branch_map") || "{}");
        const safeBranchName = Array.isArray(branchName) ? branchName : [];
        const isDuplicate = selectedClasses?.some((className) => {
            const classEntry = courseBranchMap[className];

            const branches = Array.isArray(classEntry)
                ? classEntry
                : classEntry && typeof classEntry === "object"
                    ? Object.keys(classEntry)
                    : [];

            if (safeBranchName.length === 0) {
                return branches.includes("");
            } else {
                return safeBranchName.some((branch) => branches.includes(branch));
            }
        });


        if (isDuplicate) {
            setClassError(`Class "${selectedClass}"${selectedBranch ? ` and "${selectedBranch}" branch` : ""} already exists.`);
            return;
        }
        //  DUPLICATE CHECK LOGIC END
        const storedData = JSON.parse(localStorage.getItem("coaching-fees") || "{}");
        const prevFees = storedData.subject_fees || {}; // extract existing subject_fees only
        const updatedStoredData = { ...prevFees };

        selectedClasses.forEach((className) => {
            // If no branch selected
            if (!branchName || branchName?.length === 0) {
                updatedStoredData[className] = feeFormData.map((subject) => ({
                    subject: subject.subjectName,
                    seats: Number(subject.seats),
                    fees: subject.fees,
                    batch: subject.batch,
                    duration: subject.duration,
                }));
            } else {
                // If branch selected
                if (!updatedStoredData[className]) {
                    updatedStoredData[className] = {};
                }

                branchName?.forEach((branch) => {
                    updatedStoredData[className][branch] = feeFormData.map((subject) => ({
                        subject: subject.subjectName,
                        seats: Number(subject.seats),
                        fees: subject.fees,
                        batch: subject.batch,
                        duration: subject.duration,
                    }));
                });
            }
        });
        const addClasses = [...new Set([...addedClasses, ...selectedClasses])];
        setAddedClasses(addClasses);

        // Add this block ↓
        const firstNewClass = selectedClasses?.[0];
        const firstNewBranch = branchName?.[0];

        localStorage.setItem("coaching-classes", JSON.stringify(addClasses));
        localStorage.setItem("coaching-fees", JSON.stringify({ subject_fees: updatedStoredData }));

        selectedClasses.forEach((courseName: string) => {
            if (!courseBranchMap[courseName]) {
                courseBranchMap[courseName] = [];
            }
            if (Array.isArray(branchName) && branchName.length > 0) {
                branchName?.forEach((branch: string) => {
                    if (!courseBranchMap[courseName].includes(branch)) {
                        courseBranchMap[courseName].push(branch);
                    }
                })
            }
        });
        localStorage.setItem("class_branch_map", JSON.stringify(courseBranchMap));


        // Clear form + selection for next entry
        setSelectedClasses([]);
        setBranchName([]);
        setSelectedClass("");
        setSelectedBranch("");
        const emptySubject = {
            subjectName: "",
            seats: "",
            fees: "",
            batch: "",
            duration: "",
        };
        setFeeFormData(Array(3).fill(null).map(() => ({ ...emptySubject })));
        setErrors({});
        setDropdownResetKey((prev) => prev + 1);
        setTimeout(() => {
            setSelectedClass(firstNewClass);    // will preselect this in dropdown
            if (branchName && branchName.length > 0) {
                setSelectedBranch(firstNewBranch || "");
            }
        }, 0);
    };

    const handleClassChange = (cls: string[], branch: string[]) => {
        setBranchError(""); // Reset error initially
        setSelectedClasses(cls)
        setSelectedClasses(cls)
        setBranchName(branch)
        const classBranchMap = getClassCourseBranchMap(typesOfCoaching);

        // Check for invalid mix of class types
        const hasBranch = cls.some((className) => classBranchMap[className]?.length);
        const hasNoBranch = cls.some((className) => !classBranchMap[className]?.length);

        if (hasBranch && hasNoBranch) {
            setBranchError("You can't proceed with both branched and non-branched classes selected.");
            setSelectedClasses([]); // Clear invalid selection
            setBranchName([]); // Clear branches too
        }
    };

    const handleSkip = () => {
        setSkipLoader(true);
        setTimeout(() => {
            try {
                router.push("/onboarding-coaching/student-faculty");
            } catch (error) {
                console.error("Navigation error:", error);
                setSkipLoader(false);
            }
        }, 0);
    };

    const handlePreviousPage = () => {
        router.push("/onboarding-coaching/coaching-details");
    };

    const handleContinue = () => {
        const feesRaw = localStorage.getItem("coaching-fees");
        const dataRaw = localStorage.getItem("coaching-data");
        let coachingFeesRaw: any = null
        try {
            if (feesRaw) {
                coachingFeesRaw = JSON.parse(feesRaw)
            } else if (dataRaw) {
                const parsedData = JSON.parse(dataRaw);
                coachingFeesRaw = parsedData?.subject_fees ? { subject_fees: parsedData.subject_fees } : null;
            }
        } catch (error) {
            console.log("Coaching FeesStructure , Error in handleContinue", error)
            coachingFeesRaw = null;
        }

        const hasCoachingFees = coachingFeesRaw && Object.keys(coachingFeesRaw).length > 0;

        const isValid = validateForm();
        if (!hasCoachingFees && !isValid) {
            setLoading(false)
            return;
        }
        setLoading(true)
        setErrors({})
        try {
            const existingData = JSON.parse(localStorage.getItem("coaching-data") || "{}");
            const updatedData = {
                ...existingData,
                ...coachingFeesRaw,
                average_fee: averagePerItem.toFixed(2)
            };

            localStorage.setItem("coaching-data", JSON.stringify(updatedData));
            setTimeout(() => {
                router.push("/onboarding-coaching/student-faculty");
                setLoading(false)
            }, 500)
            localStorage.removeItem("class_branch_map");
            localStorage.removeItem("coaching-fees");
            localStorage.removeItem("coaching-classes");
        } catch {
            setLoading(false)
        }
    };

    //edit 
    const handleEditClassData = () => {
        const coachingFeesRaw = localStorage.getItem("coaching-fees");
        const coachingDataRaw = localStorage.getItem("coaching-data");

        let storedFees = null;

        try {
            if (coachingFeesRaw) {
                storedFees = JSON.parse(coachingFeesRaw);
            } else if (coachingDataRaw) {
                storedFees = JSON.parse(coachingDataRaw);
            }
        } catch (error) {
            console.error("Error parsing stored fees:", error);
            storedFees = null;
        }
        const classFees = storedFees?.subject_fees?.[selectedClass];

        if (!selectedClass) return;

        // Prefill the form with the selected class data
        let updatedFeeFormData: any = [];

        // Check if the class has branches (like "XII" -> "PCM" or "PCB")
        if (classFees) {
            if (Array.isArray(classFees)) {
                // If class doesn't have branches, simply map over the array of subjects
                updatedFeeFormData = classFees.map((subject) => ({
                    subjectName: subject.subject || "",
                    seats: subject.seats.toString() || "",
                    fees: subject.fees.toString() || "",
                    batch: subject.batch || "",
                    duration: subject.duration || "",
                }));
            } else if (typeof classFees === "object" && selectedBranch) {
                const branchData = classFees[selectedBranch];
                // If class has branches, handle each branch separately
                if (Array.isArray(branchData)) {
                    updatedFeeFormData = branchData?.map((subject: any) => ({
                        subjectName: subject.subject || "",
                        seats: subject.seats?.toString() || "",
                        fees: subject.fees?.toString() || "",
                        batch: subject.batch || "",
                        duration: subject.duration || "",
                    }))
                }
            }
        }

        setFeeFormData(updatedFeeFormData);
        setEditClassName(selectedClass);  // Remember which class is being edited
        setIsEditMode(true);
    };

    const handleUpdateClass = () => {
        if (!selectedClass) {
            setClassError("Please select a class to update.");
            return;
        }
        const coachingFeeRaw = localStorage.getItem("coaching-fees")
        const coachingDataRaw = localStorage.getItem("coaching-data")
        let storedData = null;
        let isUsingFees = false;
        try {
            if (coachingFeeRaw) {
                storedData = JSON.parse(coachingFeeRaw)
                isUsingFees = true;
            } else if (coachingDataRaw) {
                storedData = JSON.parse(coachingDataRaw)
            }
        } catch (error) {
            console.log("Coaching FeesStructureForm", error)
            storedData = { subject_fees: {} };
        }
        const subjectFees = storedData?.subject_fees || {};

        const updatedSubjectData = feeFormData.map((subject) => ({
            subject: subject.subjectName,
            seats: Number(subject.seats),
            fees: subject.fees,
            batch: subject.batch,
            duration: subject.duration,
        }));

        //  Branch Case Handling
        const hasBranches = Array.isArray(classBranchMap[selectedClass]) && classBranchMap[selectedClass]?.length > 0;

        if (hasBranches && selectedBranch) {
            // If class has branches and a branch is selected
            subjectFees[selectedClass] = {
                ...(subjectFees[selectedClass] || {}),
                [selectedBranch]: updatedSubjectData,
            };
        } else {
            // If class has no branches or no branch selected
            subjectFees[selectedClass] = updatedSubjectData;
        }

        // Save the updated structure to localStorage
        if (isUsingFees) {
            localStorage.setItem("coaching-fees", JSON.stringify({ subject_fees: subjectFees }));
        } else {
            const updatedCoachingData = {
                ...storedData,
                subject_fees: subjectFees,
            };
            localStorage.setItem("coaching-data", JSON.stringify(updatedCoachingData));
        }

        // Reset form states
        setFeeFormData(new Array(3).fill({ ...emptySubject }));
        setErrors({});

        setSelectedClass("");
        setSelectedBranch("");

        // Then reset to original values
        setTimeout(() => {
            setSelectedClass(selectedClass);
            setSelectedBranch(selectedBranch);
        }, 0);
        setIsEditMode(false);
    };

    return (
        <OnboardingFormTemplate>
            <div className="w-full p-4 text-deepBlue bg-white rounded-xl">
                <div className="w-full text-deepBlue">
                    <h4 className="text-md lg:text-[0.9rem] font-semibold text-left">
                        Add Institute
                    </h4>
                    <hr className="border-t border-gray-300" />
                </div>
                {/* Error message at the top, visible clearly */}
                {(branchError) && (
                    <p className="text-red-600 text-sm font-semibold mt-2 text-right">
                        {branchError}
                    </p>
                )}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                    <h5 className="text-xs font-bold mt-5">Courses</h5>
                    <div className="flex items-center gap-2 flex-wrap mt-5">
                        <div className="w-10 h-10 flex items-center justify-center cursor-pointer">
                            <LiaSave />
                        </div>
                        <span className="text-xs font-medium text-deepBlue">{current_session}</span>

                        <div className="w-fit text-[0.8rem]">
                            <div className="flex flex-col md:flex-row gap-4 items-start w-full">
                                <ClassBranchDropdown
                                    optionsData={getClassCourseBranchMap(typesOfCoaching)}
                                    onSelectionChange={handleClassChange}
                                    disableBranchDropdown={!!branchError}
                                    key={dropdownResetKey}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <SubjectsAndFees
                    formData={feeFormData}
                    setFormData={setFeeFormData}
                    errors={errors}
                    setErrors={setErrors}
                />

                <div className={`flex justify-end mt-6 text-xs ${addedClasses?.length == 0 ? 'gap-5' : ''}`}>
                    {
                        addedClasses?.length == 0 &&
                        <div className="flex justify-end gap-5 text-xs">
                            {false && (
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
                            )}
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
                        </div>
                    }
                    <RoundedButton
                        withBackground={false}
                        buttonName={isEditMode ? "Update Class" : "+ Add Class"}
                        textColor="#2E90FA"
                        width="6rem"
                        height="2.37rem"
                        fontBold={true}
                        onClick={isEditMode ? handleUpdateClass : handleAddClass}
                    />
                </div>
                {classError && (
                    <p className="text-red-500 font-semibold text-xs mb-2 text-right w-full">
                        {classError}
                    </p>
                )}
            </div>

            {
                addedClasses?.length > 0 &&
                <>
                    <div className="flex items-center justify-between m-4">
                        <div className="text-xs font-semibold text-darkBlue">
                            Fee Structure ({currentYear})
                        </div>
                        <div className="w-fit text-[0.8rem]">
                            <SingleSelectCourseBranchDropdown
                                optionsData={Object.keys(classBranchMap)}
                                branchMap={classBranchMap}
                                onCourseChange={(course: any) => {
                                    const selected = Array.isArray(course) ? course : [course];
                                    setSelectedClasses(selected);
                                    setSelectedClass(selected[0]);
                                    setSelectedBranch("");
                                }}
                                onBranchChange={(branch: any) => {
                                    const selected = Array.isArray(branch) ? branch : [branch];
                                    setBranchName(selected);
                                    setSelectedBranch(selected[0]);
                                }}
                                classValue={selectedClass}
                                branchValue={selectedBranch}
                            // key={dropdownResetKey}
                            />
                        </div>
                    </div>

                    <div className="bg-white rounded-xl text-sm px-4 pt-3 pb-3 mt-4">
                        {
                            selectedClass &&
                            <>
                                <div className="flex items-center justify-between mb-0">
                                    <p className="text-xl font-semibold">Subject and Fee - {`${selectedClass} ${selectedBranch && `(${selectedBranch})`}`}</p>
                                    <div className="flex items-center gap-1 text-blue-600 cursor-pointer text-xs"
                                        onClick={handleEditClassData}
                                    >
                                        <FiEdit2 />
                                        <span>Edit</span>
                                    </div>
                                </div>

                                <div className="mt-3">
                                    <SubjectAndFeesTable selectedClass={selectedClass} selectedBranch={selectedBranch} />
                                </div>
                            </>
                        }

                        <div className="flex justify-end mt-6 gap-5 text-xs">
                            {false && (
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
                            )}
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
                    </div>
                </>
            }
        </OnboardingFormTemplate>
    );
};

export default FeesStructureForm;
