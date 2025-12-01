"use client";
import React, { useState, useRef, useEffect } from "react";
import { FiChevronDown } from "react-icons/fi";

type CoachingClassDropdownProps = {
    showYearDropdown?: boolean;
    onClassChange?: (newClass: string) => void;
    showSessionDropdown?: boolean;
    selectedSession: string;
    setSelectedSession: (val: string) => void;
    selectedCourse: string;
    setSelectedCourse: (val: string) => void;
    selectedBranch: string;
    setSelectedBranch: (val: string) => void;
    selectedYear: string;
    setSelectedYear: (val: string) => void;
    isCourse?: boolean;
    optionsData?: string[];
    onSelect?: (option: string) => void;
};

const CoachingClassDropdown = ({
    showYearDropdown = true,
    onClassChange,
    showSessionDropdown = true,
    selectedSession,
    setSelectedSession,
    selectedCourse,
    setSelectedCourse,
    isCourse = true,
    optionsData,
    onSelect

}: CoachingClassDropdownProps) => {
    const [yearDropdownOpen, setYearDropdownOpen] = useState(false);
    const [classDropdownOpen, setClassDropdownOpen] = useState(false);
    const [streamDropdownOpen, setStreamDropdownOpen] = useState(false);
    const [selectedYear, setSelectedYear] = useState<string>("2024–2025");
    const [selectedClass, setSelectedClass] = useState<string>("Select option(s)");
    const [selectedStream, setSelectedStream] = useState<string | null>(null);

    const yearDropdownRef = useRef<HTMLDivElement>(null);
    const classDropdownRef = useRef<HTMLDivElement>(null);
    const streamDropdownRef = useRef<HTMLDivElement>(null);

    const yearOptions = ["2022–2023", "2023–2024", "2024–2025", "2025–2026"];
    const classOptions = ["VII", "VIII", "IX", "X", "XI", "XII", "JEE", "NEET"];
    const streamOptions = ["PCM", "PCB", "Commerce", "Commerce-Maths", "Arts"];

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (yearDropdownRef.current && !yearDropdownRef.current.contains(event.target as Node)) {
                setYearDropdownOpen(false);
            }
            if (classDropdownRef.current && !classDropdownRef.current.contains(event.target as Node)) {
                setClassDropdownOpen(false);
            }
            if (streamDropdownRef.current && !streamDropdownRef.current.contains(event.target as Node)) {
                setStreamDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        if (selectedClass !== "XI" && selectedClass !== "XII") {
            setSelectedStream(null);
        }
    }, [selectedClass]);

    return (
        <div className="flex flex-col md:flex-row gap-4 items-start w-full">
            {showYearDropdown && (
                <div className="relative" ref={yearDropdownRef}>
                    <button
                        type="button"
                        onClick={() => setYearDropdownOpen(!yearDropdownOpen)}
                        className="h-[2.3rem] px-3 flex items-center justify-between gap-2 bg-darkBlue text-white border border-[#B9C0D4] rounded-lg min-w-10"
                    >
                        <span className="truncate text-sm">{selectedYear}</span>
                        <FiChevronDown
                            className={`w-5 h-5 stroke-[3px] transition-transform duration-200 ${yearDropdownOpen ? "rotate-180" : ""
                                }`}
                        />
                    </button>

                    {yearDropdownOpen && (
                        <div className="absolute z-50 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 overflow-y-auto max-h-60 w-full">
                            {yearOptions.map((year) => (
                                <div
                                    key={year}
                                    onClick={() => {
                                        setSelectedYear(year);
                                        setYearDropdownOpen(false);

                                    }}
                                    className="px-4 py-2 cursor-pointer hover:bg-background text-darkBlue text-sm"
                                >
                                    {year}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
            {
                isCourse &&
                <div className="relative" ref={classDropdownRef}>
                    <button
                        type="button"
                        onClick={() => setClassDropdownOpen(!classDropdownOpen)}
                        className="h-[2.3rem] px-3 flex items-center justify-between gap-2 bg-darkBlue text-white border border-[#B9C0D4] rounded-lg min-w-20"
                    >
                        <span className="truncate text-sm">
                            {selectedClass && selectedClass !== "Select option(s)"
                                ? selectedClass
                                : "Select option(s)"}
                        </span>
                        <FiChevronDown
                            className={`w-5 h-5 stroke-[3px] transition-transform duration-200 ${classDropdownOpen ? "rotate-180" : ""
                                }`}
                        />
                    </button>

                    {classDropdownOpen && (
                        <div className="absolute z-50 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 overflow-y-auto max-h-60 w-full">
                            {optionsData && optionsData.length > 0 &&
                                optionsData?.map((cls) => (
                                    <div
                                        key={cls}
                                        onClick={() => {
                                            setSelectedClass(cls);
                                            setClassDropdownOpen(false);
                                            onSelect?.(cls);
                                            if (onClassChange) onClassChange(cls);
                                        }}
                                        className="px-4 py-2 cursor-pointer hover:bg-background text-darkBlue text-sm"
                                    >
                                        {cls}
                                    </div>
                                ))
                            }
                        </div>
                    )}
                </div>
            }

            {/* {(selectedClass === "XI" || selectedClass === "XII") && (
                <div className="relative" ref={streamDropdownRef}>
                    <button
                        type="button"
                        onClick={() => setStreamDropdownOpen(!streamDropdownOpen)}
                        className="h-[2.3rem] px-3 flex items-center justify-between gap-2 bg-darkBlue text-white border border-[#B9C0D4] rounded-lg min-w-32"
                    >
                        <span className="truncate text-sm">
                            {selectedStream || "Select Stream"}
                        </span>
                        <FiChevronDown
                            className={`w-5 h-5 stroke-[3px] transition-transform duration-200 ${streamDropdownOpen ? "rotate-180" : ""
                                }`}
                        />
                    </button>

                    {streamDropdownOpen && (
                        <div className="absolute z-50 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 overflow-y-auto max-h-60 w-full">
                            {streamOptions.map((stream) => (
                                <div
                                    key={stream}
                                    onClick={() => {
                                        setSelectedStream(stream);
                                        setStreamDropdownOpen(false);
                                    }}
                                    className="px-4 py-2 cursor-pointer hover:bg-background text-darkBlue text-sm"
                                >
                                    {stream}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )} */}
        </div>
    );
};

export default CoachingClassDropdown;
