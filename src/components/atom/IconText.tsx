'use client';
import React, { useEffect, useState } from "react";
import { IconType } from "react-icons";

interface IconTextProps {
	icon: IconType;
	text: string;
	textColor?: string;
	isBold?: boolean;
	fill?: string;
	latitude?: string;
	longitude?: string;
}

const IconText: React.FC<IconTextProps> = ({
	icon: Icon,
	text,
	textColor,
	isBold,
	fill,
	latitude,
	longitude,
}) => {
	const [isLoadings, setIsLoadings] = useState(true);
	useEffect(() => {
		setTimeout(() => {
			setIsLoadings(false);
		}, 1000);
	}, []);

	const handleMap = () => {
		if (latitude && longitude) {
			const mapUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;

			window.open(mapUrl, "_blank");
		}
	};

	return (
		<div
			className="w-fit h-fit flex items-center justify-start gap-1 md:gap-1 cursor-pointer"
			onClick={handleMap}
		>
			{isLoadings ? (
				<div className="w-6 h-4 skeleton-medium-gray" />
			) : (
				<div>
					<Icon
						className="h-4 w-4 md:h-5 md:w-5 font-extrabold"
						style={{ color: "textColor", fontWeight:"800" }}
						{...(fill && { fill })}
					/>
				</div>
			)}

			{isLoadings  ? (
				<div className="w-6 h-4 skeleton-medium-gray" />
			) : (
				<p
					// title={text}
					className={`text-[0.525rem] font-semibold md:text-[0.725rem] text-darkBlue lg:text-navy sm:max-w-[82%]  lg:max-w-[100%] capitalize ${isBold ? "font-bold" : "font-normal "}`}
					style={{ color: textColor }}
				>
					{text}
				</p>
			)}

		</div>
	);
};

export default IconText;
