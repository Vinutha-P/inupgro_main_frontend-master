import React, { useState, useRef, useEffect } from "react";
import { FiChevronDown } from "react-icons/fi";

type Props = {
  optionsData: any
  onSelectionChange?: any;
  disableBranchDropdown?: boolean;
};

const ClassBranchDropdown: React.FC<Props> = ({ optionsData, onSelectionChange, disableBranchDropdown = false, }) => {
  const [selectedClass, setSelectedClass] = useState<string[]>([]);
  const [selectedBranch, setSelectedBranch] = useState<string[]>([]);
  const [classDropdownOpen, setClassDropdownOpen] = useState(false);
  const [branchDropdownOpen, setBranchDropdownOpen] = useState(false);

  const classRef = useRef<HTMLDivElement>(null);
  const branchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {

    const handleClickOutside = (event: MouseEvent) => {
      if (classRef.current && !classRef.current.contains(event.target as Node)) {
        setClassDropdownOpen(false);
      }
      if (branchRef.current && !branchRef.current.contains(event.target as Node)) {
        setBranchDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleClass = (className: string) => {
    let updated: string[];
    if (selectedClass.includes(className)) {
      updated = selectedClass.filter((c) => c !== className);
    } else {
      updated = [...selectedClass, className];
    }

    setSelectedClass(updated);
    setSelectedBranch([]); // Reset branches when class changes
    onSelectionChange?.(updated);
  };

  const toggleBranch = (branch: string) => {
    const updated = selectedBranch.includes(branch)
      ? selectedBranch.filter((b) => b !== branch)
      : [...selectedBranch, branch];

    setSelectedBranch(updated);
    onSelectionChange?.(selectedClass, updated);
  };

  // Collect branches of selected classes
  const availableBranches = Array.from(
    new Set(selectedClass.flatMap((cls) => optionsData?.[cls] ?? []))
  );

  return (
    <div className="flex flex-col md:flex-row gap-4 items-start w-full">
      {/* Class Dropdown */}
      <div className="relative" ref={classRef}>
        <button
          type="button"
          onClick={() => setClassDropdownOpen(!classDropdownOpen)}
          className="h-[2.3rem] px-3 flex items-center justify-between gap-2 bg-darkBlue text-white border border-brandSecondary rounded-lg min-w-[180px]"
        >
          <span className="truncate text-sm">
            {/* {selectedClass.length > 0 ? selectedClass.join(", ") : "Select Class(es)"} */}
            {selectedClass.length > 0
              ? selectedClass.length > 2
                ? `${selectedClass.slice(0, 2).join(", ")} +${selectedClass.length - 2}`
                : selectedClass.join(", ")
              : "Select Class(es)"}
          </span>
          <FiChevronDown className={`w-5 h-5 stroke-[3px] transition-transform duration-200 ${classDropdownOpen ? "rotate-180" : ""}`} />
        </button>

        {classDropdownOpen && (
          <div className="absolute z-50 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 overflow-y-auto max-h-60 w-full">
            {Object.keys(optionsData).map((className) => (
              <label
                key={className}
                className="flex items-center px-4 py-2 gap-2 cursor-pointer hover:bg-gray-100 text-darkBlue"
              >
                <input
                  type="checkbox"
                  checked={selectedClass.includes(className)}
                  onChange={() => toggleClass(className)}
                  className="accent-blue-600"
                />
                <span>{className}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Branch Dropdown */}
      {availableBranches.length > 0 && !disableBranchDropdown && (
        <div className="relative" ref={branchRef}>
          <button
            type="button"
            onClick={() => setBranchDropdownOpen(!branchDropdownOpen)}
            className="h-[2.3rem] px-3 flex items-center justify-between gap-2 bg-darkBlue text-white border border-brandSecondary rounded-lg min-w-[180px]"
          >
            <span className="truncate text-sm">
              {selectedBranch.length > 0
                ? selectedBranch.length > 2
                  ? `${selectedBranch.slice(0, 2).join(", ")} +${selectedBranch.length - 2}`
                  : selectedBranch.join(", ")
                : "Select Branch(es)"}
            </span>
            <FiChevronDown className={`w-5 h-5 stroke-[3px] transition-transform duration-200 ${branchDropdownOpen ? "rotate-180" : ""}`} />
          </button>

          {branchDropdownOpen && (
            <div className="absolute z-50 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 overflow-y-auto max-h-60 w-full">
              {availableBranches.map((branch) => (
                <label
                  key={branch}
                  className="flex items-center px-4 py-2 gap-2 cursor-pointer hover:bg-gray-100 text-darkBlue"
                >
                  <input
                    type="checkbox"
                    checked={selectedBranch.includes(branch)}
                    onChange={() => toggleBranch(branch)}
                    className="accent-blue-600"
                  />
                  <span>{branch}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      )}

    </div>
  );
};

export default ClassBranchDropdown;
