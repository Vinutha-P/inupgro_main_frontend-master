import React from "react";

export const SelectField: React.FC<{
    label: string;
    options: string[];
    required?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}> = ({ label, options, required, onChange }) => (
    <div>
        <label className="block mb-1 font-medium text-[0.75rem]">
            {label}
            {required && <span className="text-red-500">*</span>}
        </label>
        <select
            className="w-full border border-gray-300 rounded-full px-2.5 py-2.5 text-[15px] placeholder:font-light text-[#374151] outline-none bg-white"
            onChange={onChange}
        >
            <option value="" className="text-[#374151]">Select {label.toLowerCase()}</option>
            {options.map((opt, idx) => (
                <option key={idx} value={opt}>
                    {opt}
                </option>
            ))}
        </select>
    </div>
);