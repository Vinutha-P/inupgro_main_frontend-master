import { addStudentValidationSchema, principalValidationSchema } from "@/utils/validationSchema";
import React, { useEffect } from "react";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { LuImagePlus } from "react-icons/lu";

const AddStudentModal = ({
	isOpen,
	onClose,
	formData,
	setFormData,
	onAddStudent,
}: {
	isOpen: boolean; onClose: () => void; formData: {
		fullName: string;
		age: string;
		stream: string;
		marks: string;
		profile_picture: string;
	};
	setFormData: React.Dispatch<React.SetStateAction<{
		fullName: string;
		age: string;
		stream: string;
		marks: string;
		profile_picture: string;
	}>>;
	 onAddStudent:any
}) => {
	if (!isOpen) return null;
	const [errors, setErrors] = useState<any>({});
	const baseURL = process.env.NEXT_PUBLIC_API_URL;

	const validateField = (name: string, value: string) => {
		const validators = addStudentValidationSchema[name as keyof typeof formData];
		if (!validators) return;

		for (const validator of validators) {
			const error = validator(value);
			if (error) {
				setErrors((prev: Record<string, string>) => ({ ...prev, [name]: error }));
				return;
			}
		}

		// If no errors, remove previous error
		setErrors((prev: Record<string, string>) => {
			const { [name]: removed, ...rest } = prev;
			return rest;
		});
	};

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
		validateField(name, value);
	};

	const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];

		if (!file) return;

		try {
			const folder = "profile-photo"; // Change this based on image type
			const fileName = encodeURIComponent(file.name);
			const key = `Inupgro-prod/${folder}/${fileName}`;
			const res = await fetch(`${baseURL}/v1/s3?bucketName=Inupgro-prod&key=${key}`);

			if (!res.ok) throw new Error("Failed to get pre-signed URL");

			const presignedUrl = await res.text(); // plain text response

			const uploadRes = await fetch(presignedUrl, {
				method: "PUT",
				headers: {
					"Content-Type": file.type,
				},
				body: file,
			});

			if (uploadRes.ok) {
				const cleanUrl = presignedUrl.split("?")[0];
				setFormData((prev) => ({
					...prev,
					profile_picture: cleanUrl,
				}));
			} else {
				console.error("Upload to S3 failed");
			}
		} catch (error) {
			console.error("Upload error:", error);
		}
	};

	const validateForm = () => {
		let isValid = true;
		const newErrors: Record<string, string> = {};

		Object.keys(addStudentValidationSchema).forEach((field) => {
			const value = formData[field as keyof typeof formData];
			const validators = addStudentValidationSchema[field as keyof typeof formData];

			for (const validator of validators) {
				const error = validator(value);
				if (error) {
					isValid = false;
					newErrors[field] = error;
					break; // stop after first error
				}
			}
		});

		setErrors(newErrors);
		return isValid;
	}

	const handleSubmit = () => {
		const isValid = validateForm(); // Validate the form before submitting
		if (isValid) {
			onAddStudent(formData);
			onClose(); // Only close the modal if the form is valid
		}
	};
	return (
		<div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
			<div className="bg-white rounded-xl w-full max-w-2xl p-4 relative shadow-lg">
				<div className="flex justify-between items-center border-b pb-3">
					<h2 className="text-sm font-bold text-deepBlue">Add Student</h2>
					<button onClick={onClose} type="button">
						<IoClose className="text-2xl text-gray-600 hover:text-black" />
					</button>
				</div>

				<h3 className="text-[0.6rem] font-bold text-deepBlue mt-5">
					Student Info
				</h3>
				<div className="mt-6 flex flex-col md:flex-row gap-3">
					<div
						className="w-full md:w-[30%] bg-[#f0f5fd] h-48 rounded-lg relative">
						<input
							type="file"
							accept="image/*"
							className="hidden"
							id={`gallery-upload`}
							onChange={(e) => handleImageChange(e)}
						/>

						<label
							htmlFor={`gallery-upload`}
							className="w-full h-full flex items-center justify-center cursor-pointer">
							{formData?.profile_picture ? (
								<img
									src={formData?.profile_picture}
									alt="Student Profile"
									className="w-full h-full object-cover rounded-md"
								/>
							) : (
								<div className="w-full md:w-[30%] bg-[#f0f5fd] h-48 rounded-lg flex flex-col items-center justify-center relative">
									<div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
										<LuImagePlus className="text-primaryLight text-lg" />
									</div>
									<p className="text-[0.6rem] text-gray-500 text-center mt-2 whitespace-nowrap">
										Suggested size 300 x 300px
									</p>
								</div>
							)}
						</label>


					</div>

					<div className="w-full md:w-[60%] grid grid-cols-1 md:grid-cols-2 gap-3">
						<div>
							<label
								htmlFor="fullName"
								className="text-[0.6rem] font-semibold text-deepBlue"
							>
								Full Name
							</label>
							<input
								id="fullName"
								type="text"
								name="fullName"
								value={formData?.fullName}
								onChange={handleChange}
								placeholder="Enter name"
								className="w-full mt-1 px-3 py-2 border border-gray-300 rounded text-[0.6rem]"
							/>
							{errors.fullName && (
								<p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
							)}
						</div>
						<div>
							<label
								htmlFor="age"
								className="text-[0.6rem] font-semibold text-deepBlue"
							>
								Age
							</label>
							<input
								id="age"
								type="text"
								name="age"
								value={formData?.age}
								onChange={handleChange}
								placeholder="Enter age"
								className="w-full mt-1 px-3 py-2 border border-gray-300 rounded text-[0.6rem]"
							/>
							{errors.age && (
								<p className="text-red-500 text-xs mt-1">{errors.age}</p>
							)}
						</div>
						<div>
							<label
								htmlFor="stream"
								className="text-[0.6rem] font-semibold text-deepBlue"
							>
								Stream
							</label>
							<select
								id="stream"
								name="stream"
								value={formData?.stream}
								onChange={handleChange}
								className="w-full mt-1 px-3 py-2 border border-gray-300 rounded text-[0.6rem]"
							>
								<option value="">Select Stream</option>
								<option value="Science">Science</option>
								<option value="Commerce">Commerce</option>
								<option value="Arts">Arts</option>
							</select>
						</div>
						<div>
							<label
								htmlFor="marks"
								className="text-[0.6rem] font-semibold text-deepBlue"
							>
								Marks Scored
							</label>
							<input
								id="marks"
								type="text"
								name="marks"
								value={formData?.marks}
								onChange={handleChange}
								placeholder="Enter Percentage"
								className="w-full mt-1 px-3 py-2 border border-gray-300 rounded text-[0.6rem]"
							/>
							<span className="absolute right-20 top-[69%] -translate-y-1/2 text-[0.8rem] text-gray-700 pointer-events-none">
								%
							</span>
						</div>
					</div>
				</div>

				<div className="flex justify-end mt-6">
					<button
						type="button"
						onClick={handleSubmit}
						className="bg-primaryLight text-white text-[0.6rem] px-5 py-2 rounded hover:bg-blue-600 transition"
					>
						Save & Continue
					</button>
				</div>
			</div>
		</div>
	);
};

export default AddStudentModal;
