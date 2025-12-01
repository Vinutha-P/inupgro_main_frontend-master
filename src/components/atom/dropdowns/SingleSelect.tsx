"use client";
import React, { useEffect, useRef, useState } from "react";
import { FiChevronDown } from "react-icons/fi";

interface SingleSelectDropdownProps {
    selectedOption: string;
    options: string[];
    placeholder?: string;
    onChange: (option: string) => void;
}

const SingleSelectDropdown: React.FC<SingleSelectDropdownProps> = ({
    selectedOption,
    options,
    placeholder = "Select Option(s)",
    onChange,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleOptionClick = (option: string) => {
        onChange(option);
        setIsOpen(false);
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="h-[2.3rem] px-3 flex items-center justify-between gap-2 bg-darkBlue text-white border border-brandSecondary rounded-lg min-w-[100px]"
            >
                <span className="truncate text-sm">
                    {selectedOption || placeholder}
                </span>
                <FiChevronDown
                    className={`w-5 h-5 stroke-[3px] transition-transform duration-200 ${isOpen ? "rotate-180" : ""
                        }`}
                />
            </button>

            {isOpen && (
                <div className="absolute z-50 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 overflow-y-auto max-h-60 w-full">
                    {options.map((option) => (
                        <div
                            key={option}
                            onClick={() => handleOptionClick(option)}
                            className={`px-4 py-2 cursor-pointer text-darkBlue hover:bg-background text-sm ${selectedOption === option ? "bg-gray-100 font-medium" : ""
                                }`}
                        >
                            {option}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SingleSelectDropdown;
