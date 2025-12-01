import React from "react";

export const InputField: React.FC<{
    label: string;
    type?: string;
    placeholder?: string;
    required?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({
    label,
    type = "text",
    placeholder,
    required,
    onChange,
}) => (
        <div>
            <label className="block mb-1 font-medium text-[0.75rem]">
                {label}
                {required && <span className="text-red-500">*</span>}
            </label>
            <input
                type={type}
                placeholder={placeholder}
                className="w-full border border-gray-300 rounded-full px-4 py-2.5 text-[15px] placeholder:font-light placeholder:text-[#667085] outline-none"
                onChange={onChange}
            />
        </div>
    );