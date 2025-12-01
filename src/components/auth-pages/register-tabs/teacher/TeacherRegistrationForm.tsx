import React, { useEffect, useState } from "react";
import EmailVerification from "../EmailVerification";
import { BsInfoCircle } from "react-icons/bs";
import { useRouter } from "next/navigation";
import RegisteredOnboarding from "../RegisteredOnboarding";
import { useRegisterTeacherMutation } from "@/features/api/teacherApiSlice";

const TeacherRegistrationForm = ({
  selectedType,
  selectedTab,
}: {
  selectedType: string;
  selectedTab: string;
}) => {
  const [hasMounted, setHasMounted] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [isRegisteredModalOpen, setIsRegisteredModalOpen] = useState(false);
  const [dataId, setDataId] = useState<string | null>(null);
  const [otpId, setOtpId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    firstName: "",
    surname: "",
    email: "",
    dob: "",
    gender: "",
    phoneNumber: "91 ",
    instituteType: selectedType,
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [apiError, setApiError] = useState<string | null>(null);
  const [isTermsChecked, setIsTermsChecked] = useState(false);
  const [registerTeacher, { isLoading }] = useRegisterTeacherMutation();

  const router = useRouter();

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    } else if (!/^[a-zA-Z\s]+$/.test(formData.firstName)) {
      newErrors.firstName = "First name should contain only letters";
    }

    if (!formData.surname.trim()) {
      newErrors.surname = "Surname is required";
    } else if (!/^[a-zA-Z\s]+$/.test(formData.surname)) {
      newErrors.surname = "Surname should contain only letters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    const dobDate = new Date(formData.dob);
    const currentDate = new Date();
    const minAgeDate = new Date();
    minAgeDate.setFullYear(currentDate.getFullYear() - 18); // Minimum 18 years old

    if (!formData.dob) {
      newErrors.dob = "Date of birth is required";
    } else if (dobDate > minAgeDate) {
      newErrors.dob = "You must be at least 18 years old";
    }

    const phoneDigits = formData.phoneNumber.replace(/^91\s?/, "");
    if (!phoneDigits) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!/^\d{10}$/.test(phoneDigits)) {
      newErrors.phoneNumber = "Phone number must be 10 digits";
    }

    if (!formData.gender) {
      newErrors.gender = "Gender is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));

    if (errors[id]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[id];
        return newErrors;
      });
    }
    setApiError(null);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numericValue = value.replace(/\D/g, "").slice(0, 10);
    setFormData((prev) => ({
      ...prev,
      phoneNumber: `91 ${numericValue}`,
    }));

    if (errors.phoneNumber) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.phoneNumber;
        return newErrors;
      });
    }
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${month}-${day}-${year}`;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    if (!isTermsChecked) {
      setApiError("Please agree to the terms before submitting.");
      return;
    }
    let payloadData = {
      firstName: formData.firstName,
      lastName: formData.surname,
      dob: formatDate(formData.dob),
      gender:
        formData.gender.charAt(0).toUpperCase() + formData.gender.slice(1), // Capitalize
      email: formData.email,
      countryCode: "91",
      mobile: formData.phoneNumber.replace(/^91\s?/, ""),
      instituteType: formData.instituteType,
    };
    try {
      const response = await registerTeacher(payloadData).unwrap();
      if (response?.success) {
        setDataId(response.results.dataId);
        setOtpId(response.results.otpId);
        setIsEmailModalOpen(true);
        setApiError(null);
      } else {
        console.log("response", response);
        setApiError(response?.message);
        setDataId(null);
      }
    } catch (error: any) {
      console.log("error", error);
      const errorMessage =
        error?.data?.message ||
        error?.message ||
        "Failed to register. Please try again.";
      setApiError(errorMessage);
    }
  };

  if (!hasMounted) {
    return null;
  }

  const handleCancelButton = () => {
    router.push("/");
  };

  return (
    <div>
      {apiError && (
        <div className="text-red-500 text-[0.8rem] mb-4 text-left" role="alert">
          {apiError}
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          {
            id: "firstName",
            label: "First Name",
            placeholder: "Enter your first name",
          },
          {
            id: "surname",
            label: "Surname",
            placeholder: "Enter your surname",
          },
          {
            id: "email",
            label: "Email ID",
            placeholder: "abc@xyz.com",
          },
        ].map((field) => (
          <div key={field.id}>
            <label
              htmlFor={field.id}
              className="block text-[0.7rem] font-medium"
            >
              {field.label} <span className="text-red-500">*</span>
            </label>
            <input
              id={field.id}
              type="text"
              value={formData[field.id as keyof typeof formData]}
              onChange={handleInputChange}
              disabled={isLoading}
              placeholder={field.placeholder}
              className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 text-[0.7rem] focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
            {errors[field.id] && (
              <p className="text-red-500 text-[0.65rem] mt-1">
                {errors[field.id]}
              </p>
            )}
          </div>
        ))}

        <div>
          <label htmlFor="dob" className="block text-[0.7rem] font-medium">
            Date of Birth (DOB) <span className="text-red-500">*</span>
          </label>
          <input
            id="dob"
            type="date"
            value={formData.dob}
            onChange={handleInputChange}
            disabled={isLoading}
            max={new Date().toISOString().split("T")[0]} // Prevent future dates
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 text-[0.7rem] focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
          {errors.dob && (
            <p className="text-red-500 text-[0.65rem] mt-1">{errors.dob}</p>
          )}
        </div>

        <div>
          <label htmlFor="gender" className="block text-[0.7rem] font-medium">
            Gender <span className="text-red-500">*</span>
          </label>
          <select
            id="gender"
            value={formData.gender}
            onChange={handleInputChange}
            disabled={isLoading}
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 text-[0.7rem] focus:outline-none focus:ring-2 focus:ring-blue-200"
          >
            <option value="">Select the gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors.gender && (
            <p className="text-red-500 text-[0.65rem] mt-1">{errors.gender}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="phoneNumber"
            className="block text-[0.7rem] font-medium"
          >
            Mobile Number <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center mt-1 border border-gray-300 rounded px-3 py-2 text-[0.7rem] focus-within:ring-2 focus-within:ring-blue-200">
            <span className="text-gray-500 mr-2 whitespace-nowrap text-xs">
              +91 |
            </span>
            <input
              id="phoneNumber"
              type="tel"
              value={formData.phoneNumber.replace(/^91\s?/, "")}
              onChange={handlePhoneChange}
              disabled={isLoading}
              placeholder="Enter phone number"
              className="flex-1 border-none outline-none text-xs"
              maxLength={10}
            />
          </div>
          {errors.phoneNumber && (
            <p className="text-red-500 text-[0.65rem] mt-1">
              {errors.phoneNumber}
            </p>
          )}
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
            <label
              htmlFor="importantFields"
              className="flex items-center text-sm"
            >
              <BsInfoCircle className="w-3 h-3 mr-1" />
              <span>Fill all fields that have asterisk</span>
            </label>
          </div>
          {!isTermsChecked && apiError && (
            <span className="text-red-500 text-[0.65rem] mt-1 block">
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
            type="button"
            className="w-20 px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 flex justify-center items-center"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              "Next"
            )}
          </button>
        </div>
      </div>

      {isEmailModalOpen && (
        <EmailVerification
          show={isEmailModalOpen}
          email={formData.email}
          dataId={dataId}
          otpId={otpId}
          onClose={() => setIsEmailModalOpen(false)}
          onVerified={() => {
            setIsEmailModalOpen(false);
            setTimeout(() => {
              setIsRegisteredModalOpen(true);
            }, 100);
          }}
          selectedType={formData.instituteType}
          selectedTab={selectedTab}
        />
      )}

      {isRegisteredModalOpen && (
        <RegisteredOnboarding
          type={"teacher"}
          show={isRegisteredModalOpen}
          name={formData.firstName}
          onClose={() => setIsRegisteredModalOpen(false)}
        />
      )}
    </div>
  );
};

export default TeacherRegistrationForm;
