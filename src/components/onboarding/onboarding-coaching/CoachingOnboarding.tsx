"use client";

import React, { useState, useEffect } from "react";
import ImageUploadSection from "../ImageUploadSection";
import OnboardingFormTemplate from "../OnboardingFormTemplate";
import { useRouter } from "next/navigation";
import { clearMultipleLocalStorageItems } from "@/utils/localStorageClear";
import LoaderTextButton from "@/components/atom/buttons/LoaderTextButton";
import { validateField } from "@/utils/formValidation";
import { calculateRatio } from "@/utils/helper";
import RoundedButton from "@/components/atom/buttons/RoundedButton";

const fieldLabels: { [key: string]: string } = {
	instituteName: "Institute Name",
	email: "Email Address",
	registration: "Registration No.",
	website: "Website",
	phone: "Phone Number",
	address: "Address",
	medium: "Medium",
	logoImage: "Logo",
	coverImage: "Banner",
	plot: "Plot No.",
	landmark: "Landmark",
	city: "City",
	state: "State",
	pincode: "Pincode",
	totalFaculty: "Total Faculty",
	totalStudent: "Total Student",
	highlight: "Highlights",
	coachingTypes: "Types of Coaching",
}

const initialFormData = Object.keys(fieldLabels).reduce((acc, key) => {
	if (key === "highlight") {
		acc[key] = [] as string[];
	} else if (!["logoImage", "coverImage"].includes(key)) {
		acc[key] = "";
	}
	return acc;
}, {} as Record<string, string | string[]>);

const CoachingOnboarding = () => {
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const [skipLoader, setSkipLoader] = useState(false);
	const [logoImage, setLogoImage] = useState<string | null>(null);
	const [coverImage, setCoverImage] = useState<string | null>(null);
	const [errors, setErrors] = useState<{ [key: string]: string | null }>({});
	const [highlightInput, setHighlightInput] = useState<string>("");
	const [isPrefilled, setIsPrefilled] = useState<{ [key: string]: boolean }>({});
	const [latLong, setLatLong] = useState<any>({ latitude: 0, longitude: 0 })
	const [formData, setFormData] = useState(initialFormData);

	useEffect(() => {
		clearMultipleLocalStorageItems("coaching")
		const saved: any = localStorage.getItem("coaching-data")
		const types_of_coaching: any = localStorage.getItem("types_of_coaching")
		if (saved) {
			let coachingData = JSON.parse(saved)
			const newFormData = {
				instituteName: coachingData?.name || "",
				registration: coachingData?.registration_number || "",
				website: coachingData?.contact_info?.website || "",
				email: coachingData?.contact_info?.email || "",
				phone: coachingData?.contact_info?.phone || "",
				plot: coachingData?.coaching_location?.plotNo || "",
				address: coachingData?.coaching_location?.address || "",
				landmark: coachingData?.coaching_location?.landmark || "",
				city: coachingData?.coaching_location?.city || "",
				state: coachingData?.coaching_location?.state || "",
				pincode: coachingData?.coaching_location?.pincode || "",
				highlight: coachingData?.highlights || "",
				totalFaculty: coachingData?.total_faculty || "",
				totalStudent: coachingData?.total_capacity || "",
				medium: coachingData?.medium || "",
				coachingTypes: types_of_coaching ? JSON.parse(types_of_coaching) : ""
			};
			setFormData((prev) => ({ ...prev, ...newFormData }));
			setLogoImage(coachingData?.logo_link)
			setCoverImage(coachingData?.banner)
			setLatLong({
				latitude: coachingData?.coaching_location?.latitude || "0",
				longitude: coachingData?.coaching_location?.longitude || "0",
			});
			// Disable fields that are prefilled
			const filledFlags: { [key: string]: boolean } = {};

			Object.keys(newFormData).forEach((key) => {
				const value = newFormData[key as keyof typeof newFormData];
				filledFlags[key] = typeof value === "string" && value.trim().length > 0;
			});
			setIsPrefilled(filledFlags);

			// Don't prefill from other sources if school-data exists
			return;
		}

		let data = localStorage.getItem("institute-register");
		let addressData = localStorage.getItem("institute-register-address");
		if (data && addressData) {
			let parseData = JSON.parse(data);
			let addressParseData = JSON.parse(addressData);
			const newFormData = {
				instituteName: parseData?.name || "",
				registration: parseData?.registrationNumber || "",
				website: parseData?.website || "",
				email: parseData?.email || "",
				phone: parseData?.mobile || "",
				plot: addressParseData?.plot || "",
				address: addressParseData?.address || "",
				landmark: addressParseData?.landmark || "",
				city: addressParseData?.city || "",
				state: addressParseData?.state || "",
				pincode: addressParseData?.pincode || "",
				campusArea: parseData?.campusArea || "",
			};
			if (typeof parseData === "object" && parseData !== null) {

				setLatLong({
					latitude: (parseData as any)?.location?.coordinates[1] || "0",
					longitude: (parseData as any)?.location?.coordinates[0] || "0"
				});
			}
			setFormData((prev) => ({ ...prev, ...newFormData }));

			// Set isPrefilled flags
			const filledFlags: { [key: string]: boolean } = {};
			Object.keys(newFormData).forEach((key) => {
				filledFlags[key] = newFormData[key as keyof typeof newFormData]?.trim().length > 0;
			});
			setIsPrefilled(filledFlags);
		}

		clearMultipleLocalStorageItems("coaching");
	}, []);

	useEffect(() => {
		if (logoImage) {
			setErrors((prev: any) => ({ ...prev, logoImage: null }));
		}
	}, [logoImage]);

	useEffect(() => {
		if (coverImage) {
			setErrors((prev: any) => ({ ...prev, coverImage: null }));
		}
	}, [coverImage]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
		const error = validateField(name, value, fieldLabels[name]);
		setErrors((prev) => ({ ...prev, [name]: error })); // clear error on change
	};

	const validateFields = (formData: { [key: string]: any }) => {
		const newErrors: { [key: string]: string } = {};

		for (const [key, value] of Object.entries(formData)) {
			const stringValue = typeof value === "string" ? value : value?.toString?.() || "";
			const error = validateField(key, stringValue, fieldLabels[key]);
			if (error) {
				newErrors[key] = error;
			}
		}

		return newErrors;
	};

	const handleSkip = () => {
		setSkipLoader(true);
		setTimeout(() => {
			try {
				// Save flag that user skipped the onboarding
				localStorage.setItem("onboarding_skipped", "true");
				// router.push("/subscription/subscription-plans");
				router.push("/dashboard");
			} catch (error) {
				console.error("Navigation error:", error);
				setSkipLoader(false);
			}
		}, 0);
	};

	const handleContinue = () => {
		const validationErrors = validateFields(formData);
		const mergedErrors = {
			...validationErrors,
			logoImage: !logoImage ? "Logo is required" : null,
			coverImage: !coverImage ? "Banner is required" : null,
		};

		const hasErrors = Object.values(mergedErrors).some((val) => val !== null);
		setErrors(mergedErrors);

		if (hasErrors) {
			setLoading(false)
			return;
		}

		setLoading(true)

		try {
			const locationValue = [
				formData.plot,
				formData.address,
				formData.landmark,
				formData.city,
				formData.state,
				formData.pincode
			]
				.filter((item): item is string => typeof item === "string" && item.trim() !== "")
				.join(", ")
				.trim();

			const coachingData = {
				banner: coverImage,
				logo_link: logoImage,
				name: formData?.instituteName,
				registration_number: formData.registration,
				contact_info: {
					email: formData?.email,
					phone: formData?.phone,
					website: formData.website,
				},
				medium: formData.medium,
				total_faculty: Number(formData.totalFaculty),
				total_capacity: Number(formData.totalStudent),
				student_faculty_ratio: calculateRatio(Number(formData.totalStudent), Number(formData.totalFaculty)),
				highlights: formData?.highlight,
				verification_status: "Unverified",
				gender_specific: "Co-ed",
				admission_page: coverImage,
				number_of_views: 100,
				// coaching_types: formData?.coachingTypes,
				coaching_location: {
					location_value: locationValue,
					latitude: latLong?.latitude,
					longitude: latLong?.longitude,
					plotNo: formData?.plot,
					address: formData?.address,
					landmark: formData?.landmark,
					city: formData?.city,
					state: formData?.state,
					country: "India",
					pincode: formData?.pincode,

				}
			};

			const existingData = localStorage.getItem("coaching-data");
			let mergedData = coachingData;

			if (existingData) {
				const parsedExisting = JSON.parse(existingData);
				mergedData = {
					...parsedExisting,
					...coachingData,
				};
			}
			localStorage.setItem("coaching-data", JSON.stringify(mergedData));
			localStorage.setItem("types_of_coaching", JSON.stringify(formData?.coachingTypes));
			setTimeout(()=>{
				router.push("/onboarding-coaching/fees-structure");
				setLoading(false)
			},500)
		} catch {
			setLoading(false)
		}
	};

	return (
		<OnboardingFormTemplate className="bg-white p-5">
			<div className="w-full text-deepBlue">
				<h4 className="text-md lg:text-[0.9rem] font-semibold text-left">
					Add Institute
				</h4>
				<hr className="border-t border-gray-300" />
			</div>

			<ImageUploadSection
				logoImage={logoImage}
				setLogoImage={setLogoImage}
				coverImage={coverImage}
				setCoverImage={setCoverImage}
				bannerError={errors.coverImage}
				setError={setErrors}
			/>

			{/* Show image validation errors */}
			{errors.logoImage && (
				<p className="text-red-500 text-xs mt-1">{errors.logoImage}</p>
			)}

			<div className="w-full p-4 text-deepBlue">
				<div className="mb-4">
					<label
						htmlFor="instituteName"
						className="block text-[0.7rem] font-medium"
					>
						Institute Name <span className="text-red-500">*</span>
					</label>
					<input
						id="instituteName"
						name="instituteName"
						type="text"
						placeholder="Enter school name"
						className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-200"
						value={formData?.instituteName}
						disabled={isPrefilled.instituteName}
						onChange={handleChange}
					/>
					{errors.instituteName && (
						<p className="text-red-500 text-xs mt-1">{errors.instituteName}</p>
					)}
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					{[
						{ id: "registration", label: "Registration No." },
						{ id: "email", label: "Email Address" },
						{ id: "website", label: "Website" },
						{ id: "phone", label: "Phone Number" },
						{ id: "plot", label: "Plot No." },
						{ id: "address", label: "Address" },
						{ id: "landmark", label: "Landmark" },
						{ id: "city", label: "City" },
						{ id: "state", label: "State" },
						{ id: "pincode", label: "Pincode" },
						{ id: "totalStudent", label: "Total Student" },
						{ id: "totalFaculty", label: "Total Faculty" },
						{
							id: "medium",
							label: "Medium",
							type: "select",
							options: [
								{ label: "Select Medium", value: "" },
								{ label: "Hindi", value: "Hindi" },
								{ label: "English", value: "English" },
							]
						},
						{
							id: "coachingTypes",
							label: "Types of Coaching",
							type: "select",
							options: [
								{ label: "Select Coaching", value: "" },
								{ label: "Competitive Exam Coaching", value: "competitive_exam" },
								{ label: "K-12th Coaching", value: "k_12" },
								{ label: "College Coaching", value: "college_coaching" }
							]
						},
						{ id: "highlight", label: "Highlights" },
					].map((field) => (
						<div key={field.id}>
							<label htmlFor={field.id} className="block text-[0.7rem] font-medium">
								{field.label} <span className="text-red-500">*</span>
							</label>
							{
								field?.id === "highlight" ?
									<div>
										<input
											id={field.id}
											type="text"
											name={field.id}
											placeholder={`Enter ${field.label.toLowerCase()}`}
											className={`mt-1 block w-full border border-gray-300 rounded px-3 py-2 text-sm`}
											value={highlightInput}
											onChange={(e) => setHighlightInput(e.target.value)}
											onKeyDown={(e) => {
												if (e.key === "Enter" && highlightInput.trim()) {
													e.preventDefault();
													const trimmedInput = highlightInput.trim();
													const wordCount = trimmedInput.split(/\s+/).length;

													// Check max 2 words only
													if (wordCount > 2) {
														setErrors((prev) => ({
															...prev,
															highlight: "Each highlight can have at most 2 words.",
														}));
														return;
													}

													// Check for duplicate
													if (formData.highlight.includes(trimmedInput)) {
														setErrors((prev) => ({
															...prev,
															highlight: "Duplicate highlights are not allowed.",
														}));
														return;
													}

													// Add highlight if valid
													setFormData((prev) => ({
														...prev,
														highlight: [...prev.highlight, trimmedInput],
													}));
													setHighlightInput("");

													// Clear any previous error
													setErrors((prev) => ({
														...prev,
														highlight: null,
													}));
												}
											}}
										/>
										{/* Show tags below */}
										{Array.isArray(formData.highlight) && (
											<div className="flex flex-wrap gap-2 mt-2">
												{formData?.highlight?.map((tag: any, index: any) => (
													<span
														key={index}
														className="bg-blue-100 text-black-700 px-2 py-1 text-xs rounded-full flex items-center"
													>
														{tag}
														<button
															type="button"
															onClick={() => {
																if (Array.isArray(formData.highlight)) {
																	const updatedTags = formData.highlight.filter((_, i) => i !== index);
																	setFormData((prev) => ({ ...prev, highlight: updatedTags }));
																}
															}}
															className="ml-2 text-black-500 hover:text-black-700"
														>
															&times;
														</button>
													</span>
												))}
											</div>
										)}
										{formData?.highlight?.length === 0 && (
											<div className="flex flex-wrap gap-1">
												<span className="bg-blue-100 text-black-700 px-2 py-1 text-xs rounded-full flex items-center">
													Example: Creative &times;
												</span>
											</div>
										)}
									</div>
									:
									field?.type === "select" ? (
										<select
											id={field.id}
											name={field.id}
											value={formData[field.id as keyof typeof formData]}
											onChange={handleChange}
											className={`mt-1 block w-full border border-gray-300 rounded px-3 py-2 text-sm`}
										>
											{field.options?.map((opt) => (
												<option key={opt?.value} value={opt?.value}>{opt?.label}</option>
											))}
										</select>
									)
										:
										(<input
											id={field.id}
											type="text"
											name={field.id}
											value={formData[field.id as keyof typeof formData]}
											onChange={handleChange}
											disabled={
												["registration", "email", "phone"].includes(field.id) && isPrefilled[field.id]
											}
											className={`mt-1 block w-full border border-gray-300 rounded px-3 py-2 text-sm`}
											placeholder={`Enter ${field.label.toLowerCase()}`}
										/>)
							}
							{errors[field.id] && (
								<p className="text-red-500 text-xs mt-1">{errors[field.id]}</p>
							)}
						</div>
					))}
				</div>

				<div className="flex justify-end mt-6 gap-5 text-xs">
					<LoaderTextButton
						withBackground={false}
						fontBold={true}
						buttonName="Skip All"
						textColor="#2E90FA"
						textSize="0.7rem"
						onClick={handleSkip}
						isLoading={skipLoader}
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
		</OnboardingFormTemplate>
	);
};

export default CoachingOnboarding;
