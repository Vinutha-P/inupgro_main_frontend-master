'use client'
import RoundedButton from '@/components/atom/buttons/RoundedButton'
import OrganisationDetailCard from '@/components/molecule/OrganisationDetailCard'
import React, { useEffect, useState } from 'react'
import InstituteBanner from './instituteBanner'


const InstituteDetailBanner = ({ details }: any) => {
  const [isLoadings, setIsLoadings] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoadings(false);
    }, 1000);
  }, []);
  return (
    <>
      <div className="w-full flex flex-col gap-2">
        <InstituteBanner details={details} />
        <div className="w-full flex lg:hidden flex-col gap-3 md:gap-2">
          <OrganisationDetailCard
            schoolName={details?.name || "NA"}
            schoolType={"Co-ed"}
            organisationAddress={details?.coaching_location || "NA"}
            organisationStatus={details?.verification_status || "NA"}
            organisationViews={details?.number_of_views || "NA"}
            width='100%'
            latitude={details?.coaching_location?.latitude || "NA"}
            longitude={details?.coaching_location?.longitude || "NA"}
            isLoadings={isLoadings}

          />
          <RoundedButton width="100%" buttonName="Apply Now" withBackground fontBold />
        </div>
      </div>
    </>
  )
}

export default InstituteDetailBanner
