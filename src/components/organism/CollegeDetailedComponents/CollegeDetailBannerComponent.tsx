'use client'
import React, { useEffect, useState } from "react";
import OrganisationDetailCard from "../../molecule/OrganisationDetailCard";
import RoundedButton from "../../atom/buttons/RoundedButton";
import CollegeBanner from "./CollegeBanner";

const CollegeDetailedDetailBannerComponent = ({ details }: any) => {
    const [isLoadings, setIsLoadings] = useState(true);
    useEffect(() => {
          setTimeout(() => {
            setIsLoadings(false);
          }, 1000);
        }, []);
    
  return (
    <>
    <div className="w-full flex flex-col gap-2">
    <CollegeBanner details={details}/>
    <div className="w-full flex lg:hidden flex-col gap-3 md:gap-2">
      <OrganisationDetailCard
        schoolName={details?.name || "NA"}
        schoolType="Co-Ed"
        organisationAddress={details?.college_location || {}}
        organisationStatus={details?.verification_status || "NA"}
        organisationViews={details?.number_of_views || 0}
        latitude={details?.college_location?.latitude || "NA"}
        longitude={details?.college_location?.longitude || "NA"}
        logo={details?.logo_link}
        isLoadings={isLoadings}
      />
      <RoundedButton width="100%" buttonName="Apply Now" withBackground fontBold />
    </div>
  </div>
  </>
  );
};

export default CollegeDetailedDetailBannerComponent;
