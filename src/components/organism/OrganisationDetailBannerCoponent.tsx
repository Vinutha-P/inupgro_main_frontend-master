'use client'
import React, { useEffect, useState } from "react";
import OrganisationBanner from "../molecule/OrganisationBanner";
import OrganisationDetailCard from "../molecule/OrganisationDetailCard";
import RoundedButton from "../atom/buttons/RoundedButton";

type Props = {
	details: any; 
	isLoadings: boolean;
  };

const OrganisationDetailBannerCoponent: React.FC<Props> = ({ details, isLoadings }) => {
	
	return (
		<>
		<div className="w-full flex flex-col gap-2">
			<OrganisationBanner details={details} />
			<div className="w-full flex lg:hidden flex-col gap-3 md:gap-2">
				<OrganisationDetailCard
					schoolName={details?.name || "NA"}
					schoolType={"Co-ed"}
					organisationAddress={details?.school_location || "NA"}
					organisationStatus={details?.verification_status || "NA"}
					organisationViews={details?.number_of_views || "0"}
					width="100%"
					latitude={details?.school_location?.latitude || "NA"}
					longitude={details?.school_location?.longitude || "NA"}
					logo={details?.logo_link || ""}
					isLoadings={isLoadings}
				/>

				<RoundedButton
					width="100%"
					buttonName="Apply Now"
					withBackground
					fontBold
				/>
			</div>
		</div>
		</>
	);
};

export default OrganisationDetailBannerCoponent;
