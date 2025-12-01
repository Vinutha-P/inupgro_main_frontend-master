import React, { useState } from "react";
import UploadMarksList from "./UploadMarksList";

const formData = [
    {
        label: "Current Education",
        name: "current_school_name",
        required: true,
        options: ["School A", "School B", "School C"],
    },
    {
        label: "Course Name",
        name: "current_level",
        required: true,
        options: ["Class 1st to 10th", "Class 11th & 12th"],
    },
    {
        label: "Course Medium",
        name: "current_medium",
        required: true,
        options: ["English", "Hindi", "Marathi"],
    },
];

const FormFields = () => {
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
                <div>
                    <label htmlFor="dob" className="block text-[0.7rem] font-medium">
                        Date of Joining <span className="text-red-500">*</span>
                    </label>
                    <input
                        id="dob"
                        type="date"
                        className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 text-[0.7rem] focus:outline-none focus:ring-2 focus:ring-blue-200"
                    />

                </div>
            </div>
            <hr className="my-6 border-t border-gray-300" />
        </div>
    );
};

export default FormFields;
