"use client";
import React, { useEffect, useState } from "react";
import OnboardingFormTemplate from "../OnboardingFormTemplate";
import { FaChevronDown, FaChevronLeft, FaPlus } from "react-icons/fa";
import { useRouter } from "next/navigation";
// import AddStudentModal from "./AddStudentModal";
import SelectButtonRoudedDark from "@/components/atom/buttons/SelectButtonRoudedDark";
import RoundedButton from "@/components/atom/buttons/RoundedButton";
import ClassBranchDropdown from "@/components/atom/dropdowns/ClassBranch";
import CardList from "@/components/molecule/cards/CardList";
import AddStudentModal from "./AddStudentModal";
import SingleSelectCourseBranchDropdown from "@/components/atom/dropdowns/SingleSelectCourseBranch";
import CustomModal from "@/components/atom/modals/CustomFormModal";
import { addStudentValidationSchema } from "@/utils/validationSchema";
import { schoolStudent } from "@/utils/fields/inputFields";
import LoaderTextButton from "@/components/atom/buttons/LoaderTextButton";
import { parseClassAndBranch } from "@/utils/classBranch";
import { getFormattedClassData } from "@/utils/parseFeeData";

type Student = {
	fullName: string;
	age: string;
	stream: string;
	marks: string;
	profile_picture: string;
};

const yearOptions = ["2024", "2025"];
const facilitiesData = [
	{
		heading: "Class",
		options: ["AC", "Smart Class", "Wifi"],
	},
	{
		heading: "Labs",
		options: ["Computer Lab", "Bio Lab", "Chemistry Lab"],
	},
	{
		heading: "Safety & Security",
		options: ["CCTV", "GPS Bus Tracking", "GPS Student Tracking"],
	},
	{
		heading: "Career Classes",
		options: ["Business Class", "Entrepreneurship Class", "Technology Class"],
	},
	{
		heading: "Disable Friendly",
		options: ["Ramps", "Elevators", "Special Bathrooms"],
	},

	{
		heading: "Sports & Fitness",
		options: ["Swimming", "Skating", "Gym"],
	},
	{
		heading: "Infrastructure",
		options: ["Library / Reading Room", "Playground", "Canteen"],
	},
	{
		heading: "Clubs",
		options: ["Science Club", "Cultural Club", "Sports Club"],
	},
	{
		heading: "Boarding",
		options: ["Girls Hostel", "Boys Hostel", "Teachers Hostel"],
	},
	{
		heading: "Extra Curricular",
		options: ["Art & Crafts", "Dance", "Drama"],
	},
];

const initialStudent = { fullName: "", age: "", stream: "", marks: "", profile_picture: "" };

const SchoolResultDisplayForm = () => {
	const [loading, setLoading] = useState(false)
	const [skipLoader, setSkipLoader] = useState(false);
	const [selectedClass, setSelectedClass] = useState<string>("");
	const [selectedBranch, setSelectedBranch] = useState<string>("");
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedYear, setSelectedYear] = useState<string>("2025");
	const [showYearDropdown, setShowYearDropdown] = useState(false);
	const [studentData, setStudentData] = useState({ fullName: "", age: "", stream: "", marks: "", profile_picture: "" });
	const [studentList, setStudentList] = useState<any[]>([]);
	const [facilityErrors, setFacilityErrors] = useState<string>("");
	const [classOption, setClassOption] = useState<{ [key: string]: string[] }>({});
	const [dropdownResetKey, setDropdownResetKey] = useState(0);

	const [preservedClass, setPreservedClass] = useState<string>("");
	const [preservedBranch, setPreservedBranch] = useState<string>("");
	const [dropdownOpened, setDropdownOpened] = useState<boolean>(false);
	const [classData, setClassData] = useState<{ [className: string]: Student[] }>({});
	const [editingItem, setEditingItem] = useState<any | null>(null);
	const [activeIndex, setActiveIndex] = useState<number | null>(null);
	const [selectedFacilities, setSelectedFacilities] = useState<{ [key: string]: string[] }>({});
	const [availableClasses, setAvailableClasses] = useState<string[]>([]);
	const [classToBranches, setClassToBranches] = useState<{ [className: string]: string[] }>({});

	const router = useRouter();

	const toggleYearDropdown = () => setShowYearDropdown(!showYearDropdown);
	const handlePreviousPage = () => router.push("/onboarding-school/academic-details");

	useEffect(() => {
		try {
			getFormattedClassData(setClassOption);
		} catch (err) {
			console.error("SchoolResultDisplayForm ,Error in getFormattedClassData while parsing class & branch data:", err);
		}
	}, [dropdownResetKey]);

	useEffect(() => {
		if (!selectedClass) return;

		const stored = JSON.parse(localStorage.getItem("studentData") || "{}");

		// Rebuild full class name
		const fullKey = selectedBranch ? `${selectedClass}(${selectedBranch})` : selectedClass;
		if (classData[fullKey]) {
			setStudentList(classData[fullKey]);
		} else if (stored[fullKey]) {
			setStudentList(stored[fullKey]);
		} else {
			setStudentList([]); // Clear if not found
		}
	}, [selectedClass, selectedBranch, classData]);

	useEffect(() => {
		const schoolDataRaw = localStorage.getItem("school-data");
		if (schoolDataRaw) {
			const parsedData = JSON.parse(schoolDataRaw);
			if (parsedData?.school_results) {
				getSchoolResult(parsedData.school_results);
			}
			if (parsedData?.facilities) {
				getSchoolFacilities(parsedData.facilities);
			}
		}
	}, []);

	// Function to extract and set school_results data
	const getSchoolResult = (schoolResults: any) => {
		try {
			if (
				schoolResults &&
				schoolResults[selectedYear] &&
				Array.isArray(schoolResults[selectedYear].classes)
			) {
				const yearResults = schoolResults[selectedYear].classes;
				const resultMap: { [className: string]: Student[] } = {};
				const classesOnly: string[] = [];
				const branchesOnly: string[] = [];
				const branchMap: { [className: string]: string[] } = {};

				let firstClass = "";
				let firstBranch = "";

				yearResults.forEach((classEntry: any, index: number) => {
					const fullClassName = classEntry.class_name;

					// Separate class and branch
					const match = fullClassName.match(/^([^\(]+)\s*\(?([^\)]*)\)?$/);
					const classOnly = match?.[1]?.trim() || fullClassName;
					const branchOnly = match?.[2]?.trim() || "";

					// Save student list with full class key (e.g., "Class 11(PCB)")
					const students = classEntry.students.map((student: any) => ({
						fullName: student.student_name,
						age: "",
						stream: "",
						marks: student.marks || student.percentage || "",
						profile_picture: student.profile_picture || "",
					}));
					resultMap[fullClassName] = students;

					// Add to classes list if not already
					if (!classesOnly.includes(classOnly)) {
						classesOnly.push(classOnly);
					}

					// Add branch to class-wise branch map
					if (branchOnly) {
						if (!branchMap[classOnly]) branchMap[classOnly] = [];
						if (!branchMap[classOnly].includes(branchOnly)) {
							branchMap[classOnly].push(branchOnly);
						}
					} else {
						branchMap[classOnly] = []; // Ensure it exists
					}

					// Set default selected
					if (index === 0) {
						firstClass = classOnly;
						firstBranch = branchOnly;
					}
				});

				// Set data
				setClassData(resultMap);
				setAvailableClasses(classesOnly);
				setClassToBranches(branchMap);
				setSelectedClass(firstClass);
				setSelectedBranch(firstBranch || "");
			}
		} catch (error) {
			console.error("Error processing school_results:", error);
		}
	};

	// Function to extract and set school_results data
	const getSchoolFacilities = (schoolFacilities: any) => {
		const facilities = schoolFacilities;
		try {
			if (facilities) {
				const prefilledData: { [key: string]: string[] } = {};

				Object.keys(facilities).forEach((category) => {
					const availableOptions = facilities[category]
						.filter((item: any) => item.is_available)
						.map((item: any) => item.facility_type);
					if (availableOptions.length > 0) {
						prefilledData[category] = availableOptions;
					}
				});

				setSelectedFacilities(prefilledData);
			}
		} catch (error) {
			console.error("Error processing school_results:", error);
		}
	};

	const openModal = (student?: any, index?: number) => {
		if (student !== undefined && index !== undefined) {
			setEditingItem(student);
			setActiveIndex(index);  // Save which student is being edited
			setStudentData(student); // Prefill modal form data
		} else {
			setEditingItem(null);
			setActiveIndex(null);
			setStudentData({ fullName: "", age: "", stream: "", marks: "", profile_picture: "" });
		}
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
		setStudentData({ fullName: "", age: "", stream: "", marks: "", profile_picture: "" });
	};

	const getStorageKey = () => {
		if (!selectedClass) return null;

		const classNumber = selectedClass
		const needsBranch = (classNumber === "Class 11") || (classNumber === "Class 12");

		if (needsBranch) {
			if (!selectedBranch) return null;
			return `${selectedClass}(${selectedBranch})`;
		}

		return selectedClass;
	};

	const handleAddStudent = (student: Student) => {
		let updatedList;
		if (activeIndex !== null) {
			updatedList = [...studentList];
			updatedList[activeIndex] = student;
		} else {
			updatedList = [...studentList, student];
		}
		setStudentList(updatedList);

		const key = getStorageKey();
		if (key) {
			const prevStored = JSON.parse(localStorage.getItem("studentData") || "{}");
			prevStored[key] = updatedList;
			localStorage.setItem("studentData", JSON.stringify(prevStored));
			setClassData(prev => ({
				...prev,
				[key]: updatedList
			}));
		}

		setActiveIndex(null);
		closeModal();
	};

	const handleClassSelect = (course: any) => {
		const selected = Array.isArray(course) ? course[0] : course;

		//  Save current class data to localStorage before changing
		const currentKey = getStorageKey();
		if (currentKey && studentList.length > 0) {
			const prevStored = JSON.parse(localStorage.getItem("studentData") || "{}");
			prevStored[currentKey] = studentList;
			localStorage.setItem("studentData", JSON.stringify(prevStored));
		}

		//  Now switch to the new class
		setSelectedClass(selected);
		setSelectedBranch("");
		setStudentList([]); // Clear current list for new class

		//  Restore any saved data for the newly selected 
		const needsBranch = selected === "Class 11" || selected === "Class 12";
		if (!needsBranch) {
			const stored = JSON.parse(localStorage.getItem("studentData") || "{}");
			setStudentList(stored[selected] || []);
		}
	};

	const handleBranchSelect = (branch: any) => {
		const selected = Array.isArray(branch) ? branch[0] : branch;

		const prevKey = getStorageKey();
		if (prevKey && studentList.length > 0) {
			const prevStored = JSON.parse(localStorage.getItem("studentData") || "{}");
			prevStored[prevKey] = studentList;
			localStorage.setItem("studentData", JSON.stringify(prevStored));
			setClassData(prev => ({ ...prev, [prevKey]: studentList }));
		}

		setSelectedBranch(selected);

		//  Load existing data for newly selected class-branch combo
		const newKey = selectedClass ? `${selectedClass}(${selected})` : null;
		if (newKey) {
			const stored = JSON.parse(localStorage.getItem("studentData") || "{}");
			setStudentList(stored[newKey] || []);
		}
	};

	const handleYearSelect = (year: string) => {
		setSelectedYear(year);
		setShowYearDropdown(false);
	};

	const handleCheckboxChange = (
		facilityHeading: string,
		option: string
	) => {
		setSelectedFacilities(prev => {
			const currentOptions = prev[facilityHeading] || [];
			const isAlreadySelected = currentOptions.includes(option);

			let updatedOptions;
			if (isAlreadySelected) {
				// Remove option
				updatedOptions = currentOptions.filter(opt => opt !== option);
			} else {
				// Add option
				updatedOptions = [...currentOptions, option];
			}

			return {
				...prev,
				[facilityHeading]: updatedOptions,
			};
		});

		// Optional: Validation
		const anyChecked = Object.values(selectedFacilities).some(arr => arr.length > 0);
		setFacilityErrors(anyChecked ? "" : "Please select at least one facility before proceeding.");
	};

	const handleSkip = () => {
		setSkipLoader(true);
		setTimeout(() => {
			try {
				router.push("/onboarding-school/principal-profile");
			} catch (error) {
				console.error("SchoolResultDisplayForm-377, Navigation error:", error);
				setSkipLoader(false);
			}
		}, 0);
	};

	const handleContinue = () => {
		if (!selectedClass) return;

		const existingData = JSON.parse(localStorage.getItem("school-data") || "{}");
		const studentData = JSON.parse(localStorage.getItem("studentData") || "{}");
		const allFacilities = [...facilitiesData];
		let anySelected = false;

		const facilities = Object.fromEntries(
			allFacilities?.map(({ heading, options }) => [
				heading,
				options?.map(option => {
					const input = Array.from(document.querySelectorAll("label:has(input[type='checkbox'])"))
						.find(label => label?.textContent?.trim() === option)
						?.querySelector("input") as HTMLInputElement;
					const isChecked = input?.checked || false;
					if (isChecked) anySelected = true;
					return { facility_type: option, is_available: isChecked };
				})
			])
		);

		if (!anySelected) return setFacilityErrors("Please select at least one facility before proceeding.");
		setFacilityErrors("");
		setLoading(true)
		try {
			const classesArray = Object.entries(studentData).map(([className, students]) => {
				// Map each student to required structure
				const studentsArray = students as Student[];
				const transformedStudents = studentsArray.map((s: any) => ({
					student_name: s.fullName,
					section: "A",          // fixed or dynamic if you want
					marks: `${s.marks}%`,  // appending % to marks string
					exam_type: "Final",    // fixed value as per your example
					percentage: `${s.marks}%`,
					profile_picture: s.profile_picture,
				}));

				return {
					class_name: className,
					students: transformedStudents,
				};
			});
			const school_results = {
				[selectedYear]: {
					year: selectedYear,
					classes: classesArray
				}
			};

			const updatedData = {
				...existingData,
				facilities,
				school_results: {
					...existingData.school_results, ...school_results
				}
			};
			localStorage.setItem("school-data", JSON.stringify(updatedData));
			setTimeout(() => {
				router.push("/onboarding-school/principal-profile");
				setLoading(false)
			}, 400)
		} catch {
			setLoading(false)
		}
	};

	return (
		<OnboardingFormTemplate>
			<div className="w-full p-4 text-deepBlue bg-white rounded-xl">
				<div className="w-full text-deepBlue">
					<h4 className="text-md lg:text-[0.9rem] font-semibold text-left">
						Add School
					</h4>
					<hr className="border-t border-gray-300" />
				</div>
				<div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
					<h5 className="text-xs font-bold mt-5">School Results</h5>
					<div className="flex items-center gap-2 flex-wrap mt-5">
						<div className="relative">
							<button
								type="button"
								onClick={toggleYearDropdown}
								className="flex items-center text-xs font-medium text-deepBlue bg-white px-3 py-1"
							>
								{selectedYear}
								<FaChevronDown className="ml-2 text-[0.6rem]" />
							</button>

							{showYearDropdown && (
								<div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded shadow-md">
									{yearOptions?.map((year) => (
										<div
											key={year}
											onClick={() => handleYearSelect(year)}
											onKeyDown={(e) => {
												if (e.key === "Enter") {
													handleYearSelect(year);
												}
											}}
											className={`px-4 py-2 text-xs cursor-pointer hover:bg-gray-100 ${selectedYear === year ? "bg-blue-50 font-semibold" : ""
												}`}
										>
											{year}
										</div>
									))}
								</div>
							)}
						</div>

						<div className="w-fit text-[0.8rem]">
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
								placeholder="Class(es)"
							/>
						</div>
					</div>
				</div>

				<CardList
					list={studentList}
					onAdd={(newStudent) => {
						const enrichedStudent = {
							...newStudent,
							className: preservedClass,
							branchName: preservedBranch,
						};
						setStudentList((prev) => [...prev, enrichedStudent])
					}}
					openModal={(student: any, index: number) => openModal(student, index)}
					label="Add Student"
					getTitle={(item) => item?.fullName || "Student Name"}
					getSubtitle={(item) => `${item?.marks}% Scored` || "Marks Scored"}
				/>

				<h5 className="text-xs font-bold mt-7">Facilities</h5>
				<div className="grid grid-cols-1 md:grid-cols-5 gap-6 mt-4">
					{facilitiesData?.map((facility, index) => (
						<div key={facility?.heading} className="bg-white">
							<h6 className="text-[0.7rem] font-semibold text-deepBlue mb-3">
								{facility?.heading}
							</h6>
							<div className="flex flex-col gap-8">
								{facility?.options?.map((option, i) => (
									<label
										key={option}
										className="inline-flex items-center gap-2 text-[0.7rem] text-deepBlue"
									>
										<input
											type="checkbox"
											className="form-checkbox text-primaryLight border-gray-300 rounded-sm"
											checked={
												selectedFacilities[facility.heading]?.includes(option) || false
											}
											onChange={() => handleCheckboxChange(facility.heading, option)}
										/>
										{option}
									</label>
								))}
							</div>
						</div>
					))}
				</div>

				<div className="flex justify-end mt-6 gap-5 text-xs">
					{/* <LoaderTextButton
						withBackground={false}
						fontBold={true}
						buttonName="Skip"
						textColor="#2E90FA"
						textSize="0.7rem"
						width="6rem"
						height="2.37rem"
						onClick={handleSkip}
						isLoading={skipLoader}
					/> */}
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
					<p className="text-red-600 font-semibold text-sm mt-2 text-right">{facilityErrors}</p>
				)}

				<CustomModal
					isOpen={isModalOpen}
					onClose={closeModal}
					title="Add Student"
					sectionTitle="Student Info"
					fields={schoolStudent}
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

export default SchoolResultDisplayForm;
