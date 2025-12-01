import { IoClose } from "react-icons/io5";
import ImageUploadCard from "@/components/atom/ImageUploadCard";
import { useState } from "react";

type FieldConfig = {
    label: string;
    name: string;
    type: string;
    placeholder?: string;
    options?: string[];
};

interface CustomModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    sectionTitle?: string;
    fields: FieldConfig[];
    formData: Record<string, any>;
    setFormData: any;
    validationSchema?: Record<string, ((val: string) => string | null)[]>;
    showImageUpload?: boolean;
    imageKey?: string;
    folderName: string;
    onSubmit: any;
}

const CustomModal = ({
    isOpen,
    onClose,
    title,
    sectionTitle = "Info",
    fields,
    formData,
    setFormData,
    validationSchema = {},
    showImageUpload = false,
    imageKey = "profile_picture",
    folderName = "profile-photo",
    onSubmit,
}: CustomModalProps) => {
    if (!isOpen) return null;
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);
    const baseURL = process.env.NEXT_PUBLIC_API_URL;

    const validateField = (name: string, value: string) => {
        const validators = validationSchema[name];
        if (!validators) return;
        for (const validator of validators) {
            const error = validator(value);
            if (error) {
                setErrors((prev) => ({ ...prev, [name]: error }));
                return;
            }
        }
        setErrors((prev) => {
            const { [name]: _, ...rest } = prev;
            return rest;
        });
    };

    const validateForm = () => {
        let isValid = true;
        const newErrors: Record<string, string> = {};

        Object.keys(validationSchema).forEach((field) => {
            const value = formData[field];
            const validators = validationSchema[field];
            for (const validator of validators) {
                const error = validator(value);
                if (error) {
                    isValid = false;
                    newErrors[field] = error;
                    break;
                }
            }
        });

        setErrors(newErrors);
        return isValid;
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev: any) => ({ ...prev, [name]: value }));
        validateField(name, value);
    };

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setLoading(true);
        try {
            const folder = folderName;
            const fileName = encodeURIComponent(file.name);
            const key = `${fileName}`;
            const res = await fetch(
                `${baseURL}/v1/s3?bucketName=inupgro-prod&key=${key}`
            );

            if (!res.ok) throw new Error("Failed to get pre-signed URL");

            const presignedUrl = await res.text();
            const uploadRes = await fetch(presignedUrl, {
                method: "PUT",
                headers: {
                    "Content-Type": file.type,
                },
                body: file,
            });

            if (uploadRes.ok) {
                const cleanUrl = presignedUrl.split("?")[0];
                setFormData((prev: any) => ({
                    ...prev,
                    [imageKey]: cleanUrl,
                }));
            } else {
                console.error("Upload to S3 failed");
            }
        } catch (error) {
            console.error("Upload error:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = () => {
        const isValid = validateForm();
        if (isValid) {
            onSubmit(formData);
            onClose();
        }
    };

    const handleDelete = () => {
        setFormData((prev: any) => ({
            ...prev,
            [imageKey]: "",
        }));
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
            <div className="bg-white rounded-xl w-full max-w-2xl p-4 relative shadow-lg">
                <div className="flex justify-between items-center border-b pb-3">
                    <h2 className="text-sm font-bold text-deepBlue">{title}</h2>
                    <button onClick={onClose} type="button">
                        <IoClose className="text-2xl text-gray-600 hover:text-black" />
                    </button>
                </div>

                <h3 className="text-[0.6rem] font-bold text-deepBlue mt-5">{sectionTitle}</h3>

                <div className="mt-6 flex flex-col md:flex-row gap-3">
                    {showImageUpload && (
                        <ImageUploadCard
                            id="image-uploader"
                            imageUrl={formData?.[imageKey]}
                            onChange={handleImageChange}
                            onDelete={handleDelete}
                            isLoading={loading}
                        />
                    )}

                    <div className={`w-full ${showImageUpload ? "md:w-[60%]" : ""} grid grid-cols-1 md:grid-cols-2 gap-3`}>
                        {fields.map((field) => (
                            <div key={field.name} className={field.name === "mark" ? "md:col-span-2" : ""}>
                                <label htmlFor={field.name} className="text-[0.6rem] font-semibold text-deepBlue">
                                    {field.label}
                                </label>
                                <div className="relative">
                                    {field.type === "select" ? (
                                        <select
                                            id={field.name}
                                            name={field.name}
                                            value={formData?.[field.name] || ""}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded text-[0.6rem] bg-white"
                                        >
                                            <option value="">Select {field.label}</option>
                                            {field.options?.map((option: string) => (
                                                <option key={option} value={option}>{option}</option>
                                            ))}
                                        </select>
                                    ) : (
                                        <input
                                            id={field.name}
                                            name={field.name}
                                            type={field.type}
                                            placeholder={field.placeholder}
                                            value={formData?.[field.name] || ""}
                                            onChange={handleChange}
                                            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded text-[0.6rem]"
                                        />
                                    )}
                                    {field.name === "mark" || field.name ===  "marks" && (
                                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[0.8rem] text-gray-700 pointer-events-none">
                                            %
                                        </span>
                                    )}
                                </div>
                                {errors[field.name] && (
                                    <p className="text-red-500 text-xs mt-1">{errors[field.name]}</p>
                                )}
                            </div>
                        ))}
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

export default CustomModal;
