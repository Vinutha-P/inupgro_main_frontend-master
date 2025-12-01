import React, { useCallback, useEffect, useState } from "react";
import EmailVerification from "../EmailVerification";
import { BsInfoCircle } from "react-icons/bs";
import { useRouter } from "next/navigation";
import RegisteredOnboarding from "../RegisteredOnboarding";
import { useRegisterStudentMutation } from "../../../../features/api/studentsApiSlice";
import { StudentFormData, ValidationRule } from "@/types";

const validationSchema: Record<keyof StudentFormData, ValidationRule> = {
  firstName: {
    required: true,
    requiredMessage: "First name is required",
  },
  surname: {
    required: true,
    requiredMessage: "Surname is required",
  },
  email: {
    required: true,
    regex: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
    requiredMessage: "Email is required",
    regexMessage: "Enter a valid email",
  },
  dob: {
    required: true,
    requiredMessage: "Date of birth is required",
  },
  gender: {
    required: true,
    requiredMessage: "Please select gender",
  },
  phoneNumber: {
    required: true,
    regex: /^\d{10}$/,
    requiredMessage: "Phone number is required",
    regexMessage: "Enter a valid 10-digit number",
  },
  parentsName: {
    required: true,
    requiredMessage: "Parent's name is required",
  },
  parentsSurname: {
    required: true,
    requiredMessage: "Parent's surname is required",
  },
  parentsEmail: {
    required: true,
    regex: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
    requiredMessage: "Parent's email is required",
    regexMessage: "Enter a valid email",
  },
  parentsPhoneNumber: {
    required: true,
    regex: /^\d{10}$/,
    requiredMessage: "Parent's phone number is required",
    regexMessage: "Enter a valid 10-digit number",
  },
  instituteType: {
    required: true,
    requiredMessage: "Institute type is required",
  },
};

const StudentRegistrationForm = ({
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
    parentsName: "",
    parentsSurname: "",
    parentsEmail: "",
    parentsPhoneNumber: "91 ",
    instituteType: selectedType,
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [apiError, setApiError] = useState<string | null>(null);
  
  const router = useRouter();
  const [registerStudent, { isLoading }] = useRegisterStudentMutation();

  const validateField = useCallback(
    (name: keyof StudentFormData, value: string): string | undefined => {
      const rules = validationSchema[name];

      if (!rules) return;

      if (rules.required && !value.trim()) {
        return rules.requiredMessage;
      }
      if (rules.regex && value.trim() && !rules.regex.test(value.trim())) {
        return rules.regexMessage;
      }
      return undefined;
    },
    []
  );

  const validateForm = useCallback(() => {
    const newErrors: Partial<Record<keyof StudentFormData, string>> = {};

    Object.entries(formData).forEach(([key, value]) => {
      let validationValue = value;
      if (key === "phoneNumber" || key === "parentsPhoneNumber") {
        validationValue = value.replace(/^91\s?/, "").trim();
      }
      const error = validateField(key as keyof StudentFormData, validationValue);
      if (error) {
        newErrors[key as keyof StudentFormData] = error;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData, validateField]);

  // const validateForm = () => {
  // 	const newErrors: { [key: string]: string } = {};

  // 	if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
  // 	if (!formData.surname.trim()) newErrors.surname = "Surname is required";
  // 	if (!formData.dob) newErrors.dob = "Date of birth is required";
  // 	if (!formData.gender) newErrors.gender = "Please select gender";

  // 	if (formData.email && !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
  // 		newErrors.email = "Enter a valid email";
  // 	}

  // 	if (!formData.phoneNumber.trim().replace(/^91\s?/, "").match(/^[0-9]{10}$/)) {
  // 		newErrors.phoneNumber = "Enter a valid 10-digit number";
  // 	}

  // 	if (!formData.parentsName.trim()) newErrors.parentsName = "Parent's name is required";
  // 	if (!formData.parentsSurname.trim()) newErrors.parentsSurname = "Parent's surname is required";

  // 	if (!formData.parentsEmail.trim()) {
  // 		newErrors.parentsEmail = "Parent's email is required";
  // 	} else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.parentsEmail)) {
  // 		newErrors.parentsEmail = "Enter a valid email";
  // 	}

  // 	if (!formData.parentsPhoneNumber.trim().replace(/^91\s?/, "").match(/^[0-9]{10}$/)) {
  // 		newErrors.parentsPhoneNumber = "Enter a valid 10-digit number";
  // 	}

  // 	setErrors(newErrors);
  // 	return Object.keys(newErrors).length === 0;
  // };

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));

    // Validate field in real-time
    let validationValue = value;
    if (id === "phoneNumber" || id === "parentsPhoneNumber") {
      validationValue = value.replace(/^91\s?/, "").trim();
    }

    const error = validateField(id as keyof StudentFormData, validationValue);
    setErrors((prev: any) => ({
      ...prev,
      [id]: error,
    }));
    setApiError(null);
  };

  const handlePhoneChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: keyof StudentFormData
  ) => {
    const value = e.target.value;
    const numericValue = value.replace(/\D/g, "").slice(0, 10);
    const formattedValue = `91 ${numericValue}`;
    setFormData((prev) => ({
      ...prev,
      [id]: formattedValue,
    }));

    // Validate phone number
    const error = validateField(id, numericValue);
    setErrors((prev: any) => ({
      ...prev,
      [id]: error,
    }));
    setApiError(null);
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${month}-${day}-${year}`;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      const response = await registerStudent({
        firstName: formData.firstName,
        lastName: formData.surname,
        dob: formatDate(formData.dob),
        gender:
          formData.gender.charAt(0).toUpperCase() + formData.gender.slice(1), // Capitalize
        studentEmail: formData.email,
        studentCountryCode: "91",
        studentMobile: formData.phoneNumber.replace(/^91\s?/, ""),
        parentFirstName: formData.parentsName,
        parentLastName: formData.parentsSurname,
        parentCountryCode: "91",
        parentMobile: formData.parentsPhoneNumber.replace(/^91\s?/, ""),
        parentEmail: formData.parentsEmail,
        instituteType: formData.instituteType,
      }).unwrap();

      if (response?.success == false) {
        setApiError(response?.message);
        return;
      }
      setDataId(response?.results?.dataId);
      setOtpId(response?.results?.otpId)
      setIsEmailModalOpen(true);
      setApiError(null);
    } catch (error: any) {
      const errorMessage =
        error?.data?.message ||
        error?.message ||
        "Failed to register. Please try again.";
      setApiError(errorMessage);
    }
  };

  const handleCancelButton = () => {
      router.push("/");
  };

  if (!hasMounted) {
    return null;
  }

  return (
    <div>
      {apiError && (
        <div className="text-red-500 text-[0.8rem] mb-4 text-left" role="alert">
          {apiError}
        </div>
      )}
      {/*  */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="firstName"
            className="block text-[0.7rem] font-medium"
          >
            First Name <span className="text-red-500">*</span>
          </label>
          <input
            id="firstName"
            type="text"
            value={formData.firstName}
            onChange={handleInputChange}
            disabled={isLoading}
            aria-invalid={!!errors.firstName}
            aria-describedby={errors.firstName ? "firstName-error" : undefined}
            placeholder="Enter your first name"
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 text-[0.7rem] focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
          {errors.firstName && (
            <p
              id="firstName-error"
              className="text-red-500 text-[0.65rem] mt-1"
              role="alert"
            >
              {errors.firstName}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="surname" className="block text-[0.7rem] font-medium">
            Surname <span className="text-red-500">*</span>
          </label>
          <input
            id="surname"
            type="text"
            value={formData.surname}
            onChange={handleInputChange}
            placeholder="Enter your surname"
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 text-[0.7rem] focus:outline-none focus:ring-2 focus:ring-blue-200"
            disabled={isLoading}
            aria-invalid={!!errors.surname}
            aria-describedby={errors.surname ? "surname-error" : undefined}
          />
          {errors.surname && (
            <p
              id="surname-error"
              className="text-red-500 text-[0.65rem] mt-1"
              role="alert"
            >
              {errors.surname}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="dob" className="block text-[0.7rem] font-medium">
            Date of Birth (DOB) <span className="text-red-500">*</span>
          </label>
          <input
            id="dob"
            type="date"
            value={formData.dob}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 text-[0.7rem] focus:outline-none focus:ring-2 focus:ring-blue-200"
            disabled={isLoading}
            aria-invalid={!!errors.dob}
            aria-describedby={errors.dob ? "dob-error" : undefined}
          />
          {errors.dob && (
            <p
              id="dob-error"
              className="text-red-500 text-[0.65rem] mt-1"
              role="alert"
            >
              {errors.dob}
            </p>
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
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 text-[0.7rem] focus:outline-none focus:ring-2 focus:ring-blue-200"
            disabled={isLoading}
            aria-invalid={!!errors.gender}
            aria-describedby={errors.gender ? "gender-error" : undefined}
          >
            <option value="">Select the gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {errors.gender && (
            <p
              id="gender-error"
              className="text-red-500 text-[0.65rem] mt-1"
              role="alert"
            >
              {errors.gender}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-[0.7rem] font-medium">
            Student Email ID
          </label>
          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="abc@xyz.com"
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 text-[0.7rem] focus:outline-none focus:ring-2 focus:ring-blue-200"
            disabled={isLoading}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email && (
            <p
              id="email-error"
              className="text-red-500 text-[0.65rem] mt-1"
              role="alert"
            >
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="phoneNumber"
            className="block text-[0.7rem] font-medium"
          >
            Student Number
          </label>
          <div className="flex items-center mt-1 border border-gray-300 rounded px-3 py-2 text-[0.7rem] focus-within:ring-2 focus-within:ring-blue-200">
            <span className="text-gray-500 mr-2 whitespace-nowrap text-xs">
              +91 |
            </span>
            <input
              id="phoneNumber"
              type="tel"
              value={formData.phoneNumber.replace(/^91\s?/, "")}
              onChange={(e) => handlePhoneChange(e, "phoneNumber")}
              placeholder="Enter phone number"
              className="flex-1 border-none outline-none text-xs"
              maxLength={10}
              disabled={isLoading}
              aria-invalid={!!errors.phoneNumber}
              aria-describedby={
                errors.phoneNumber ? "phoneNumber-error" : undefined
              }
            />
          </div>
          {errors.phoneNumber && (
            <p
              id="phoneNumber-error"
              className="text-red-500 text-[0.65rem] mt-1"
              role="alert"
            >
              {errors.phoneNumber}
            </p>
          )}
        </div>
      </div>

      <hr className="my-6 border-t border-gray-300" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div>
          <label
            htmlFor="parentsName"
            className="block text-[0.7rem] font-medium"
          >
            Parent's Name <span className="text-red-500">*</span>
          </label>
          <input
            id="parentsName"
            type="text"
            value={formData.parentsName}
            onChange={handleInputChange}
            placeholder="Enter your parent's name"
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 text-[0.7rem] focus:outline-none focus:ring-2 focus:ring-blue-200"
            disabled={isLoading}
            aria-invalid={!!errors.parentsName}
            aria-describedby={
              errors.parentsName ? "parentsName-error" : undefined
            }
          />
          {errors.parentsName && (
            <p
              id="parentsName-error"
              className="text-red-500 text-[0.65rem] mt-1"
              role="alert"
            >
              {errors.parentsName}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="parentsSurname"
            className="block text-[0.7rem] font-medium"
          >
            Parent's Surname <span className="text-red-500">*</span>
          </label>
          <input
            id="parentsSurname"
            type="text"
            value={formData.parentsSurname}
            onChange={handleInputChange}
            placeholder="Enter your parent's surname"
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 text-[0.7rem] focus:outline-none focus:ring-2 focus:ring-blue-200"
            disabled={isLoading}
            aria-invalid={!!errors.parentsSurname}
            aria-describedby={
              errors.parentsSurname ? "parentsSurname-error" : undefined
            }
          />
          {errors.parentsSurname && (
            <p
              id="parentsSurname-error"
              className="text-red-500 text-[0.65rem] mt-1"
              role="alert"
            >
              {errors.parentsSurname}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="parentsEmail"
            className="block text-[0.7rem] font-medium"
          >
            Parent's Email ID <span className="text-red-500">*</span>
          </label>
          <input
            id="parentsEmail"
            type="email"
            value={formData.parentsEmail}
            onChange={handleInputChange}
            placeholder="abc@xyz.com"
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 text-[0.7rem] focus:outline-none focus:ring-2 focus:ring-blue-200"
            disabled={isLoading}
            aria-invalid={!!errors.parentsEmail}
            aria-describedby={
              errors.parentsEmail ? "parentsEmail-error" : undefined
            }
          />
          {errors.parentsEmail && (
            <p
              id="parentsEmail-error"
              className="text-red-500 text-[0.65rem] mt-1"
              role="alert"
            >
              {errors.parentsEmail}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="parentsPhoneNumber"
            className="block text-[0.7rem] font-medium"
          >
            Parent's Number <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center mt-1 border border-gray-300 rounded px-3 py-2 text-[0.7rem] focus-within:ring-2 focus-within:ring-blue-200">
            <span className="text-gray-500 mr-2 whitespace-nowrap text-xs">
              +91 |
            </span>
            <input
              id="parentsPhoneNumber"
              type="tel"
              value={formData.parentsPhoneNumber.replace(/^91\s?/, "")}
              onChange={(e) => handlePhoneChange(e, "parentsPhoneNumber")}
              placeholder="Enter phone number"
              className="flex-1 border-none outline-none text-xs"
              maxLength={10}
              disabled={isLoading}
              aria-invalid={!!errors.parentsPhoneNumber}
              aria-describedby={
                errors.parentsPhoneNumber
                  ? "parentsPhoneNumber-error"
                  : undefined
              }
            />
          </div>
          {errors.parentsPhoneNumber && (
            <p
              id="parentsPhoneNumber-error"
              className="text-red-500 text-[0.65rem] mt-1"
              role="alert"
            >
              {errors.parentsPhoneNumber}
            </p>
          )}
        </div>
      </div>

      <div className="mt-4 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
        <div className="flex items-center text-gray-500">
          <BsInfoCircle className="w-3 h-3 mr-1" />
          <span>Fill all fields that have asterisk</span>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            className="w-20 px-4 py-2 rounded border border-gray-300 text-gray-600 hover:bg-gray-100"
            onClick={handleCancelButton}
            disabled={isLoading}
            aria-label="Cancel registration"
          >
            Cancel
          </button>
          <button
            type="button"
            className="w-20 px-4 py-2 flex justify-center rounded bg-blue-500 text-white hover:bg-blue-600"
            onClick={handleSubmit}
            disabled={isLoading}
            aria-label="Submit registration"
            // onClick={() => {
            //   if (validateForm()) {
            //     setIsEmailModalOpen(true);
            //   }
            // }}
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
          type={"student"}
          show={isRegisteredModalOpen}
          name={formData.firstName}
          onClose={() => setIsRegisteredModalOpen(false)}
        />
      )}
    </div>
  );
};

export default StudentRegistrationForm;
