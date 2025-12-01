"use client";
import React, { useEffect, useState } from "react";

const DetailTiles: React.FC<any> = ({
	height,
	tileDetail,
	tileHeading,
	className,
}) => {
	const [isLoadings, setIsLoadings] = useState(true);
	useEffect(() => {
		setTimeout(() => {
			setIsLoadings(false);
		}, 1000);
	}, []);

	return (
		<>
			{isLoadings ? (
				<div className="max-w-[234px] h-[54px] skeleton-medium-gray rounded" />
			) : (
				<div
					className="w-full min-h-[3.313rem] flex flex-col items-center justify-center text-center gap-0 
    bg-background rounded-lg transition-all duration-300 
    group-hover:bg-white hover:bg-lightBlueCustom"
					style={{ height }}
				>
					<p className={`text-[0.75rem] text-navy ${className}`}>
						{tileDetail}
					</p>
					<p
						className={`font-semibold text-deepBlue text-[0.875rem] ${className}`}
					>
						{tileHeading}
					</p>
				</div>
			)}
		</>
	);
};

export default DetailTiles;
