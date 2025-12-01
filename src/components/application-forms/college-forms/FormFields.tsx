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
        label: "School Board",
        name: "school_board",
        required: true,
        options: ["CBSE", "ICSE", "State Board"],
    },
    {
        label: "Main Subject",
        name: "main_subject",
        required: true,
        options: ["English", "Hindi", "Marathi"],
    },
    {
        label: "School Medium",
        name: "school_medium",
        required: true,
        options: ["English", "Hindi", "Gujarati"],
    },
    {
        label: "12th Score",
        name: "12th_score",
        required: true,
        options: [],
    },
    {
        label: "10th Score",
        name: "10th_score",
        required: true,
        options: [],
    },
    {
        label: "Session Year",
        name: "session_year",
        required: true,
        options: ["2022-23", "2023-24", "2024-25"],
    },
    {
        label: "Education Type",
        name: "education_type",
        required: true,
        options: ["Full-time", "Part-time", "Distance Learning"],
    },
    {
        label: "Course",
        name: "course",
        required: true,
        options: ["Science", "Commerce", "Arts"],
    },
    {
        label: "Applying for Subject",
        name: "applying_subject",
        required: true,
        options: ["Mathematics", "Biology", "History"],
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
                        {options.length > 0 ? (
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
                        ) : (
                            <input
                                type="text"
                                name={name}
                                placeholder={`Enter ${label}`}
                                className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 text-[0.7rem] focus:outline-none focus:ring-2 focus:ring-blue-200"
                                required={required}
                            />
                        )}
                    </div>
                ))}

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
                            Reason to choose us <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            rows={3}
                            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 text-[0.7rem] focus:outline-none focus:ring-2 focus:ring-blue-200"
                            placeholder="Reason..."
                        />
                        <p className="text-[0.65rem] text-gray-500">Not more than 50 words.</p>
                    </div>
                </div>
            </div>

            <hr className="my-6 border-t border-gray-300" />
            <UploadMarksList />
        </div>
    );
};

export default FormFields;
