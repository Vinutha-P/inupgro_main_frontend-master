import React, { useState, useEffect } from "react";

type YearlyFee = {
    admissionFee: string;
    examFee: string;
    depositFee: string;
    registrationFee: string;
    tuitionFee: string;
    otherFee: string;
    totalYearFee: string;
};

type FeeErrors = {
    [yearIndex: number]: {
        [fieldName: string]: string;
    };
};

const FeesForYears = ({
    yearlyFee,
    setYearlyFee,
    handleAddYear,
    errors,
    setErrors,
    setGrandTotalFee,
    setAverageTotalFee
}: {
    yearlyFee: YearlyFee[];
    setYearlyFee: React.Dispatch<React.SetStateAction<YearlyFee[]>>;
    handleAddYear: () => void;
    errors: FeeErrors;
    setErrors: any;
    setGrandTotalFee: React.Dispatch<React.SetStateAction<number>>;
    setAverageTotalFee: React.Dispatch<React.SetStateAction<number>>;
}) => {

    useEffect(() => {
        const total = yearlyFee.reduce((sum, year) => {
            const num = Number(year.totalYearFee);
            return sum + (isNaN(num) ? 0 : num);
        }, 0);
        setGrandTotalFee(total);

        const count = yearlyFee.length;
        const average = count > 0 ? total / count : 0;
        setAverageTotalFee(average)

    }, [yearlyFee, setGrandTotalFee]);

    const fieldLabels: { [key in keyof YearlyFee]: string } = {
        admissionFee: "Admission Fee",
        examFee: "Exam Fee",
        depositFee: "Refundable Deposit",
        registrationFee: "Registration Fee",
        tuitionFee: "Tuition Fee",
        otherFee: "Other Fees",
        totalYearFee: "Total Year Fee",
    };

    const handleYearChange = (
        index: number,
        field: keyof typeof yearlyFee[0],
        value: string
    ) => {
        // Clone current state
        const updatedFees = [...yearlyFee];

        // Update the changed field
        updatedFees[index][field] = value;

        // Recalculate totalYearFee for this index (excluding totalYearFee itself)
        const { totalYearFee, ...feeFields } = updatedFees[index];
        const total = Object.entries(feeFields).reduce((sum, [key, val]) => {
            const num = Number(val);
            return sum + (isNaN(num) ? 0 : num);
        }, 0);
        updatedFees[index].totalYearFee = total.toString();

        // Handle validation
        const updatedErrors = { ...errors };
        if (value.trim() === "") {
            updatedErrors[index] = {
                ...updatedErrors[index],
                [field]: `${fieldLabels[field]} is required`,
            };
        } else {
            if (updatedErrors[index]?.[field]) {
                delete updatedErrors[index][field];
            }
        }

        if (Object.keys(updatedErrors[index] || {}).length === 0) {
            delete updatedErrors[index];
        }

        // Update state
        setYearlyFee(updatedFees);
        setErrors(updatedErrors);
    };

    const rupeeInputDynamic = (
        label: string,
        value: string,
        onChange: (val: string) => void,
        placeholder?: string,
        error?: string,
        disabled?: boolean,
    ) => (
        <div className="mb-3">
            <label className="block text-[0.7rem] font-medium text-gray-700">{label} <span className="text-red-500">*</span></label>
            <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">₹</span>
                <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 pl-6 text-[0.7rem] focus:outline-none focus:ring-2 focus:ring-blue-200"
                    placeholder={placeholder || label}
                    disabled={disabled}
                />
            </div>
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
    );

    return (
        <div>
            <div>
                {Array.isArray(yearlyFee) && yearlyFee?.map((year, index) => (
                    <div key={index} className="mb-8">
                        <h5 className="text-sm font-semibold text-gray-700 mb-2">
                            Year {index + 1} Fees
                        </h5>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            {rupeeInputDynamic(
                                "Admission Fee",
                                year.admissionFee,
                                (val) => handleYearChange(index, "admissionFee", val),
                                undefined,  // placeholder
                                errors?.[index]?.admissionFee
                            )}
                            {rupeeInputDynamic(
                                "Exam Fee",
                                year.examFee,
                                (val) => handleYearChange(index, "examFee", val),
                                undefined,
                                errors?.[index]?.examFee
                            )}
                            {rupeeInputDynamic(
                                "Refundable Deposits",
                                year.depositFee,
                                (val) => handleYearChange(index, "depositFee", val),
                                undefined,
                                errors?.[index]?.depositFee
                            )}
                            {rupeeInputDynamic(
                                "Registration Fee",
                                year.registrationFee,
                                (val) => handleYearChange(index, "registrationFee", val),
                                undefined,
                                errors?.[index]?.registrationFee
                            )}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                            {rupeeInputDynamic(
                                "Tuition Fee",
                                year.tuitionFee,
                                (val) => handleYearChange(index, "tuitionFee", val),
                                undefined,
                                errors?.[index]?.tuitionFee
                            )}
                            {rupeeInputDynamic(
                                "Other",
                                year.otherFee,
                                (val) => handleYearChange(index, "otherFee", val),
                                undefined,
                                errors?.[index]?.otherFee
                            )}
                            {rupeeInputDynamic(
                                "Total Fee",
                                year.totalYearFee,
                                (val) => handleYearChange(index, "totalYearFee", val),
                                undefined,
                                errors?.[index]?.totalYearFee,
                                true
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-center mt-6">
                <button
                    onClick={() => {
                        handleAddYear();
                    }}
                    className="text-sm font-medium hover:underline text-blue-600"
                >
                    + Add Additional Years
                </button>
            </div>
        </div >
    );
};

export default FeesForYears;
