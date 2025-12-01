'use client'
import Image from "next/image";
import type React from "react";
import Principal from "@/assets/Principal_Demo_Image.png";
import IconText from "../atom/IconText";
import { MdOutlineShield } from "react-icons/md";
import { LuTrophy } from "react-icons/lu";
import Chips from "../atom/Chips";
import { useEffect, useState } from "react";

const PrincipalProfileCard: React.FC<any> = ({
	principalName,
	principalAge,
	degree,
	experience,
	award,
	principalImage,
	personality,
	height,
}) => {

	const [isLoadings, setIsLoadings] = useState(true);

	useEffect(() => {
		setTimeout(() => {
			setIsLoadings(false);
		}, 1000);
	}, []);

	return (
		<div className={`w-full lg:max-w-[21rem] h-full p-3 md:p-5 rounded-lg ${isLoadings ? "sekleton-light-gray" : "bg-white"}`}>
			{isLoadings ? (<h6 className="w-full h-8 skeleton-medium-gray rounded-lg"></h6>) : (<h6 className=" text-darkBlue pb-2">
				Principal’s Profile
			</h6>)}
			<div className="flex flex-col sm:flex-row md:items-center lg:flex-col gap-3 ">
				<div className="sm:w-1/2 lg:w-full">
					<div
						className="relative w-full md:max-w-[24.875rem] h-auto min-h-[12.375rem] max-h-[13.75rem] flex-box-center rounded-lg"
						style={{ height }}
					>
						{
							isLoadings ? (<div className="w-full h-full skeleton-medium-gray rounded-lg"></div>) : (
								<Image
									fill
									quality={100}
									src={
										principalImage ||
										"https://inupgro.s3.ap-south-1.amazonaws.com/uploads/blog-to-become-a-principal.jpeg"
									}
									// src=""
									alt="Principal of Organization"
									className="w-full md:max-w-[24.875rem] h-full  rounded-lg  md:object-cover"
								/>
							)
						}

					</div>
				</div>

				<div className="sm:w-1/2 lg:w-full">

					<div className="w-full flex flex-col gap-4">
						{
							isLoadings ? (<h5 className="w-full h-11 skeleton-medium-gray rounded-lg"></h5>) : (
								<div className="text-xs font-semibold text-darkBlue flex items-center gap-2">
									{/* <h6 className="text-xl lg:text-[1.3rem]">{principalName} </h6>	 */}
									<h6 className="">{principalName} </h6>
									<span className="">({principalAge})</span>
								</div>
							)}
						{
							isLoadings ? (<strong className="w-full h-6 skeleton-medium-gray rounded-lg"></strong>) : (
								// <strong className="text-sm md:text-base font-semibold text-c text-deepBlue">
								<strong className="text-[0.525rem] font-semibold md:text-[0.725rem] text-darkBlue lg:text-navy sm:max-w-[82%]  lg:max-w-[100%] capitalize mb-1">
									{degree}
								</strong>
							)}

					</div>
					<div className="w-full flex flex-col gap-1">
						<IconText
							icon={MdOutlineShield}
							text={experience || "NA"}
							textColor="#1C315E"
						/>
						<IconText
							icon={LuTrophy}
							text={Array.isArray(award) && award.length > 0
								? award.join(", ")
								: "NA"}
							textColor="#1C315E"
							fill="none"
						/>
					</div>
					<div className="w-full flex flex-col gap-4">
						{
							isLoadings ? (<strong className="w-full h-6 skeleton-medium-gray rounded-lg"></strong>) : (
								// <strong className="text-sm md:text-base font-semibold text-c text-deepBlue">
								<strong className="text-[0.525rem] font-semibold md:text-[0.725rem] text-darkBlue lg:text-navy sm:max-w-[82%]  lg:max-w-[100%] capitalize mt-2 ">
									Words to define his personality
								</strong>
							)}

						<div className="w-full flex flex-wrap justify-start items-center gap-2">
							{personality?.map((ele: any, index: number) => (
								<Chips chiptext={ele} key={index} />
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PrincipalProfileCard;
