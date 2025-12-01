import React, { useState, useRef, useEffect } from "react";

interface MultiSelectFieldProps {
    label: string;
    options: string[];
    required?: boolean;
    value: string[];
    onChange: (selected: string[]) => void;
}

const MultiSelectField: React.FC<MultiSelectFieldProps> = ({
    label,
    options,
    required,
    value,
    onChange
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValues, setSelectedValues] = useState<string[]>(value);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const addOption = (option: string) => {
        if (!selectedValues.includes(option)) {
            const newSelected = [...selectedValues, option];
            setSelectedValues(newSelected);
            onChange(newSelected);
        }
    };

    const removeOption = (option: string, e: React.MouseEvent) => {
        e.stopPropagation();
        const newSelected = selectedValues.filter(v => v !== option);
        setSelectedValues(newSelected);
        onChange(newSelected);
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <label className="block mb-1 font-medium text-[0.75rem]">
                {label}
                {required && <span className="text-red-500">*</span>}
            </label>

            <div
                className="w-full  border border-gray-300 rounded-full px-4 py-2.5 text-[15px] outline-none bg-white flex flex-wrap items-center cursor-pointer gap-1.5"
                onClick={() => setIsOpen(!isOpen)}
            >
                {selectedValues.length === 0 ? (
                    <span className="text-[#374151]">Select {label.toLowerCase()}</span>
                ) : (
                    selectedValues.map((value) => (
                        <div
                            key={value}
                            className="flex items-center justify-between bg-[#F4F7FF] text-[#0070F0E5] rounded-full px-2 py-1 text-[14px]"
                        >
                            {value}
                            <button
                                type="button"
                                onClick={(e) => removeOption(value, e)}
                            className="ml-1 text-[#999999] hover:text-gray-500 text-xl leading-[1] pl-1"
                            >
                                ×
                            </button>
                        </div>
                    ))
                )}
                <svg
                    className={`ml-auto w-4 h-4 transition-transform ${isOpen ? 'transform rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </div>

            {isOpen && (
                <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                    {options.map((opt, idx) => (
                        <div
                            key={idx}
                            className={`px-4 py-2 text-xs cursor-pointer hover:bg-gray-100 ${selectedValues.includes(opt) ? 'bg-blue-50 text-blue-600' : ''
                                }`}
                            onClick={() => addOption(opt)}
                        >
                            {opt}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MultiSelectField;