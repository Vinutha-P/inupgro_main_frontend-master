'use client'
import Image from "next/image";
import type React from "react";
import SchoolLogo from "@/assets/School_logo.png";
import IconText from "../atom/IconText";
import { IoEyeOutline, IoLocationOutline } from "react-icons/io5";
import { TbCurrentLocation } from "react-icons/tb";
import { RiVerifiedBadgeLine } from "react-icons/ri";
import { formatLocation } from "@/utils/helper";

interface OrganisationDetailCardProps {
	schoolName: string;
	schoolType: string;
	organisationAddress: any;
	organisationViews: string;
	organisationStatus: string;
	width?: string;
	latitude?: string;
	longitude?: string;
	logo?: string | undefined;
	isLoadings: boolean;
}

const OrganisationDetailCard: React.FC<OrganisationDetailCardProps> = ({
	schoolName,
	schoolType,
	organisationAddress,
	organisationViews,
	organisationStatus,
	width,
	latitude,
	longitude,
	logo,
	isLoadings
}) => {
	const {
		landmark = "",
		city = "",
		state = "",
		pincode = "",
		location_value = "",
		plotNo = "",
		country = "",
	} = organisationAddress || {};

	const formattedText = formatLocation(landmark, city, location_value);

	return (
		<div
			className={`w-fit min-h-[8.75rem] md:w-full lg:w-[50%] h-fit p-2 lg:p-5 flex items-center gap-5 rounded-lg bg-overlayWhite ${isLoadings ? "skeleton-dark-gray" : "bg-softBlue"}`}
			style={{ width }}
		>
			{
				isLoadings ? (<div className="w-[100px] h-[100px] skeleton-medium-gray"></div>) :
					(
						<div className="relative !min-w-[4.875rem] !min-h-[4.875rem] flex-box-center">

							<Image
								src={logo || SchoolLogo}
								alt="Logo"
								fill
								className="object-contain !min-h-[100%]"
							/>
						</div>
					)
			}
			<div className=" w-fit lg:w-[80%] flex flex-col gap-2">
				{
					isLoadings ? (<h6 className="w-full md:w-[405px] h-7 skeleton-medium-gray"></h6>) : (
						// <h4 className="text-xl lg:text-[1.75rem] font-semibold text-deepBlue">
						<h6 className="">
							{schoolName} <span>({schoolType})</span>
						</h6>
					)
				}
				<div className="w-full flex flex-col lg:flex-row lg:items-center justify-start gap-1 lg:gap-5">
					
					<div className="relative group/address w-fit">
						<IconText icon={IoLocationOutline}
							text={formattedText} />

						<div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover/address:block bg-gray-800 text-white text-xs rounded-md px-3 py-1 whitespace-nowrap z-10">
							{organisationAddress?.location_value}
						</div>
					</div>
					<IconText
						icon={TbCurrentLocation}
						text={"See Location"}
						textColor="#2E90FA"
						fill="transparent"
						latitude={latitude}
						longitude={longitude}
					/>
				</div>
				<div className="flex-box-start">
					<IconText
						icon={IoEyeOutline}
						isBold
						text={organisationViews}
						textColor="#293E6A"
					/>
					<IconText
						icon={RiVerifiedBadgeLine}
						text={organisationStatus}
						isBold
						textColor="#2E90FA"
					/>
				</div>
			</div>
		</div>
	);
};

export default OrganisationDetailCard;
