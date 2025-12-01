import { useState, useEffect, useRef } from "react";
import { FaAngleDown } from "react-icons/fa";

const MultiSelectDropdown = ({ formData, setFormData, options, placeholder, fieldKey }: any) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleCheckboxChange = (option: string) => {
        let selectedValues = [...(formData?.[fieldKey] || [])];

        if (selectedValues.includes(option)) {
            selectedValues = selectedValues.filter((item) => item !== option);
        } else {
            selectedValues.push(option);
        }

        setFormData({ ...formData, [fieldKey]: selectedValues });
    };

    const displayValue = Array.isArray(formData?.[fieldKey])
    ? formData?.[fieldKey].join(", ")
    : `Select ${placeholder}`;

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && event.target instanceof Node && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <div
                className="mt-1 flex items-center justify-between w-full border border-gray-300 rounded px-3 py-2 text-xs cursor-pointer bg-white focus:outline-none focus:ring-2 focus:ring-blue-200"
                onClick={() => setIsOpen(!isOpen)}
            >
                {displayValue}
                <FaAngleDown
                    className={`text-gray-500 text-sm transition-transform duration-200 ${isOpen ? "rotate-180" : ""
                        }`}
                />
            </div>

            {isOpen && (
                <div className="absolute z-10  w-full bg-white border border-gray-300 shadow-md max-h-40 overflow-y-auto text-xs">
                    {options.map((option: any) => (
                        <label key={option} className="flex items-center px-3 py-2 hover:bg-gray-100">
                            <input
                                type="checkbox"
                                className="mr-2"
                                checked={formData?.[fieldKey]?.includes(option)}
                                onChange={() => handleCheckboxChange(option)}
                            />
                            {option}
                        </label>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MultiSelectDropdown;
