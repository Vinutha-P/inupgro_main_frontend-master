import React, { useState, useEffect } from "react";
import ClassBranchDropdown from "@/components/atom/dropdowns/ClassBranch";
import CardList from "@/components/molecule/cards/CardList";
import SolidButton from "@/components/atom/buttons/SolidButton";
import SingleSelectCourseBranchDropdown from "@/components/atom/dropdowns/SingleSelectCourseBranch";
import { getClassBranchMapping } from "@/utils/parseFeeData";
import CustomModal from "@/components/atom/modals/CustomFormModal";
import { collegeFacultyStudent } from "@/utils/fields/inputFields";
import { addStudentValidationSchema } from "@/utils/validationSchema";

const StudentForm = ({
    formData,
    setFormData,
    setStudentList,
    selectedYear,
    setSelectedYear,
    setClassArray,
    setBranchArray,
    setSelectedBranch,
    setSelectedClass,
    selectedBranch,
    selectedClass,
    studentList,
    onClassChange
}: {
    formData: {
        fullName: string;
        age: string;
        examType: string;
        marks: string;
        profile_picture: string;
    };
    setFormData: React.Dispatch<React.SetStateAction<{
        fullName: string;
        age: string;
        examType: string;
        marks: string;
        profile_picture: string;
    }>>;
    setStudentList: any;
    selectedYear: any;
    setSelectedYear: any;
    setClassArray: any;
    setBranchArray: any;
    setSelectedBranch: any;
    setSelectedClass: any;
    selectedBranch: any;
    selectedClass: any;
    studentList: any;
    onClassChange?: (newClass: string) => void;

}) => {
    const [dropdownResetKey, setDropdownResetKey] = useState(0);
    const [dropdownOpened, setDropdownOpened] = useState<boolean>(false);
    const [classOption, setClassOption] = useState<{ [key: string]: string[] }>({});
    const [classData, setClassData] = useState<any>({});
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const [error, setError] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = (student?: any, index?: number) => {

        if (student !== undefined && index !== undefined) {
            setActiveIndex(index);
            setFormData({
                fullName: student?.student_name ?? "",
                age: "",
                examType: student?.exam_type ?? "",
                marks: student?.marks ?? "",
                profile_picture: student?.profile_picture ?? ""
            });
        } else {
            setActiveIndex(null);
            setFormData({
                fullName: "",
                age: "",
                examType: "",
                marks: "",
                profile_picture: ""
            });
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setFormData({
            fullName: "",
            age: "",
            examType: "",
            marks: "",
            profile_picture: ""
        })
    }

    useEffect(() => {
        const { mapping: classBranchData } = getClassBranchMapping();
        if (classBranchData) {
            setClassOption(classBranchData);
        }
    }, [dropdownResetKey]);

    useEffect(() => {
        const raw = localStorage.getItem("coaching-data");
        const { mapping: classBranchData, firstClass, firstBranch } = getClassBranchMapping();
        if (firstClass && !firstBranch) {
            setSelectedClass(firstClass);
        } else if (firstBranch) {
            setSelectedClass(firstClass);
            setSelectedBranch(firstBranch)
        }
    }, [])

    useEffect(() => {
        const raw = localStorage.getItem("coaching-data");
        const studentRaw = localStorage.getItem("studentData");
        // const { mapping: classBranchData } = getClassBranchMapping();

        if (raw) {
            try {
                const coachingData = JSON.parse(raw);
                const studentData = studentRaw ? JSON.parse(studentRaw) : {};

                const fullKey = selectedBranch ? `${selectedClass}(${selectedBranch})` : selectedClass;
                const studentDataByYear = studentData?.[fullKey]?.[selectedYear] || [];

                let finalStudents = [];

                // Check studentData first
                if (studentDataByYear.length > 0) {
                    finalStudents = studentDataByYear.map((student: any) => ({
                        student_name: student.fullName || "",
                        marks: student.marks || "",
                        exam_type: student.examType || "",
                        isGraduate: student.isGraduate || false,
                        profile_picture: student.profile_picture || ""
                    }));
                } else {
                    // F match class from top_ranking_students
                    const allTopRankingClasses = Object.keys(coachingData?.top_ranking_students || {});
                    const matchedClassKey: any = allTopRankingClasses.find((key) =>
                        key.toLowerCase() === fullKey.toLowerCase()
                    );

                    const topRanking = coachingData?.top_ranking_students?.[matchedClassKey]?.[selectedYear] || [];

                    finalStudents = topRanking.map((student: any) => ({
                        student_name: student.student_name || "",
                        marks: student.marks || "",
                        exam_type: student.exam_type || "",
                        isGraduate: student.isGraduate || false,
                        profile_picture: student.profile_picture || ""
                    }));
                }

                setStudentList(finalStudents);
            } catch (err) {
                console.error("Coaching StudentForm, Error parsing localStorage data:", err);
                setStudentList([]);
            }
        }
    }, [selectedClass, selectedBranch, selectedYear]);

    const getStorageKey = () => {
        if (selectedBranch && selectedBranch.trim() !== "") {
            return `${selectedClass}(${selectedBranch})`;
        }
        return selectedClass;
    };

    const handleAddStudent = (student: any) => {
        if (!selectedClass || selectedClass.trim() === "") {
            setError("Please select a class before adding students.");
            return;
        }

        const key = getStorageKey();
        const year = selectedYear;

        const studentRaw = localStorage.getItem("studentData");
        const coachingRaw = localStorage.getItem("coaching-data");

        let studentData = studentRaw ? JSON.parse(studentRaw) : {};
        let coachingData = coachingRaw ? JSON.parse(coachingRaw) : {};

        let source = "studentData";
        let listRef = null;

        //  Priority 1: If coachingData.top_rankings exists, use it
        if (coachingData[key]?.top_rankings?.[year]) {
            source = "coachingData";
            listRef = coachingData[key].top_rankings[year];
        }
        // Priority 2: Fallback to studentData only if coachingData doesn't exist
        else if (studentData[key]?.[year]) {
            listRef = studentData[key][year];
        }
        // Else, initialize studentData
        else {
            if (!studentData[key]) studentData[key] = {};
            studentData[key][year] = [];
            listRef = studentData[key][year];
        }

        //  Add or update student
        if (activeIndex !== null) {
            listRef[activeIndex] = student;
        } else {
            listRef.push(student);
        }

        // Save in correct location
        if (source === "studentData") {
            localStorage.setItem("studentData", JSON.stringify(studentData));
            setStudentList([...studentData[key][year]]);
        } else {
            localStorage.setItem("coaching-data", JSON.stringify(coachingData));
            setStudentList([...coachingData[key].top_rankings[year]]);
        }

        setActiveIndex(null);
    };

    const handleClassSelect = (course: any) => {
        setError("");
        const selected = Array.isArray(course) ? course[0] : course;

        if (selected === selectedClass) return;

        const prevKey = getStorageKey();
        const studentData = JSON.parse(localStorage.getItem("studentData") || "{}");
        const coachingData = JSON.parse(localStorage.getItem("coaching-data") || "{}");

        // Save previous studentList to whichever storage was used (studentData or coaching-data)
        if (selectedClass && studentList.length > 0 && selectedYear) {
            if (studentData[prevKey]) {
                // Save into studentData if it already exists
                if (!studentData[prevKey][selectedYear]) {
                    studentData[prevKey][selectedYear] = [];
                }
                studentData[prevKey][selectedYear] = studentList;
                localStorage.setItem("studentData", JSON.stringify(studentData));
            } else if (
                coachingData.top_ranking_students &&
                coachingData.top_ranking_students[prevKey]
            ) {
                // Save into coaching-data if that's where data came from
                if (!coachingData.top_ranking_students[prevKey][selectedYear]) {
                    coachingData.top_ranking_students[prevKey][selectedYear] = {};
                }
                coachingData.top_ranking_students[prevKey][selectedYear].ranking = studentList;
                localStorage.setItem("coaching-data", JSON.stringify(coachingData));
            }
        }

        setSelectedClass(selected);
        setSelectedBranch("");

        const key = selected;

        //  Load studentList based on available data
        if (studentData[key] && studentData[key][selectedYear]) {
            setStudentList(studentData[key][selectedYear]);
        } else if (
            coachingData.top_ranking_students &&
            coachingData.top_ranking_students[key] &&
            coachingData.top_ranking_students[key][selectedYear]?.ranking
        ) {
            setStudentList(coachingData.top_ranking_students[key][selectedYear].ranking);
        } else {
            setStudentList([]);
        }
    };

    const handleBranchSelect = (branch: any) => {
        const selected = Array.isArray(branch) ? branch[0] : branch;
        setSelectedBranch(selected);

        const key = `${selectedClass}(${selected})`;
        const studentData = JSON.parse(localStorage.getItem("studentData") || "{}");
        const coachingData = JSON.parse(localStorage.getItem("coaching-data") || "{}");

        if (studentData[key]) {
            setStudentList(studentData[key]);
        } else if (coachingData[key]?.top_ranking_students) {
            setStudentList(coachingData[key].top_ranking_students);
        } else {
            setStudentList([]);
        }
    };

    return (
        <div className="mt-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-2">
                <h5 className="text-xs font-bold">Top Ranking Students</h5>
                <div className="flex gap-2 items-center">
                    <SolidButton buttonName={selectedYear} />
                    <SingleSelectCourseBranchDropdown
                        key={dropdownResetKey}
                        optionsData={Object.keys(classOption)}
                        branchMap={classOption}
                        onCourseChange={handleClassSelect}
                        onBranchChange={handleBranchSelect}
                        onDropdownOpen={() => {
                            setStudentList([]);
                            setDropdownOpened(true);
                        }}
                        classValue={selectedClass}
                        branchValue={selectedBranch}
                    />
                </div>
            </div>
            {(error) && (
                <p className="text-red-600 text-sm font-semibold mt-2 text-right">
                    {error}
                </p>
            )}

            <CardList
                list={Array.isArray(studentList) ? studentList : []}
                onAdd={(newStudent) => {
                    const enrichedStudent = {
                        ...newStudent,
                    };
                    setStudentList((prev: any) => [...prev, enrichedStudent])
                }
                }
                openModal={(newStudent: any, index: number) => openModal(newStudent, index)}
                label="Add Student"
                getTitle={(item) => item?.fullName || item?.student_name || "Student"}
                getSubtitle={(item) => `${item.examType || item?.exam_type}`}
                getSubtitle1={(item) => `${item.marks?.includes("%") ? `${item.marks} Marks` : `${item.marks}% Marks`}`}
            />

            <CustomModal
                isOpen={isModalOpen}
                onClose={closeModal}
                title="Add Student"
                sectionTitle="Student Info"
                fields={collegeFacultyStudent}
                formData={formData}
                setFormData={setFormData}
                validationSchema={addStudentValidationSchema}
                showImageUpload={true}
                imageKey="profile_picture"
                folderName="profile-photo"
                onSubmit={handleAddStudent}
            />

        </div>
    );
};

export default StudentForm;
