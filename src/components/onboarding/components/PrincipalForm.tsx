"use client";
import type React from "react";
import { useEffect, useState } from "react";
import OnboardingFormTemplate from "../OnboardingFormTemplate";
import RoundedButton from "../../atom/buttons/RoundedButton";
import { useRouter } from "next/navigation";
import { FaChevronLeft, FaPlus } from "react-icons/fa";
import { principalValidationSchema } from "@/utils/validationSchema";
import LoaderTextButton from "@/components/atom/buttons/LoaderTextButton";
import MultiTagInput from "@/components/atom/inputs/MultiTags";
import RoundedImageUploader from "@/components/atom/imagesUploaders/RoundedImage";
import { IoMdClose } from "react-icons/io";
interface Props {
    onNext: () => void;
    onPrevious: () => void;
    heading?: string;
    localStorageKey?: string; // optional override
}

interface FormDataType {
    fullName: string;
    gender: string;
    age: string;
    experience: string;
    education: string;
    describePersonality: string[];
    fullAddress: string;
    locality: string;
    city: string;
    state: string;
    country: string;
    pincode: string;
}

type FormDataKeys = keyof FormDataType;

const PrincipalForm: React.FC<Props> = ({
    onNext,
    onPrevious,
    heading = "Principal's Profile",
    localStorageKey = "coaching-data"
}) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [skipLoader, setSkipLoader] = useState(false);
    const [awards, setAwards] = useState([{ id: Date.now(), value: "" }]);
    const [profileImage, setProfileImage] = useState<string | null>(null);
    const [profileImgError, setProfileImgError] = useState<string | null>(null);
    const [formData, setFormData] = useState<FormDataType>({
        fullName: "",
        gender: "",
        age: "",
        experience: "",
        education: "",
        describePersonality: [],
        fullAddress: "",
        locality: "",
        city: "",
        state: "",
        country: "",
        pincode: "",
    });
    const [errors, setErrors] = useState<{ [key: string]: string | string[] }>({});

    useEffect(() => {
        const storedImage = localStorage.getItem("principalProfileImage");
        if (storedImage) {
            setProfileImage(storedImage);
        }
    }, []);

    useEffect(() => {
        if (profileImage) {
            setProfileImgError(null);
        }
    }, [profileImage]);

    useEffect(() => {
        const storedData = localStorage.getItem(localStorageKey);
        if (storedData) {
            const parsedData = JSON.parse(storedData);

            if (parsedData.principal) {
                const principal = parsedData.principal;

                setFormData((prev) => ({
                    ...prev,
                    fullName: principal.name || "",
                    age: principal.age?.toString() || "",
                    experience: principal.experience || "",
                    education: principal.metadata || "",
                    describePersonality: Array.isArray(principal.personality)
                        ? principal.personality
                        : [],
                    gender: "", // Optional: Set if gender is available
                    fullAddress: "",
                    locality: "",
                    city: "",
                    state: "",
                    country: "",
                    pincode: "",
                }));

                if (Array.isArray(principal.award) && principal.award.length > 0) {
                    setAwards(
                        principal.award.map((award: string, index: number) => ({
                            id: Date.now() + index,
                            value: award,
                        }))
                    );
                }

                if (principal.profile_picture) {
                    setProfileImage(principal.profile_picture);
                }
            }
        }
    }, [localStorageKey]);

    const handleAddAward = () => {
        setAwards([...awards, { id: Date.now(), value: "" }]);
    };

    const handleRemoveAward = (id: any) => {
        setAwards((prevAwards) => prevAwards.filter((award) => award.id !== id));
    };

    const handleAwardChange = (id: number, value: string) => {
        const updatedAwards = awards?.map((award) =>
            award.id === id ? { ...award, value } : award,
        );
        setAwards(updatedAwards);
    };

    const handlePreviousPage = () => {
        onPrevious()
    };

    const validateField = (id: string, value: string) => {
        const validators = principalValidationSchema[id];
        if (!validators) return "";

        for (const validator of validators) {
            let valToValidate = value;
            if (Array.isArray(value)) {
                // For example, join array elements if you want to treat as a string or skip trim-based validators
                valToValidate = value.join(", ");
            }
            const error = validator(valToValidate);
            if (error) return error;
        }
        return "";
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));

        // Validate this particular field
        const fieldError = validateField(id, value);

        setErrors((prevErrors) => ({
            ...prevErrors,
            [id]: fieldError,
        }));
    };

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};

        (Object.keys(principalValidationSchema) as FormDataKeys[]).forEach((key) => {
            const value: any = formData[key];

            const error = validateField(key, value);
            if (error) {
                newErrors[key] = error;
            }
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSkip = () => {
        setSkipLoader(true);
        setTimeout(() => {
            try {
                onNext()
            } catch (error) {
                console.error("PrincipalProfileForm-190 , Navigation error:", error);
                setSkipLoader(false);
            }
        }, 0);
    };

    const handleContinue = async () => {
        if (!profileImage) {
            setProfileImgError("Profile Image is required");
            setLoading(false)
        };

        if (validateForm()) {
            setLoading(true)
            try {
                const existingData = JSON.parse(localStorage.getItem(localStorageKey) || "{}");

                const data = {
                    name: formData?.fullName,
                    age: Number(formData?.age),
                    experience: formData?.experience,
                    metadata: `${formData?.education} in Educational Leadership`,
                    personality: formData?.describePersonality,
                    award: awards?.map((award) => award?.value),
                    profile_picture: profileImage || ""
                };

                const updatedData = {
                    ...existingData,
                    principal: data,
                };

                localStorage.setItem(localStorageKey, JSON.stringify(updatedData));
                setTimeout(() => {
                    onNext();
                    setLoading(false)
                }, 500)
            } catch {
                setLoading(false)
            }

        }
    };
    return (
        <OnboardingFormTemplate className="bg-white p-5">
            <div className="w-full text-deepBlue">
                <h4 className="text-md lg:text-[0.9rem] font-semibold text-left">
                    {heading}
                </h4>
                <hr className="border-t border-gray-300" />
            </div>
            <h5 className="text-xs font-bold mt-5">Principal's Profile</h5>
            <div className="flex justify-center items-center relative mb-10 mt-2">
                <RoundedImageUploader
                    image={profileImage}
                    setImage={setProfileImage}
                    setError={setProfileImgError}
                />
            </div>
            {profileImgError && (
                <p className="text-red-500 text-xs mt-1 text-center">{profileImgError}</p>
            )}

            <div className="w-full text-deepBlue">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <div>
                        <label
                            htmlFor="fullName"
                            className="block text-xs font-medium text-gray-700 mb-1"
                        >
                            Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="fullName"
                            type="text"
                            placeholder="Enter Name"
                            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-200"
                            value={formData?.fullName}
                            onChange={handleInputChange}
                        />
                        {errors.fullName && <p className="text-red-500 text-xs">{errors.fullName}</p>}

                    </div>

                    <div>
                        <label
                            htmlFor="gender"
                            className="block text-xs font-medium text-gray-700 mb-1"
                        >
                            Gender
                        </label>
                        <select
                            id="gender"
                            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-200"
                            value={formData?.gender}
                            onChange={handleInputChange}
                        >
                            <option value="">Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>

                    <div className="relative">
                        <label
                            htmlFor="age"
                            className="block text-xs font-medium text-gray-700 mb-1"
                        >
                            Age <span className="text-red-500">*</span>
                        </label>

                        <input
                            id="age"
                            type="text"
                            placeholder="Enter Age"
                            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 pr-10 text-xs focus:outline-none focus:ring-2 focus:ring-blue-200"
                            value={formData?.age}
                            onChange={handleInputChange}
                        />
                        {errors.age && <p className="text-red-500 text-xs">{errors.age}</p>}

                    </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-2 gap-4 mt-4">

                    <div className="mt-4">
                        <label
                            htmlFor="experience"
                            className="block text-[0.7rem] font-medium"
                        >
                            Experience <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="experience"
                            type="text"
                            placeholder="Enter experience"
                            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 text-[0.7rem] focus:outline-none focus:ring-2 focus:ring-blue-200"
                            value={formData?.experience}
                            onChange={handleInputChange}
                        />
                        {errors.experience && <p className="text-red-500 text-xs">{errors.experience}</p>}

                    </div>

                    <div className="mt-4">
                        <label
                            htmlFor="education"
                            className="block text-[0.7rem] font-medium"
                        >
                            Higher Education <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="education"
                            type="text"
                            placeholder="Enter higher education"
                            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 text-[0.7rem] focus:outline-none focus:ring-2 focus:ring-blue-200"
                            value={formData?.education}
                            onChange={handleInputChange}
                        />
                        {errors.education && <p className="text-red-500 text-xs">{errors.education}</p>}

                    </div>

                </div>

                <div className="mt-4">
                    <label
                        htmlFor="awards"
                        className="block text-[0.7rem] font-medium mb-1"
                    >
                        Awards
                    </label>
                    {awards?.map((award, index) => (
                        <div
                            key={award.id}
                            className="mt-2 flex items-center border border-gray-300 rounded px-2 py-1 focus-within:ring-2 focus-within:ring-blue-200"
                        >
                            <input
                                type="text"
                                placeholder="Enter any awards"
                                value={award.value}
                                onChange={(e) => handleAwardChange(award.id, e.target.value)}
                                className="flex-1 text-[0.7rem] focus:outline-none bg-transparent"
                            />
                            {award?.id === awards[awards.length - 1].id && (
                                <button
                                    type="button"
                                    onClick={handleAddAward}
                                    className="ml-2 flex items-center gap-1 px-2 py-1 border border-gray-300 bg-white rounded text-gray-700 text-[0.7rem] hover:bg-gray-100 transition"
                                >
                                    <FaPlus className="text-[0.6rem]" />
                                    Add Awards
                                </button>
                            )}

                            {/* Remove button (show if more than 1 award) */}
                            {awards.length > 1 && index !== 0 && (
                                <button
                                    type="button"
                                    onClick={() => handleRemoveAward(award.id)}
                                    className="ml-2 flex items-center gap-1 px-2 py-1 border border-gray-300 bg-white rounded text-gray-700 text-[0.7rem] hover:bg-gray-100 transition"
                                >
                                    <IoMdClose />
                                </button>
                            )}
                        </div>
                    ))}
                </div>

                <div className="mt-4">
                    <label
                        htmlFor="describePersonality"
                        className="block text-[0.7rem] font-medium"
                    >
                        Describe Personality <span className="text-red-500">*</span>
                    </label>
                    <MultiTagInput
                        id="describePersonality"
                        label="Describe Personality"
                        tags={formData?.describePersonality}
                        onTagsChange={(newTags: string[]) => {
                            setFormData(prev => ({
                                ...prev,
                                describePersonality: newTags,
                            }));

                            if (newTags && newTags.length > 0) {
                                setErrors(prevErrors => ({
                                    ...prevErrors,
                                    describePersonality: "",
                                }));
                            }
                        }} />
                    {formData?.describePersonality?.length === 0 && (
                        <div className="flex flex-wrap gap-1 mb-1 mt-1">
                            <span className="bg-blue-100 text-black-700 px-2 py-1 text-xs rounded-full flex items-center">
                                Example: Creative &times;
                            </span>
                        </div>
                    )}

                    {errors.describePersonality && <p className="text-red-500 text-xs">{errors.describePersonality}</p>}

                </div>
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                    <h5 className="text-xs font-bold mt-5">Address</h5>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-1">
                    <div>
                        <label
                            htmlFor="fullAddress"
                            className="block text-[0.7rem] font-medium"
                        >
                            Full Address <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="fullAddress"
                            type="text"
                            placeholder="Enter Address"
                            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 text-[0.7rem] focus:outline-none focus:ring-2 focus:ring-blue-200"
                            value={formData?.fullAddress}
                            onChange={handleInputChange}
                        />
                        {errors.fullAddress && <p className="text-red-500 text-xs">{errors.fullAddress}</p>}

                    </div>
                </div>

                <div className="flex justify-end mt-6 gap-5 text-xs">
                    {false && (
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
                    )}
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
        </OnboardingFormTemplate>
    );
}

export default PrincipalForm;
