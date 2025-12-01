import { getCurrentYear } from "@/utils/helper";
import React, { useState, useEffect, useRef } from "react";

interface YearDropdownProps {
    value: string;
    onChange: (year: string) => void;
    options?: string[];
}

const YearsDropdown: React.FC<YearDropdownProps> = ({
    value,
    onChange,
    options
}) => {
    const currentYear = getCurrentYear();
    const defaultYears = Array.from({ length: 15 }, (_, i) => (currentYear + i).toString());
    const yearOptions = options || defaultYears;

    const [isOpen, setIsOpen] = useState(false);
    const [selectedYear, setSelectedYear] = useState(value || yearOptions[0]);

    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setSelectedYear(value);
    }, [value]);

    const handleSelect = (year: string) => {
        setSelectedYear(year);
        onChange(year);
        setIsOpen(false);
    };

    // Close on outside click
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative w-fit min-w-[8rem]" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="h-[2.5rem] w-full px-4 flex justify-between items-center text-xs sm:text-base font-normal bg-darkBlue text-white border border-brandSecondary rounded-lg"
            >
                <span>{selectedYear}</span>
                <svg
                    className={`w-4 h-4 ml-2 transition-transform duration-200 ${isOpen ? "rotate-180" : "rotate-0"}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {isOpen && (
                <div className="absolute z-50 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 overflow-y-auto max-h-60 w-full">
                    {yearOptions.map((year) => (
                        <div
                            key={year}
                            onClick={() => handleSelect(year)}
                            className={`px-4 py-2 cursor-pointer hover:bg-gray-100 text-darkBlue ${year === selectedYear ? 'bg-gray-100 font-semibold' : ''}`}
                        >
                            {year}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default YearsDropdown;
