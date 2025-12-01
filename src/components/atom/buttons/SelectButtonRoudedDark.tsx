"use client";
import React, { useState, useRef, useEffect } from "react";
import { FiChevronDown } from "react-icons/fi";

interface ButtonVariantProps {
	fontBold?: boolean;
	width?: string;
	height?: string;
	buttonName: string;
	options: string[];
	selectedDate?: string;
	selectedValue?: string;
	onSelect: (option: string) => void;
	handleChange?: (option: string) => void;
	isLabel?:boolean;
}

const SelectButtonRoudedDark: React.FC<any> = ({
	fontBold,
	width,
	height,
	buttonName,
	options,
	selectedDate,
	selectedValue,
	onSelect,
	handleChange,
	isLabel=false
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);
	
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	const handleSelect = (option: string) => {
		onSelect(option);
		setIsOpen(false);
	};

	const handleClear = () => {
		onSelect("");
		setIsOpen(false);
	};
	return (
		<div className="relative" ref={dropdownRef}>
			<button
				type="button"
				onClick={() => setIsOpen(!isOpen)}
				className={`h-[2.5rem] min-w-fit px-4 flex-box-center gap-[0.625rem] text-xs sm:text-base ${fontBold ? "font-semibold" : "font-normal"
					} bg-darkBlue text-white border border-brandSecondary rounded-lg`}
				style={{ width, height }}
			>
				<span>{buttonName}</span>
				<FiChevronDown
					className={`w-6 h-6 stroke-[3px] transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
				/>
			</button>
			{isOpen && (
				<div
					className="absolute z-50 min-w-[220px] w-auto mt-1 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden w-full"
					style={{ width: "100%" }}
				>
					{
						buttonName === "Date" ?
							<div className="relative">
								<input
									type="date"
									value={selectedDate}
									onChange={(e) => handleSelect(e.target.value)}
									// className="block w-full p-2.5 pr-16 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
									  className={`block w-full min-w-[200px] p-2.5 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 ${selectedDate ? 'pr-14' : ''}`}
								/>

								{selectedDate && (
									<button
										type="button"
										onClick={handleClear}
										className="absolute right-4 top-1/2 transform -translate-y-1/2 text-sm text-gray-500 hover:text-red-500"
									>
										Clear
									</button>
								)}
							</div>
							:

							options?.map((option: any, index: any) => (
								<div
									key={index}
									className="px-4 py-2 cursor-pointer hover:bg-background text-darkBlue transition-colors duration-150"
									onClick={() => handleSelect(option)}
								>
									{option}
								</div>
							))
					}

					{/* {options?.map((option: any, index: any) => (
							<div
								key={index}
								className="px-4 py-2 cursor-pointer hover:bg-background text-darkBlue transition-colors duration-150"
								onClick={() => handleSelect(option)}
							>
								{option}
							</div>
						))} */}
				</div>
			)}
			{/* {isOpen && (
					<div className="absolute z-50 mt-2 w-64">
						{buttonName === "Date" ? (
							<div className="relative">
								<input
									type="date"
									value={selectedDate}
									onChange={(e) => handleSelect(e.target.value)}
									className="block w-full p-2.5 pr-16 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
								/>

								{selectedDate && (
									<button
										type="button"
										onClick={handleClear}
										className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-gray-500 hover:text-red-500"
									>
										Clear
									</button>
								)}
							</div>
						) : (
							<div className="relative">
								<select
									id={`id-${selectedValue}`}
									name={selectedValue}
									value={selectedValue}
									onChange={(e) => {
										handleChange(e.target.value);
										setIsOpen(false);
									}}
									className="border-gray-300 rounded px-3 py-2 text-sm w-full"
								>
									{options?.map((option:any) => (
										<option key={option} value={option}>
											{option}
										</option>
									))}
								</select>
							</div>
						)}
					</div>
				)} */}

		</div >
	);
};

export default SelectButtonRoudedDark;
