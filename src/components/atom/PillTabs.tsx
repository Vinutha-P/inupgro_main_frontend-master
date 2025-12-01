"use client";
import React, { useState, useEffect } from "react";

const PillTabs: React.FC<any> = ({ tabName, isActive, onClick, className }) => {
	const [isLoadings, setIsLoadings] = useState(true);

	useEffect(() => {
		setTimeout(() => {
			setIsLoadings(false);
		}, 1000);
	}, []);
	return (
		<>
			{isLoadings ? (
				<div className="w-[80px] h-10 skeleton-medium-gray rounded-lg "> </div>
			) : (
				<button
					type="button"
					className={`w-fit min-w-fit px-2 py-[0.594rem] h-[2.5rem] text-sm flex-box-center font-semibold rounded-lg ${
						isActive
							? "bg-darkBlue text-white"
							: "text-brandPrimary bg-white border border-brandSecondary"
					}`}
					onClick={onClick}
				>
					{tabName}
				</button>
			)}
		</>
	);
};

export default PillTabs;
