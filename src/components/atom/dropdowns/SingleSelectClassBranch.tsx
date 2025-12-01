import React, { useState, useRef, useEffect } from "react";
import { FiChevronDown } from "react-icons/fi";

// const courseBranchMap: { [key: string]: string[] } = {
//   "B.Tech": ["CSE", "ECE", "ME", "EE"],
//   BBA: ["Finance", "HR", "Marketing"],
//   BCA: ["IT", "Data Science"],
//   BA: ["English", "History"],
//   "B.Com": ["Accounting", "Taxation"],
// };

const SingleSelectCourseBranchDropdown = ({
  onCourseChange,
  onBranchChange,
  optionsData,
  branchMap
}: {
  onCourseChange?: (course: string) => void;
  onBranchChange?: (branch: string) => void;
  optionsData?: any;
  branchMap?: any;
}) => {
  const isData = optionsData;
  const [selectedCourse, setSelectedCourse] = useState<string>("");
  const [selectedBranch, setSelectedBranch] = useState<string>("");
  const [courseDropdownOpen, setCourseDropdownOpen] = useState(false);
  const [branchDropdownOpen, setBranchDropdownOpen] = useState(false);

  const courseRef = useRef<HTMLDivElement>(null);
  const branchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (courseRef.current && !courseRef.current.contains(event.target as Node)) {
        setCourseDropdownOpen(false);
      }
      if (branchRef.current && !branchRef.current.contains(event.target as Node)) {
        setBranchDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCourseSelect = (course: string) => {
    setSelectedCourse(course);
    setSelectedBranch("");
    setCourseDropdownOpen(false);
    onCourseChange?.(course);
  };

  const handleBranchSelect = (branch: string) => {
    setSelectedBranch(branch);
    setBranchDropdownOpen(false);
    onBranchChange?.(branch);
  };

  const availableBranches = branchMap?.[selectedCourse] ?? [];

  return (
    <div className="flex flex-col md:flex-row gap-4 items-start w-full">
      {/* Course Dropdown */}
      <div className="relative" ref={courseRef}>
        <button
          type="button"
          onClick={() => setCourseDropdownOpen(!courseDropdownOpen)}
          className="h-[2.3rem] px-3 flex items-center justify-between gap-2 bg-darkBlue text-white border border-brandSecondary rounded-lg min-w-[180px]"
        >
          <span className="truncate text-sm">
            {selectedCourse || "Select Course"}
          </span>
          <FiChevronDown className={`w-5 h-5 stroke-[3px] transition-transform duration-200 ${courseDropdownOpen ? "rotate-180" : ""}`} />
        </button>

        {courseDropdownOpen && (
          <div className="absolute z-50 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 overflow-y-auto max-h-60 w-full">
            {isData?.map((course: any) => (
              <div
                key={course}
                onClick={() => handleCourseSelect(course)}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-darkBlue"
              >
                {course}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Branch Dropdown */}
      {selectedCourse && availableBranches.length > 0  && (
        <div className="relative" ref={branchRef}>
          <button
            type="button"
            onClick={() => setBranchDropdownOpen(!branchDropdownOpen)}
            className="h-[2.3rem] px-3 flex items-center justify-between gap-2 bg-darkBlue text-white border border-brandSecondary rounded-lg min-w-[180px]"
          >
            <span className="truncate text-sm">
              {selectedBranch || "Select Branch"}
            </span>
            <FiChevronDown className={`w-5 h-5 stroke-[3px] transition-transform duration-200 ${branchDropdownOpen ? "rotate-180" : ""}`} />
          </button>

          {branchDropdownOpen && (
            <div className="absolute z-50 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 overflow-y-auto max-h-60 w-full">
              {availableBranches.map((branch:any) => (
                <div
                  key={branch}
                  onClick={() => handleBranchSelect(branch)}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-darkBlue"
                >
                  {branch}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SingleSelectCourseBranchDropdown;
