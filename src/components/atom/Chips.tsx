"use client";
import { useRouter } from "next/navigation";
import router from "next/router";
import type React from "react";
import { useEffect, useState } from "react";

interface ChipTextProps {
	chiptext: string;
	withBorder?: boolean;
	withDotActive?: boolean;
	className?: string;
}

const Chips: React.FC<ChipTextProps> = ({
	chiptext,
	withDotActive,
	className,
}) => {
	const [isLoadings, setIsLoadings] = useState(true);
	const router = useRouter();

	useEffect(() => {
		setTimeout(() => {
			setIsLoadings(false);
		}, 1000);
	}, []);

	const handleClick = () => {
		if (chiptext?.startsWith("#")) {
			const tag = chiptext?.replace("#", "");
			router.push(
				`/educational_news/tag_results?tag=${encodeURIComponent(tag)}`,
			);
		}
	};

	return (
		<>
			{isLoadings ? (
				<div className="md:w-24 h-6 skeleton-medium-gray" />
			) : (
				<div
					onClick={handleClick}
					onKeyUp={(e) => {
						if (e.key === "Enter" || e.key === " ") {
							handleClick();
						}
					}}
					className={`flex-box-center gap-1 border border-customGrayBlue bg-white cursor-pointer 
			${className} w-auto sm:w-36 md:w-fit md:min-w-fit h-[1.200rem] px-2 md:h-[1.400rem] p-1 rounded-md md:rounded-[0.375rem]`}
				>
					{withDotActive && (
						<div
							className={`w-1.5 h-1.5 rounded ${withDotActive ? "bg-green" : "bg-red-800"}`}
						/>
					)}
					<span
						className={`text-[0.525rem] sm:text-xs font-extrabold text-darkBlue h-full ${className}`}
					>
						{chiptext}
					</span>
				</div>
			)}
		</>
	);
};

export default Chips;
