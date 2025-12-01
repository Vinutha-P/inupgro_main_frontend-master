"use client";
import React, { useEffect, useState } from "react";
import OrganisationDetailCard from "@/components/molecule/OrganisationDetailCard";
import Chips from "@/components/atom/Chips";
import RoundedButton from "@/components/atom/buttons/RoundedButton";
import BannerSkelton from "@/components/skelton-components/BannerSkelton";
import { getLastWords } from "@/components/reusuableComponents/ReusuableComponents";
import { useRouter } from "next/navigation";
import ApplicationStepsModal from "@/components/application-forms/ApplicationStepsModal";

const CollegeBanner = ({ details }: any) => {
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

  const handleCloseModal = () => {
    setShowModal(false);
    setIsModalOpen(false);
  };

  return (
    <>
      {
        details ? <div
          className={`w-full h-auto min-h-[15rem] lg:h-[17rem] p-2 md:p-5 flex flex-col justify-between bg-cover bg-center bg-no-repeat rounded-lg left-part ${isLoadings ? "sekleton-light-gray left-part" : ""}`}
          style={{ backgroundImage: isLoadings ? "" : `url(${details?.banner})` }}
        >
          <div className="w-full flex-box-between">
            <p className="text-base md:text-xl font-semibold text-white">College Rank #2</p>
            <Chips chiptext={`#${details?.name}`} />
          </div>
          <div className="w-full hidden lg:flex items-end justify-between">
            <OrganisationDetailCard
              schoolName={details?.name || "NA"}
              schoolType="Co-Ed"
              organisationAddress={details?.college_location || "NA"}
              organisationStatus={details?.verification_status || "NA"}
              organisationViews={details?.number_of_views || "0"}
              latitude={details?.college_location?.latitude || "NA"}
              longitude={details?.college_location?.longitude || "NA"}
              logo={details?.logo_link}
              isLoadings={isLoadings}
            />
            {isLoadings
              ? (<div className="w-[100px] h-10 skeleton-medium-gray rounded-lg"> </div>)
              : (<RoundedButton buttonName="Apply Now" withBackground fontBold onClick={handleApplyClick} />
              )}

          </div>
        </div> : <BannerSkelton />
      }
      {isModalOpen && (
        <ApplicationStepsModal
          show={isModalOpen}
          onClose={handleCloseModal}
          organisationId={details?._id}
        />
      )}

    </>
  );
};

export default CollegeBanner;
