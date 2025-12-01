"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { BsInfoCircle } from "react-icons/bs";
import EmailVerification from "../EmailVerification";
import { useRouter } from "next/navigation";
import RegisteredOnboarding from "../RegisteredOnboarding";
import { useRegisterInstituteMutation } from "@/features/api/instituteRegisterSlice";
import LocationPicker from "@/components/molecule/LocationPicker";
import { clearMultipleLocalStorageItems } from "@/utils/localStorageClear";

type FormData = {
	instituteName: string;
	registrationNumber: string;
	website: string;
	email: string;
	mobile: string;
	campusArea: string;
	address: string;
	plot: string;
	locality: string;
	pincode: string;
	city: string;
	state: string;
	longitude: string;
	latitude: string;
	instituteType: string;
};

const initialFormData: FormData = {
	instituteName: "",
	registrationNumber: "",
	website: "",
	email: "",
	mobile: "",
	campusArea: "",
	address: "",
	plot: "",
	locality: "",
	pincode: "",
	city: "",
	state: "",
	latitude: "",
	longitude: "",
	instituteType: "",
};

const InstitutionalRegistrationForm = ({
	selectedType,
	selectedTab
}
	:
	{
		selectedType: string,
		selectedTab: string,
	}) => {
	const [hasMounted, setHasMounted] = useState(false);
	const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
	const [isRegisteredModalOpen, setIsRegisteredModalOpen] = useState(false);
	const [formData, setFormData] = useState<FormData>(initialFormData);
	const [dataId, setDataId] = useState<string | null>(null);
	const [otpId, setOtpId] = useState<string | null>(null);

	const [isTermsChecked, setIsTermsChecked] = useState(false);
	const [apiError, setApiError] = useState<string | null>(null);
	const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

	const [userEditedFields, setUserEditedFields] = useState({
		address: false,
		locality: false,
		city: false,
		state: false,
		pincode: false,
	});

	const [registerInstitute, { isLoading }] = useRegisterInstituteMutation();
	const router = useRouter();
	const userEditedRef = useRef<{ [key: string]: boolean }>({});


	const formFields = [
		{ id: "instituteName", label: `${selectedType} Name`, placeholder: `Enter ${selectedType} Name` },
		{ id: "registrationNumber", label: "Registration Number", placeholder: "Enter Registration Number" },
		{ id: "website", label: `${selectedType} Website`, placeholder: "Enter Website URL" },
		{ id: "email", label: `${selectedType} Email ID`, placeholder: "Enter Email Address" },
		{ id: "mobile", label: `${selectedType} Phone Number`, placeholder: "Enter phone number" },
		{ id: "campusArea", label: "Campus Area", placeholder: "Enter Campus Area" },
		{ id: "plot", label: "Plot No.", placeholder: "Enter Plot No." },
		{ id: "address", label: "Address ", placeholder: "Enter Address" },
		{ id: "locality", label: "Locality", placeholder: "Enter Locality" },
		{ id: "city", label: "City", placeholder: "Enter City" },
		{ id: "state", label: "State", placeholder: "Enter State" },
		{ id: "pincode", label: "Pincode", placeholder: "Enter Pincode" },
	];

	useEffect(() => {
		setHasMounted(true);
		localStorage.removeItem("institute-register")
		localStorage.removeItem("institute-register-address")
	}, []);

	const validateForm = useCallback(() => {
		const newErrors: { [key: string]: string } = {};

		if (!formData.instituteName.trim()) newErrors.instituteName = `${selectedType} name is required`;
		if (!formData.registrationNumber.trim()) newErrors.registrationNumber = "Registration number is required";
		if (!formData.website.trim()) newErrors.website = "Website is required";

		if (!formData.email.trim()) {
			newErrors.email = "Email is required";
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
			newErrors.email = "Invalid email format";
		}

		if (!formData.campusArea.trim()) newErrors.campusArea = "Campus area is required";
		if (!formData.mobile.trim()) newErrors.mobile = "Phone number is required";

		else if (!formData.mobile.replace(/^91\s?/, "").match(/^\d{10}$/)) {
			newErrors.mobile = "Phone number must be 10 digits";
		}

		if (!formData.address.trim()) newErrors.address = "Address is required";
		// address
		if (!formData.plot.trim()) newErrors.plot = "Plot is required";
		if (!formData.locality.trim()) newErrors.locality = "Locality is required";
		if (!formData.pincode.trim()) newErrors.pincode = "Pincode is required";
		if (!formData.city.trim()) newErrors.city = "City is required";
		if (!formData.state.trim()) newErrors.state = "State is required";

		setErrors(newErrors as Record<keyof FormData, string>);
		return Object.keys(newErrors).length === 0;
	}, [formData]);

	const handleSubmit = async () => {
		if (!validateForm()) {
			return;
		}
		if (!isTermsChecked) {
			setApiError("Please agree to the terms before submitting.");
			return;
		}
		let addressObj = {
			plot: formData.plot,
			landmark: formData.locality,
			address: formData.address,
			city: formData.city,
			state: formData.state,
			pincode: formData.pincode,
			latitude: formData.latitude,
			longitude: formData.longitude,
		}
		let payloadData = {
			name: formData.instituteName,
			registrationNumber: formData.registrationNumber,
			website: formData.website,
			email: formData.email,
			countryCode: "91",
			mobile: formData.mobile.replace(/^91\s?/, ""),
			campusArea: formData.campusArea,
			latitude: formData.latitude,
			longitude: formData.longitude,
			landmark: formData.locality,
			city: formData.city,
			state: formData.state,
			pincode: formData.pincode,
			plotNo: formData.plot,
			address: formData.address,
			instituteType: selectedType,
		}
		try {
			const response = await registerInstitute(payloadData).unwrap();
			setDataId(response.results.dataId);
			setOtpId(response.results.otpId)
			localStorage.setItem("institute-register-address", JSON.stringify(addressObj))
			localStorage.setItem("institute-register", JSON.stringify(response?.results))
			setIsEmailModalOpen(true);
			setApiError(null);
		} catch (error: any) {
			const errorMessage =
				error?.data?.message ||
				error?.message ||
				"Failed to register. Please try again.";
			setApiError(errorMessage);
		}
	}

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
	) => {
		const { id, value } = e.target;
		userEditedRef.current[id] = true;
		setFormData((prev) => ({ ...prev, [id]: value }));

		if (errors[id as keyof FormData]) {
			setErrors(prev => {
				const newErrors = { ...prev };
				delete newErrors[id as keyof FormData];
				return newErrors;
			});
		}
	};

	const handlePhoneChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const value = e.target.value;
			const numericValue = value.replace(/\D/g, "").slice(0, 10);
			setFormData((prev) => ({
				...prev,
				mobile: `91 ${numericValue}`,
			}));

			if (errors.mobile) {
				setErrors((prev) => {
					const newErrors = { ...prev };
					newErrors.mobile = undefined;
					return newErrors;
				});
			}
		},
		[errors.mobile]
	);

	const handleCancelButton = useCallback(() => {
			router.push("/");
	}, [router]);

	if (!hasMounted) {
		return null;
	}

	return (
		<div>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				{formFields.map((field) => (
					<div key={field.id}>
						<label htmlFor={field.id} className="block text-[0.7rem] font-medium">
							{field.label} <span className="text-red-500">*</span>
						</label>
						{/* Special case for mobile number */}
						{field.id === "mobile" ? (
							<div className="flex items-center mt-1 border border-gray-300 rounded px-3 py-2 text-[0.7rem] focus-within:ring-2 focus-within:ring-blue-200">
								<span className="text-gray-500 mr-2 whitespace-nowrap text-xs">
									+91 |
								</span>
								<input
									id="mobile"
									type="tel"
									value={formData.mobile.replace(/^91\s?/, "")}
									onChange={handlePhoneChange}
									placeholder={field.placeholder}
									className="flex-1 border-none outline-none text-[0.7rem]"
									maxLength={10}
								/>
							</div>
						) : (
							<input
								id={field.id}
								type="text"
								value={formData[field.id as keyof FormData]}
								onChange={handleInputChange}
								placeholder={field.placeholder}
								className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 text-[0.7rem] focus:outline-none focus:ring-2 focus:ring-blue-200"
							/>
						)}
						{errors[field.id as keyof FormData] && (
							<p className="text-red-500 text-[0.65rem] mt-1">
								{errors[field.id as keyof FormData]}
							</p>
						)}
					</div>
				))}

				{/* <div>
					<label htmlFor="mobile" className="block text-[0.7rem] font-medium">
						{selectedType} Phone Number  <span className="text-red-500">*</span>
					</label>
					<div className="flex items-center mt-1 border border-gray-300 rounded px-3 py-2 text-[0.7rem] focus-within:ring-2 focus-within:ring-blue-200">
						<span className="text-gray-500 mr-2 whitespace-nowrap text-xs">
							+91 |
						</span>
						<input
							id="mobile"
							type="tel"
							value={formData.mobile.replace(/^91\s?/, "")}
							onChange={handlePhoneChange}
							placeholder="Enter phone number"
							className="flex-1 border-none outline-none text-[0.7rem]"
							maxLength={10}
						/>
					</div>
					{errors.mobile && (
						<p className="text-red-500 text-[0.65rem] mt-1">{errors.mobile}</p>
					)}
				</div> */}

				{/* <div>
					<label htmlFor="address" className="block text-[0.7rem] font-medium">
						{selectedType} Address <span className="text-red-500">*</span>
					</label>
					<input
						id="address"
						type="text"
						value={formData.address}
						onChange={handleInputChange}
						placeholder="Enter school address"
						className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 text-[0.7rem] focus:outline-none focus:ring-2 focus:ring-blue-200"
					/>
					{errors.address && (
						<p className="text-red-500 text-[0.65rem] mt-1">{errors.address}</p>
					)}
				</div> */}
			</div>

			<div className="mt-6">
				<div className="w-full h-64 border rounded overflow-hidden">
					<LocationPicker
						onLocationChange={(lat, lng, addressData): any => {
							setTimeout(() => {
								setFormData((prev) => ({
									...prev,
									latitude: lat.toString(),
									longitude: lng.toString(),
									address: userEditedRef.current.address ? prev.address : addressData.address,
									locality: userEditedRef.current.locality ? prev.locality : addressData.locality,
									city: userEditedRef.current.city ? prev.city : addressData.city,
									state: userEditedRef.current.state ? prev.state : addressData.state,
									pincode: userEditedRef.current.pincode ? prev.pincode : addressData.pincode,
									fullAddress: addressData.fullAddress,
								}));
							}, 100);
						}}
					/>
				</div>
			</div>

			<div className="mt-4 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
				<div className="flex flex-col text-gray-500 space-y-1">
					<div className="flex items-center text-gray-500 space-x-2">
						<input
							type="checkbox"
							className="w-4 h-4 accent-blue-500"
							id="importantFields"
							onChange={() => setIsTermsChecked((prev) => !prev)}
						/>
						{/* <div className="flex items-center text-gray-500"> */}
						<label htmlFor="importantFields" className="flex items-center text-sm">
							<BsInfoCircle className="w-3 h-3 mr-1" />
							<span>Fill all fields that have asterisk</span>
						</label>
					</div>
					{!isTermsChecked && apiError && (
						<span className="text-red-600 font-semibold text-[0.65rem] mt-1 block">
							Please acknowledge this checkbox before submitting the form.
						</span>
					)}
				</div>

				<div className="flex gap-2">
					<button
						type="button"
						className="w-20 px-4 py-2 rounded border border-gray-300 text-gray-600 hover:bg-gray-100"
						onClick={handleCancelButton}
					>
						Cancel
					</button>
					<button
						type="submit"
						className="w-20 px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
						onClick={handleSubmit}
					>
						Next
					</button>
				</div>
			</div>

			{isEmailModalOpen && (
				<EmailVerification
					show={isEmailModalOpen}
					email={formData.email}
					dataId={dataId}
					otpId={otpId}
					selectedType={selectedType}
					onClose={() => setIsEmailModalOpen(false)}
					onVerified={() => {
						setIsEmailModalOpen(false);
						setTimeout(() => {
							setIsRegisteredModalOpen(true);
						}, 100);
					}}
					selectedTab={selectedTab}
				/>
			)}

			{isRegisteredModalOpen && (
				<RegisteredOnboarding
					type={"institute"}
					show={isRegisteredModalOpen}
					name={formData.instituteName}
					onClose={() => setIsRegisteredModalOpen(false)}
				/>
			)}
		</div>
	);
};

export default InstitutionalRegistrationForm;