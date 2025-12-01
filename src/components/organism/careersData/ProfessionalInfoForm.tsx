import React, { useState, ChangeEvent, FormEvent } from "react";

interface ProfessionalFormData {
  education: string;
  experience: string;
  currentSchool: string;
  expertise: string;
  className: string;
  joining: string;
}

const ProfessionalInfoForm: React.FC = () => {
  const [formData, setFormData] = useState<ProfessionalFormData>({
    education: "",
    experience: "",
    currentSchool: "",
    expertise: "",
    className: "",
    joining: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  const InputField = ({
    label,
    name,
    required = false,
    placeholder = "",
    type = "text",
  }: {
    label: string;
    name: keyof ProfessionalFormData;
    required?: boolean;
    placeholder?: string;
    type?: string;
  }) => (
    <div>
      <label className="block mb-1 font-medium">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={formData[name]}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full border border-gray-300 rounded-md px-3 py-2"
      />
    </div>
  );

  const SelectField = ({
    label,
    name,
    options,
    required = false,
  }: {
    label: string;
    name: keyof ProfessionalFormData;
    options: string[];
    required?: boolean;
  }) => (
    <div>
      <label className="block mb-1 font-medium">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <select
        name={name}
        value={formData[name]}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded-md px-3 py-2"
      >
        <option value="">Select {label.toLowerCase()}</option>
        {options.map((option, i) => (
          <option key={i} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-700 mb-4">Professional Info</h3>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <SelectField
          label="Higher education"
          name="education"
          options={["B.Tech", "B.Sc", "M.Tech"]}
          required
        />

        <InputField
          label="Year of experience"
          name="experience"
          required
        />

        <div className="col-span-2">
          <InputField
            label="Current working school"
            name="currentSchool"
            required
          />
        </div>

        <SelectField
          label="Expertise"
          name="expertise"
          options={["Math", "English", "Science"]}
          required
        />

        <InputField
          label="Class"
          name="className"
          placeholder="Enter class"
          required
        />

        <div className="col-span-2">
          <SelectField
            label="Joining"
            name="joining"
            options={["Immediate", "1 Month", "3 Months"]}
            required
          />
        </div>
      </form>
    </div>
  );
};

export default ProfessionalInfoForm;
