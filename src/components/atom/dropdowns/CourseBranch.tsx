import React, { useState, useRef, useEffect } from "react";
import { FiChevronDown } from "react-icons/fi";

const courseBranchMap: { [key: string]: string[] } = {
  "B.Tech": ["CSE", "ECE", "ME", "EE"],
  BBA: ["Finance", "HR", "Marketing"],
  BCA: ["IT", "Data Science"],
  BA: ["English", "History"],
  "B.Com": ["Accounting", "Taxation"],
};

const CourseBranchDropdown = ({
  onCourseChange,
  onBranchChange,
  optionsData,
  branchMap
}: {
  onCourseChange?: (courses: string[]) => void;
  onBranchChange?: (branches: string[]) => void;
  optionsData?: any;
  branchMap?: any;
}) => {
  const isData = optionsData ? optionsData : Object.keys(courseBranchMap);
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [selectedBranches, setSelectedBranches] = useState<string[]>([]);
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

  const toggleCourse = (course: string) => {
    let updated: string[];
    if (selectedCourses.includes(course)) {
      updated = selectedCourses.filter((c) => c !== course);
    } else {
      updated = [...selectedCourses, course];
    }
    setSelectedCourses(updated);
    setSelectedBranches([]); // Reset branches when course changes
    onCourseChange?.(updated);
  };

  const toggleBranch = (branch: string) => {
    let updated: string[];
    if (selectedBranches.includes(branch)) {
      updated = selectedBranches.filter((b) => b !== branch);
    } else {
      updated = [...selectedBranches, branch];
    }
    setSelectedBranches(updated);
    onBranchChange?.(updated);
  };

  // Collect branches of selected courses
  const availableBranches = Array.from(new Set(selectedCourses.flatMap((course) => courseBranchMap[course])));
  const availabledBranches = Array.from(new Set(selectedCourses.flatMap((course) => branchMap?.[course] ?? [])));
  
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
            {/* {selectedCourses.length > 0 ? selectedCourses.join(", ") : "Select Course(s)"} */}
            {selectedCourses.length > 0
              ? selectedCourses.length > 2
                ? `${selectedCourses.slice(0, 2).join(", ")} +${selectedCourses.length - 2}`
                : selectedCourses.join(", ")
              : "Select Course(s)"}
          </span>
          <FiChevronDown className={`w-5 h-5 stroke-[3px] transition-transform duration-200 ${courseDropdownOpen ? "rotate-180" : ""}`} />
        </button>

        {courseDropdownOpen && (
          <div className="absolute z-50 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 overflow-y-auto max-h-60 w-full">
            {isData?.map((course: any,index:number) => (
              <label
                key={index}
                className="flex items-center px-4 py-2 gap-2 cursor-pointer hover:bg-gray-100 text-darkBlue"
              >
                <input
                  type="checkbox"
                  checked={selectedCourses.includes(course)}
                  onChange={() => toggleCourse(course)}
                  className="accent-blue-600"
                />
                <span>{course}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Branch Dropdown */}
      {selectedCourses.length > 0 && (
        <div className="relative" ref={branchRef}>
          <button
            type="button"
            onClick={() => setBranchDropdownOpen(!branchDropdownOpen)}
            className="h-[2.3rem] px-3 flex items-center justify-between gap-2 bg-darkBlue text-white border border-brandSecondary rounded-lg min-w-[180px]"
          >
            <span className="truncate text-sm">
               {selectedBranches.length > 0
              ? selectedBranches.length > 2
                ? `${selectedBranches.slice(0, 2).join(", ")} +${selectedBranches.length - 2}`
                : selectedBranches.join(", ")
              : "Select Branch(es)"}
            </span>
            <FiChevronDown className={`w-5 h-5 stroke-[3px] transition-transform duration-200 ${branchDropdownOpen ? "rotate-180" : ""}`} />
          </button>

          {branchDropdownOpen && (
            <div className="absolute z-50 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 overflow-y-auto max-h-60 w-full">
              {(branchMap ? availabledBranches : availableBranches).map((branch,index) => (
                <label
                  key={index}
                  className="flex items-center px-4 py-2 gap-2 cursor-pointer hover:bg-gray-100 text-darkBlue"
                >
                  <input
                    type="checkbox"
                    checked={selectedBranches.includes(branch)}
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

export default CourseBranchDropdown;
