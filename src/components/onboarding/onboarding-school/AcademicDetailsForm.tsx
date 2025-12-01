"use client";
import React, { useEffect, useState } from "react";
import { FiEdit2 } from "react-icons/fi";
import { FaChevronLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { calculateRatio, convertTo24HourFormat, formatTimeTo12Hour, getAcademicYear, truncateText } from "@/utils/helper";
import { validateField } from "@/utils/formValidation";
import OnboardingFormTemplate from "../OnboardingFormTemplate";
import RoundedButton from "@/components/atom/buttons/RoundedButton";
import DetailTiles from "@/components/atom/DetailTiles";
import MultiSelectDropdown from "@/components/atom/dropdowns/MultiSelect";
import ClassBranchDropdown from "@/components/atom/dropdowns/ClassBranch";
import SingleSelectCourseBranchDropdown from "@/components/atom/dropdowns/SingleSelectCourseBranch";
import { classesOptions, documentOptions, formPaymentOptions } from "@/utils/data/collegeOnBoard/data";
import { LANGUAGE_OPTIONS, SCHOOL_FORMAT_OPTIONS } from "@/utils/selectOptions/options";
import LoaderTextButton from "@/components/atom/buttons/LoaderTextButton";
import { Tooltip } from "@/components/atom/Tooltip";
import { getFormattedClassData } from "@/utils/parseFeeData";
const classList = [
	"Nursery",
	"LKG",
	"UKG",
	"Class 1",
	"Class 2",
	"Class 3",
	"Class 4",
	"Class 5",
	"Class 6",
	"Class 7",
	"Class 8",
	"Class 9",
	"Class 10",
	"11(PCM) Class",
	"11(PCB) Class",
	"11(Commerce) Class",
	"11(Commerce-Math) Class",
	"11(Arts) Class",
	"12(PCM) Class",
	"12(PCB) Class",
	"12(Commerce) Class",
	"12(Commerce-Math) Class",
	"Class12 (Arts)"
]

const AcademicDetailsForm = () => {
	const [loading, setLoading] = useState(false)
	const [skipLoader, setSkipLoader] = useState(false);
	const [selectedClass, setSelectedClass] = useState<string>("");
	const [selectedClasses, setSelectedClasses] = useState<string[]>([]);
	const [branchName, setBranchName] = useState<string[]>([]);
	const [selectedBranch, setSelectedBranch] = useState<string>("");
	const [classOption, setClassOption] = useState<{ [key: string]: string[] }>({});
	const [addedClasses, setAddedClasses] = useState<string[]>([]);
	const [dropdownResetKey, setDropdownResetKey] = useState(0);
	const [allClassFees, setAllClassFees] = useState<{ [key: string]: any }>({});
	const [isEditMode, setIsEditMode] = useState(false);
	const [editClassName, setEditClassName] = useState("");
	const [tileData, setTileData] = useState<any[]>([]);
	const [selectedClassBranchMap, setSelectedClassBranchMap] = useState<{ [key: string]: string[] | null }>({});

	const [errors, setErrors] = useState<any>({});
	const [classError, setClassError] = useState<string>("");
	const [branchError, setBranchError] = React.useState("");
	const [selectError, setSelectError] = React.useState("");

	const currentYear = new Date().getFullYear();
	const router = useRouter();
	const academicYear = getAcademicYear();
	
	const initFormData = () => ({
		classFrom: "",
		classTo: "",
		language: "",
		session: academicYear,
		totalFaculty: "",
		schoolFormat: "",
		parentsInteraction: "",
		studentsInteraction: "",
		eligibilityMarks: "",
		writtenTest: "",
		formAvailability: "",
		formPayment: "",
		documentsRequired: "",
		officeTimingFrom: "",
		officeTimingTo: "",
		schoolTimingFrom: "",
		schoolTimingTo: "",
		total_seats: "",
		ageQualification: "",
		totalStudent: "",
	});
	const [formData, setFormData] = useState<any>(initFormData())

	useEffect(() => {
		const { firstClass, lastClass, formattedClasses } = getFormattedClassData();
		setClassOption(formattedClasses)
		setFormData((prev: any) => ({
			...prev,
			classFrom: firstClass,
			classTo: lastClass,
		}));
	}, [dropdownResetKey]);

	useEffect(() => {
		if (!selectedClass) return;

		const storedData = JSON.parse(localStorage.getItem("school-academic") || "{}");
		const generalDataStorage = JSON.parse(localStorage.getItem("school-data") || "{}");

		const admissionData =
			storedData?.["admission_criteria"]?.[academicYear] ||
			generalDataStorage?.["admission_criteria"]?.[academicYear] ||
			[];

		// Construct the class_name string based on whether branch is present
		const classNameToMatch = selectedBranch
			? `${selectedClass}(${selectedBranch})`
			: selectedClass;

		const academicData = admissionData.find(
			(item: any) => item.class_name === classNameToMatch
		);

		const detailsSource = academicData?.details;
		if (!detailsSource) return;

		const {
			eligibility,
			school_timing,
			office_timing,
			eligibility_percentage,
			written_test,
			form_availability,
			form_payment,
			parents_interaction,
			students_interaction,
			documents_required,
		} = detailsSource;

		const tiles = [
			{
				id: "eligibility-age",
				tileHeading: `${eligibility?.eligibility_start_age_in_years} Years - ${eligibility?.eligibility_end_age_in_years} Years`,
				tileDetail: "Eligibility (Age Qualification)",
			},
			{
				id: "school-timing",
				tileHeading: `${school_timing?.start_time} to ${school_timing?.end_time}`,
				tileDetail: "School Timing",
			},
			{
				id: "office-timing",
				tileHeading: `${office_timing?.start_time} to ${office_timing?.end_time}`,
				tileDetail: "Office Timing",
			},
			{
				id: "eligibility-percentage",
				tileHeading: `${eligibility_percentage}%`,
				tileDetail: "Eligibility Percentage",
			},
			{
				id: "written-test",
				tileHeading: written_test,
				tileDetail: "Written Test",
			},
			{
				id: "form-availability",
				tileHeading: form_availability,
				tileDetail: "Form Availability",
			},
			{
				id: "form-payment",
				tileHeading: form_payment,
				tileDetail: "Form Payment",
			},
			{
				id: "parents-interaction",
				tileHeading: parents_interaction,
				tileDetail: "Parents Interaction",
			},
			{
				id: "students-interaction",
				tileHeading: students_interaction,
				tileDetail: "Students Interaction",
			},
			{
				id: "documents-required",
				tileHeading: (
					<Tooltip content={documents_required?.join(", ")}>
						<span>
							{truncateText(documents_required?.join(", "), 30)}
						</span>
					</Tooltip>
				),
				tileDetail: "Documents Required",
			},
		];

		setTileData(tiles);

		const expectedClassList = Object.keys(classOption || {});
		const filledClassList = (storedData?.admission_criteria?.[academicYear] || []).map((item: any) => item.class_name);

		const unfilledClasses = expectedClassList.filter((cls) => !filledClassList.includes(cls));

		//If there are missing classes, show alert and stop
		if (unfilledClasses.length === expectedClassList?.length) {
			setSelectError("");
		}

	}, [selectedClass, selectedBranch, academicYear]);

	useEffect(() => {
		const schoolDataRaw = localStorage.getItem("school-data");
		if (!schoolDataRaw) return;

		try {
			const parsed = JSON.parse(schoolDataRaw);
			getlAcademicStatics(parsed);
			getlAcademicCriteria(parsed)
		} catch (err) {
			console.error("Error parsing localStorage data:", err);
		}
	}, []);

	const getlAcademicStatics = (data: any) => {
		if (!data || typeof data !== "object") return;

		const academicStats = data.academics_stats;
		if (!academicStats) return;

		const prefill: any = {
			// classFrom: academicStats.classed_offered?.class_list?.[0] || "",
			// classTo: academicStats.classed_offered?.class_list?.slice(-1)?.[0] || "",
			language: academicStats.language_of_instruction?.[0] || "",
			schoolFormat: academicStats.school_format?.[0] || "",
			totalFaculty: academicStats.total_faculty || "",
			totalStudent: academicStats.total_capacity || "",
		};

		// Set prefilled data in form
		setFormData((prev: any) => ({
			...prev,
			...prefill,
		}));

		// Set class dropdown options too
		if (Array.isArray(academicStats.classed_offered?.class_list)) {
			// setClassOption(academicStats.classed_offered.class_list);
		}
	};

	const getlAcademicCriteria = (data: any) => {
		const admissionCriteria = data?.admission_criteria?.[academicYear];

		if (!admissionCriteria || !Array.isArray(admissionCriteria)) return;

		const map: { [key: string]: string[] } = {};

		admissionCriteria.forEach((entry: any) => {
			let className = entry.class_name;

			// Check if it's a branch like "Class 11(PCM)"
			const match = className.match(/(.*?)\((.*?)\)/);

			if (match) {
				const baseClass = match[1].trim(); // e.g., "Class 11"
				const branch = match[2].trim();    // e.g., "PCM"

				if (!map[baseClass]) {
					map[baseClass] = [];
				}

				if (!map[baseClass].includes(branch)) {
					map[baseClass].push(branch);
				}
			} else {
				// Just a normal class without branches
				if (!map[className]) {
					map[className] = [];
				}
			}
		});
		const firstClass = Object.keys(map)[0];
		const firstBranch = map[firstClass][0];
		setAddedClasses([...new Set(admissionCriteria.map((entry: any) => {
			const match = entry.class_name.match(/(.*?)\(/);
			return match ? match[1].trim() : entry.class_name;
		}))]);
		setSelectedClassBranchMap(map);
		setSelectedClass(firstClass);
		setSelectedBranch(firstBranch);
		// Now setTileData logic
		if (firstBranch) {
			// Branch exists, find details of class with branch
			const classWithBranch = admissionCriteria.find(
				(entry: any) => entry.class_name === `${firstClass}(${firstBranch})`
			);
			if (classWithBranch) {
				setTileData([classWithBranch.details]);
			} else {
				setTileData([]); // fallback empty object
			}
		} else {
			// No branch, find details of class only
			const classOnly = admissionCriteria.find(
				(entry: any) => entry.class_name === firstClass
			);
			if (classOnly) {
				setTileData([classOnly.details]);
			} else {
				setTileData([]); // fallback empty object
			}
		}
	}

	const getLocalStorageData = (key: string) => JSON.parse(localStorage.getItem(key) || "{}");

	const getFullClassName = (selectedClass: string, selectedBranch?: string) =>
		selectedBranch ? `${selectedClass}(${selectedBranch})` : selectedClass;

	const handleClassSelect = (option: string) => {
		setSelectedClass(option);
	};

	const validateForm = () => {
		const newErrors: any = {};

		const fieldsToValidate = [
			{ name: "classFrom", label: "Class From" },
			{ name: "classTo", label: "Class To" },
			{ name: "language", label: "Language of instruction" },
			{ name: "parentsInteraction", label: "Parent Interaction" },
			{ name: "studentsInteraction", label: "Students Interaction" },
			{ name: "eligibilityMarks", label: "Eligibility Marks" },
			{ name: "writtenTest", label: "Written Test" },
			{ name: "formAvailability", label: "Form Availablity" },
			{ name: "formPayment", label: "Form Payment" },
			{ name: "documentsRequired", label: "Document" },
			{ name: "officeTimingFrom", label: "Office Timing From" },
			{ name: "officeTimingTo", label: "Office Timing To" },
			{ name: "schoolTimingFrom", label: "From Timing" },
			{ name: "ageQualification", label: "Eligiblity Age" },
			{ name: "schoolTimingTo", label: "To Timing" },
			{ name: "totalFaculty", label: "Total Faculty" },
			{ name: "totalStudent", label: "Total Student" },
			{ name: "schoolFormat", label: "School Format" },
			{ name: "total_seats", label: "Total Seats" },
		];

		fieldsToValidate?.forEach((field) => {
			const errorMessage = validateField(field?.name, formData[field?.name as keyof typeof formData] || "", field.label);
			if (errorMessage) {
				newErrors[field?.name] = errorMessage;
			}
		});

		return newErrors;
	};

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { id, value } = e.target;

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
			[id]: value,
		}));

	};

	// const handleClassChange = (cls: string[], branch: string[]) => {
	// 	setBranchError("");
	// 	setSelectedClasses(cls)
	// 	setBranchName(branch)

	// 	const hasBranch = cls.some((className: any) => classOption[className]?.length);
	// 	const hasNoBranch = cls.some((className: any) => !classOption[className]?.length);

	// 	if (hasBranch && hasNoBranch) {
	// 		setBranchError("You can't proceed with both branched and non-branched classes selected.");
	// 		setSelectedClasses([]); // Clear invalid selection
	// 		setBranchName([]); // Clear branches too
	// 	}
	// };

	const getClassDetails = () => ({
		eligibility: {
			eligibility_start_age_in_years: Number(formData.ageQualification),
			eligibility_end_age_in_years: 10,
			eligibility_check_date: "2024-01-01T00:00:00Z",
		},
		school_timing: {
			start_time: formatTimeTo12Hour(formData.schoolTimingFrom),
			end_time: formatTimeTo12Hour(formData.schoolTimingTo),
		},
		office_timing: {
			start_time: formatTimeTo12Hour(formData.officeTimingFrom),
			end_time: formatTimeTo12Hour(formData.officeTimingTo),
		},
		total_seats: Number(formData.total_seats),
		eligibility_percentage: Number(formData.eligibilityMarks),
		written_test: formData.writtenTest,
		form_availability: formData.formAvailability,
		form_payment: formData.formPayment?.join("/") || "",
		parents_interaction: formData.parentsInteraction,
		students_interaction: formData.studentsInteraction,
		documents_required: formData.documentsRequired,
	});

	const handleAddClass = () => {
		setClassError("");
		if (selectedClasses.length === 0) {
			setClassError("Please select at least one class before adding.");
			return;
		}
		if (Object.keys(formData).length === 0) {
			setClassError("Please fill the form before adding a class.");
			return;
		}

		const storedData = JSON.parse(localStorage.getItem("school-academic") || "{}");
		const yearKey = `${currentYear}`;
		const newAdmissionCriteria = {
			[academicYear]: selectedClasses.flatMap((className) => {
				return Array.isArray(branchName) && branchName.length > 0
					? branchName.map((branch) => ({
						class_name: `${className}(${branch})`,
						details: getClassDetails(),
					}))
					: [{ class_name: className, details: getClassDetails() }];
			}),
		};

		const newClassBranchMap: { [key: string]: string[] | null } = {};

		selectedClasses.forEach((className: any) => {
			newClassBranchMap[className] = Array.isArray(branchName) && branchName.length > 0 ? branchName : null;
		});

		setSelectedClassBranchMap((prevMap) => ({ ...prevMap, ...newClassBranchMap }));

		const updatedClassFees = {
			...allClassFees,
			...newAdmissionCriteria,
		};

		const existingYearData = storedData?.admission_criteria?.[academicYear] || [];
		const updatedAllClassFees = {
			...storedData,
			admission_criteria: {
				...storedData?.admission_criteria,
				[academicYear]: [
					...existingYearData,
					...newAdmissionCriteria[academicYear],
				],
			},
		};

		setAllClassFees(updatedClassFees);
		setAddedClasses((prev) => [...new Set([...prev, ...selectedClasses])]);
		const firstNewClass = selectedClasses?.[0];
		const firstNewBranch = branchName?.[0];
		localStorage.setItem("school-academic", JSON.stringify(updatedAllClassFees));
		// Reset states
		resetFormAndSelection();
		setTimeout(() => {
			setSelectedClass(firstNewClass);    // will preselect this in dropdown
			if (branchName && branchName.length > 0) {
				setSelectedBranch(firstNewBranch || "");
			}
		}, 0);
	};

	const resetFormAndSelection = () => {
		setSelectedClasses([]);
		setSelectedClass("");
		setFormData((prev: any) => ({
			...prev,
			parentsInteraction: "",
			studentsInteraction: "",
			eligibilityMarks: "",
			writtenTest: "",
			formAvailability: "",
			formPayment: "",
			documentsRequired: "",
			officeTimingFrom: "",
			officeTimingTo: "",
			schoolTimingFrom: "",
			schoolTimingTo: "",
			total_seats: "",
			ageQualification: "",
		}));
		setErrors({});
		setClassError("");
		setDropdownResetKey((prev) => prev + 1);
	};

	const handleEditClassData = () => {
		if (!selectedClass) return;

		const storedFees = getLocalStorageData("school-academic");
		const storedData = getLocalStorageData("school-data");
		const admissionCriteria =
			storedFees?.admission_criteria ||
			storedData?.admission_criteria ||
			{};

		const classDataList = admissionCriteria?.[academicYear] || [];
		const fullClassName = getFullClassName(selectedClass, selectedBranch);
		const selectedClassData = classDataList.find((item: any) => item.class_name === fullClassName);

		if (!selectedClassData) return;

		const details = selectedClassData.details;

		// Prefill formData with only the required fields
		setFormData((prev: any) => ({
			...prev,
			parentsInteraction: details.parents_interaction || "",
			studentsInteraction: details.students_interaction || "",
			eligibilityMarks: details.eligibility_percentage?.toString() || "",
			writtenTest: details.written_test || "",
			formAvailability: details.form_availability || "",
			formPayment: details.form_payment?.split('/') || [],
			documentsRequired: details.documents_required || "",
			officeTimingFrom: convertTo24HourFormat(details.office_timing?.start_time) || "",
			officeTimingTo: convertTo24HourFormat(details.office_timing?.end_time) || "",
			schoolTimingFrom: convertTo24HourFormat(details.school_timing?.start_time) || "",
			schoolTimingTo: convertTo24HourFormat(details.school_timing?.end_time) || "",
			total_seats: details?.total_seats || "",
			ageQualification: details.eligibility?.eligibility_start_age_in_years?.toString() || "",
		}));

		setEditClassName(fullClassName);
		setIsEditMode(true);
	};

	const handleUpdateClass = () => {
		if (!selectedClass) {
			setClassError("Please select a class to update.");
			return;
		}

		let allClassFees = getLocalStorageData("school-academic");
		let isUsingSchoolAcademic = true;

		if (!allClassFees || Object.keys(allClassFees).length === 0) {
			allClassFees = getLocalStorageData("school-data");
			isUsingSchoolAcademic = false;
		}

		const fullClassName = getFullClassName(selectedClass, selectedBranch);
		const academicData = allClassFees?.admission_criteria?.[academicYear] || [];

		const updatedClassFees = {
			eligibility: {
				eligibility_start_age_in_years: Number(formData?.ageQualification),
				eligibility_end_age_in_years: 10,
				eligibility_check_date: "2024-01-01T00:00:00Z",
			},
			school_timing: {
				start_time: formatTimeTo12Hour(formData?.schoolTimingFrom),
				end_time: formatTimeTo12Hour(formData?.schoolTimingTo),
			},
			office_timing: {
				start_time: formatTimeTo12Hour(formData?.officeTimingFrom),
				end_time: formatTimeTo12Hour(formData?.officeTimingTo),
			},
			total_seats: Number(formData?.total_seats),
			eligibility_percentage: Number(formData?.eligibilityMarks),
			written_test: formData?.writtenTest,
			form_availability: formData?.formAvailability,
			form_payment: formData?.formPayment?.join("/") || "",
			parents_interaction: formData?.parentsInteraction,
			students_interaction: formData?.studentsInteraction,
			documents_required: formData?.documentsRequired,
		};

		// Update the class item in the academic year array
		const updatedAcademicData = academicData.map((item: any) =>
			item.class_name === fullClassName
				? { ...item, details: updatedClassFees }
				: item
		);

		const updatedFees = {
			...allClassFees,
			admission_criteria: {
				...allClassFees.admission_criteria,
				[academicYear]: updatedAcademicData,
			},
		};

		if (isUsingSchoolAcademic) {
			localStorage.setItem("school-academic", JSON.stringify(updatedFees));
		} else {
			localStorage.setItem("school-data", JSON.stringify(updatedFees));
		}

		setAllClassFees(updatedFees);
		setSelectedClass("");
		setClassError("");

		// Reset form
		setFormData((prev: any) => ({
			...prev,
			parentsInteraction: "",
			studentsInteraction: "",
			eligibilityMarks: "",
			writtenTest: "",
			formAvailability: "",
			formPayment: "",
			documentsRequired: "",
			officeTimingFrom: "",
			officeTimingTo: "",
			schoolTimingFrom: "",
			schoolTimingTo: "",
			total_seats: "",
			ageQualification: "",
		}));

		setTimeout(() => {
			setSelectedClass(selectedClass);
		}, 0);

		setErrors({});
		setIsEditMode(false);
	};

	const handlePreviousPage = () => {
		router.push("/onboarding-school/fees-structure");
	};

	const handleSkip = () => {
		setSkipLoader(true);
		setTimeout(() => {
			try {
				router.push("/onboarding-school/result-display");
			} catch (error) {
				console.error("AcademicDetailsForm Navigation error:", error);
				setSkipLoader(false);
			}
		}, 0);
	};

	const handleContinue = async () => {
        const storedData = getLocalStorageData("school-academic");

		setSelectError("");
		const unfilledClasses: string[] = [];
		// Loop through all classes from classOption
		for (const cls of Object.keys(classOption || {})) {
			const expectedBranches = classOption[cls]; // []
			const selectedBranches = selectedClassBranchMap[cls] || [];

			// Condition 1: class doesn't exist in map at all
			if (!selectedClassBranchMap.hasOwnProperty(cls)) {
				unfilledClasses.push(cls);
				continue;
			}

			// Condition 2: if class has branches, check if all branches exist in map
			if (expectedBranches.length > 0) {
				const missingBranches = expectedBranches.filter(branch => !selectedBranches?.includes(branch));
				if (missingBranches.length > 0) {
					unfilledClasses.push(`${cls} (Missing: ${missingBranches.join(", ")})`);
				}
			}
		}

		// If any class or branch is missing, show error
		if (unfilledClasses.length > 0) {
			setSelectError(
				`Please fill data for all selected classes and branches before proceeding.\nMissing: ${unfilledClasses.join(", ")}`
			);
			return;
		}
		const formErrors = validateForm();
		if (!formErrors) return;
		setErrors({})
		setLoading(true)
		try {
			const academicStats = {
				academics_stats: {
					classed_offered: {
						default: `${formData?.classFrom}-${formData?.classTo}`,
						class_list: classList,
					},
					language_of_instruction: [formData?.language],
					school_format: [formData?.schoolFormat],
					total_faculty: Number(formData.totalFaculty),
					total_capacity: Number(formData.totalStudent),
					student_faculty_ratio: calculateRatio(Number(formData.totalStudent), Number(formData.totalFaculty))
				}
			};

			// Merge with existing localStorage data
			const existingData = getLocalStorageData("school-data");
			const updatedData = {
				...existingData,
				...academicStats,
				...storedData,
			};

			localStorage.setItem("school-data", JSON.stringify(updatedData));
			setTimeout(() => {
				router.push("/onboarding-school/result-display");
				setLoading(false);
			}, 400);
		} catch {
			setLoading(false)
		} finally {
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
					<h5 className="text-xs font-bold mt-5">Academic Statistics</h5>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					<div>
						<label
							htmlFor="classes-offered"
							className="block text-xs font-medium text-gray-700 mb-1"
						>
							Classes Offered
						</label>
						<div className="flex gap-2">
							<div className="flex flex-col w-full">
								<input
									id="classFrom"
									className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-200"
									// onChange={handleInputChange}
									value={formData?.classFrom || ""}
									disabled
									placeholder="Class From"
								/>
							</div>

							{/* To Select */}
							<div className="flex flex-col w-full">
								<input
									id="classTo"
									className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-200"
									// onChange={handleInputChange}
									value={formData?.classTo || ""}
									disabled
									placeholder="Class To"
								/>
							</div>
						</div>
					</div>

					<div>
						<label
							htmlFor="language-instruction"
							className="block text-xs font-medium text-gray-700 mb-1"
						>
							Language of Instruction
						</label>
						<select
							id="language"
							className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-200"
							onChange={handleInputChange}
							value={formData?.language || ""}
						>
							{LANGUAGE_OPTIONS.map((lang, index) => (
								<option key={index} value={index === 0 ? "" : lang}>
									{lang}
								</option>
							))}
						</select>
						{errors.language && <span className="text-red-500 text-xs">{errors.language}</span>}

					</div>

					<div>
						<label
							htmlFor="academic-session"
							className="block text-xs font-medium text-gray-700 mb-1"
						>
							Academic Session
						</label>
						<input
							id="session"
							name="session"
							type="text"
							value={formData?.session || ""}
							className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-200"
							disabled
						/>
					</div>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
					{[
						{
							id: "totalStudent",
							label: "Total Student",
							type: "text"
						},
						{
							id: "totalFaculty",
							label: "Total Faculty",
							type: "text"
						},
						{
							id: "schoolFormat",
							label: "School Format",
							type: "select"
						},
					]?.map((field) => (
						<div key={field?.id}>
							<label
								htmlFor={field?.id}
								className="block text-xs font-medium text-gray-700 mb-1"
							>
								{field?.label}
							</label>

							{field.type === "select" && field?.id === "schoolFormat" ? (
								<select
									id={field?.id}
									className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-200"
									onChange={handleInputChange}
									value={formData[field?.id] || ""}
								>
									{SCHOOL_FORMAT_OPTIONS.map((lang, index) => (
										<option key={index} value={index === 0 ? "" : lang}>
											{lang}
										</option>
									))}
								</select>
							) : field.type === "select" ? (
								<select
									id={field?.id}
									className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-200"
									onChange={handleInputChange}
									value={formData[field?.id]}
								>
									<option value="">{`Select ${field?.label}`}</option>
									<option value="25">25</option>
									<option value="50">50</option>
								</select>
							) : (
								<input
									id={field?.id}
									name={field?.id}
									type="text"
									value={formData[field?.id]}
									onChange={handleInputChange}
									className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-200"
									placeholder={`Enter ${field.label.toLowerCase()}`}
								/>
							)}

							{errors[field?.id] && (
								<span className="text-red-500 text-xs">{errors[field?.id]}</span>
							)}
						</div>
					))}
				</div>

				<div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
					<h5 className="text-xs font-bold mt-5">
						Admission Criteria & Eligibility
					</h5>
					{/* </div> */}
					<div className="flex items-center gap-2 flex-wrap mt-5">
						<span className="text-xs font-medium text-deepBlue">
							{academicYear}
						</span>

						<div className="w-fit text-[0.8rem]">
							<SingleSelectCourseBranchDropdown
								optionsData={Object.keys(classOption)}
								// branchMap={selectedClassBranchMap}
								onCourseChange={(course: any) => {
									const normalized = Array.isArray(course) ? course : [course];
									setSelectedClasses(normalized);
									// const selected = Array.isArray(course) ? course[0] : course;
									// setSelectedClass(normalized[0] || "");
									setSelectedBranch("");
								}}
								onBranchChange={(branch: any) => {
									setBranchName(branch);
									const selected = Array.isArray(branch) ? branch[0] : branch;
									// setSelectedBranch(selected);

								}}
								placeholder="Class"
								key={dropdownResetKey}

							// optionsData={}
							// onSelectionChange={handleClassChange}
							// disableBranchDropdown={!!branchError}
							// key={dropdownResetKey}
							/>
						</div>
					</div>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
					<div>
						<label
							htmlFor="parents-interaction"
							className="block text-xs font-medium text-gray-700 mb-1"
						>
							Eligibility (Age Qualification)
						</label>

						<select
							id="ageQualification"
							className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-200"
							onChange={handleInputChange}
							value={formData.ageQualification}
						>
							<option value="">Select Eligibility age</option>
							{Array.from({ length: 20 }, (_, i) => {
								const age = i + 2;
								return (
									<option key={age} value={age}>
										{age} years
									</option>
								);
							})}
						</select>
						{errors.ageQualification && <span className="text-red-500 text-xs">{errors.ageQualification}</span>}

					</div>

					<div>
						<label
							htmlFor="eligibility-marks"
							className="block text-xs font-medium text-gray-700 mb-1"
						>
							School Timing

						</label>

						<div className="flex gap-2">
							<div className="flex flex-col w-full">
								<input
									type="time"
									id="schoolTimingFrom"
									className="block w-full border border-gray-300 rounded px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-200"
									onChange={handleInputChange}
									value={formData.schoolTimingFrom}
								/>
								{errors.schoolTimingFrom && <span className="text-red-500 text-xs">{errors.schoolTimingFrom}</span>}

							</div>

							<div className="flex flex-col w-full">
								<input
									type="time"
									id="schoolTimingTo"
									className="block w-full border border-gray-300 rounded px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-200"
									onChange={handleInputChange}
									value={formData.schoolTimingTo}
								/>
								{errors.schoolTimingTo && <span className="text-red-500 text-xs">{errors.schoolTimingTo}</span>}

							</div>
						</div>

					</div>

					<div>
						<label
							htmlFor="written-test"
							className="block text-xs font-medium text-gray-700 mb-1"
						>
							Total Seats

						</label>

						<select
							id="total_seats"
							className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-200"
							onChange={handleInputChange}
							value={formData?.total_seats}
						>
							<option value="">Select Total Seats</option>
							<option value={100}>100</option>
							<option value={200}>200</option>
						</select>
						{errors.total_seats && <span className="text-red-500 text-xs">{errors.total_seats}</span>}

					</div>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
					<div>
						<label
							htmlFor="parents-interaction"
							className="block text-xs font-medium text-gray-700 mb-1"
						>
							Parents Interaction
						</label>

						<select
							id="parentsInteraction"
							className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-200"
							onChange={handleInputChange}
							value={formData.parentsInteraction}
						>
							<option value="">Select Interaction</option>
							<option value="Yes">Yes</option>
							<option value="No">No</option>
						</select>
						{errors.parentsInteraction && <span className="text-red-500 text-xs">{errors.parentsInteraction}</span>}

					</div>

					<div>
						<label
							htmlFor="eligibility-marks"
							className="block text-xs font-medium text-gray-700 mb-1"
						>
							Eligibility (Marks)
						</label>

						<select
							id="eligibilityMarks"
							className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-200"
							onChange={handleInputChange}
							value={formData.eligibilityMarks}
						>
							<option value="">Select Marks</option>
							<option value="50">50%</option>
							<option value="60">60%</option>
							<option value="70">70%</option>
							<option value="80">80%</option>
							<option value="90">90%</option>
							<option value="99">99%</option>
						</select>
						{errors.eligibilityMarks && <span className="text-red-500 text-xs">{errors.eligibilityMarks}</span>}

					</div>

					<div>
						<label
							htmlFor="written-test"
							className="block text-xs font-medium text-gray-700 mb-1"
						>
							Written Test
						</label>

						<select
							id="writtenTest"
							className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-200"
							onChange={handleInputChange}
							value={formData.writtenTest}
						>
							<option value="">Select Test</option>
							<option value="online">Online</option>
							<option value="offline">Offline</option>
						</select>
						{errors.writtenTest && <span className="text-red-500 text-xs">{errors.writtenTest}</span>}

					</div>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">

					<div>
						<label
							htmlFor="form-availability"
							className="block text-xs font-medium text-gray-700 mb-1"
						>
							Form Availability
						</label>

						<select
							id="formAvailability"
							className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-200"
							onChange={handleInputChange}
							value={formData.formAvailability}
						>
							<option value="">Select Availability</option>
							<option value="online">Online</option>
							<option value="offline">Offline</option>
						</select>
						{errors.formAvailability && <span className="text-red-500 text-xs">{errors.formAvailability}</span>}

					</div>

					<div>
						<label
							htmlFor="office-timing-from"
							className="block text-xs font-medium text-gray-700 mb-1"
						>
							Office Timing
						</label>
						<div className="flex gap-2">
							<div className="flex flex-col w-full">
								<input
									type="time"
									id="officeTimingFrom"
									className="block w-full border border-gray-300 rounded px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-200"
									onChange={handleInputChange}
									value={formData.officeTimingFrom}
								/>
								{errors.officeTimingFrom && <span className="text-red-500 text-xs">{errors.officeTimingFrom}</span>}

							</div>

							<div className="flex flex-col w-full">
								<input
									type="time"
									id="officeTimingTo"
									className="block w-full border border-gray-300 rounded px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-200"
									onChange={handleInputChange}
									value={formData.officeTimingTo}
								/>
								{errors.officeTimingTo && <span className="text-red-500 text-xs">{errors.officeTimingTo}</span>}
							</div>
						</div>
					</div>

					<div>
						<label
							htmlFor="form-availability"
							className="block text-xs font-medium text-gray-700 mb-1"
						>
							Students Interaction
						</label>

						<select
							id="studentsInteraction"
							className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-200"
							onChange={handleInputChange}
							value={formData.studentsInteraction}
						>
							<option value="">Select Students Interaction</option>
							<option value="online">Online</option>
							<option value="offline">Offline</option>
						</select>
						{errors.studentsInteraction && <span className="text-red-500 text-xs">{errors.studentsInteraction}</span>}

					</div>
				</div>

				<div>
					<label
						htmlFor="formPayment"
						className="block text-xs font-medium text-gray-700 mb-1 mt-4"
					>
						Form Payment
					</label>
					<MultiSelectDropdown
						formData={formData}
						setFormData={setFormData}
						options={formPaymentOptions}
						placeholder="Form Payment"
						fieldKey="formPayment"
					/>
					{errors.formPayment && <span className="text-red-500 text-xs">{errors.formPayment}</span>}

				</div>

				<div>
					<label
						htmlFor="documentsRequired"
						className="block text-xs font-medium text-gray-700 mb-1 mt-4"
					>
						Documents required at the time of Application / Addmission
					</label>
					<MultiSelectDropdown
						formData={formData}
						setFormData={setFormData}
						options={documentOptions}
						placeholder="Documents"
						fieldKey="documentsRequired"
					/>

					{errors.documentsRequired && <span className="text-red-500 text-xs">{errors.documentsRequired}</span>}

				</div>

				{classError && (
					<p className="text-red-600 font-semibold text-xs mb-2 text-left w-full">
						{classError}
					</p>
				)}

				{(branchError) && (
					<p className="text-red-600 text-sm font-semibold mt-2 text-right">
						{branchError}
					</p>
				)}

				<div className={`flex justify-end mt-6 text-xs ${addedClasses?.length == 0 ? 'gap-5' : ''}`}>
					{
						addedClasses?.length == 0 &&
						<div className="flex justify-end gap-5 text-xs">
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
						</div>
					}
					<RoundedButton
						withBackground={false}
						buttonName={isEditMode ? "Update Class" : "+ Add Class"}
						textColor="#2E90FA"
						fontBold={true}
						onClick={isEditMode ? handleUpdateClass : handleAddClass}
					/>
				</div>
			</div>

			{
				addedClasses?.length > 0 &&
				<>
					<div className="flex items-center justify-between m-4">
						<div className="text-xs font-semibold text-darkestNavy">
							Review Addmission Criteria & Eligibility ({currentYear})
						</div>
						<div className="flex items-center gap-2 flex-wrap">
							<span className="text-xs font-medium text-deepBlue">{academicYear}</span>

							<div className="w-fit text-[0.8rem]">
								<SingleSelectCourseBranchDropdown
									optionsData={Object.keys(selectedClassBranchMap)}
									branchMap={selectedClassBranchMap}
									onCourseChange={(course: any) => {
										setSelectedClasses(course);
										const selected = Array.isArray(course) ? course[0] : course;
										setSelectedClass(selected);
										setSelectedBranch("");
									}}
									onBranchChange={(branch: any) => {
										setBranchName(branch);
										const selected = Array.isArray(branch) ? branch[0] : branch;
										setSelectedBranch(selected);

									}}
									classValue={selectedClass}
									branchValue={selectedBranch}
									placeholder="Class"
									key={dropdownResetKey}
								/>
							</div>
						</div>
					</div>

					<div className="bg-white rounded-xl text-sm px-4 pt-7 pb-6 mt-4">
						{
							selectedClass &&
							<>
								<div className="flex items-center justify-between mb-3">
									<p className="text-sm font-semibold">
										Review Addmission Criteria & Eligibility - {selectedClass} {selectedBranch && `(${selectedBranch})`}
									</p>
									<div className="flex items-center gap-1 text-blue-600 cursor-pointer text-xs"
										onClick={handleEditClassData}
									>
										<FiEdit2 />
										<span>Edit</span>
									</div>
								</div>
								<div className="grid grid-cols-5 gap-4 mt-7">
									{tileData.map((tile, index) => (
										<DetailTiles
											key={tile.id || index}
											tileHeading={tile.tileHeading}
											tileDetail={tile.tileDetail}
											height="6.5rem"
											className="text-[0.5rem]"
										/>
									))}
								</div>
							</>
						}
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
						{selectError && (
							<p className="text-red-600 font-semibold text-xs mt-2 text-right w-full">
								{selectError}
							</p>
						)}
					</div>
				</>
			}
		</OnboardingFormTemplate>
	);
};

export default AcademicDetailsForm;
