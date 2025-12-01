"use client";
import React, { useState, useRef, useEffect } from "react";
import { FiChevronDown } from "react-icons/fi";

interface MultiSelectDropdownProps {
  label?: string;
  options: string[];
  selectedValues: string[];
  setSelectedValues: (values: string[]) => void;
  placeholder?: string;
}

const MultiSelectDropdown = ({
  label,
  options,
  selectedValues,
  setSelectedValues,
  placeholder = "Select option(s)",
}: MultiSelectDropdownProps) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option: string) => {
    if (selectedValues.includes(option)) {
      setSelectedValues(selectedValues.filter((val) => val !== option));
    } else {
      setSelectedValues([...selectedValues, option]);
    }
  };

  return (
    <div className="w-full relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="h-[2.3rem] px-3 w-full flex items-center justify-between bg-darkBlue text-white border border-[#B9C0D4] rounded-lg text-sm"
      >
        <span className="truncate">
          {selectedValues.length > 0 ? selectedValues.join(", ") : placeholder}
        </span>
        <FiChevronDown
          className={`w-5 h-5 stroke-[2px] transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute z-50 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 overflow-y-auto max-h-60 w-full">
          {options.map((option) => (
            <div
              key={option}
              onClick={() => handleSelect(option)}
              className={`px-4 py-2 cursor-pointer text-sm hover:bg-gray-100 ${
                selectedValues.includes(option) ? "bg-gray-200 font-semibold" : ""
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

export default MultiSelectDropdown;
