"use client";

import type React from "react";
import { useEffect, useState } from "react";
import ImageUploadSection from "../ImageUploadSection";
import OnboardingFormTemplate from "../OnboardingFormTemplate";
import { useRouter } from "next/navigation";
import { validateField } from "@/utils/formValidation";
import { clearMultipleLocalStorageItems } from "@/utils/localStorageClear";
import LoaderTextButton from "@/components/atom/buttons/LoaderTextButton";
import { getDataFromLocalStorage } from "@/utils/hooks/useFormLocalData";
import { BOARD_OPTIONS, CAMPUS_TYPE_OPTIONS, COED_STATUS_OPTIONS, OWNERSHIP_OPTIONS } from "@/utils/selectOptions/options";

const fieldLabels: Record<string, string> = {
  schoolName: "School Name",
  registration: "Registration No.",
  email: "Email Address",
  phone: "Phone Number",
  website: "Website",
  plot: "Plot No.",
  address1: "Address 1",
  landmark: "Landmark",
  city: "City",
  state: "State",
  pincode: "Pincode",
  ownership: "Ownership",
  board: "Board",
  year: "Year of Establishment",
  coedStatus: "Co-ed Status",
  campusArea: "Campus Area",
  campusType: "Campus Type",
  logoImage: "Logo",
  coverImage: "Banner",
};

type LocationData = {
  latitude: string;
  longitude: string;
};

const initialFormData = Object.keys(fieldLabels).reduce((acc, key) => {
  if (!["logoImage", "coverImage"].includes(key)) {
    acc[key] = "";
  }
  return acc;
}, {} as Record<string, string>);

const SchoolOnboarding = () => {

  const [loading, setLoading] = useState(false);
  const [skipLoader, setSkipLoader] = useState(false);
  const [logoImage, setLogoImage] = useState<string | null>(null);
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [formData, setFormData] = useState(initialFormData);
  const [isPrefilled, setIsPrefilled] = useState<{ [key: string]: boolean }>({});
  const [latLong, setLatLong] = useState<any>({ latitude: 0, longitude: 0 })

  const [errors, setErrors] = useState<Record<string, string | null>>({});

  const router = useRouter()

  useEffect(() => {
    clearMultipleLocalStorageItems("school")
    const saved: any = localStorage.getItem("school-data")
    if (saved) {
      let schoolData = JSON.parse(saved)
      const newFormData = {
        schoolName: schoolData?.name || "",
        registration: schoolData?.registration_number || "",
        website: schoolData?.contact_info?.website || "",
        email: schoolData?.contact_info?.email || "",
        phone: schoolData?.contact_info?.phone || "",
        plot: schoolData?.school_location?.plotNo || "",
        address1: schoolData?.school_location?.address || "",
        landmark: schoolData?.school_location?.landmark || "",
        city: schoolData?.school_location?.city || "",
        state: schoolData?.school_location?.state || "",
        pincode: schoolData?.school_location?.pincode || "",
        campusArea: schoolData?.campus_area || "",
        campusType: schoolData?.campus_type || "",
        year: schoolData?.year_of_establishment,
        coedStatus: schoolData?.gender_specific,
        ownership: schoolData?.ownership,
        board: schoolData?.boards,
      };
      setFormData((prev) => ({ ...prev, ...newFormData }));
      setLogoImage(schoolData?.logo_link)
      setCoverImage(schoolData?.banner)
      setLatLong({
        latitude: schoolData?.school_location?.latitude || "0",
        longitude: schoolData?.school_location?.longitude || "0",
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
        schoolName: parseData?.name || "",
        registration: parseData?.registrationNumber || "",
        website: parseData?.website || "",
        email: parseData?.email || "",
        phone: parseData?.mobile || "",
        plot: addressParseData?.plot || "",
        address1: addressParseData?.address || "",
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
  }, []);

  useEffect(() => {
    if (logoImage) {
      setErrors((prev) => ({ ...prev, logoImage: null }));
    }
  }, [logoImage]);

  // Clear banner error when coverImage changes
  useEffect(() => {
    if (coverImage) {
      setErrors((prev) => ({ ...prev, coverImage: null }));
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
        localStorage.setItem("onboarding_skipped", "true");
        // router.push("/subscription/subscription-plans");
        router.push("/dashboard");
      } catch (error) {
        console.error("SchoolOnboarding-182, Navigation error:", error);
        setSkipLoader(false);
      }
    }, 100);
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

    if (hasErrors) return;
    setLoading(true)
    try {
      const contactInfo: { email: string; phone: string; website?: string } = {
        email: formData?.email,
        phone: formData?.phone,
      };

      if (formData.website?.trim()) {
        contactInfo.website = formData.website.trim();
      }

      const locationValue = [
        formData.plot,         // e.g., "Plot no-503A"
        formData.address1,     // e.g., "Krishna Tower"
        formData.landmark,     // e.g., "Main Bypass Rd"
        formData.city,         // e.g., "Jaipur"
        formData.state,        // e.g., "Rajasthan"
        formData.pincode       // e.g., "302015"
      ]
        .filter(item => item && item.trim() !== "")  // skip empty
        .join(", ")                                   // join with commas
        .trim();

      const schoolData = {
        name: formData.schoolName,
        registration_number: formData.registration,
        logo_link: logoImage || "",
        banner: coverImage || "",
        year_of_establishment: formData.year,
        contact_info: contactInfo,
        ownership: formData.ownership,
        campus_type: formData.campusType,
        gender_specific: formData.coedStatus,
        boards: Array.isArray(formData.board) ? formData.board : [formData.board],
        campus_area: formData.campusArea,
        school_location: {
          location_value: locationValue,
          latitude: latLong?.latitude,
          longitude: latLong?.longitude,
          plotNo: formData?.plot,
          address: formData?.address1,
          landmark: formData?.landmark,
          city: formData?.city,
          state: formData?.state,
          country: "India",
          pincode: formData?.pincode,

        }
      };
      const existingData = localStorage.getItem("school-data");
      let mergedData = schoolData;

      if (existingData) {
        const parsedExisting = JSON.parse(existingData);
        mergedData = {
          ...parsedExisting,
          ...schoolData,
        };
      }
      localStorage.setItem("school-data", JSON.stringify(mergedData));
      setTimeout(()=>{
      router.push("/onboarding-school/fees-structure");
      setLoading(false)
      },500)
    } catch {
      setLoading(false)
    }
  };

  return (
    <OnboardingFormTemplate className="bg-white p-5">
      <div className="w-full text-deepBlue">
        <h4 className="text-md lg:text-[0.9rem] font-semibold text-left">Add School</h4>
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

      {errors.logoImage && (
        <p className="text-red-500 text-xs mt-1">{errors.logoImage}</p>
      )}

      <div className="w-full p-4 text-deepBlue">
        <div className="mb-4">
          <label htmlFor="schoolName" className="block text-[0.7rem] font-medium">
            School Name <span className="text-red-500">*</span>
          </label>
          <input
            id="schoolName"
            type="text"
            name="schoolName"
            value={formData.schoolName}
            disabled={isPrefilled.schoolName}
            onChange={handleChange}
            className={`mt-1 block w-full border ${errors.schoolName ? "border-red-500" : "border-gray-300"
              } rounded px-3 py-2 text-sm`}
            placeholder="Enter school name"
          />
          {errors.schoolName && (
            <p className="text-red-500 text-xs mt-1">{errors.schoolName}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { id: "registration", label: "Registration No." },
            { id: "website", label: "School Website" },
            { id: "email", label: "Email Address" },
            { id: "phone", label: "Phone Number" },
            { id: "plot", label: "Plot No." },
            { id: "address1", label: "Address 1" },
            { id: "landmark", label: "Landmark" },
            { id: "city", label: "City" },
            { id: "state", label: "State" },
            { id: "pincode", label: "Pincode" },
          ].map((field) => (
            <div key={field.id}>
              <label htmlFor={field.id} className="block text-[0.7rem] font-medium">
                {field.label}{field.id !== "website" && <span className="text-red-500">*</span>}
              </label>
              <input
                id={field.id}
                type="text"
                name={field.id}
                value={formData[field.id as keyof typeof formData]}
                onChange={handleChange}
                disabled={
                  ["registration", "email", "phone"].includes(field.id) && isPrefilled[field.id]
                }
                className={`mt-1 block w-full border ${field.id !== "website" && errors[field.id] ? "border-red-500" : "border-gray-300"
                  } rounded px-3 py-2 text-sm`}
                placeholder={`Enter ${field.label.toLowerCase()}`}
              />
              {field.id !== "website" && errors[field.id] && (
                <p className="text-red-500 text-xs mt-1">{errors[field.id]}</p>
              )}
            </div>
          ))}
        </div>

        <h5 className="text-xs font-bold mt-6 mb-3">Key School Statistics</h5>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { id: "ownership", label: "Ownership", type: "select", options: OWNERSHIP_OPTIONS },
            { id: "board", label: "Board", type: "select", options: BOARD_OPTIONS },
            { id: "year", label: "Year of Establishment", type: "year" },
            { id: "coedStatus", label: "Co-ed Status", type: "select", options: COED_STATUS_OPTIONS },
            { id: "campusType", label: "Campus Type", type: "select", options: CAMPUS_TYPE_OPTIONS },
            { id: "campusArea", label: "Campus Area", type: "input" },
          ].map(({ id, label, type, options }) => (
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
                  className={`border ${errors[id] ? "border-red-500" : "border-gray-300"} rounded px-3 py-2 text-sm`}
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
                  className={`border ${errors[id] ? "border-red-500" : "border-gray-300"} rounded px-3 py-2 text-sm`}
                >
                  {options?.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              ) : (
                <input
                  id={id}
                  name={id}
                  type="text"
                  value={formData[id as keyof typeof formData]}
                  onChange={handleChange}
                  className={`border ${errors[id] ? "border-red-500" : "border-gray-300"} rounded px-3 py-2 text-sm`}
                  placeholder={`Enter ${label.toLowerCase()}`}
                />
              )}
              {errors[id] && <p className="text-red-500 text-xs mt-1">{errors[id]}</p>}
            </div>
          ))}
        </div>

        <div className="flex justify-end mt-6 gap-5 text-xs">
          {false && (
            <LoaderTextButton
              withBackground={false}
              fontBold={true}
              buttonName="Skip All"
              textColor="#2E90FA"
              textSize="0.7rem"
              onClick={handleSkip}
              isLoading={skipLoader}
            />
          )}
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

export default SchoolOnboarding;
