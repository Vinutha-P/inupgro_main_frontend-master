"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import ButtonWithIcon from "../atom/buttons/ButtonWithIcon";
import { MdOutlineLocationOn } from "react-icons/md";
import SchoolLogo from "@/assets/School_logo.png";
import { getLastWords } from "../reusuableComponents/ReusuableComponents";
import { formatLocation } from "@/utils/helper";

interface RecomendedSchoolCardProps {
	schoolName: string;
	schoolLocation: any;
	schoolImage: string;
	isLoadings: boolean;
}

const RecomendedSchoolCard: React.FC<RecomendedSchoolCardProps> = ({
	schoolName,
	schoolLocation,
	schoolImage,
	latitude,
	longitude,
	handleDetail,
	id,
	isLoadings,
}: any) => {
	const handleLocation = () => {
		if (latitude && longitude) {
			const mapUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
			window.open(mapUrl, "_blank");
		}
	};

	const {
		landmark = "",
		city = "",
		state = "",
		pincode = "",
		location_value = "",
		plotNo = "",
		country = "",
	} = schoolLocation || {};

	const formattedText = formatLocation(landmark, city, location_value);

	return (
		// <div className={`w-[15.06rem] h-fit p-5 flex flex-col gap-[0.9375rem] border border-coolGray rounded-lg ${isLoadings ? "sekleton-light-gray" :"bg-white"}`}>
		<div className={`lg:w-[15rem] h-fit p-5 flex flex-col gap-[0.9375rem] border border-coolGray rounded-lg ${isLoadings ? "sekleton-light-gray" : "bg-white"}`}>
			<div
				className="flex flex-col gap-2"
				onClick={() => handleDetail(id)}
			>
				<div className="relative w-full h-[7.5rem] rounded-lg">
					{
						isLoadings ? (<div className="w-full h-full skeleton-medium-gray rounded-lg"></div>) : (
							<Image
								fill
								src={schoolImage || SchoolLogo}
								alt="school-image"
								className="w-full h-[100%] rounded-lg object-cover"
							/>)
					}

				</div>
				<div className="w-full flex flex-col gap-[0.3125rem]">
					{
						isLoadings ? (<h5 className="w-full h-7 skeleton-medium-gray rounded-lg"></h5>) : (<h5 className="text-lg lg:text-base font-semibold text-deepBlue">{schoolName}</h5>)
					}
					{
						isLoadings ? (<p className="w-full h-12 skeleton-medium-gray rounded-lg"></p>) : (<p className=" text-xs text-neutralGray">
							{/* {schoolLocation} */}
							{formattedText}
						</p>)
					}
				</div>
			</div>
			{
				isLoadings ? (<h5 className="w-full h-10 skeleton-medium-gray rounded-lg"></h5>) : (<ButtonWithIcon
					buttonName="See Location"
					icon={MdOutlineLocationOn}
					onClick={handleLocation}

				/>)
			}

		</div>
	);
};

export default RecomendedSchoolCard;
