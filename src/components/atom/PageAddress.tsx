"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const PageAddress = ({ type, name }: any) => {
	
	const route = useRouter();
	const [isLoadings, setIsLoadings] = useState(true);
	const typeNavigation = (type: string) => {
		if (type === "School") {
			route.push("/find/school");
		} else if (type === "College") {
			route.push("/find/college");
		} else {
			route.push("/find/coaching");
		}
	};

	const typeName = () => {
		route.push("/find");
	};

	useEffect(() => {
			setTimeout(() => {
				setIsLoadings(false);
			}, 1000);
		}, []);

	return (
		<div className="w-full flex items-center justify-start ">
			{isLoadings ? (
				<p className="skeleton-medium-gray h-7 w-[30%]"></p>
			) : (<p
				// className="text-base lg:text-lg text-deepBlue cursor-pointer"
				className="text-sm text-deepBlue cursor-pointer"
				onClick={(e) => {
					e.preventDefault();
					typeName();
				}}
			>
				Find
				<span
					className="cursor-pointer"
					onClick={(e) => {
						e.preventDefault();
						e.stopPropagation();
						typeNavigation(type);
					}}
				>
					<span>  </span> / {type}
				</span>
				<span
					onClick={(e) => {
						e.preventDefault();
						e.stopPropagation();
					}}
					className={`${type ? "font-semibold" : "font-normal"}`}
				>
				<span>  </span>	/ {name}
				</span>
			</p>)}
		</div>
	);
};

export default PageAddress;
