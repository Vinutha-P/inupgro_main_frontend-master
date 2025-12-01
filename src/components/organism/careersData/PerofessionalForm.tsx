// import React, { useState, ChangeEvent, FormEvent } from "react";

// interface ProfessionalFormData {
//   education: string;
//   experience: string;
//   school: string;
//   expertise: string;
//   class: string;
//   joining: string;
//   resume: File | null;
// }

// // Reusable InputField Component
// interface InputFieldProps {
//   label: string;
//   name: keyof ProfessionalFormData;
//   type?: string;
//   placeholder?: string;
//   required?: boolean;
//   value: string;
//   onChange: (e: ChangeEvent<HTMLInputElement>) => void;
// }

// const InputField: React.FC<InputFieldProps> = ({
//   label,
//   name,
//   type = "text",
//   placeholder,
//   required,
//   value,
//   onChange,
// }) => (
//   <div>
//     <label className="block mb-1 font-medium">
//       {label}
//       {required && <span className="text-red-500">*</span>}
//     </label>
//     <input
//       type={type}
//       name={name}
//       value={value}
//       onChange={onChange}
//       placeholder={placeholder}
//       className="w-full border border-gray-300 rounded-md px-3 py-2"
//     />
//   </div>
// );

// // Reusable SelectField Component
// interface SelectFieldProps {
//   label: string;
//   name: keyof ProfessionalFormData;
//   options: string[];
//   required?: boolean;
//   value: string;
//   onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
// }

// const SelectField: React.FC<SelectFieldProps> = ({
//   label,
//   name,
//   options,
//   required,
//   value,
//   onChange,
// }) => (
//   <div>
//     <label className="block mb-1 font-medium">
//       {label}
//       {required && <span className="text-red-500">*</span>}
//     </label>
//     <select
//       name={name}
//       value={value}
//       onChange={onChange}
//       className="w-full border border-gray-300 rounded-md px-3 py-2"
//     >
//       <option value="">Select {label.toLowerCase()}</option>
//       {options.map((opt, idx) => (
//         <option key={idx} value={opt}>
//           {opt}
//         </option>
//       ))}
//     </select>
//   </div>
// );

// const ProfessionalForm: React.FC = () => {
//   const [formData, setFormData] = useState<ProfessionalFormData>({
//     education: "",
//     experience: "",
//     school: "",
//     expertise: "",
//     class: "",
//     joining: "",
//     resume: null,
//   });

//   const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0] || null;
//     setFormData((prev) => ({ ...prev, resume: file }));
//   };

//   const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     console.log("Form submitted:", formData);
//   };

//   return (
//     <div>
//       <h3 className="text-lg font-semibold text-gray-700 mb-4">Professional Info</h3>

//       <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
//         <SelectField
//           label="Higher education"
//           name="education"
//           options={["Bachelor's Degree", "Master's Degree", "Ph.D."]}
//           required
//           value={formData.education}
//           onChange={handleChange}
//         />

//         <InputField
//           label="Year of experience"
//           name="experience"
//           placeholder="Enter experience"
//           required
//           value={formData.experience}
//           onChange={handleChange}
//         />

//         <div className="col-span-2">
//           <InputField
//             label="Current working school"
//             name="school"
//             placeholder="Enter school name"
//             required
//             value={formData.school}
//             onChange={handleChange}
//           />
//         </div>

//         <SelectField
//           label="Expertise"
//           name="expertise"
//           options={["Mathematics", "Science", "English", "Computer Science"]}
//           required
//           value={formData.expertise}
//           onChange={handleChange}
//         />

//         <InputField
//           label="Class"
//           name="class"
//           placeholder="Enter class"
//           required
//           value={formData.class}
//           onChange={handleChange}
//         />

//         <SelectField
//           label="Joining"
//           name="joining"
//           options={["Immediate", "Within 1 month", "Within 3 months"]}
//           required
//           value={formData.joining}
//           onChange={handleChange}
//         />

//         {/* Resume Upload */}
//         <div>
//           <label className="block mb-1 font-medium">
//             Resume<span className="text-red-500">*</span>
//           </label>
//           <div className="flex items-center space-x-3">
//             <label className="cursor-pointer flex items-center px-4 py-2 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-50">
//               <span>📎</span>
//               <span className="ml-2">Upload resume</span>
//               <input
//                 type="file"
//                 accept=".pdf,.doc,.docx"
//                 onChange={handleFileChange}
//                 className="hidden"
//               />
//             </label>
//             <span className="text-xs text-gray-500">pdf, doc, docx (≤ 2MB)</span>
//           </div>
//           {formData.resume && (
//             <div className="text-xs mt-1 text-gray-600">
//               Selected: {formData.resume.name}
//             </div>
//           )}
//         </div>

//       </form>
//     </div>
//   );
// };

// export default ProfessionalForm;

import React, {
  useState,
  useImperativeHandle,
  ChangeEvent,
  forwardRef,
  useEffect,
} from "react";
import { useDispatch } from "react-redux";
import { setProfessionalInfo } from "@/features/jobApplication/jobApplicationSlice";
import { useGetPresignedUrlMutation } from "@/features/api/s3ApiSlice";
import axios from "axios";
import { ProfessionalFormData } from "@/types";

interface ProfessionalFormProps {
  onValidationChange: (isValid: boolean) => void;
  onNext: () => void;
}

export interface ProfessionalFormRef {
  submitForm: () => Promise<void>;
}

interface FormData {
  education: string;
  experience: string;
  school: string;
  expertise: string;
  class: string;
  joining: string;
  resume: File | null;
}

// Reusable field components
const InputField: React.FC<{
  label: string;
  name: keyof FormData;
  type?: string;
  placeholder?: string;
  required?: boolean;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  errorMessage?: string;
}> = ({
  label,
  name,
  type = "text",
  placeholder,
  required,
  value,
  onChange,
  errorMessage,
}) => (
  <div>
    <label className="block mb-1 font-medium">
      {label}
      {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full border border-gray-300 rounded-md px-3 py-2"
    />
    {errorMessage && <p className="text-red-500 text-xs">{errorMessage}</p>}
  </div>
);

const SelectField: React.FC<{
  label: string;
  name: keyof FormData;
  options: string[];
  required?: boolean;
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  errorMessage?: string;
}> = ({ label, name, options, required, value, onChange, errorMessage }) => (
  <div>
    <label className="block mb-1 font-medium">
      {label}
      {required && <span className="text-red-500">*</span>}
    </label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="w-full border border-gray-300 rounded-md px-3 py-2"
    >
      <option value="">Select {label.toLowerCase()}</option>
      {options.map((opt, idx) => (
        <option key={idx} value={opt}>
          {opt}
        </option>
      ))}
    </select>
    {errorMessage && <p className="text-red-500 text-xs">{errorMessage}</p>}
  </div>
);

// Validation schema
const validationSchema: Record<
  keyof Omit<FormData, "resume">,
  {
    required?: boolean;
    min?: number;
    requiredMessage?: string;
    minMessage?: string;
  }
> = {
  education: {
    required: true,
    requiredMessage: "Higher education is required",
  },
  experience: {
    required: true,
    min: 0,
    requiredMessage: "Years of experience is required",
    minMessage: "Experience cannot be negative",
  },
  school: {
    required: true,
    requiredMessage: "Current school is required",
  },
  expertise: {
    required: true,
    requiredMessage: "Expertise is required",
  },
  class: {
    required: true,
    requiredMessage: "Class is required",
  },
  joining: {
    required: true,
    requiredMessage: "Joining preference is required",
  },
};

// Optimized validation function
const validateForm = (
  data: FormData
): Partial<Record<keyof FormData, string>> => {
  const errors: Partial<Record<keyof FormData, string>> = {};

  for (const [field, rules] of Object.entries(validationSchema)) {
    const value = data[field as keyof Omit<FormData, "resume">].trim();
    if (rules.required && !value) {
      errors[field as keyof FormData] = rules.requiredMessage;
    } else if (rules.min !== undefined && parseInt(value) < rules.min) {
      errors[field as keyof FormData] = rules.minMessage;
    }
  }

  if (!data.resume) {
    errors.resume = "Resume is required";
  }

  return errors;
};

const ProfessionalForm = forwardRef<ProfessionalFormRef, ProfessionalFormProps>(
  ({ onValidationChange, onNext }, ref) => {
    const [formData, setFormData] = useState<FormData>({
      education: "",
      experience: "",
      school: "",
      expertise: "",
      class: "",
      joining: "",
      resume: null,
    });
    const [errors, setErrors] = useState<
      Partial<Record<keyof FormData, string>>
    >({});
    const [uploadError, setUploadError] = useState<string | null>(null);
    const [resumeUrl, setResumeUrl] = useState<string | null>(null);
    const baseURL = process.env.NEXT_PUBLIC_API_URL;
    
    const dispatch = useDispatch();
    const [getPresignedUrl, { isLoading: isPresignedUrlLoading }] =
      useGetPresignedUrlMutation();

    const handleChange = (
      e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    };

    const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0] || null;
      if (file) {
        // Validate file size (≤ 2MB)
        if (file.size > 2 * 1024 * 1024) {
          setErrors((prev) => ({ ...prev, resume: "File size must be ≤ 2MB" }));
          return;
        }
        // Validate file type
        const allowedTypes = [
          "application/pdf",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ];
        if (!allowedTypes.includes(file.type)) {
          setErrors((prev) => ({
            ...prev,
            resume: "File must be PDF, DOC, or DOCX",
          }));
          return;
        }
        setFormData((prev) => ({ ...prev, resume: file }));
        setErrors((prev) => ({ ...prev, resume: undefined }));
      }
    };

    const uploadToS3 = async (file: File): Promise<any> => {
      try {
        const bucketName = "Inupgro-prod";
        const fileName = encodeURIComponent(file.name);
        const key = `${bucketName}/resume/resumes/${Date.now()}_${fileName}`;
        const res = await fetch(
          `${baseURL}/v1/s3?bucketName=${bucketName}&key=${key}`
        );

        if (!res.ok) throw new Error("Failed to get pre-signed URL");
        const presignedUrl = await res.text();

        if (!presignedUrl.startsWith("https://")) {
          throw new Error("Invalid pre-signed URL received.");
        }
        const uploadRes = await fetch(presignedUrl, {
          method: "PUT",
          headers: {
            "Content-Type": file.type,
          },
          body: file,
        });

        if (uploadRes.ok) {
          const cleanUrl = presignedUrl.split("?")[0];
          return cleanUrl;
        } else {
          console.error("Upload to S3 failed");
        }
      } catch (error: any) {
        console.log("error????", error);
        throw new Error(error.data?.message || "Failed to upload resume to S3");
      }
    };

    const submitForm = async () => {
      const validationErrors = validateForm(formData);
      setErrors(validationErrors);

      if (Object.keys(validationErrors).length === 0 && formData.resume) {
        try {
          setUploadError(null);
          const s3Url = await uploadToS3(formData.resume);
          console.log("s3Url", s3Url);
          setResumeUrl(s3Url);

          const professionalData: ProfessionalFormData = {
            higherEducation: formData.education,
            yearsOfExperience: parseInt(formData.experience) || 0,
            currentSchool: formData.school,
            expertise: formData.expertise,
            class: formData.class,
            expectedJoiningDate: formData.joining,
            documents: [{ type: formData.resume.type, url: s3Url }],
          };

          dispatch(setProfessionalInfo(professionalData));
          onNext();
        } catch (error: any) {
          setUploadError(error.message || "Failed to upload resume");
        }
      }
    };

    useImperativeHandle(ref, () => ({
      submitForm,
    }));

    useEffect(() => {
      const isValid = Object.keys(validateForm(formData)).length === 0;
      onValidationChange(isValid);
    }, [formData, onValidationChange]);

    return (
      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          Professional Info
        </h3>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm"
        >
          <SelectField
            label="Higher education"
            name="education"
            options={["Bachelor's Degree", "Master's Degree", "Ph.D."]}
            required
            value={formData.education}
            onChange={handleChange}
            errorMessage={errors.education}
          />
          <InputField
            label="Year of experience"
            name="experience"
            type="number"
            placeholder="Enter experience"
            required
            value={formData.experience}
            onChange={handleChange}
            errorMessage={errors.experience}
          />
          <div className="col-span-2">
            <InputField
              label="Current working school"
              name="school"
              placeholder="Enter school name"
              required
              value={formData.school}
              onChange={handleChange}
              errorMessage={errors.school}
            />
          </div>
          <SelectField
            label="Expertise"
            name="expertise"
            options={["Mathematics", "Science", "English", "Computer Science"]}
            required
            value={formData.expertise}
            onChange={handleChange}
            errorMessage={errors.expertise}
          />
          <InputField
            label="Class"
            name="class"
            placeholder="Enter class"
            required
            value={formData.class}
            onChange={handleChange}
            errorMessage={errors.class}
          />
          <SelectField
            label="Joining"
            name="joining"
            options={["Immediate", "Within 1 month", "Within 3 months"]}
            required
            value={formData.joining}
            onChange={handleChange}
            errorMessage={errors.joining}
          />
          <div>
            <label className="block mb-1 font-medium">
              Resume<span className="text-red-500">*</span>
            </label>
            <div className="flex items-center space-x-3">
              <label className="cursor-pointer flex items-center px-4 py-2 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-50">
                <span>📎</span>
                <span className="ml-2">Upload resume</span>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
              <span className="text-xs text-gray-500">
                pdf, doc, docx (≤ 2MB)
              </span>
            </div>
            {formData.resume && (
              <div className="text-xs mt-1 text-gray-600">
                Selected: {formData.resume.name}
              </div>
            )}
            {errors.resume && (
              <p className="text-red-500 text-xs">{errors.resume}</p>
            )}
            {uploadError && (
              <p className="text-red-500 text-xs">{uploadError}</p>
            )}
            {isPresignedUrlLoading && (
              <p className="text-gray-500 text-xs">Uploading...</p>
            )}
          </div>
        </form>
      </div>
    );
  }
);

ProfessionalForm.displayName = "ProfessionalForm";

export default ProfessionalForm;
