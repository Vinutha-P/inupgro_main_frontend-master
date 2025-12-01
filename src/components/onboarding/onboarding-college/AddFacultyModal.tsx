import ImageUploadCard from "@/components/atom/ImageUploadCard";
import { addStudentValidationSchema } from "@/utils/validationSchema";
import type React from "react";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { LuImagePlus } from "react-icons/lu";

const AddFacultyModal = ({
    isOpen,
    onClose,
    formData,
    setFormData,
    onAddStudent,
}: {
    isOpen: boolean; onClose: () => void; formData: {
        fullName: string;
        age: string;
        designation: string;
        department: string;
        profile_picture: string;
    };
    setFormData: React.Dispatch<React.SetStateAction<{
        fullName: string;
        age: string;
        designation: string;
        department: string;
        profile_picture: string;
    }>>;
    onAddStudent: any
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
            const fileName = encodeURIComponent(file?.name);
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
            onAddStudent(formData)
            onClose(); // Only close the modal if the form is valid
        }
    };
    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
            <div className="bg-white rounded-xl w-full max-w-2xl p-4 relative shadow-lg">
                <div className="flex justify-between items-center border-b pb-3">
                    <h2 className="text-sm font-bold text-deepBlue">Add Faculty</h2>
                    <button onClick={onClose} type="button">
                        <IoClose className="text-2xl text-gray-600 hover:text-black" />
                    </button>
                </div>

                <h3 className="text-[0.6rem] font-bold text-deepBlue mt-5">
                    Faculty Info
                </h3>
                <div className="mt-6 flex flex-col md:flex-row gap-3">

                    <ImageUploadCard
                        id="faculty-image"
                        imageUrl={formData?.profile_picture}
                        onChange={handleImageChange}
                    />

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
                                value={formData?.fullName || ""}
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
                                value={formData?.age || ""}
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
                                htmlFor="designation"
                                className="text-[0.6rem] font-semibold text-deepBlue"
                            >
                                Designation
                            </label>
                            <select
                                id="designation"
                                name="designation"
                                value={formData?.designation || ""}
                                onChange={handleChange}
                                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded text-[0.6rem]"
                            >
                                <option value="">Select Designation</option>
                                <option value="professor">Professor</option>
                                <option value="hr manager">HR Manager</option>
                                <option value="teacher">Teacher</option>
                            </select>
                        </div>
                        <div>
                            <label
                                htmlFor="department"
                                className="text-[0.6rem] font-semibold text-deepBlue"
                            >
                                Department
                            </label>
                            <input
                                id="department"
                                type="text"
                                name="department"
                                value={formData?.department || ""}
                                onChange={handleChange}
                                placeholder="Enter department"
                                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded text-[0.6rem]"
                            />
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

export default AddFacultyModal;
