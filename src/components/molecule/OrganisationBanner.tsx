"use client";
import React, { useEffect, useState } from "react";
import Chips from "../atom/Chips";
import OrganisationDetailCard from "./OrganisationDetailCard";
import RoundedButton from "../atom/buttons/RoundedButton";
import { getLastWords } from "../reusuableComponents/ReusuableComponents";
import ApplicationStepsModal from "../application-forms/ApplicationStepsModal";
import { formatLocation } from "@/utils/helper";

const OrganisationBanner = ({ details }: any) => {
	const [isLoadings, setIsLoadings] = useState(true);
	const [showModal, setShowModal] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);

	useEffect(() => {
		setTimeout(() => {
			setIsLoadings(false);
		}, 1000);
	}, []);

	const handleApplyClick = () => {
		if (details?._id) {
			setShowModal(true);
			setIsModalOpen(true);
		}
	};

	useEffect(() => {
		if (isModalOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "auto";
		}
		return () => {
			document.body.style.overflow = "auto";
		};
	}, [isModalOpen]);

	return (
		<div
			className={`w-full h-auto min-h-[15rem] lg:h-[17rem] p-2 md:p-5 flex flex-col justify-between bg-cover bg-center bg-no-repeat rounded-lg left-part ${isLoadings ? "sekleton-light-gray left-part" : ""}`}
			style={{ backgroundImage: isLoadings ? "" : `url(${details?.banner})` }}
		>
			<div className="w-full flex-box-between">
				{isLoadings ? (<h5 className="skeleton-medium-gray w-[140px] h-7 "></h5>) : (<h5 className="text-base md:text-xl font-semibold text-white">School Rank #2</h5>)}

				<Chips chiptext={`#${details?.name}`} />
			</div>
			<div className="w-full hidden lg:flex items-end justify-between gap-4">
				<OrganisationDetailCard
					schoolName={details?.name || "NA"}
					schoolType={"Co-ed"}
					organisationAddress={details?.school_location || {}}
					organisationStatus={details?.verification_status || "NA"}
					organisationViews={details?.number_of_views || "0"}
					latitude={details?.school_location?.latitude || "NA"}
					longitude={details?.school_location?.longitude || "NA"}
					logo={details?.logo_link || ""}
					isLoadings={isLoadings}
				/>
				{isLoadings ?
					(<div className="w-[100px] h-10 skeleton-medium-gray  rounded-lg"> </div>)
					: (<RoundedButton buttonName="Apply Now" withBackground fontBold onClick={handleApplyClick} />
					)}
			</div>

			{isModalOpen && (
				<ApplicationStepsModal
					show={showModal}
					onClose={() => setShowModal(false)}
					organisationId={details?._id}
					orgType="School"
				/>
			)}
		</div>
	);
};

export default OrganisationBanner;
