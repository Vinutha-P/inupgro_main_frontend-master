"use client";
import React, { useState, useEffect } from "react";
import RoundedButton from "../../atom/buttons/RoundedButton";
import OnboardingFormTemplate from "../OnboardingFormTemplate";
import { FaChevronLeft, FaPlus } from "react-icons/fa";
import { useRouter } from "next/navigation";
import AddFacultyModal from "../onboarding-coaching/AddFacultyModal";
import StudentForm from "./StudentForm";
import CardList from "@/components/molecule/cards/CardList";
import LoaderTextButton from "@/components/atom/buttons/LoaderTextButton";
import CustomModal from "@/components/atom/modals/CustomFormModal";
import { addStudentValidationSchema } from "@/utils/validationSchema";
import { coachingFaculty } from "@/utils/fields/inputFields";
import { getClassBranchMapping } from "@/utils/parseFeeData";
interface Student {
    fullName: string;
    marks: string;
    examType: string;
    isGraduate: boolean;
    profile_picture: string;
}
interface TransformedStudent {
    student_name: string;
    marks: string;
    exam_type: string;
    isGraduate: boolean;
    profile_picture: string;
}

const StudentAndFaculty = () => {
    const [loading, setLoading] = useState(false);
    const [skipLoader, setSkipLoader] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedClasses, setSelectedClasses] = useState<string[]>([]);
    const [branchName, setBranchName] = useState<string[]>([]);
    const [selectedYear, setSelectedYear] = useState("2025");
    const [selectedClass, setSelectedClass] = useState("");
    const [selectedBranch, setSelectedBranch] = useState("");
    const [validationError, setValidationError] = useState<string>("");
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [studentData, setStudentData] = useState<any>({
        fullName: "",
        age: "",
        examType: "",
        marks: "",
        profile_picture: ""
    });
    const [facultyData, setFacultyData] = useState<any>({
        fullName: "",
        age: "",
        designation: "",
        department: "",
        profile_picture: ""
    });
    const [facultyList, setFacultyList] = useState<any[]>([]);
    const [studentList, setStudentList] = useState<any[]>([]);
    const [editingItem, setEditingItem] = useState<any | null>(null);

    const router = useRouter();

    useEffect(() => {
        const facultyFromStorage = getFacultyDataFromLocalStorage();
        const normalizedFaculty = facultyFromStorage.map((faculty) => ({
            fullName: faculty.name || "",
            designation: faculty.title || "",
            department: faculty.department || "",
            profile_picture: faculty.image || "",
            age: faculty.age || ""
        }));
        setFacultyList(normalizedFaculty);
    }, []);

    const getFacultyDataFromLocalStorage = (): any[] => {
        try {
            const raw = localStorage.getItem("coaching-data");
            const coachingData = raw ? JSON.parse(raw) : {};
            return coachingData.faculty || [];
        } catch (error) {
            console.error("StudentAndFaculty, Error reading faculty data from localStorage:", error);
            return [];
        }
    };

    const closeModal = () => setIsModalOpen(false);

    const openModal = (student?: any, index?: number) => {
        if (student !== undefined && index !== undefined) {
            setEditingItem(student);
            setActiveIndex(index);
            setFacultyData(student);
        } else {
            setEditingItem(null);
            setActiveIndex(null);
            setFacultyData({
                fullName: "",
                age: "",
                designation: "",
                department: "",
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
            setFacultyList(updatedList);
        } else {
            // Add new student
            const enrichedStudent = {
                ...updatedFaculty,
            };
            setFacultyList((prev) => [...prev, enrichedStudent]);
        }
        setActiveIndex(null);  // Reset editing index after save
        closeModal();
    };

    const handleClassChange = (newClass: string) => {
        const selected = newClass;

        // Save current studentList before changing class
        if (selectedYear && studentList.length > 0) {
            const studentRaw = localStorage.getItem("studentData");
            const coachingRaw = localStorage.getItem("coaching-data");

            let studentData = studentRaw ? JSON.parse(studentRaw) : {};
            const coachingData = coachingRaw ? JSON.parse(coachingRaw) : {};
            const prevKey = getStorageKey();

            if (prevKey) {
                //  CASE 1: studentData exists, update with current studentList
                if (!studentData[prevKey]) studentData[prevKey] = {};
                studentData[prevKey][selectedYear] = studentList;
                localStorage.setItem("studentData", JSON.stringify(studentData));
            }

            // CASE 2: studentData missing but coaching-data available → fallback
            if ((!studentRaw || Object.keys(studentData).length === 0) &&
                coachingData?.top_ranking_students?.[prevKey]?.[selectedYear]
            ) {
                const fallbackTopStudents = coachingData.top_ranking_students[prevKey][selectedYear];

                const transformed = fallbackTopStudents.map((s: any) => ({
                    fullName: s.student_name,
                    marks: parseFloat(s.marks),
                    examType: s.exam_type,
                    profile_picture: s.profile_picture,
                    isGraduate: s.isGraduate || false,
                }));

                if (!studentData[prevKey]) studentData[prevKey] = {};
                studentData[prevKey][selectedYear] = transformed;

                localStorage.setItem("studentData", JSON.stringify(studentData));
            }

            //Always persist for new added students
            persistStudentListToStorage();
        }

        setSelectedYear(selected);

        // Load student list after class change
        const studentRaw = localStorage.getItem("studentData");

        if (studentRaw) {
            // CASE 1: studentData exists
            const stored = JSON.parse(studentRaw);
            setStudentList(stored[newClass]?.[selected] || []);
        } else {
            // CASE 2: studentData doesn't exist, fallback to coaching-data.top_ranking_students
            const coachingRaw = localStorage.getItem("coaching-data");
            if (coachingRaw) {
                const coachingData = JSON.parse(coachingRaw);
                const topRanking = coachingData.top_ranking_students || {};
                const topStudents = topRanking[newClass]?.[selected] || [];

                // Transform back from stored format to local format
                const transformedStudents = topStudents.map((s: any) => ({
                    fullName: s.student_name,
                    marks: parseFloat(s.marks),
                    examType: s.exam_type,
                    profile_picture: s.profile_picture,
                    isGraduate: s.isGraduate || false,
                }));

                setStudentList(transformedStudents);

                // Optional: Save into studentData for future
                const fallback = {
                    [newClass]: {
                        [selected]: transformedStudents
                    }
                };
                localStorage.setItem("studentData", JSON.stringify(fallback));
            } else {
                setStudentList([]);
            }
        }

        setSelectedClass(newClass);
    };

    const persistStudentListToStorage = () => {
        const existingStudentData = JSON.parse(localStorage.getItem("studentData") || "{}");

        if (!selectedClass || !selectedYear) return;

        if (!existingStudentData[selectedClass]) {
            existingStudentData[selectedClass] = {};
        }

        if (!existingStudentData[selectedClass][selectedYear]) {
            existingStudentData[selectedClass][selectedYear] = [];
        }

        const existingStudents = existingStudentData[selectedClass][selectedYear];

        const newStudents = studentList.filter(newStu =>
            !existingStudents.some((existingStu: any) =>
                existingStu.fullName === newStu.fullName &&
                existingStu.age === newStu.age
            )
        );

        existingStudentData[selectedClass][selectedYear] = [...existingStudents, ...newStudents];

        localStorage.setItem("studentData", JSON.stringify(existingStudentData));
    };

    const getStorageKey = () => {
        if (!selectedClass) return "";

        const classBranchMap = JSON.parse(localStorage.getItem("class_branch_map") || "{}");

        const branches = classBranchMap[selectedClass];

        const hasBranches = Array.isArray(branches) && branches.length > 0;

        if (hasBranches && selectedBranch) {
            // Class has branches, and a branch is selected
            return `${selectedClass}-${selectedBranch}`;
        }

        // Class doesn't have branches, save by class only
        return selectedClass;
    };

    const handlePreviousPage = () => {
        router.push("/onboarding-coaching/fees-structure");
    };

    const handleSkip = () => {
        setSkipLoader(true);
        setTimeout(() => {
            try {
                router.push("/onboarding-coaching/principal-profile");
            } catch (error) {
                console.error("Navigation error:", error);
                setSkipLoader(false);
            }
        }, 0);
    };

    const handleContinue = () => {
        const existingData = JSON.parse(localStorage.getItem("coaching-data") || "{}");
        const studentRaw = localStorage.getItem("studentData");
        const facultyListData = facultyList || [];

        if (studentList.length === 0 && facultyListData.length === 0) {
            setValidationError("Please add at least one student and one faculty.");
            setLoading(false);
            return;
        }

        if (studentList.length === 0) {
            setValidationError("Please add at least one student.");
            setLoading(false);
            return;
        }

        if (facultyListData.length === 0) {
            setValidationError("Please add at least one faculty.");
            setLoading(false);
            return;
        }

        setLoading(true);
        setValidationError("");

        try {
            let top_ranking_students: Record<string, Record<string, TransformedStudent[]>> = {};

            if (studentRaw) {
                const studentData = JSON.parse(studentRaw);
                Object.entries(studentData).forEach(([className, yearWiseData]) => {
                    Object.entries(yearWiseData as Record<string, Student[]>).forEach(([year, students]) => {
                        const transformedStudents = students.map((s) => ({
                            student_name: s.fullName,
                            marks: `${s.marks}%`,
                            isGraduate: true,
                            exam_type: s.examType,
                            profile_picture: s.profile_picture,
                        }));

                        if (!top_ranking_students[className]) {
                            top_ranking_students[className] = {};
                        }

                        top_ranking_students[className][year] = transformedStudents;
                    });
                });
            } else {
                // fallback to existing top_ranking_students from coaching-data
                top_ranking_students = existingData.top_ranking_students || {};
            }

            const faculty = facultyListData.map(f => ({
                name: f.fullName,
                title: f.designation,
                department: f.department,
                image: f.profile_picture
            }));

            const updatedData = {
                ...existingData,
                top_ranking_students,
                faculty,
            };
            localStorage.setItem("coaching-data", JSON.stringify(updatedData));
            setTimeout(() => {
                router.push("/onboarding-coaching/principal-profile");
                setLoading(false);
            }, 500)
        } catch (err) {
            console.error("Error in handleContinue:", err);
            setLoading(false);
        }
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
                <StudentForm
                    formData={studentData}
                    setFormData={setStudentData}
                    setStudentList={setStudentList}
                    selectedYear={selectedYear}
                    setSelectedYear={setSelectedYear}
                    onClassChange={handleClassChange}
                    setClassArray={setSelectedClasses}
                    setBranchArray={setBranchName}
                    setSelectedBranch={setSelectedBranch}
                    setSelectedClass={setSelectedClass}
                    studentList={studentList}
                    selectedClass={selectedClass}
                    selectedBranch={selectedBranch}
                />

                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                    <h5 className="text-xs font-bold mt-5">Faculty</h5>
                </div>

                <CardList
                    list={facultyList}
                    onAdd={(newFaculty) => {
                        const enrichedStudent = {
                            ...newFaculty,
                        };
                        setFacultyList((prev) => [...prev, enrichedStudent])
                    }}
                    openModal={(newFaculty: any, index: number) => openModal(newFaculty, index)}
                    label="Add Faculty"
                    getTitle={(item) => item.fullName || "Faculty"}
                    getSubtitle={(item) => `${item.designation} Designation`}
                    getSubtitle1={(item) => `${item.department} Department`}
                />
                <CustomModal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    title="Add Faculty"
                    sectionTitle="Faculty Info"
                    fields={coachingFaculty}
                    formData={facultyData}
                    setFormData={setFacultyData}
                    validationSchema={addStudentValidationSchema}
                    showImageUpload={true}
                    imageKey="profile_picture"
                    folderName="profile-photo"
                    onSubmit={handleAddFaculty}
                />

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
                {validationError && (
                    <p className="text-red-500 font-semibold text-xs mt-2">{validationError}</p>
                )}
            </div>
        </OnboardingFormTemplate>
    );
};

export default StudentAndFaculty;
