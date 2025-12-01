"use client";
import React, { useState, useRef, useEffect } from "react";
import { FiChevronDown } from "react-icons/fi";

interface Props {
	onClassChange: (selected: string[]) => void;
	isData: any;
	isOptions?: any;
	defaultText?: string;
	optionData?: any;
	onBranchChange?: (stream: string[]) => void;
}

const classOptions = [
	"Nursery",
	"LKG",
	"UKG",
	"I",
	"II",
	"III",
	"IV",
	"V",
	"VI",
	"VII",
	"VIII",
	"IX",
	"X",
	"XI",
	"XII",
];

const entranceOptions = ["Pre-Foundation", "Foundation"];
const streamOptions = ["PCM", "PCB", "Commerce", "Commerce-Maths", "Arts"];

const ClassesDropdownWithCheckbox: React.FC<Props> = ({
	onClassChange,
	isData,
	isOptions = false,
	defaultText,
	optionData,
	onBranchChange
}) => {
	const [classDropdownOpen, setClassDropdownOpen] = useState(false);
	const [streamDropdownOpen, setStreamDropdownOpen] = useState(false);
	const [selectedClasses, setSelectedClasses] = useState<string[]>([]);
	const [selectedStreams, setSelectedStreams] = useState<string[]>([]);
	const classDropdownRef = useRef<HTMLDivElement>(null);
	const streamDropdownRef = useRef<HTMLDivElement>(null);
	let optionClass: any = optionData ? optionData : classOptions;

	useEffect(() => {

		onClassChange(selectedClasses);
		const handleClickOutside = (event: MouseEvent) => {
			if (
				classDropdownRef.current &&
				!classDropdownRef.current.contains(event.target as Node)
			) {
				setClassDropdownOpen(false);
			}
			if (
				streamDropdownRef.current &&
				!streamDropdownRef.current.contains(event.target as Node)
			) {
				setStreamDropdownOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	useEffect(() => {
		const needsStream = selectedClasses.some(cls => ["XI", "XII"].includes(cls));
		const needsEntrance = selectedClasses.some(cls => ["JEE", "NEET", "IIT"].includes(cls));

		if (!needsStream && !needsEntrance && selectedStreams.length > 0) {
			setSelectedStreams([]); 
		}
	}, [selectedClasses]);

	const toggleClass = (cls: string) => {
		let updated: string[] = [];
		if (selectedClasses.includes(cls)) {
			updated = selectedClasses.filter((c) => c !== cls);
		} else {
			updated = [...selectedClasses, cls];
		}
		setSelectedClasses(updated);
		onClassChange(updated);
	};

	const toggleStream = (stream: string) => {
		let updated: string[] = [];
		if (selectedStreams.includes(stream)) {
			updated = selectedStreams.filter((s) => s !== stream);
		} else {
			updated = [...selectedStreams, stream];
		}
		setSelectedStreams(updated);
		if (onBranchChange) {
			onBranchChange(updated);
		}
	};

	const getSelectedClassesLabel = () => {
		if (selectedClasses.length === 0)
			return `Select ${defaultText ? defaultText : "Class"}`;
		if (selectedClasses.length === 1) return selectedClasses[0];
		if (selectedClasses.length === 2)
			return selectedClasses.slice(0, 2).join(", ");
		const firstClass = selectedClasses[0];
		const secondClass = selectedClasses[1];
		const remainingCount = selectedClasses.length - 2;
		return `${firstClass}, ${secondClass} +${remainingCount}`;
	};

	const getSelectedStreamsLabel = () => {
		if (selectedStreams.length === 0) return "Select Stream(s)";
		if (selectedStreams.length === 1) return selectedStreams[0];
		if (selectedStreams.length === 2) return selectedStreams.join(", ");
		const first = selectedStreams[0];
		const second = selectedStreams[1];
		const remaining = selectedStreams.length - 2;
		return `${first}, ${second} +${remaining}`;
	};

	// const getSelectedStreamsLabel = () => {
	// 	if (selectedStreams.length === 0) return "Select Stream(s)";
	// 	return selectedStreams.join(", ");
	// };

	return (
		<div className="flex flex-col md:flex-row gap-4 items-start w-full">
			<div className="relative" ref={classDropdownRef}>
				<button
					type="button"
					onClick={() => setClassDropdownOpen(!classDropdownOpen)}
					className="h-[2.3rem] px-3 flex items-center justify-between gap-2 bg-darkBlue text-white border border-brandSecondary rounded-lg min-w-[100px]"
				>
					<span className="truncate text-sm">{isData.length === 0 ? `Select ${defaultText ? defaultText : 'Class'}` : getSelectedClassesLabel()}</span>
					<FiChevronDown
						className={`w-5 h-5 stroke-[3px] transition-transform duration-200 ${classDropdownOpen ? "rotate-180" : ""
							}`}
					/>
				</button>

				{classDropdownOpen && (
					<div className="absolute z-50 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 overflow-y-auto max-h-60 w-full">
						{
							isOptions ?
								isData?.map((cls: any) => (
									<label
										key={cls}
										className="flex items-center px-4 py-2 gap-2 cursor-pointer hover:bg-background text-darkBlue"
									>
										<input
											type="checkbox"
											checked={selectedClasses.includes(cls)}
											onChange={() => toggleClass(cls)}
											className="accent-blue-600"
										/>
										<span>{cls}</span>
									</label>
								))
								:
								optionClass?.map((cls: any) => (
									<label
										key={cls}
										className="flex items-center px-4 py-2 gap-2 cursor-pointer hover:bg-background text-darkBlue"
									>
										<input
											type="checkbox"
											checked={selectedClasses.includes(cls)}
											onChange={() => toggleClass(cls)}
											className="accent-blue-600"
										/>
										<span>{cls}</span>
									</label>
								))}
					</div>
				)}
			</div>

			{/* {(selectedClasses.includes("XI") || selectedClasses.includes("XII")) && ( */}
			{selectedClasses.some(cls => ["XI", "XII", "JEE", "NEET", "IIT"].includes(cls)) && (
				<div className="relative" ref={streamDropdownRef}>
					<button
						type="button"
						onClick={() => setStreamDropdownOpen(!streamDropdownOpen)}
						className="h-[2.3rem] px-3 flex items-center justify-between gap-2 bg-darkBlue text-white border border-brandSecondary rounded-lg min-w-[120px]"
					>
						<span className="truncate text-sm">
							{getSelectedStreamsLabel()}
						</span>
						<FiChevronDown
							className={`w-5 h-5 stroke-[3px] transition-transform duration-200 ${streamDropdownOpen ? "rotate-180" : ""
								}`}
						/>
					</button>

					{streamDropdownOpen && (
						<div className="absolute z-50 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 overflow-y-auto max-h-60 w-full">
							{(selectedClasses.includes("NEET") || selectedClasses.includes("IIT") || selectedClasses.includes("JEE") ? entranceOptions : streamOptions).map((stream) => (
								<label
									key={stream}
									className="flex items-center px-4 py-2 gap-2 cursor-pointer hover:bg-background text-darkBlue"
								>
									<input
										type="checkbox"
										checked={selectedStreams.includes(stream)}
										onChange={() => toggleStream(stream)}
										className="accent-blue-600"
									/>
									<span>{stream}</span>
								</label>
							))}
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default ClassesDropdownWithCheckbox;
