"use client"

import React, { useState, useEffect } from "react";
import RoundedButton from "../../atom/buttons/RoundedButton";
import OnboardingFormTemplate from "../OnboardingFormTemplate";
import { LiaSave } from "react-icons/lia";
import { FiEdit2 } from "react-icons/fi";
import { FaChevronLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";
import CollegeDropdowns from "./CollegeDropdowns";
import CollegeCourses from "./CollegeCourses";
import FeesBreakupTable from "./FeesBreakupTable";
import SelectButtonRoudedDark from "@/components/atom/buttons/SelectButtonRoudedDark";
import CourseBranchDropdown from "@/components/atom/dropdowns/CourseBranch";
import SingleSelectCourseBranchDropdown from "@/components/atom/dropdowns/SingleSelectCourseBranch";
import SolidButton from "@/components/atom/buttons/SolidButton";
import { getAcademicYear } from "@/utils/helper";
import LoaderTextButton from "@/components/atom/buttons/LoaderTextButton";

const courseBranchMap: { [key: string]: string[] } = {
	"B.Tech": ["CSE", "ECE", "ME", "EE"],
	BBA: ["Finance", "HR", "Marketing"],
	BCA: ["IT", "Data Science"],
	BA: ["English", "History"],
	"B.Com": ["Accounting", "Taxation"],
};

const initialFeeFields = {
	admissionFee: "",
	examFee: "",
	depositFee: "",
	registrationFee: "",
	tuitionFee: "",
	otherFee: "",
	totalYearFee: "",
};

const initialFormData = {
	course: "",
	duration: "",
	exam: "",
	round: "",
	cutoff: "",
	scholarship: "",
	totalFee: "",
	yearlyFee: "",
	eligibility_criteria: "",
	total_seats: "",
	remaining_seats: "",
	eligiblity_cutoff: "",
};

const feeTypes = [
	{ key: "admissionFee", label: "Admission Fees" },
	{ key: "examFee", label: "Exam Fees" },
	{ key: "depositFee", label: "Refundable Deposit" },
	{ key: "registrationFee", label: "Registration Fees" },
	{ key: "tuitionFee", label: "Tuition Fees" },
	{ key: "otherFee", label: "Others" },
	{ key: "totalYearFee", label: "Total All Fees" },
];

const FeesStructureForm = () => {
	const router = useRouter();
	const current_session = getAcademicYear();
	const [loading, setLoading] = useState(false);
	const [skipLoader, setSkipLoader] = useState(false);
	const [feeFormData, setFeeFormData] = useState({ ...initialFormData });
	const [yearlyFees, setYearlyFees] = useState([{ ...initialFeeFields }]);
	const [errors, setErrors] = useState({});
	const [selectedClass, setSelectedClass] = useState("");
	const [branchName, setBranchName] = useState([]);
	const [selectedMultiCourse, setSelectedMultiCourse] = useState([]);
	const [addedClasses, setAddedClasses] = useState<any>([]);
	const [allClassFees, setAllClassFees] = useState({});

	const [selectedSession, setSelectedSession] = useState("2024-2025");
	const [selectedCourse, setSelectedCourse] = useState("");
	const [selectedBranch, setSelectedBranch] = useState("");
	const [yearlyFeeErrors, setYearlyFeeErrors] = useState([]);
	const [classError, setClassError] = useState("");
	const [dropdownResetKey, setDropdownResetKey] = useState(0);

	const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());
	const [isEditMode, setIsEditMode] = useState(false);
	const [classBranchMap, setClassBranchMap] = useState<{ [key: string]: string[] }>({});

	const [grandTotalFee, setGrandTotalFee] = useState(0);
	const [averageTotalFee, setAverageTotalFee] = useState(0);

	const currentYear = new Date().getFullYear();

	useEffect(() => {
		const storedMap = localStorage.getItem("class_branch_map");
		if (storedMap) {
			setClassBranchMap(JSON.parse(storedMap));
		}
	}, [dropdownResetKey]);

	useEffect(() => {
		const storedCollegeData = localStorage.getItem("college-data");

		if (storedCollegeData) {
			const parsedData = JSON.parse(storedCollegeData);

			if (parsedData?.college_fees?.length > 0) {
				const feesData = parsedData.college_fees;
				const courseBranchMap: { [key: string]: string[] } = {};

				feesData.forEach((course: any) => {
					const courseName = course.course_name;
					const branches = Object.keys(course.data || {});
					if (branches.length > 0) {
						courseBranchMap[courseName] = branches;
					}
				});

				setClassBranchMap(courseBranchMap);

				// Set default selected class and branch
				const firstClass = Object.keys(courseBranchMap)[0];
				const firstBranch = courseBranchMap[firstClass][0];

				setSelectedClass(firstClass);
				setSelectedBranch(firstBranch);
				prefillFormData(parsedData, firstClass, firstBranch, false);

				// Get full data of the first course and its first branch
				const matchingCourse: any = parsedData.college_fees.find(
					(course: any) => course.course_name === firstClass
				);

				if (
					matchingCourse &&
					matchingCourse.data &&
					matchingCourse.data[firstBranch]
				) {
					const fullData: any = matchingCourse.data[firstBranch];

					setAddedClasses([
						{
							course_name: firstClass,
							branch_name: firstBranch,
							...fullData, // spreads duration, examination, fee, eligibility, etc.
						},
					]);
				}
			}
		}
	}, []);

	const prefillFormData = (collegeData: any, courseName: any, branchName: any, isEdit = false) => {
		if (!collegeData || !courseName || !branchName) return;

		const course = collegeData?.courses?.find((c: any) => c.course_name === courseName);
		const branchData = course?.data?.[branchName];

		if (!branchData) return;

		const { duration, examination, fee, eligibility } = branchData;

		const updatedFormData = {
			course: courseName,
			duration: duration || "",
			exam: examination || "",
			round: fee?.round?.toString() || "",
			cutoff: fee?.cutoff || "",
			scholarship: fee?.scholarship || "",
			eligibility_criteria: eligibility?.eligibility_criteria || "",
			total_seats: eligibility?.total_seats?.toString() || "",
			remaining_seats: eligibility?.remaining_seats?.toString() || "",
			eligiblity_cutoff: eligibility?.cutoff || "",
			totalFee: isEdit ? fee?.total_fee || "" : "",
			yearlyFee: isEdit ? fee?.yearly_fee || "" : "",
		};

		setFeeFormData(updatedFormData);
	};

	const resetForm = () => {
		setFeeFormData({ ...initialFormData });
		setYearlyFees([{ ...initialFeeFields }]);
		setBranchName([]);
		setSelectedMultiCourse([]);
		setDropdownResetKey((prev) => prev + 1);
	};

	const handleAddYear = () => {
		setYearlyFees((prev) => [...prev, { ...initialFeeFields }]);
	};

	const handlePreviousPage = () => {
		router.push("/onboarding-college");
	};

	const handleAddClass = () => {
		setClassError("");

		if (!selectedMultiCourse.length) return setClassError("Please select at least one class before adding.");
		if (!Object.keys(feeFormData).length) return setClassError("Please fill the fee form before adding a class.");

		const existingFees = JSON.parse(localStorage.getItem("college-fees") || "{}");
		const existingCourseFees = JSON.parse(localStorage.getItem("college_course_fees") || "{}");
		const prevCourseFees = existingCourseFees?.college_fees || [];
		const prevFees = existingFees?.courses || [];

		const branchDetails = {
			duration: feeFormData.duration,
			examination: feeFormData.exam,
			fee: {
				round: Number(feeFormData.round),
				cutoff: feeFormData.cutoff,
				scholarship: feeFormData.scholarship,
				total_fee: feeFormData.totalFee,
				yearly_fee: feeFormData.yearlyFee,
			},
			eligibility: {
				eligibility_criteria: feeFormData.eligibility_criteria,
				cutoff: feeFormData.eligiblity_cutoff,
				total_seats: Number(feeFormData.total_seats),
				remaining_seats: Number(feeFormData.remaining_seats),
			},
		};

		const finalCourseData: any = selectedMultiCourse.map((courseName: any) => {
			const data: { [key: string]: any } = {};
			branchName.forEach((branch: any) => (data[branch] = branchDetails));
			return { course_name: courseName, data };
		});

		const yearHeaders = yearlyFees.map((_, idx) => `Year ${idx + 1}`);
		const gridHeader = ["Fees", ...yearHeaders];

		const structuredCollegeFees: any = {};
		selectedMultiCourse.forEach((courseName) => {
			structuredCollegeFees[courseName] = structuredCollegeFees[courseName] || {};
			branchName.forEach((branch) => {
				let grandTotal = 0;
				const grid_data = [gridHeader];

				feeTypes.forEach(({ key, label }) => {
					const row = [label];
					yearlyFees.forEach((year: any) => {
						const amount = parseInt((year[key] || "0").replace(/[^\d]/g, ""));
						if (key === "totalYearFee") grandTotal += amount;
						row.push(`₹${amount.toLocaleString()}`);
					});
					grid_data.push(row);
				});

				structuredCollegeFees[courseName][branch] = {
					grand_total: grandTotal,
					rows: grid_data.length,
					columns: grid_data[0]?.length || 0,
					grid_data,
				};
			});
		});

		const finalCollegeFeeStructure = {
			college_fees: Object.entries(structuredCollegeFees).map(([course_name, data]) => ({ course_name, data })),
		};

		finalCollegeFeeStructure.college_fees.forEach((newCourse: any) => {
			const index = prevCourseFees.findIndex((c: any) => c.course_name === newCourse.course_name);
			if (index > -1) {
				prevCourseFees[index].data = { ...prevCourseFees[index].data, ...newCourse.data };
			} else {
				prevCourseFees.push(newCourse);
			}
		});

		localStorage.setItem("college_course_fees", JSON.stringify({ college_fees: prevCourseFees }));
		const collegeData = { courses: [...prevFees, ...finalCourseData] };
		localStorage.setItem("college-classes", JSON.stringify([...new Set([...addedClasses, ...selectedMultiCourse])]));
		localStorage.setItem("college-fees", JSON.stringify(collegeData));

		setAllClassFees((prev) => ({ ...prev, ...collegeData }));
		setAddedClasses((prev: any) => [...new Set([...prev, ...selectedMultiCourse])]);
		const firstNewClass = selectedMultiCourse?.[0];
		const firstNewBranch = branchName?.[0];

		const courseBranchMap = JSON.parse(localStorage.getItem("class_branch_map") || "{}");

		selectedMultiCourse.forEach((courseName: string) => {
			if (!courseBranchMap[courseName]) {
				courseBranchMap[courseName] = [];
			}
			branchName.forEach((branch: string) => {
				if (!courseBranchMap[courseName].includes(branch)) {
					courseBranchMap[courseName].push(branch);
				}
			});
		});

		localStorage.setItem("class_branch_map", JSON.stringify(courseBranchMap));
		resetForm()
		setTimeout(() => {
			setSelectedClass(firstNewClass);    // will preselect this in dropdown
			if (branchName && branchName.length > 0) {
				setSelectedBranch(firstNewBranch || "");
			}
		}, 0);
	};

	const validateForm = () => {
		const newErrors: any = {};
		const newYearlyErrors: any = [];

		if (!feeFormData.course.trim()) newErrors.course = "Course Name is required";
		if (!feeFormData.duration.trim()) newErrors.duration = "Duration is required";
		if (!feeFormData.exam.trim()) newErrors.exam = "Examination is required";
		if (!feeFormData.round.trim()) newErrors.round = "Round is required";
		if (!feeFormData.cutoff.trim()) newErrors.cutoff = "Cut Off is required";
		if (!feeFormData.scholarship.trim()) newErrors.scholarship = "Scholarship is required";
		if (!feeFormData.totalFee.trim()) newErrors.totalFee = "Total Fee is required";
		if (!feeFormData.yearlyFee.trim()) newErrors.yearlyFee = "Yearly Fee is required";
		if (!feeFormData.eligibility_criteria.trim()) newErrors.eligibility_criteria = "Eligiblity Criteria is required";
		if (!feeFormData.total_seats.trim()) newErrors.total_seats = "Total Seats is required";
		if (!feeFormData.remaining_seats.trim()) newErrors.remaining_seats = "Remaining Seats is required";
		if (!feeFormData.eligiblity_cutoff.trim()) newErrors.eligiblity_cutoff = "CuttOff is required";

		// Validate yearly fees
		const yearlyFeesArray = Array.isArray(yearlyFees)
			? yearlyFees
			: Object.keys(yearlyFees)
				.filter((key) => !isNaN(Number(key)))
				.map((key) => yearlyFees[key]);
		yearlyFeesArray?.forEach((year, index) => {
			const yearErrors: { [key: string]: string } = {};
			if (!year.admissionFee.trim()) yearErrors.admissionFee = "Admission Fee is required";
			if (!year.examFee.trim()) yearErrors.examFee = "Exam Fee is required";
			if (!year.depositFee.trim()) yearErrors.depositFee = "Refundable Deposits is required";
			if (!year.registrationFee.trim()) yearErrors.registrationFee = "Registration Fee is required";
			if (!year.tuitionFee.trim()) yearErrors.tuitionFee = "Tuition Fee is required";
			if (!year.otherFee.trim()) yearErrors.otherFee = "Other Fee is required";
			if (!year.totalYearFee.trim()) yearErrors.totalYearFee = "Total Fee is required";

			newYearlyErrors[index] = yearErrors;
		});

		setErrors(newErrors);
		setYearlyFeeErrors(newYearlyErrors);

		const hasFormErrors = Object.keys(newErrors).length > 0;
		const hasYearlyErrors = newYearlyErrors.some((errObj: any) => Object.keys(errObj).length > 0);

		return !(hasFormErrors || hasYearlyErrors);
	};

	const handleSkip = () => {
		setSkipLoader(true);
		setTimeout(() => {
			try {
				router.push("/onboarding-college/result-display");
			} catch (error) {
				console.error("FeesStructureForm-349, Navigation error:", error);
				setSkipLoader(false);
			}
		}, 0);
	};

	const handleContinue = () => {
		const collegeFeesRaw = JSON.parse(localStorage.getItem("college-fees") || "{}");
		const existingData = JSON.parse(localStorage.getItem("college-data") || "{}");
		const collegeCourseRaw = JSON.parse(localStorage.getItem("college_course_fees") || "{}");
		const hasCollegeFees = collegeFeesRaw && Object.keys(collegeFeesRaw).length > 0;
		const hasCollegeCourse = collegeCourseRaw && Object.keys(collegeCourseRaw).length > 0;

		const isValid = validateForm();
		if (!hasCollegeCourse && !hasCollegeFees && !isValid) {
			setLoading(false)
			return; // stop here if errors
		}
		setErrors({})
		setYearlyFeeErrors([])
		setLoading(true)
		try {
			const updatedData = {
				...existingData,
				...collegeFeesRaw,
				...collegeCourseRaw
			};

			localStorage.setItem("college-data", JSON.stringify(updatedData));
			setTimeout(() => {
				router.push("/onboarding-college/result-display");
				setLoading(false)
			}, 400)
		} catch {
			setLoading(false)
		}
	};

	const handleEditClassData = () => {
		const storedFees = JSON.parse(localStorage.getItem("college_course_fees") || "{}");
		const courses = storedFees?.college_fees || [];

		const selectedCourse = courses.find(
			(course: any) => course.course_name === selectedClass
		);

		if (selectedCourse && selectedCourse.data && selectedBranch) {
			const branchData = selectedCourse.data[selectedBranch];

			if (branchData && Array.isArray(branchData.grid_data)) {
				const [headers, ...rows] = branchData.grid_data;

				const numberOfYears = headers.length - 1; // exclude "Fees" column

				const feeLabels = [
					"admissionFee",
					"examFee",
					"depositFee",
					"registrationFee",
					"tuitionFee",
					"otherFee",
					"totalYearFee"
				];

				const yearlyFeesList = [];

				for (let yearIndex = 1; yearIndex <= numberOfYears; yearIndex++) {
					const yearlyData: any = { ...initialFeeFields };

					rows.forEach((row: any, i: any) => {
						const value = row[yearIndex] || "";
						const cleanedValue = value.toString().replace(/[^0-9.]/g, ""); // ✅ remove ₹, commas, etc.
						yearlyData[feeLabels[i]] = cleanedValue;
					});

					yearlyFeesList.push(yearlyData);
				}

				setIsEditMode(true);
				setYearlyFees(yearlyFeesList);
			} else {
				console.warn("No grid_data found for selected branch");
			}
		} else {
			console.warn("No data found for selected class or branch");
		}
	};

	const handleUpdateClass = () => {
		const storedFees = JSON.parse(localStorage.getItem("college_course_fees") || "{}");
		const courses = storedFees?.college_fees || [];

		const courseIndex = courses.findIndex((c: any) => c.course_name === selectedClass);
		if (courseIndex === -1 || !selectedBranch) return;

		const headers = ["Fees", ...yearlyFees.map((_, i) => `Year ${i + 1}`)];
		const feeMap = {
			"Admission Fees": "admissionFee",
			"Exam Fees": "examFee",
			"Refundable Deposit": "depositFee",
			"Registration Fees": "registrationFee",
			"Tuition Fees": "tuitionFee",
			"Others": "otherFee",
			"Total All Fees": "totalYearFee"
		};

		const grid_data = [headers, ...Object.entries(feeMap).map(
			([label, key]) => [label, ...yearlyFees.map((fee: any) => fee[key] || "").map(value => value.toString().replace(/[^0-9.]/g, ""))]
		)];

		// Calculate the grand total (last row, excluding the label)
		const lastRow = grid_data[grid_data.length - 1]; // Total row
		const grandTotal = lastRow.slice(1).reduce((sum, val) => {
			const numericValue = parseFloat(val.replace(/[^0-9.]/g, "")); // Strip non-numeric characters (like ₹, commas)
			return sum + (isNaN(numericValue) ? 0 : numericValue); // Add to sum if valid number
		}, 0);

		// Update data in the selected course/branch
		courses[courseIndex].data[selectedBranch] = {
			grid_data,
			rows: grid_data.length,
			columns: headers.length,
			grand_total: grandTotal
		};

		localStorage.setItem("college_course_fees", JSON.stringify({ college_fees: courses }));
		setYearlyFees([{ ...initialFeeFields }])
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
						Add College
					</h4>
					<hr className="border-t border-gray-300" />
				</div>
				<div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
					<h5 className="text-xs font-bold mt-5">Courses</h5>
					<div className="flex items-center gap-2 flex-wrap mt-5">
						{/* <div className="w-10 h-10 flex items-center justify-center cursor-pointer">
							<LiaSave />
						</div> */}

						<div className="w-fit text-[0.8rem]">
							<div className="flex flex-col md:flex-row gap-4 items-start w-full">
								<SolidButton buttonName={current_session} />
								{/* <SingleSelectCourseBranchDropdown
									key={dropdownResetKey}
									optionsData={Object.keys(courseBranchMap)}
									branchMap={courseBranchMap}
									onCourseChange={(course: any) => setSelectedMultiCourse(course)}
									onBranchChange={(branch: any) => setBranchName(branch)}
								/> */}
								<CourseBranchDropdown
									onCourseChange={(course: any) => setSelectedMultiCourse(course)}
									onBranchChange={(branch: any) => setBranchName(branch)}
									optionsData={Object.keys(courseBranchMap)}
									key={dropdownResetKey}
								/>
							</div>
						</div>
					</div>
				</div>

				<CollegeCourses
					formData={feeFormData}
					setFormData={setFeeFormData}
					yearlyFee={yearlyFees}
					setYearlyFee={setYearlyFees}
					handleAddYear={handleAddYear}
					errors={errors}
					setErrors={setErrors}
					yearlyFeeErrors={yearlyFeeErrors}
					setYearlyFeeErrors={setYearlyFeeErrors}
					grandTotalFee={grandTotalFee}
					averageTotalFee={averageTotalFee}
					setGrandTotalFee={setGrandTotalFee}
					setAverageTotalFee={setAverageTotalFee}
				/>

				<div className={`flex justify-end mt-6 text-xs ${addedClasses?.length == 0 ? 'gap-5' : ''}`}>
					{
						addedClasses?.length == 0 &&
						<div className="flex justify-end gap-5 text-xs">
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
				{classError && (
					<p className="text-red-500 text-xs mb-2 text-right w-full">
						{classError}
					</p>
				)}
			</div>

			{
				addedClasses?.length > 0 &&
				<>
					<div className="flex items-center justify-between m-4">
						<div className="text-xs font-semibold text-darkBlue">
							Fee Structure ({selectedSession})
						</div>
						<div className="w-fit text-[0.8rem]">

							<SingleSelectCourseBranchDropdown
								optionsData={Object.keys(classBranchMap)}
								branchMap={classBranchMap}
								onCourseChange={(course: any) => {
									setSelectedMultiCourse(course);
									const selected = Array.isArray(course) ? course[0] : course;
									setSelectedClass(selected);
									setSelectedBranch("");
								}}
								onBranchChange={(branch: any) => {
									setBranchName(branch);
									const selected = Array.isArray(branch) ? branch[0] : branch;
									setSelectedBranch(selected); // holds only single string

								}}
								classValue={selectedClass}
								branchValue={selectedBranch}
								key={dropdownResetKey}
							/>
						</div>
					</div>

					<div className="bg-white rounded-xl text-sm px-4 pt-3 pb-3 mt-4">
						{
							selectedMultiCourse &&
							<>
								<div className="flex items-center justify-between mb-0">
									<p className="text-xl font-semibold">Fees Breakup</p>
									<div className="flex items-center gap-1 text-blue-600 cursor-pointer text-xs" onClick={handleEditClassData}>
										<FiEdit2 />
										<span>Edit</span>
									</div>
								</div>

								<div className="mt-3">
									<FeesBreakupTable selectedClass={selectedClass} selectedBranch={selectedBranch} />
								</div>
							</>
						}

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
					</div>
				</>
			}


		</OnboardingFormTemplate>
	);
};

export default FeesStructureForm;
