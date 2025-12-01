"use client";

import React, { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

type SubjectFees = {
    formData: any;
    setFormData: any;
    errors: any;
    setErrors: any;
}

const SubjectsAndFees = ({
    formData,
    setFormData,
    errors,
    setErrors,
}: SubjectFees) => {

    const inputClass =
        "mt-1 block w-full border border-gray-300 rounded px-3 py-2 text-[0.7rem] focus:outline-none focus:ring-2 focus:ring-blue-200";

    const labelClass = "block text-[0.7rem] font-medium text-gray-700";

    const handleChange = (index: number, field: string, value: string, label: string) => {
        setFormData((prev: any) => {
            const updatedSubjects = [...prev];  // fix: work directly on the array
            updatedSubjects[index] = {
                ...updatedSubjects[index],
                [field]: value,
            };

            return updatedSubjects;  // fix: return the updated array directly
        });

        if (!value || value.trim() === "") {
            setErrors((prev: any) => ({
                ...prev,
                [`${field}-${index}`]: `${label} is required`,
            }));
        } else {
            setErrors((prev: any) => {
                const updatedErrors = { ...prev };
                delete updatedErrors[`${field}-${index}`];
                return updatedErrors;
            });
        }
    }

    const labeledInput = (
        label: string,
        field: string,
        value: string,
        index: number,
        error?: string,
        placeholder?: string,
    ) => (
        <div className="mb-3">
            <label className={labelClass}>{label}</label>
            <input
                type="text"
                value={value}
                onChange={(e) => handleChange(index, field, e.target.value, label)}
                placeholder={placeholder || label}
                className={inputClass}
            />
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
    );

    const rupeeInput = (
        label: string,
        field: string,
        value: string,
        index: number,
        error?: string,
        placeholder?: string,
    ) => (
        <div className="mb-3">
            <label className={labelClass}>{label}</label>
            <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">₹</span>
                <input
                    type="text"
                    value={value}
                    onChange={(e) => handleChange(index, field, e.target.value, label)}
                    placeholder={placeholder || label}
                    className={`${inputClass} pl-6`}
                />
            </div>
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
    );

    const dropdownInput = (
        label: string,
        field: string,
        value: string,
        index: number,
        options: { label: string; value: string }[],
        error?: string
    ) => (
        <div className="mb-3 relative">
            <label className={labelClass}>{label}</label>
            <div className="relative">
                <select
                    value={value}
                    onChange={(e) => handleChange(index, field, e.target.value, label)}
                    className={`${inputClass} appearance-none`}
                >
                    <option value="">Select</option>
                    {options.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
                {/* <FiChevronDown className="absolute right-3 top-[70%] -translate-y-1/2 text-gray-500 pointer-events-none" /> */}
                <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
            </div>
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
    );

    const renderSubjectRow = (index: number) => {
        const subject = formData[index] || {
            subjectName: "",
            seats: "",
            fees: "",
            batch: "",
            duration: "",
        };

        return (
            <div key={index} className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {labeledInput("Subject Name", "subjectName", subject?.subjectName, index, errors[`subjectName-${index}`])}
                {dropdownInput("Seats", "seats", subject?.seats, index, [
                    { label: "Above 90%", value: "90" },
                    { label: "80%", value: "80" },
                    { label: "70%", value: "70" },
                    { label: "Below 70%", value: "60" },
                ], errors[`seats-${index}`])}
                {rupeeInput("Fees", "fees", subject?.fees, index, errors[`fees-${index}`])}
                {dropdownInput("Batch", "batch", subject?.batch, index, [
                    { label: "Round 1", value: "1" },
                    { label: "Round 2", value: "2" },
                    { label: "Round 3", value: "3" },
                ], errors[`batch-${index}`])}
                {dropdownInput("Duration", "duration", subject?.duration, index, [
                    { label: "Round 1", value: "1" },
                    { label: "Round 2", value: "2" },
                    { label: "Round 3", value: "3" },
                ], errors[`duration-${index}`])}
            </div>
        )
    };

    return (
        <div>
            <div className="space-y-4">
                {formData?.map((_: any, i: number) => renderSubjectRow(i))}
            </div>
            <div className="flex justify-center mt-6">
                <button
                    onClick={() => {
                        setFormData((prev: any) => [
                            ...prev,
                            {
                                subjectName: "",
                                seats: "",
                                fees: "",
                                batch: "",
                                duration: "",
                            }
                        ]);
                    }}
                    className="text-sm font-medium hover:underline text-blue-600"
                >
                    + Add Additional Years
                </button>
            </div>
        </div>
    );
};

export default SubjectsAndFees;
