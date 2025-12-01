import { academicStatistics } from "@/utils/data/collegeOnBoard/data";
import React from "react";

interface AcademicStatisticsFormProps {
    formData: Record<string, string>;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    errors: Record<string, string>;
}

const AcademicStatisticsForm: React.FC<AcademicStatisticsFormProps> = ({ formData, handleInputChange, errors }) => {
    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-7">
                {academicStatistics?.map((field) => (
                    <div key={field?.id}>
                        <label
                            htmlFor={field?.id}
                            className="block text-xs font-medium text-gray-700 mb-1"
                        >
                            {field?.label} <span className="text-red-500">*</span>
                        </label>
                        {field?.type === "select" ? (
                            <select
                                id={field?.id}
                                name={field?.id}
                                value={formData[field?.id]}
                                onChange={handleInputChange}
                                className={`mt-1 block w-full border ${field.id !== "totalFaculties" && errors[field?.id] ? "border-red-500" : "border-gray-300"
                                    } rounded px-3 py-2 text-xs focus:outline-none focus:ring-2 ${errors[field?.id]
                                        ? "focus:ring-red-200"
                                        : "focus:ring-blue-200"
                                    }`}
                            >
                                {
                                    field?.option?.map((lang, index) => (
                                        <option key={index} value={index === 0 ? "" : lang}>
                                            {lang}
                                        </option>
                                    ))
                                }
                            </select>
                        )
                            :
                            (
                                <input
                                    id={field?.id}
                                    name={field?.id}
                                    type="text"
                                    value={formData[field?.id]}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-200"
                                    placeholder={`Enter ${field.label.toLowerCase()}`}
                                    disabled={field?.id === "offered"}
                                />
                            )
                        }
                        {errors[field?.id] && (
                            <p className="text-xs text-red-500 mt-1">
                                {errors[field?.id]}
                            </p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AcademicStatisticsForm;
