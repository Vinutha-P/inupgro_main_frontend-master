"use client";
import React, { useState, useRef, useEffect } from "react";
import { FiChevronDown } from "react-icons/fi";

const courseBranchMap: { [key: string]: string[] } = {
    "B.Tech": ["CSE", "ECE", "ME", "EE"],
    BBA: ["Finance", "HR", "Marketing"],
    BCA: ["IT", "Data Science"],
    BA: ["English", "History"],
    "B.Com": ["Accounting", "Taxation"],
};

const sessionOptions = ["2023-2024", "2024-2025", "2025-2026"];
const courseOptions = Object.keys(courseBranchMap);

interface CollegeDropdownsProps {
    showSessionDropdown?: boolean;
    showYearDropdown?: boolean;
    selectedSession: string;
    setSelectedSession: (val: string) => void;
    selectedCourse: string;
    setSelectedCourse: (val: string) => void;
    selectedBranch: string;
    setSelectedBranch: (val: string) => void;
    selectedYear: string;
    setSelectedYear: (val: string) => void;
    isCourse?: boolean;
    optionsData?:  string[];
    onSelect?: (option: string) => void;
}

// const CollegeDropdowns = ({ showSessionDropdown = true }: { showSessionDropdown?: boolean }) => {
const CollegeDropdowns = ({
    showSessionDropdown = true,
    showYearDropdown = false,
    selectedSession,
    setSelectedSession,
    selectedCourse,
    setSelectedCourse,
    selectedBranch,
    setSelectedBranch,
    selectedYear,
    setSelectedYear,
    isCourse = true,
    optionsData,
    onSelect
}: CollegeDropdownsProps) => {

    const [sessionDropdownOpen, setSessionDropdownOpen] = useState(false);
    const [courseDropdownOpen, setCourseDropdownOpen] = useState(false);
    const [branchDropdownOpen, setBranchDropdownOpen] = useState(false);

    // const [selectedSession, setSelectedSession] = useState("2024-2025");
    // const [selectedCourse, setSelectedCourse] = useState("");
    // const [selectedBranch, setSelectedBranch] = useState("");

    const sessionRef = useRef<HTMLDivElement>(null);
    const courseRef = useRef<HTMLDivElement>(null);
    const branchRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (sessionRef.current && !sessionRef.current.contains(event.target as Node)) {
                setSessionDropdownOpen(false);
            }
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

    const handleCourseChange = (course: string) => {
        setSelectedCourse(course);
        setSelectedBranch("");
        onSelect?.(course);
    };

    const Dropdown = ({
        label,
        value,
        options,
        open,
        setOpen,
        setValue,
        placeholder,
        ref,
    }: {
        label: string;
        value: string;
        options: string[];
        open: boolean;
        setOpen: React.Dispatch<React.SetStateAction<boolean>>;
        setValue: (val: string) => void;
        placeholder: string;
        ref: React.RefObject<HTMLDivElement | null>;
    }) => (
        <div className="w-full relative" ref={ref}>
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className="h-[2.3rem] px-3 w-full flex items-center justify-between bg-darkBlue text-white border border-[#B9C0D4] rounded-lg text-sm"
            >
                <span className="truncate">{value || placeholder}</span>
                <FiChevronDown
                    className={`w-5 h-5 stroke-[2px] transition-transform duration-200 ${open ? "rotate-180" : ""
                        }`}
                />
            </button>

            {open && (
                <div className="absolute z-50 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 overflow-y-auto max-h-60 w-full">
                    {options.map((opt) => (
                        <div
                            key={opt}
                            onClick={() => {
                                setValue(opt);
                                setOpen(false);
                            }}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                        >
                            {opt}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );

    return (
        <div className="flex flex-col md:flex-row gap-4 items-start w-full">
            {showSessionDropdown && (
                <Dropdown
                    label="Session"
                    // value={selectedSession}
                    // options={sessionOptions}
                    // open={sessionDropdownOpen}
                    // setOpen={setSessionDropdownOpen}
                    // setValue={setSelectedSession}
                    // placeholder="Select Academic Session"
                    // ref={sessionRef}

                    value={selectedSession}
                    options={sessionOptions}
                    open={sessionDropdownOpen}
                    setOpen={setSessionDropdownOpen}
                    setValue={setSelectedSession}
                    placeholder="Select Academic Session"
                    ref={sessionRef}
                />
            )}

            {
                isCourse &&
                <Dropdown
                    label="Course"
                    value={selectedCourse}
                    options={optionsData ? optionsData : courseOptions}
                    open={courseDropdownOpen}
                    setOpen={setCourseDropdownOpen}
                    setValue={handleCourseChange}
                    placeholder="Select Course"
                    ref={courseRef}
                />
            }

            {selectedCourse && (
                <Dropdown
                    label="Branch"
                    value={selectedBranch}
                    options={courseBranchMap[selectedCourse]}
                    open={branchDropdownOpen}
                    setOpen={setBranchDropdownOpen}
                    setValue={setSelectedBranch}
                    placeholder="Select Branch"
                    ref={branchRef}
                />
            )}
        </div>
    );
};

export default CollegeDropdowns;
