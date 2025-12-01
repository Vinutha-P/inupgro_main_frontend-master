"use client";
import React, { useState, useRef, useEffect } from "react";
import { FiChevronDown } from "react-icons/fi";

const CompetitivePreparations = () => {
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const [selectedExam, setSelectedExam] = useState<string | null>(null);
	const dropdownRef = useRef<HTMLDivElement>(null);

	const examOptions = ["JEE", "NEET"];

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setDropdownOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const getLabel = () => selectedExam || "Select Exam";

	return (
		<div className="relative w-full max-w-[200px]" ref={dropdownRef}>

			<button
				type="button"
				onClick={() => setDropdownOpen(!dropdownOpen)}
				className="h-[2.3rem] px-3 flex items-center justify-between gap-2 bg-darkBlue text-white border border-[#B9C0D4] rounded-lg w-full"
			>
				<span className="truncate text-sm">{getLabel()}</span>
				<FiChevronDown
					className={`w-5 h-5 stroke-[3px] transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""
						}`}
				/>
			</button>

			{dropdownOpen && (
				<div className="absolute z-50 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 w-full overflow-y-auto max-h-60">
					{examOptions.map((exam) => (
						<div
							key={exam}
							className="px-4 py-2 cursor-pointer text-darkBlue hover:bg-background text-sm"
							onClick={() => {
								setSelectedExam(exam);
								setDropdownOpen(false);
							}}
						>
							{exam}
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default CompetitivePreparations;
