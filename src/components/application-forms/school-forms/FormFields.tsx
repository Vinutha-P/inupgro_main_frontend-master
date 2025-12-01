import React, { useState } from "react";
import UploadMarksList from "./UploadMarksList";

const formData = [
    {
        label: "Current School Name",
        name: "current_school_name",
        required: true,
        options: ["School A", "School B", "School C"],
    },
    {
        label: "Current Level",
        name: "current_level",
        required: true,
        options: ["Class 1st to 10th", "Class 11th & 12th"],
    },
    {
        label: "Current Medium",
        name: "current_medium",
        required: true,
        options: ["English", "Hindi", "Marathi"],
    },
    {
        label: "Preferred Medium",
        name: "preferred_medium",
        required: true,
        options: ["English", "Hindi", "Gujarati"],
    },
    {
        label: "Current Board",
        name: "current_board",
        required: true,
        options: ["CBSE", "ICSE", "State Board"],
    },
    {
        label: "Preferred Board",
        name: "preferred_board",
        required: false,
        options: ["CBSE", "ICSE", "IB"],
    },
];

interface FormFieldsProps {
    onCurrentLevelChange: (level: string) => void;
}

const FormFields = ({ onCurrentLevelChange }: FormFieldsProps) => {
    const [currentLevel, setCurrentLevel] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (name === "current_level") {
            setCurrentLevel(value);
            onCurrentLevelChange(value);
        }
    };

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {formData.map(({ label, name, required, options }) => (
                    <div key={name}>
                        <label htmlFor={name} className="block text-[0.7rem] font-medium">
                            {label} {required && <span className="text-red-500">*</span>}
                        </label>
                        <select
                            id={name}
                            name={name}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 text-[0.7rem] focus:outline-none focus:ring-2 focus:ring-blue-200"
                            required={required}
                        >
                            <option value="">{`Select ${label}`}</option>
                            {options.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>
                ))}

                {currentLevel === "Class 1st to 10th" && (
                    <>
                        <div>
                            <label className="block text-[0.7rem] font-medium">
                                Applying For Level <span className="text-red-500">*</span>
                            </label>
                            <select className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 text-[0.7rem]">
                                <option value="">Select Level</option>
                                <option value="primary">Primary</option>
                                <option value="middle">Middle</option>
                                <option value="secondary">Secondary</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-[0.7rem] font-medium">
                                Preferred Additional Subject
                            </label>
                            <select className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 text-[0.7rem]">
                                <option value="">Select Subject</option>
                                <option value="arts">Arts</option>
                                <option value="craft">Craft</option>
                                <option value="music">Music</option>
                            </select>
                        </div>
                    </>
                )}

                {currentLevel === "Class 11th & 12th" && (
                    <>
                        <div>
                            <label className="block text-[0.7rem] font-medium">
                                Applying For Class <span className="text-red-500">*</span>
                            </label>
                            <select className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 text-[0.7rem]">
                                <option value="">Select Class</option>
                                <option value="11">11th</option>
                                <option value="12">12th</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-[0.7rem] font-medium">
                                Preferred Main Subject <span className="text-red-500">*</span>
                            </label>
                            <select className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 text-[0.7rem]">
                                <option value="">Select Subject</option>
                                <option value="science">Science</option>
                                <option value="commerce">Commerce</option>
                                <option value="arts">Arts</option>
                            </select>
                        </div>
                    </>
                )}

                {currentLevel === "Class 11th & 12th" && (
                    <div className="col-span-2 grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-[0.7rem] font-medium">
                                Preferred Additional Subject
                            </label>
                            <select className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 text-[0.7rem]">
                                <option value="">Select Subject</option>
                                <option value="arts">Arts</option>
                                <option value="craft">Craft</option>
                                <option value="music">Music</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-[0.7rem] font-medium">
                                Reason for the change <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                rows={3}
                                className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 text-[0.7rem] focus:outline-none focus:ring-2 focus:ring-blue-200"
                            />
                        </div>
                    </div>
                )}
            </div>
            <hr className="my-6 border-t border-gray-300" />
            <UploadMarksList />
        </div>
    );
};

export default FormFields;
