"use client";

import React, { useState, useEffect } from "react";
import ImageUploadSection from "../ImageUploadSection";
import OnboardingFormTemplate from "../OnboardingFormTemplate";
import { useRouter } from "next/navigation";
import { basicFields, selectFields } from "@/utils/data/collegeOnBoard/data";
import { clearMultipleLocalStorageItems } from "@/utils/localStorageClear";
import { validateField } from "@/utils/formValidation";
import { getDataFromLocalStorage } from "@/utils/hooks/useFormLocalData";
import { CollegeData } from "@/types/collegeOnboarding";
import { formatInputValue } from "@/utils/helper";
import LoaderTextButton from "@/components/atom/buttons/LoaderTextButton";

//  Field labels for user-friendly validation messages
const fieldLabels: Record<string, string> = {
    name: "College Name",
    registration_number: "Registration No.",
    collegeWebsite: "College Website",
    email: "Email Address",
    phone: "Phone Number",
    plot: "Plot No.",
    address: "Address 1",
    landmark: "Landmark",
    city: "City",
    state: "State",
    pincode: "Pincode",
    ownership: "Ownership",
    university: "University",
    year_of_establishment: "Year of Establishment",
    co_ed_status: "Co-ed Status",
    campus_area: "Campus Area",
    campus_type: "Campus Type",
    logoImage: "Logo",
    coverImage: "Banner",
};

const initialFormData = Object.keys(fieldLabels).reduce((acc, key) => {
    if (!["logoImage", "coverImage"].includes(key)) {
        acc[key] = "";
    }
    return acc;
}, {} as Record<string, string>);

const CollegeOnboarding = () => {
    const router = useRouter();
    const [skipLoader, setSkipLoader] = useState(false);
    const [logoImage, setLogoImage] = useState<string | null>(null);
    const [coverImage, setCoverImage] = useState<string | null>(null);
    const [formErrors, setFormErrors] = useState<Record<string, string | null>>({});
    const [formData, setFormData] = useState(initialFormData);
    const [loading, setLoading] = useState(false);
    const [latLong, setLatLong] = useState<any>({ latitude: 0, longitude: 0 })
    const [isPrefilled, setIsPrefilled] = useState<{ [key: string]: boolean }>({});

    useEffect(() => {
        clearMultipleLocalStorageItems("college");
        const collegeDataRaw = localStorage.getItem("college-data");

        if (collegeDataRaw) {
            const collegeData = JSON.parse(collegeDataRaw);

            const newFormData = {
                name: collegeData?.name || "",
                registration_number: collegeData?.registration_number || "",
                collegeWebsite: collegeData?.contact_info?.website || "",
                email: collegeData?.contact_info?.email || "",
                phone: collegeData?.contact_info?.phone || "",
                plot: collegeData?.college_location?.plotNo || "",
                address: collegeData?.college_location?.address || "",
                landmark: collegeData?.college_location?.landmark || "",
                city: collegeData?.college_location?.city || "",
                state: collegeData?.college_location?.state || "",
                pincode: collegeData?.college_location?.pincode || "",
                campus_area: collegeData?.campus_area || "",
                campus_type: collegeData?.campus_type || "",
                year_of_establishment: collegeData?.year_of_establishment || "",
                co_ed_status: collegeData?.gender_specific || "",
                university: collegeData?.university || "",
                ownership: collegeData?.ownership || "",
            };

            setFormData((prev) => ({ ...prev, ...newFormData }));
            setLogoImage(collegeData?.logo_link || null);
            setCoverImage(collegeData?.banner || null);

            setLatLong({
                latitude: collegeData?.college_location?.latitude || "0",
                longitude: collegeData?.college_location?.longitude || "0",
            });

            // Disable fields that are prefilled
            const filledFlags: { [key: string]: boolean } = {};
            Object.keys(newFormData).forEach((key) => {
                filledFlags[key] = newFormData[key as keyof typeof newFormData]?.trim().length > 0;
            });
            setIsPrefilled(filledFlags);

            // Don't prefill from other sources if college-data exists
            return;
        }

        let data = localStorage.getItem("institute-register");
        let addressData = localStorage.getItem("institute-register-address");
        if (data && addressData) {
            let parseData = JSON.parse(data);
            let addressParseData = JSON.parse(addressData);
            const newFormData = {
                name: parseData?.name || "",
                registration_number: parseData?.registrationNumber || "",
                collegeWebsite: parseData?.website || "",
                email: parseData?.email || "",
                phone: parseData?.mobile || "",
                plot: addressParseData?.plot || "",
                address: addressParseData?.address || "",
                landmark: addressParseData?.landmark || "",
                city: addressParseData?.city || "",
                state: addressParseData?.state || "",
                pincode: addressParseData?.pincode || "",
                campus_area: parseData?.campusArea || "",
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

    }, []);

    useEffect(() => {
        if (logoImage) {
            setFormErrors((prev) => ({ ...prev, logoImage: null }));
        }
    }, [logoImage]);

    // Clear banner error when coverImage changes
    useEffect(() => {
        if (coverImage) {
            setFormErrors((prev) => ({ ...prev, coverImage: null }));
        }
    }, [coverImage]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        const error = validateField(name, value, fieldLabels[name]);
        setFormErrors((prev) => ({ ...prev, [name]: error }));
    };

    const validateFields = (formData: { [key: string]: string }) => {
        const newErrors: { [key: string]: string } = {};

        for (const [key, value] of Object.entries(formData)) {
            const error = validateField(key, value, fieldLabels[key]);
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
        setFormErrors(mergedErrors);

        if (hasErrors) {
            setLoading(false)
            return;
        }
        setLoading(true)
        try {
            const contactInfo: { email: string; phone: string; website?: string } = {
                email: formData?.email,
                phone: formData?.phone,
                website: formData.collegeWebsite
            };

            const locationValue = [
                formData.plot,
                formData.address,
                formData.landmark,
                formData.city,
                formData.state,
                formData.pincode
            ]
                .filter(item => item && item.trim() !== "")
                .join(", ")
                .trim();

            const collegeData = {
                name: formData.name,
                registration_number: formData.registration_number,
                logo_link: logoImage || "",
                banner: coverImage || "",
                year_of_establishment: formData.year_of_establishment,
                contact_info: contactInfo,
                ownership: formData.ownership,
                campus_type: formData.campus_type,
                gender_specific: "Co-ed",
                university: formData.university,
                campus_area: formData.campus_area,
                co_ed_status: "PG-UG",
                college_location: {
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

            const existingData = localStorage.getItem("college-data");
            let mergedData = collegeData;

            if (existingData) {
                const parsedExisting = JSON.parse(existingData);
                mergedData = {
                    ...parsedExisting,
                    ...collegeData,
                };
            }
            localStorage.setItem("college-data", JSON.stringify(mergedData));
            setTimeout(()=>{
            router.push("/onboarding-college/fees-structure");
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
                    Add College
                </h4>
                <hr className="border-t border-gray-300" />
            </div>

            <ImageUploadSection
                logoImage={logoImage}
                setLogoImage={setLogoImage}
                coverImage={coverImage}
                setCoverImage={setCoverImage}
                bannerError={formErrors.coverImage}
                setError={setFormErrors}
            />
            {formErrors.logoImage && (
                <p className="text-red-500 text-xs mt-1">{formErrors.logoImage}</p>
            )}

            <div className="w-full p-4 text-deepBlue">
                <div className="mb-4">
                    <label
                        htmlFor="college-name"
                        className="block text-[0.7rem] font-medium"
                    >
                        College Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Enter college name"
                        className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                        value={formData?.name}
                        disabled={isPrefilled.name}
                        onChange={handleChange}
                    />
                    {formErrors.name && (
                        <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {basicFields?.map((field) => (
                        <div key={field.id}>
                            <label
                                htmlFor={field.id}
                                className="block text-[0.7rem] font-medium"
                            >
                                {field.label} <span className="text-red-500">*</span>
                            </label>
                            <input
                                id={field.id}
                                name={field.id}
                                type="text"
                                placeholder={field.placeholder}
                                className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 text-[0.7rem] focus:outline-none focus:ring-2 focus:ring-blue-200"
                                value={formData[field.id as keyof typeof formData]}
                                disabled={
                                    ["registration_number", "email", "phone"].includes(field.id) && isPrefilled[field.id]
                                }
                                onChange={handleChange}
                            />
                            {formErrors[field.id] && (
                                <p className="text-red-500 text-xs mt-1">{formErrors[field.id]}</p>
                            )}
                        </div>
                    ))}
                </div>

                <h5 className="text-xs font-bold mt-6 mb-3">Key College Statistics</h5>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectFields?.map(({ id, label, type, options }) => (
                        <div key={id} className="flex flex-col w-full">
                            <label htmlFor={id} className="text-[0.7rem] font-medium mb-1">
                                {label} <span className="text-red-500">*</span>
                            </label>

                            {/* Custom year dropdown */}
                            {type === "year" ? (
                                <select
                                    id={id}
                                    name={id}
                                    value={formData[id as keyof typeof formData]}
                                    onChange={handleChange}
                                    className={`border ${formErrors[id] ? "border-red-500" : "border-gray-300"} rounded px-3 py-2 text-sm`}
                                >
                                    <option value="">Select Year</option>
                                    {Array.from({ length: 50 }, (_, i) => {
                                        const year = new Date().getFullYear() - i;
                                        return (
                                            <option key={year} value={year}>
                                                {year}
                                            </option>
                                        );
                                    })}
                                </select>
                            ) : type === "select" ? (
                                <select
                                    id={id}
                                    name={id}
                                    value={formData[id as keyof typeof formData]}
                                    onChange={handleChange}
                                    className={`border ${formErrors[id] ? "border-red-500" : "border-gray-300"} rounded px-3 py-2 text-sm`}
                                >
                                    {options?.map((opt, index) => (
                                        <option key={opt} value={index == 0 ? "" : opt}>{opt}</option>
                                    ))}
                                </select>
                            ) : (
                                <input
                                    id={id}
                                    name={id}
                                    type="text"
                                    value={formData[id as keyof typeof formData]}
                                    onChange={handleChange}
                                    className={`border ${formErrors[id] ? "border-red-500" : "border-gray-300"} rounded px-3 py-2 text-sm`}
                                    placeholder={`Enter ${label.toLowerCase()}`}
                                />
                            )}
                            {formErrors[id] && <p className="text-red-500 text-xs mt-1">{formErrors[id]}</p>}
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

export default CollegeOnboarding;
