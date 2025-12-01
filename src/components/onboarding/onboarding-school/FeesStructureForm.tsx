"use client";

import React, { useEffect, useState } from "react";
import { LiaSave } from "react-icons/lia";
import { FiEdit2 } from "react-icons/fi";
import { FaChevronLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { isValidNumber } from "@/utils/regexValidations";
import OnboardingFormTemplate from "../OnboardingFormTemplate";
import RoundedButton from "@/components/atom/buttons/RoundedButton";
import { calculateMonthlyAverageFees } from "@/utils/calculateAverage";
import ClassBranchDropdown from "@/components/atom/dropdowns/ClassBranch";
import SingleSelectCourseBranchDropdown from "@/components/atom/dropdowns/SingleSelectCourseBranch";
import LoaderTextButton from "@/components/atom/buttons/LoaderTextButton";
import { getFormattedClassData } from "@/utils/parseFeeData";

const classCourseBranchMap: { [key: string]: string[] | null } = {

	"Nursery": [],
	"LKG": [],
	"UKG": [],
	"Class 1": [],
	"Class 2": [],
	"Class 3": [],
	"Class 4": [],
	"Class 5": [],
	"Class 6": [],
	"Class 7": [],
	"Class 8": [],
	"Class 9": [],
	"Class 10": [],
	"Class 11": ["PCM", "PCB", "Commerce", "Arts"],
	"Class 12": ["PCM", "PCB", "Commerce", "Arts"],
};

const FeesStructureForm = () => {
	const currentYear = new Date().getFullYear();
	const [loading, setLoading] = useState(false);
	const [skipLoader, setSkipLoader] = useState(false);
	const [selectedClass, setSelectedClass] = useState<string>("");
	const [selectedBranch, setSelectedBranch] = useState<string>("");
	const [selectedClasses, setSelectedClasses] = useState<string[]>([]);
	const [branchName, setBranchName] = useState<string[]>([]);
	const [feeFormData, setFeeFormData] = useState<{ [key: string]: string }>({});
	const [errors, setErrors] = useState<{ [key: string]: string }>({});
	const [addedClasses, setAddedClasses] = useState<string[]>([]);
	const [allClassFees, setAllClassFees] = useState<{ [key: string]: any }>({});
	const [isEditMode, setIsEditMode] = useState(false);
	const [editClassName, setEditClassName] = useState("");
	const [classError, setClassError] = useState<string>("");
	const [totalAdmissionCost, setTotalAdmissionCost] = useState(0);
	const [averageMonthlyCost, setAverageMonthlyCost] = useState(0);
	const [classBranchMap, setClassBranchMap] = useState<{ [key: string]: string[] }>({});
	const [dropdownResetKey, setDropdownResetKey] = useState(0);
	const [branchError, setBranchError] = React.useState("");

	const router = useRouter();

	useEffect(() => {
		const storedMap = localStorage.getItem("class_branch_map");
		if (storedMap) {
			setClassBranchMap(JSON.parse(storedMap));
		}
	}, [dropdownResetKey]);

	useEffect(() => {
		const schoolData = localStorage.getItem("school-data");

		if (schoolData) {
			const parsedData = JSON.parse(schoolData);

			if (parsedData?.fees?.data) {
				const feesData = parsedData.fees.data;
				const formattedClasses: any = {};
				const courseBranchMap: { [key: string]: string[] } = {};

				Object.entries(feesData).forEach(([className, branches]: any) => {
					const branchNames = Object.keys(branches || {});

					if (branchNames.length === 1 && branchNames[0] === className) {
						// No branches
						courseBranchMap[className] = [];
						formattedClasses[className] = {
							[className]: branches[className],
						};
					} else {
						// Has branches
						courseBranchMap[className] = branchNames;
						formattedClasses[className] = {};

						branchNames.forEach((branch) => {
							formattedClasses[className][branch] = branches[branch];
						});
					}
				});

				setClassBranchMap(courseBranchMap);

				const firstClass = Object.keys(courseBranchMap)[0];
				const firstBranch = courseBranchMap[firstClass]?.[0] || "";

				setSelectedClass(firstClass);
				setSelectedBranch(firstBranch);

				// Extract only the fees array and set it
				const singleClassData: any =
					courseBranchMap[firstClass].length === 0
						? formattedClasses[firstClass][firstClass]
						: formattedClasses[firstClass][firstBranch];

				const feesArray = singleClassData?.fees || [];
				setAddedClasses(feesArray);
				setAllClassFees(feesData);
			}
		}
	}, []);

	const handleSelection = (cls: string[], branch: string[]) => {
		setBranchError(""); // Reset error initially

		// Separate "Class X" items from others
		const classItems = cls.filter(name => name.toLowerCase().includes("class"));
		const otherItems = cls.filter(name => !name.toLowerCase().includes("class"));

		// Sort only the "Class X" items
		const sortedClassItems = classItems.sort((a, b) => {
			const numA = parseInt(a.replace(/[^\d]/g, ""), 10);
			const numB = parseInt(b.replace(/[^\d]/g, ""), 10);
			return numA - numB;
		});

		// Combine sorted "Class X" + unsorted others
		const finalSorted = [...sortedClassItems, ...otherItems];

		setSelectedClasses(finalSorted);
		setBranchName(branch);

		// Check for invalid mix of class types
		const hasBranch = finalSorted.some((className) => classCourseBranchMap[className]?.length);
		const hasNoBranch = finalSorted.some((className) => !classCourseBranchMap[className]?.length);

		if (hasBranch && hasNoBranch) {
			setBranchError("You can't proceed with both branched and non-branched classes selected.");
			setSelectedClasses([]); // Clear invalid selection
			setBranchName([]); // Clear branches too
		}
	};

	const feeFields = [
		{ id: "registration-fees", label: "Registration Fees", type: "text" },
		{ id: "registration-frequency", label: "Frequency of Registration Fees", type: "select" },
		{ id: "admission-fees", label: "Admission Fees", type: "text" },
		{ id: "admission-frequency", label: "Frequency of Admission Fees", type: "select" },
		{ id: "transportation-fees", label: "Transportation Fees", type: "text" },
		{ id: "transportation-frequency", label: "Frequency of Transportation Fees", type: "select" },
		{ id: "tuition-fees", label: "Academic Fees", type: "text" },
		{ id: "tuition-frequency", label: "Frequency of Academic Fees", type: "select" },
		{ id: "application-fees", label: "Application Fees", type: "text" },
		{ id: "application-frequency", label: "Frequency of Application Fees", type: "select" },
		{ id: "misc-fees", label: "Other Misc Fees", type: "text" },
		{ id: "misc-frequency", label: "Frequency of Misc Fees", type: "select" },
	];

	useEffect(() => {
		localStorage.removeItem("school-fees")
	}, []);

	useEffect(() => {
		const average = calculateMonthlyAverageFees(feeFormData, feeFields, setFeeFormData);
		setAverageMonthlyCost(average);
	}, [feeFormData, feeFields]);

	const handleCheckboxChange = (feeTypeId: string) => {
		setFeeFormData((prev: any) => ({
			...prev,
			[`${feeTypeId}_checkbox`]: !prev[`${feeTypeId}_checkbox`],
		}));
	};

	useEffect(() => {
		setTotalAdmissionCost(calculateTotalAdmissionCost());
	}, [feeFormData]);

	const calculateTotalAdmissionCost = () => {
		let total = 0;
		const excludedKeys = ["transportation-fees", "total_cost_of_admission", "monthly_cost"];

		for (const key in feeFormData) {
			if (
				key.endsWith("-fees") &&
				feeFormData[key] &&
				!excludedKeys.includes(key)
			) {
				const value = parseFloat(feeFormData[key]);
				if (!isNaN(value)) {
					total += value;
				}
			}
		}
		return total;
	};

	const handlePreviousPage = () => {
		localStorage.removeItem("school-fees")
		router.push("/onboarding-school");
	}

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { id, value } = e.target;
		setFeeFormData((prev) => ({ ...prev, [id]: value }));

		const field = feeFields.find((f) => f.id === id);
		if (field) {
			const type = field.type;

			setErrors((prev) => {
				const updated = { ...prev };

				if (value.trim() === "") {
					updated[id] = `${field?.label} is required`;
				} else if (type === "text" && !isValidNumber(value)) {
					updated[id] = `${field?.label} must be a valid number`;
				} else {
					delete updated[id]; // Remove error if value is valid
				}

				return updated;
			});
		}
	};

	const validateFields = () => {
		let isValid = true;
		const newErrors: { [key: string]: string } = {};
		Object.entries(feeFormData).forEach(([key, value]) => {
			if (typeof value === "string" && value.trim() === "") {
				newErrors[key] = "This field is required.";
				isValid = false;
			}
		});

		setErrors(newErrors);
		return isValid;
	};

	const handleContinue = async () => {
		const schoolFeesRaw = JSON.parse(localStorage.getItem("school-fees") || "{}");
		const storedData = JSON.parse(localStorage.getItem("school-data") || "{}");
		const hasSchoolFees = schoolFeesRaw && Object.keys(schoolFeesRaw).length > 0;

		// Only run validateFields if no school-fees data
		if (!hasSchoolFees && !validateFields()) return;
		setLoading(true)
		try {

			const updatedData = {
				...storedData,
				...schoolFeesRaw,
			};
			localStorage.setItem("school-data", JSON.stringify(updatedData));
			setTimeout(() => {
				router.push("/onboarding-school/academic-details")
				setLoading(false)
			}, 400)
		} catch {
			setLoading(false)
		} finally {
			setLoading(false);
		}
	};

	const handleSkip = () => {
		setSkipLoader(true);
		setTimeout(() => {
			try {
				router.push("/onboarding-school/academic-details");
			} catch (error) {
				console.error("Navigation error:", error);
				setSkipLoader(false);
			}
		}, 0);
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

		if (!validateFields()) return;

		const storedData = JSON.parse(localStorage.getItem("school-fees") || "{}");
		const yearKey = `${currentYear}`;

		const newFeesData = selectedClasses?.reduce((acc, className) => {
			if (addedClasses?.includes(className)) {
				return acc;
			}
			// Get selected branches for this class
			const hasBranch = Array.isArray(branchName) && branchName.length > 0;
			const selectedBranches = hasBranch ? branchName : [className];

			// Add branches or class (if no branch) under className
			acc[className] = {};

			selectedBranches.forEach((branch) => {
				// Extract fee values
				const tuition = Number(feeFormData["tuition-fees"] || 0);
				const registration = Number(feeFormData["registration-fees"] || 0);
				const admission = Number(feeFormData["admission-fees"] || 0);
				const transportation = Number(feeFormData["transportation-fees"] || 0);
				const application = Number(feeFormData["application-fees"] || 0);
				const misc = Number(feeFormData["misc-fees"] || 0);

				// Calculate total cost (including transportation)
				const totalCostOfAdmission = tuition + registration + admission + transportation + application + misc;

				// Calculate average monthly fee (excluding transportation)
				const totalExcludingTransport = tuition + registration + admission + application + misc;
				const averageMonthlyCost = Math.round(totalExcludingTransport / 11);

				acc[className][branch] = {
					total_cost_of_admission: totalCostOfAdmission,
					monthly_cost: averageMonthlyCost,
					year: yearKey,
					fees: [
						{ fees_type: "Tuition", fees_value: tuition, fees_frequency: feeFormData["tuition-frequency"] || "Onetime" },
						{ fees_type: "Registration", fees_value: registration, fees_frequency: feeFormData["registration-frequency"] || "Onetime" },
						{ fees_type: "Admission", fees_value: admission, fees_frequency: feeFormData["admission-frequency"] || "Annually" },
						{ fees_type: "Transportation", fees_value: transportation, fees_frequency: feeFormData["transportation-frequency"] || "Onetime" },
						{ fees_type: "Application", fees_value: application, fees_frequency: feeFormData["application-frequency"] || "Once" },
						{ fees_type: "Misc", fees_value: misc, fees_frequency: feeFormData["misc-frequency"] || "Annually" },
					],
				};
			});
			return acc;
		}, {} as { [key: string]: any });

		const updatedAllClassFees = {
			...allClassFees,
			...newFeesData,
		};
		const addClasses = [...new Set([...addedClasses, ...selectedClasses])];
		setAllClassFees(updatedAllClassFees);
		setAddedClasses((prev) => [...new Set([...prev, ...selectedClasses])]);

		const firstNewClass = selectedClasses?.[0];
		const firstNewBranch = branchName?.[0];
		localStorage.setItem("school-classes", JSON.stringify(addClasses))

		const courseBranchMap = JSON.parse(localStorage.getItem("class_branch_map") || "{}");

		selectedClasses.forEach((courseName: string) => {
			if (!courseBranchMap[courseName]) {
				courseBranchMap[courseName] = [];
			}
			if (Array.isArray(branchName)) {
				branchName.forEach((branch: string) => {
					if (!courseBranchMap[courseName].includes(branch)) {
						courseBranchMap[courseName].push(branch);
					}
				});
			}
		})

		localStorage.setItem("class_branch_map", JSON.stringify(courseBranchMap));

		// Save to localStorage immediately
		const updatedStoredData = {
			...storedData,
			average_fee: averageMonthlyCost,
			fees: {
				...storedData.fees,
				year: yearKey,
				data: updatedAllClassFees
			},
		};
		localStorage.setItem("school-fees", JSON.stringify(updatedStoredData));

		setSelectedClasses([]);
		setSelectedClass("");
		setBranchName([]);
		setSelectedBranch("");
		setFeeFormData({});
		setErrors({});

		// Trigger dropdown reset
		setDropdownResetKey((prev) => prev + 1);
		setTimeout(() => {
			setSelectedClass(firstNewClass);    // will preselect this in dropdown
			if (branchName && branchName.length > 0) {
				setSelectedBranch(firstNewBranch || "");
			}
		}, 0);
	};

	//edit 
	const handleEditClassData = () => {
		const storedFees =
			JSON.parse(localStorage.getItem("school-fees") || "null") ??
			JSON.parse(localStorage.getItem("school-data") || "null") ??
			{};

		if (!selectedClass) return;

		const classData = storedFees?.fees?.data?.[selectedClass];
		const selectedData = selectedBranch && classData?.[selectedBranch] ? classData[selectedBranch] : classData?.[selectedClass];

		const updatedData: Record<string, string> = {};

		selectedData?.fees?.forEach((fee: any) => {
			const type = fee.fees_type.toLowerCase();
			const valueKey = `${type}-fees`; // e.g., 'registration-fees'
			const freqKey = `${type}-frequency`; // e.g., 'registration-frequency'

			updatedData[valueKey] = fee.fees_value;
			updatedData[freqKey] = fee.fees_frequency;
		});

		setFeeFormData(updatedData);
		setEditClassName(selectedClass);
		setIsEditMode(true);
	};

	//update
	const handleUpdateClass = () => {
		if (!selectedClass) {
			setClassError("Please select a class to update.");
			return;
		}

		if (!validateFields()) return;

		const yearKey = `${currentYear}`;

		const updatedClassFees = {
			total_cost_of_admission: totalAdmissionCost || 0,
			monthly_cost: averageMonthlyCost || 0,
			year: yearKey,
			fees: [
				{ fees_type: "Tuition", fees_value: Number(feeFormData["tuition-fees"]) || 0, fees_frequency: feeFormData["tuition-frequency"] || "Onetime" },
				{ fees_type: "Registration", fees_value: Number(feeFormData["registration-fees"]) || 0, fees_frequency: feeFormData["registration-frequency"] || "Onetime" },
				{ fees_type: "Admission", fees_value: Number(feeFormData["admission-fees"]) || 0, fees_frequency: feeFormData["admission-frequency"] || "Annually" },
				{ fees_type: "Transportation", fees_value: Number(feeFormData["transportation-fees"]) || 0, fees_frequency: feeFormData["transportation-frequency"] || "Onetime" },
				{ fees_type: "Application", fees_value: Number(feeFormData["application-fees"]) || 0, fees_frequency: feeFormData["application-frequency"] || "Once" },
				{ fees_type: "Misc", fees_value: Number(feeFormData["misc-fees"]) || 0, fees_frequency: feeFormData["misc-frequency"] || "Annually" },
			],
		};

		let schoolData: any = {};
		let schoolFeesFallback: any = {};

		try {
			const raw = localStorage.getItem("school-data");
			schoolData = raw && raw.trim() !== "" ? JSON.parse(raw) : {};
		} catch (err) {
			console.error("Error parsing school-data from localStorage:", err);
			schoolData = {};
		}

		try {
			const rawFees = localStorage.getItem("school-fees");
			schoolFeesFallback = rawFees && rawFees.trim() !== "" ? JSON.parse(rawFees) : {};
		} catch (err) {
			console.error("Error parsing school-fees from localStorage:", err);
			schoolFeesFallback = {};
		}
		// STEP 2: Extract or initialize fees object
		const existingFeesData =
			schoolData?.fees?.data ||
			schoolFeesFallback?.fees?.data ||
			{};

		let updatedFeesData = { ...existingFeesData };

		if (selectedBranch) {
			updatedFeesData[selectedClass] = {
				...(existingFeesData[selectedClass] || {}),
				[selectedBranch]: updatedClassFees,
			};
		} else {
			updatedFeesData[selectedClass] = {
				...((existingFeesData[selectedClass] && existingFeesData[selectedClass][selectedClass])
					? existingFeesData[selectedClass]
					: {}),
				[selectedClass]: updatedClassFees,
			};
		}

		const updatedSchoolData = {
			...schoolData,
			fees: {
				year: yearKey,
				data: updatedFeesData,
			},
		};

		// STEP 4: Save back to localStorage
		localStorage.setItem("school-data", JSON.stringify(updatedSchoolData));

		// Step 5: Update UI states
		setAllClassFees(updatedFeesData);
		setSelectedClass("");
		setTimeout(() => {
			setSelectedClass(selectedClass);
		}, 0);
		setClassError("");
		setFeeFormData({});
		setErrors({});
		setIsEditMode(false);
	};

	return (
		<OnboardingFormTemplate>
			<div className="w-full p-4 text-deepBlue bg-white rounded-xl">
				<div className="w-full text-deepBlue">
					<h4 className="text-md lg:text-[0.9rem] font-semibold text-left">Add School</h4>
					<hr className="border-t border-gray-300" />
				</div>

				{/* Error message at the top, visible clearly */}
				{(branchError) && (
					<p className="text-red-600 text-sm font-semibold mt-2 text-right">
						{branchError}
					</p>
				)}

				<div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
					<h5 className="text-xs font-bold mt-5">Fee Structure</h5>
					<div className="flex items-center gap-2 flex-wrap mt-5">
						<div className="w-10 h-10 flex-box-center cursor-pointer">
							<LiaSave />
						</div>
						<span className="text-xs font-medium text-deepBlue">{currentYear}-{currentYear + 1}</span>
						<div className="w-fit text-[0.8rem]">
							<ClassBranchDropdown
								optionsData={classCourseBranchMap}
								onSelectionChange={handleSelection}
								disableBranchDropdown={!!branchError}
								key={dropdownResetKey}
							/>
						</div>
					</div>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					{feeFields?.map((field) => (
						<div key={field?.id}>
							<label htmlFor={field?.id} className="block text-[0.7rem] font-medium">
								{field?.label}
							</label>
							{
								feeFields?.length == 1 &&
								<label htmlFor={field?.id} className="block text-[0.7rem] font-medium">
									Cal. Avg
								</label>
							}

							{field?.type === "select" ? (
								<div className="flex item-center gap-2">
									<div className="w-[calc(100%-2.5rem)]">
										<select
											id={field?.id}
											value={feeFormData[field?.id] || ""}
											onChange={handleInputChange}
											className={`mt-1 block w-full border rounded px-3 py-2 text-xs focus:outline-none focus:ring-2 ${errors[field?.id] ? "border-red-500" : "border-gray-300 focus:ring-blue-200"
												}`}
										>
											<option value="">Select frequency</option>
											<option value="onetime">Onetime</option>
											<option value="quarterly">Quarterly</option>
											<option value="annually">Annually</option>
										</select>
									</div>

									<div className="w-10 mt-2 flex items-center justify-center">
										{!field?.id.includes("transportation") && (
											<div className="inline-flex items-center mt-2">

												<label className="flex items-center cursor-pointer relative">
													<input
														type="checkbox"
														id={`checkbox-${field?.id}`}
														checked={Boolean(feeFormData?.[`${field?.id.replace("-frequency", "-fees")}_checkbox`])}
														onChange={() =>
															handleCheckboxChange(field.id.replace("-frequency", "-fees"))
														}
														className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-slate-800 checked:border-slate-800"
													/>
													<span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
														<svg
															xmlns="http://www.w3.org/2000/svg"
															className="h-3.5 w-3.5"
															viewBox="0 0 20 20"
															fill="currentColor"
															stroke="currentColor"
															strokeWidth="1"
														>
															<path
																fillRule="evenodd"
																d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
																clipRule="evenodd"
															/>
														</svg>
													</span>
												</label>
											</div>

										)}
									</div>
								</div>
							) : (
								<div className="relative">
									<input
										id={field?.id}
										type="text"
										placeholder={`Enter ${field?.label.toLowerCase()}`}
										value={feeFormData[field?.id] || ""}
										onChange={handleInputChange}
										className={`mt-1 block w-full border rounded px-3 py-2 text-xs focus:outline-none focus:ring-2 ${errors[field?.id] ? "border-red-500" : "border-gray-300 focus:ring-blue-200"
											}`}
									/>
									<span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">₹</span>
								</div>
							)}

							{errors[field?.id] && (
								<p className="text-red-500 text-xs mt-1">{errors[field?.id]}</p>
							)}
						</div>
					))}
				</div>

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
						disabled={!!branchError}
					/>
				</div>
				{classError && (
					<p className="text-red-600 text-xs mt-2 text-right w-full">
						{classError}
					</p>
				)}
			</div>

			{
				addedClasses?.length > 0 &&
				<>
					<div className="flex items-center justify-between m-4">
						<div className="text-xs font-semibold text-darkestNavy">
							Review Fees Structure ({currentYear})
						</div>
						<div className="w-fit text-[0.8rem]">
							<SingleSelectCourseBranchDropdown
								optionsData={Object.keys(classBranchMap)}
								branchMap={classBranchMap}
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
								key={dropdownResetKey}
							/>
						</div>
					</div>

					<div className="bg-white rounded-xl text-sm px-4 pt-7 pb-6 mt-4">
						{
							selectedClass &&
							<>
								<div className="flex items-center justify-between mb-3">
									<p className="text-sm font-semibold">Review Fees Structure</p>
									<div className="flex items-center gap-1 text-blue-600 cursor-pointer text-xs"
										onClick={handleEditClassData}
									>
										<FiEdit2 />
										<span>Edit</span>
									</div>
								</div>

								<div className="mt-7">

									<div className="bg-background rounded-xl px-4 py-5 mt-5 text-deepBlue text-md space-y-2">
										<h3 className="font-semibold mb-3">
											Fee Structure for {selectedClass} {selectedBranch && `(${selectedBranch})`}
										</h3>

										<div className="grid grid-cols-3 text-xs font-bold">
											<span className="text-left">Type</span>
											<span className="text-center">Amount</span>
											<span className="text-right">Frequency</span>
										</div>

										{selectedClass && (() => {
											const classData = allClassFees?.[selectedClass];

											const selectedData =
												selectedBranch && classData?.[selectedBranch]
													? classData[selectedBranch]
													: classData?.[selectedClass];

											return selectedData?.fees.map((feeItem: any, idx: any) => (
												<div key={idx} className="grid grid-cols-3 text-xs">
													<span className="text-left">{feeItem?.fees_type}</span>
													<span className="text-center">{feeItem?.fees_value}</span>
													<span className="text-right">{feeItem?.fees_frequency}</span>
												</div>
											));
										})()}
									</div>
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
					</div>
				</>
			}
		</OnboardingFormTemplate >
	);
};

export default FeesStructureForm;
