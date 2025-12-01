import React, { useState, useEffect } from "react";
import RoundedButton from "../../atom/buttons/RoundedButton";
import OnboardingFormTemplate from "../OnboardingFormTemplate";
import { FaChevronDown, FaChevronLeft, FaPlus } from "react-icons/fa";
import { useRouter } from "next/navigation";
import AddStudentModal from "./AddStudentModal";
import CollegeDropdowns from "./CollegeDropdowns";
import AcademicStatisticsForm from "./AcademicStatisticsForm";
import { validateField } from "@/utils/formValidation";
import ProfileTile from "@/components/atom/ProfileTile";
import SolidButton from "@/components/atom/buttons/SolidButton";
import { calculateRatio, getAcademicYear, getCurrentYear } from "@/utils/helper";
import SingleSelectCourseBranchDropdown from "@/components/atom/dropdowns/SingleSelectCourseBranch";
import CardList from "@/components/molecule/cards/CardList";
import YearsDropdown from "@/components/atom/dropdowns/YearsDropdown";
import { addStudentValidationSchema } from "@/utils/validationSchema";
import { collegeStudent } from "@/utils/fields/inputFields";
import CustomModal from "@/components/atom/modals/CustomFormModal";
import LoaderTextButton from "@/components/atom/buttons/LoaderTextButton";

type Student = {
	fullName: string;
	age: string;
	mark: string;
	profile_picture: string;
};

type ScholarshipStudent = {
	name: string;
	package: string;
	company: string;
	image: string;
	isGraduate: boolean;
};

type ScholarshipStudentsType = {
	[year: string]: ScholarshipStudent[];
};

const CollegeResultDisplayForm = () => {
	const currentYear = getCurrentYear().toString();
	const [skipLoader, setSkipLoader] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const [selectedYear, setSelectedYear] = useState<string>(currentYear);
	const [selectedClass, setSelectedClass] = useState<string>("");
	const [studentList, setStudentList] = useState<any[]>([]);
	const [activeIndex, setActiveIndex] = useState<number | null>(null);
	const [studentData, setStudentData] = useState({ fullName: "", age: "", mark: "", profile_picture: "" });
	const [classOption, setClassOption] = useState<string[]>([]);
	const [dropdownResetKey, setDropdownResetKey] = useState(0);
	const [showYearDropdown, setShowYearDropdown] = useState(false);
	const [formData, setFormData] = useState<any>({
		offered: "",
		language: "",
		session: "",
		totalStudent: "",
		totalFaculty: "",
		collegeFormat: ""
	});
	const [editingItem, setEditingItem] = useState<any | null>(null);
	const [errors, setErrors] = useState<any>({});

	const router = useRouter();

	useEffect(() => {
		const storedMap = localStorage.getItem("class_branch_map");
		if (storedMap) {
			const parsedMap = JSON.parse(storedMap);
			let allClassBranchPairs: string[] = [];
			Object.entries(parsedMap).forEach(([className, branches]) => {
				if (Array.isArray(branches) && branches.length > 0) {
					branches.forEach((branch: string) => {
						allClassBranchPairs.push(`${className} (${branch})`);
					});
				} else {
					allClassBranchPairs.push(className);
				}
			});

			const offeredString = allClassBranchPairs.join(", ");

			setFormData((prev: any) => ({
				...prev,
				offered: offeredString
			}));
		}
	}, [dropdownResetKey]);

	useEffect(() => {
		const collegeData = JSON.parse(localStorage.getItem("college-data") || "{}");

		//  Prefill academic_statistics
		if (collegeData?.academic_statistics) {
			const stats = collegeData.academic_statistics;
			setFormData({
				offered: stats.courses_offered || "",
				language: stats.language_of_instruction || "",
				session: stats.academic_session || "",
				totalStudent: stats.total_capacity?.toString() || "",
				totalFaculty: stats.total_faculty?.toString() || "",
				collegeFormat: stats.college_format || "",
			});
		}

		//  Prefill scholarship_students for selectedYear
		if (collegeData?.scholarship_students?.[selectedYear]) {
			const students = collegeData.scholarship_students[selectedYear];
			const formatted = students.map((student: any) => ({
				fullName: student.name,
				age: "", // No age in source, leave blank or calculate if needed
				mark: student.package.replace('%', ''),
				profile_picture: student.image,
			}));
			setStudentList(formatted);
		}
	}, [selectedYear]);


	const openModal = (student?: any, index?: number) => {
		if (student !== undefined && index !== undefined) {
			setEditingItem(student);
			setActiveIndex(index);  // Save which student is being edited
			setStudentData(student); // Prefill modal form data
		} else {
			setEditingItem(null);
			setActiveIndex(null);
			setStudentData({ fullName: "", age: "", mark: "", profile_picture: "" });
		}
		setIsModalOpen(true);
	};

	const closeModal = () => setIsModalOpen(false);

	const handleAddStudent = (updatedStudent: any) => {
		if (activeIndex !== null) {
			// Update existing student by index
			const updatedList = [...studentList];
			updatedList[activeIndex] = updatedStudent;
			setStudentList(updatedList);
		} else {
			// Add new student
			const enrichedStudent = {
				...updatedStudent,
			};
			setStudentList((prev) => [...prev, enrichedStudent]);
		}
		setActiveIndex(null);  // Reset editing index after save
		closeModal();
	};

	const getStorageKey = () => {
		if (selectedYear) {
			return selectedYear;
		}
		return selectedYear;
	};

	const handleClassSelect = (course: any) => {
		const selected = course;
		if (selectedYear && studentList.length > 0) {
			const prevStored = JSON.parse(localStorage.getItem("studentData") || "{}");
			const prevKey = getStorageKey();
			prevStored[prevKey] = studentList;
			localStorage.setItem("studentData", JSON.stringify(prevStored));
			persistStudentListToStorage();
		}

		setSelectedYear(selected);
		const stored = JSON.parse(localStorage.getItem("studentData") || "{}");
		setStudentList(stored[selected] || []);// Load new data or empty
	};

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { id, value } = e.target;
		let finalValue = value;
		if (id === "totalFaculty" || id === "totalStudent") {
			if (!/^\d*$/.test(value)) {
				setErrors((prev: any) => ({
					...prev,
					[id]: "Only numeric values are allowed",
				}));
			} else if (value.length > 7) {
				setErrors((prev: any) => ({
					...prev,
					[id]: "Value must be up to 7 digits only",
				}));
			} else {
				setErrors((prev: any) => ({ ...prev, [id]: "" }));
			}
		} else {
			setErrors((prev: any) => ({ ...prev, [id]: "" }));
		}

		setFormData((prev: any) => ({
			...prev,
			[id]: finalValue,
		}));
	};

	const validateForm = () => {
		const newErrors: any = {};

		const fieldsToValidate = [
			{ name: "offered", label: "Course Offered" },
			{ name: "language", label: "Language of instruction" },
			{ name: "session", label: "Session" },
			{ name: "totalStudent", label: "Total Student" },
			{ name: "totalFaculty", label: "Total Faculty" },
			{ name: "collegeFormat", label: "College Format" },
		];

		fieldsToValidate?.forEach((field) => {
			const errorMessage = validateField(field?.name, formData[field?.name as keyof typeof formData] || "", field.label);
			if (errorMessage) {
				newErrors[field?.name] = errorMessage;
			}
		});

		return newErrors;
	};

	const handlePreviousPage = () => {
		router.push("/onboarding-college/fees-structure");
	};

	const persistStudentListToStorage = () => {
		const prevStored = JSON.parse(localStorage.getItem("studentData") || "{}");
		const currentKey = getStorageKey();
		prevStored[currentKey] = studentList;
		localStorage.setItem("studentData", JSON.stringify(prevStored));
	};

	const handleSkip = () => {
		setSkipLoader(true);
		setTimeout(() => {
			try {
				router.push("/onboarding-college/faculties-facilities");
			} catch (error) {
				console.error("CollegeResultDisplayForm-242, Navigation error:", error);
				setSkipLoader(false);
			}
		}, 0);
	};

	const handleContinue = () => {
		if (selectedYear && studentList.length > 0) {
			persistStudentListToStorage();
		}
		const existingData = JSON.parse(localStorage.getItem("college-data") || "{}");
		const studentData = JSON.parse(localStorage.getItem("studentData") || "{}");
		const formErrors = validateForm();
		setErrors(formErrors);
		setLoading(true)

		if (Object.keys(formErrors).length > 0) {
			setLoading(false)
			return;
		}
		try {
			const transformedData: ScholarshipStudentsType = Object.entries(studentData).reduce(
				(acc, [year, students]) => {
					const studentsArray = students as Student[];

					acc[year] = studentsArray?.map((s) => ({
						name: s?.fullName,
						package: `${s?.mark}%`,
						company: "Tech Corp",
						image: s?.profile_picture,
						isGraduate: true,
					}));

					return acc;
				},
				{} as ScholarshipStudentsType
			);

			let academic_statistics = {
				courses_offered: formData?.offered,
				language_of_instruction: formData?.language,
				academic_session: formData?.session,
				college_format: formData?.collegeFormat,
				total_capacity: Number(formData.totalStudent),
				total_faculty: Number(formData.totalFaculty),
				student_faculty_ratio: calculateRatio(Number(formData.totalStudent), Number(formData.totalFaculty))
			}

			const updatedData = {
				...existingData,
				academic_statistics,
				scholarship_students: transformedData
			};

			localStorage.setItem("college-data", JSON.stringify(updatedData));
			setTimeout(() => {
				router.push("/onboarding-college/faculties-facilities");
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
					<h5 className="text-xs font-bold mt-5">Scholarship Students</h5>
					<div className="flex items-center gap-2 flex-wrap mt-5">
						<YearsDropdown
							value={selectedYear}
							onChange={(selectedYear) => handleClassSelect(selectedYear)}
						/>
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
					openModal={(student: any, index: number) => openModal(student, index)}
					label="Add Student"
					getTitle={(item) => item?.fullName || "Student Name"}
					getSubtitle={(item) => `${item?.mark}% Scored` || "Marks Scored"}
				/>
				<h5 className="text-xs font-bold mt-7">Academic Statistics</h5>

				<AcademicStatisticsForm
					formData={formData}
					handleInputChange={handleInputChange}
					errors={errors}
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
				<CustomModal
					isOpen={isModalOpen}
					onClose={closeModal}
					title="Add Student"
					sectionTitle="Student Info"
					fields={collegeStudent}
					formData={studentData}
					setFormData={setStudentData}
					validationSchema={addStudentValidationSchema}
					showImageUpload={true}
					imageKey="profile_picture"
					folderName="profile-photo"
					onSubmit={handleAddStudent}
				/>
			</div>
		</OnboardingFormTemplate>
	);
};

export default CollegeResultDisplayForm;
