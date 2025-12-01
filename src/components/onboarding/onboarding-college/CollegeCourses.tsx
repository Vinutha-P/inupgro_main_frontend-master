"use client";

import React, { useState, useEffect } from "react";
import { FiChevronDown } from "react-icons/fi";
import FeesForYears from "./FeesForYears";
import { EXAMINATION_OPTIONS, SCHOLARSHIP_OPTIONS } from "@/utils/selectOptions/options";

type CollegeCourse = {
    formData: any;
    setFormData: any;
    yearlyFee: any;
    setYearlyFee: React.Dispatch<React.SetStateAction<any[]>>;
    handleAddYear: () => void;
    errors: any;
    setErrors: any;
    yearlyFeeErrors: any;
    setYearlyFeeErrors: any;
    averageTotalFee: any;
    grandTotalFee: any;
    setGrandTotalFee: React.Dispatch<React.SetStateAction<number>>;
    setAverageTotalFee: React.Dispatch<React.SetStateAction<number>>;
}
const CollegeCourses = ({ formData,
    setFormData,
    yearlyFee,
    errors,
    setErrors,
    setYearlyFee,
    handleAddYear,
    yearlyFeeErrors,
    setYearlyFeeErrors,
    setGrandTotalFee,
    setAverageTotalFee,
    averageTotalFee,
    grandTotalFee
}: CollegeCourse) => {

    const inputClass =
        "mt-1 block w-full border border-gray-300 rounded px-3 py-2 text-[0.7rem] focus:outline-none focus:ring-2 focus:ring-blue-200";

    const labelClass = "block text-[0.7rem] font-medium text-gray-700";

    useEffect(() => {
        setFormData((prev: any) => ({
            ...prev,
            totalFee: grandTotalFee.toString(),
            yearlyFee: averageTotalFee.toString(),
        }));
    }, [grandTotalFee]);

    const handleChange = (field: string, value: string, label: string) => {
        setFormData((prev: any) => ({
            ...prev,
            [field]: value,
        }));

        if (!value || value.trim() === "") {
            setErrors((prev: any) => ({
                ...prev,
                [field]: `${label} is required`,
            }));
        } else {
            setErrors((prev: any) => {
                const updatedErrors = { ...prev };
                delete updatedErrors[field];
                return updatedErrors;
            });
        }
    }

    const labeledInput = (
        label: string,
        field: string,
        value: string,
        placeholder?: string,
        error?: string
    ) => (
        <div className="mb-3">
            <label className={labelClass}>{label} <span className="text-red-500">*</span></label>
            <input
                type="text"
                value={value}
                onChange={(e) => handleChange(field, e.target.value, label)}
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
        placeholder?: string,
        error?: string,
        disabled?: boolean,
    ) => (
        <div className="mb-3">
            <label className={labelClass}>{label} <span className="text-red-500">*</span></label>
            <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">₹</span>
                <input
                    type="text"
                    value={value}
                    onChange={(e) => handleChange(field, e.target.value, label)}
                    // className={`${inputClass} pl-6 ${error ? 'border-red-500' : ''}`}
                    className={`${inputClass} pl-6`}
                    placeholder={placeholder || label}
                    disabled
                />
            </div>
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
    );

    const dropdownInput = (
        label: string,
        field: string,
        value: string,
        options: { label: string; value: string }[],
        error?: string
    ) => (
        <div className="mb-3 relative">
            <label className={labelClass}>{label} <span className="text-red-500">*</span></label>
            <div className="relative">
                <select
                    value={value}
                    onChange={(e) => handleChange(field, e.target.value, label)}
                    className={`${inputClass} appearance-none`}
                // className={`${inputClass} appearance-none ${error ? 'border-red-500' : ''}`}
                >
                    <option value="">Select</option>
                    {options.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
                <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
            </div>
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
    );

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {labeledInput("Course Name", "course", formData?.course, undefined, errors.course)}

                {dropdownInput("Duration", "duration", formData?.duration, [
                    { label: "3 Years", value: "3" },
                    { label: "4 Years", value: "4" },
                    { label: "5 Years", value: "5" },
                ], errors.duration)}

                {dropdownInput("Examination", "exam", formData?.exam,EXAMINATION_OPTIONS, errors.exam)}
            </div>

            <div>
                <h5 className="text-sm font-semibold text-gray-700 mb-2">Fees</h5>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
                    {dropdownInput("Round", "round", formData?.round, [
                        { label: "Round 1", value: "1" },
                        { label: "Round 2", value: "2" },
                        { label: "Round 3", value: "3" },
                    ], errors.round)}

                    {dropdownInput("Cut Off", "cutoff", formData?.cutoff, [
                        { label: "Above 90%", value: "90" },
                        { label: "80% - 90%", value: "80-90" },
                        { label: "70% - 80%", value: "70-80" },
                        { label: "Below 70%", value: "below70" },
                    ], errors.cutoff)}

                    {dropdownInput("Scholarship", "scholarship", formData?.scholarship, SCHOLARSHIP_OPTIONS, errors.scholarship)}

                    {rupeeInput("Total Fee", "totalFee", formData?.totalFee, undefined, errors.totalFee, true)}
                    {rupeeInput("Yearly Fee", "yearlyFee", formData?.yearlyFee, undefined, errors.yearlyFee, true)}
                </div>
            </div>

            <div>
                <h5 className="text-sm font-semibold text-gray-700 mb-2">Eligiblity</h5>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">

                    {dropdownInput("Cut Off", "eligiblity_cutoff", formData?.eligiblity_cutoff, [
                        { label: "Above 90%", value: "90" },
                        { label: "80% - 90%", value: "80-90" },
                        { label: "70% - 80%", value: "70-80" },
                        { label: "Below 70%", value: "below70" },
                    ], errors.eligiblity_cutoff)}
                    {labeledInput("Eligiblity Criteria", "eligibility_criteria", formData?.eligibility_criteria, undefined, errors.eligibility_criteria)}
                    {labeledInput("Remaining Seats", "remaining_seats", formData?.remaining_seats, undefined, errors.remaining_seats)}
                    {labeledInput("Total Seats", "total_seats", formData?.total_seats, undefined, errors.total_seats)}
                </div>
            </div>

            <FeesForYears yearlyFee={yearlyFee}
                setYearlyFee={setYearlyFee}
                handleAddYear={handleAddYear}
                errors={yearlyFeeErrors}
                setErrors={setYearlyFeeErrors}
                setGrandTotalFee={setGrandTotalFee}
                setAverageTotalFee={setAverageTotalFee}
            />
        </div>
    );
};

export default CollegeCourses;
