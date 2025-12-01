import React, {
  useState,
  useImperativeHandle,
  ChangeEvent,
  forwardRef,
} from "react";
import { useRegisterMutation } from "@/features/api/authApiSlice";
import { useDispatch } from "react-redux";
import { RegisterData } from "@/types/auth.types";
import { setCredentials } from "../../../features/auth/authSlice";

interface BasicInfoFormProps {
  onValidationChange: (isValid: boolean) => void;
  onNext: () => void;
}

export interface BasicInfoFormRef {
  submitForm: () => Promise<void>;
}

interface FormData {
  firstName: string;
  dateOfBirth: string;
  phoneNumber: string;
  email: string;
  gender: string;
  address1: string;
  landmark: string;
  city: string;
  state: string;
  pincode: string;
}

// Reusable field components
const InputField: React.FC<{
  label: string;
  name: keyof FormData;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  errorMessage?: string;
  required?: boolean;
}> = ({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  errorMessage,
  required,
}) => (
  <div>
    <label className="block mb-1 font-medium">
      {label} {required && <span className="text-red-500">*</span>}
    </label>

    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full border border-gray-300 rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-blue-200 outline-none"
    />
    {errorMessage && <p className="text-red-500 text-xs">{errorMessage}</p>}
  </div>
);

const SelectField: React.FC<{
  label: string;
  name: keyof FormData;
  options: string[];
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  errorMessage?: string;
  required?: boolean;
}> = ({ label, name, options, value, onChange, errorMessage, required }) => (
  <div>
    <label className="block mb-1 font-medium">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="w-full border border-gray-300 rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-blue-200 outline-none"
    >
      <option value="">Select {label}</option>
      {options.map((opt, idx) => (
        <option key={idx} value={opt}>
          {opt}
        </option>
      ))}
    </select>
    {errorMessage && <p className="text-red-500 text-xs">{errorMessage}</p>}
  </div>
);

const DateInput: React.FC<{
  label: string;
  name: keyof FormData;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  errorMessage?: string;
  required?: boolean;
}> = ({ label, name, value, onChange, errorMessage, required }) => (
  <div>
    <label className="block mb-1 font-medium">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type="date"
      name={name}
      value={value}
      onChange={onChange}
      placeholder="DD/MM/YYYY"
      className="w-full border border-gray-300 rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-blue-200 outline-none"
    />
    {errorMessage && <p className="text-red-500 text-xs">{errorMessage}</p>}
  </div>
);

// Validation schema
const validationSchema: Record<
  keyof FormData,
  {
    required?: boolean;
    regex?: RegExp;
    requiredMessage?: string;
    regexMessage?: string;
  }
> = {
  firstName: {
    required: true,
    requiredMessage: "First name is required",
  },
  dateOfBirth: {
    required: true,
    // regex: /^\d{2}\/\d{2}\/\d{4}$/,
    requiredMessage: "Date of birth is required",
    // regexMessage: "Use DD/MM/YYYY format",
  },
  phoneNumber: {
    required: true,
    regex: /^\d{10}$/,
    requiredMessage: "Phone number is required",
    regexMessage: "Phone number must be 10 digits",
  },
  email: {
    required: true,
    regex: /\S+@\S+\.\S+/,
    requiredMessage: "Email is required",
    regexMessage: "Invalid email format",
  },
  gender: {
    required: true,
    requiredMessage: "Gender is required",
  },
  address1: {
    required: true,
    requiredMessage: "Address is required",
  },
  landmark: {
    required: true,
    requiredMessage: "Landmark is required",
  },
  city: {
    required: true,
    requiredMessage: "City is required",
  },
  state: {
    required: true,
    requiredMessage: "State is required",
  },
  pincode: {
    required: true,
    regex: /^\d{6}$/,
    requiredMessage: "Pincode is required",
    regexMessage: "Pincode must be 6 digits",
  },
};

// Optimized validation function
const validateForm = (
  data: FormData
): Partial<Record<keyof FormData, string>> => {
  const errors: Partial<Record<keyof FormData, string>> = {};

  for (const [field, rules] of Object.entries(validationSchema)) {
    const value = data[field as keyof FormData].trim();

    if (rules.required && !value) {
      errors[field as keyof FormData] = rules.requiredMessage;
    } else if (rules.regex && value && !rules.regex.test(value)) {
      errors[field as keyof FormData] = rules.regexMessage;
    }
  }

  return errors;
};

const BasicInfoForm = forwardRef<BasicInfoFormRef, BasicInfoFormProps>(
  ({ onValidationChange, onNext }, ref) => {
    const [formData, setFormData] = useState<FormData>({
      firstName: "",
      dateOfBirth: "",
      phoneNumber: "",
      email: "",
      gender: "",
      address1: "",
      landmark: "",
      city: "",
      state: "",
      pincode: "",
    });

    const [errors, setErrors] = useState<
      Partial<Record<keyof FormData, string>>
    >({});
    const [apiError, setApiError] = useState<string | null>(null);

    const [register, { isLoading }] = useRegisterMutation();
    const dispatch = useDispatch();

    const handleChange = (
      e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
      setErrors((prev) => ({ ...prev, [name]: undefined }));
      setApiError(null);
    };

    const submitForm = async () => {
      const validationErrors = validateForm(formData);
      setErrors(validationErrors);
      if (Object.keys(validationErrors).length === 0) {
        try {
          const registerData: RegisterData = {
            ...formData,
            lastName: "",
          };
          const result = await register(registerData).unwrap();
          if (result) {
            dispatch(
              setCredentials({
                user: result.user,
                token: result.tokens.access.token,
                refreshToken: result.tokens.refresh.token
              })
            );
          }
          onNext();
        } catch (err: any) {
          setApiError(
            err.data?.message || "Registration failed. Please try again."
          );
        }
      }
    };

    useImperativeHandle(ref, () => ({
      submitForm,
    }));

    React.useEffect(() => {
      const isValid = Object.keys(validateForm(formData)).length === 0;
      onValidationChange(isValid);
    }, [formData, onValidationChange]);

    return (
      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Basic Info</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <InputField
            label="First Name"
            name="firstName"
            placeholder="Enter full name"
            value={formData.firstName}
            onChange={handleChange}
            errorMessage={errors.firstName}
            required
          />
          <DateInput
            label="Date of Birth"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            errorMessage={errors.dateOfBirth}
            required
          />
          <InputField
            label="Mobile Number"
            name="phoneNumber"
            placeholder="Enter mobile number"
            value={formData.phoneNumber}
            onChange={handleChange}
            errorMessage={errors.phoneNumber}
            required
          />
          <InputField
            label="Email"
            name="email"
            placeholder="Enter email Id"
            type="email"
            value={formData.email}
            onChange={handleChange}
            errorMessage={errors.email}
            required
          />
          <SelectField
            label="Gender"
            name="gender"
            options={["Male", "Female", "Other"]}
            value={formData.gender}
            onChange={handleChange}
            errorMessage={errors.gender}
            required
          />
          <InputField
            label="Address 1"
            name="address1"
            placeholder="Enter address"
            value={formData.address1}
            onChange={handleChange}
            errorMessage={errors.address1}
            required
          />
          <InputField
            label="Landmark"
            name="landmark"
            placeholder="Enter landmark"
            value={formData.landmark}
            onChange={handleChange}
            errorMessage={errors.landmark}
            required
          />
          <InputField
            label="City"
            name="city"
            placeholder="Enter city"
            value={formData.city}
            onChange={handleChange}
            errorMessage={errors.city}
            required
          />
          <InputField
            label="State"
            name="state"
            placeholder="Select state"
            value={formData.state}
            onChange={handleChange}
            errorMessage={errors.state}
            required
          />
          <InputField
            label="Pincode"
            name="pincode"
            placeholder="Enter pincode"
            value={formData.pincode}
            onChange={handleChange}
            errorMessage={errors.pincode}
            required
          />
        </div>
        {apiError && <p className="text-red-500 mt-2">{apiError}</p>}
        {isLoading && <p className="text-gray-500 mt-2">Registering...</p>}
      </div>
    );
  }
);

BasicInfoForm.displayName = "BasicInfoForm";

export default BasicInfoForm;
