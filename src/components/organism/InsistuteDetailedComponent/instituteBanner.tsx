'use client'
import ApplicationStepsModal from "@/components/application-forms/ApplicationStepsModal";
import RoundedButton from "@/components/atom/buttons/RoundedButton";
import Chips from "@/components/atom/Chips";
import OrganisationDetailCard from "@/components/molecule/OrganisationDetailCard";
import { getLastWords } from "@/components/reusuableComponents/ReusuableComponents";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import defaultBanner from "@/assets/School.jpg";

const InstituteBanner = ({ details }: any) => {
  const [updateTextValue, setUpdateTextValue] = useState("");
  const [isLoadings, setIsLoadings] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  useEffect(() => {
    setUpdateTextValue(getLastWords(details?.coaching_location?.location_value || '', 3));
  }, [details]);

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
    <div
      className={`w-full h-auto min-h-[15rem] lg:h-[17rem] p-2 md:p-5 flex flex-col justify-between bg-cover bg-center bg-no-repeat rounded-lg left-part ${isLoadings ? "sekleton-light-gray left-part" : ""}`}
      style={{ backgroundImage: isLoadings ? "" : `url(${details?.banner})` }}
    >
      <div className="w-full flex-box-between">
        <p className="text-base md:text-xl font-semibold text-white">Institute Rank #2</p>
        <Chips chiptext={`#${details?.name}`} />
      </div>
      <div className="w-full hidden lg:flex items-end justify-between">
        <OrganisationDetailCard
          schoolName={details?.name || "NA"}
          schoolType="Co-Ed"
          organisationAddress={details?.coaching_location || "NA"}
          organisationStatus={details?.verification_status || "NA"}
          organisationViews={details?.number_of_views || "0"}
          latitude={details?.coaching_location?.latitude || "0"}
          longitude={details?.coaching_location?.longitude || "0"}
          logo={details?.logo_link}
          isLoadings={isLoadings}
        />
        {
          isLoadings ? (<div className="w-[100px] h-10 skeleton-medium-gray rounded-lg"> </div>)
            : (<RoundedButton buttonName="Apply Now" withBackground fontBold onClick={handleApplyClick} />
            )}
      </div>
      {isModalOpen && (
        <ApplicationStepsModal
          show={showModal}
          onClose={() => setShowModal(false)}
          organisationId={details?._id}
          orgType="Coaching"
        />
      )}
    </div>
  );
};

export default InstituteBanner;
