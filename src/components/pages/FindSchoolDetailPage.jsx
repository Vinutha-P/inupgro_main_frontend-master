"use client";
import React, { useState, useEffect, useRef } from "react";
import PublicPageTemplate from "../templates/PublicPageTemplate";
import PersonaliseYourFeedCard from "../molecule/PersonaliseYourFeedCard";
import RecomendedSchoolCard from "../molecule/RecomendedSchoolCard";
import PageAddress from "../atom/PageAddress";
import FindCta from "../molecule/FindCta";
import OrganisationDetailBannerCoponent from "../organism/OrganisationDetailBannerCoponent";
import OrganizationContact from "../organism/OrganizationContact";
import PhotoGallery from "../organism/PhotoGallery";
import Clubs from "../organism/Clubs";
import KeyStatics from "../organism/KeyStatics";
import OverviewPanel from "../organism/OverviewPanel";
import { useRouter, useSearchParams } from "next/navigation";
import {
  useGetSchoolByIdQuery,
  useSearchNearbySchoolsQuery,
} from "@/features/api/schoolApiSlice";
import AcademicDetailSectionSchool from "../organism/SchoolDetailComponents/AcademicDetailSectionSchool";
import FeeStructureSchool from "../organism/SchoolDetailComponents/FeeStructureSchool";
import RoundedButton from "../atom/buttons/RoundedButton";
import { FaChevronLeft } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { clearMultipleLocalStorageItems } from "@/utils/localStorageClear";

const FindSchoolDetailPage = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [isLoadings, setIsLoadings] = useState(true);
  const [userData, setUserData] = useState({});
  const { data: schoolDetails } = useGetSchoolByIdQuery(id);

  const finalSchoolDetail = schoolDetails || userData;

  const latitude = schoolDetails?.school_location?.latitude || userData?.school_location?.latitude;
  const longitude = schoolDetails?.school_location?.longitude || userData?.school_location?.longitude;

  const dispatch = useDispatch();

  const { data: nearByData } = useSearchNearbySchoolsQuery({
    latitude: latitude || "NA",
    longitude: longitude || "NA",
    limit:6,
    skip: !finalSchoolDetail || null,
    // skip: !schoolDetails || null,
  });
  const [activeTab, setActiveTab] = useState("Key School Statistics");
  const router = useRouter();

  useEffect(() => {
     clearMultipleLocalStorageItems("school")
    setTimeout(() => {
      setIsLoadings(false);
    }, 1000);

    const localData = localStorage.getItem("school-data");
    if (localData) {
      const parsedData = JSON.parse(localData);
      setUserData(parsedData);
    }

  }, []);

  // Create refs for each section
  const sectionsRef = {
    "Key School Statistics": useRef(null),
    "Fees Structure": useRef(null),
    "Academic Statistics": useRef(null),
    Clubs: useRef(null),
    "Photo Gallery": useRef(null),
    "Contact Details": useRef(null),
  };

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    // Using both ID and ref for compatibility
    const element = document.getElementById(tabName);
    const ref = sectionsRef[tabName];

    if (ref.current) {
      const yOffset = -100;
      const y =
        ref.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    } else if (element) {
      const yOffset = -100;
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const tabNames = [
    "Key School Statistics",
    "Fees Structure",
    "Academic Statistics",
    "Clubs",
    "Photo Gallery",
    "Contact Details",
  ];

  const tiles = [
    {
      tileDetail: "Ownership",
      tileHeading: finalSchoolDetail?.ownership || "NA",
    },
    {
      tileDetail: "Board",
      tileHeading:
        finalSchoolDetail?.boards && finalSchoolDetail?.boards.length > 0
          ? finalSchoolDetail?.boards.join(" / ")
          : "Not Specified",
    },
    { tileDetail: "Year of Establishment", tileHeading: "1989" },
    {
      tileDetail: "Co-ed Status",
      tileHeading: finalSchoolDetail?.gender_specific === "Co-ed" ? "Yes" : "No",
    },
    {
      tileDetail: "Campus Area",
      tileHeading: finalSchoolDetail?.campus_area || "NA",
    },
    {
      tileDetail: "Campus Type",
      tileHeading: finalSchoolDetail?.campus_type || "NA",
    },
  ];

  const handleDetailpage = (id) => {
      router.push(`/find/school-detail?id=${id}`);
  };

  const handleBack = () => router.push("/onboarding-school/clubs-gallery");
  const handlePublish = () => {
    // router.push("/subscription/subscription-plans");
    router.push("/dashboard");
  }

  return (
    <PublicPageTemplate className="w-[100%]">
      <div className="flex w-full justify-between items-center">
        <PageAddress type="School" name={finalSchoolDetail?.name || "NA"} />
        {
          !finalSchoolDetail?.isActive &&
          <div className="flex gap-4">
            <RoundedButton
              withBackground={false}
              textColor="#2E90FA"
              buttonName="Go Back"
              width="100%"
              fontBold={true}
              icon={FaChevronLeft}
              onClick={handleBack}
              height="28px"
            />
            <RoundedButton
              buttonName="Publish"
              width="100%"
              withBackground
              fontBold
              height="28px"
              onClick={handlePublish}
            />
          </div>
        }
      </div>

      <div className="flex gap-5" style={{ width: "100%" }}>
        {finalSchoolDetail && (
          // <div className="w-full  xl:!w-[83%] 2xl:w-[81%] flex flex-col items-start justify-start gap-3 md:gap-5 ">
          <div className="left-part flex flex-col items-start justify-start gap-3 md:gap-5 ">
            <OrganisationDetailBannerCoponent details={finalSchoolDetail} isLoadings={isLoadings} />
            <OverviewPanel
              activeTab={activeTab}
              tabNames={tabNames}
              onTabClick={handleTabClick}
            />
            <div
              id="Key School Statistics"
              ref={sectionsRef["Key School Statistics"]}
              className="w-full"
            >
              <KeyStatics heading="Key School Statistics" tiles={tiles} />
            </div>
            <div
              id="Fees Structure"
              ref={sectionsRef["Fees Structure"]}
              className="w-full"
            >
              <FeeStructureSchool details={finalSchoolDetail} />
            </div>
            <div
              id="Academic Statistics"
              ref={sectionsRef["Academic Statistics"]}
              className="w-full"
            >
              <AcademicDetailSectionSchool details={finalSchoolDetail} />
            </div>
            {
              finalSchoolDetail?.clubs?.length > 0 &&
              <div id="Clubs" ref={sectionsRef["Clubs"]} className="w-full">
                <Clubs details={finalSchoolDetail?.clubs}
                  isLoadings={isLoadings}
                />
              </div>
            }

            <div
              id="Photo Gallery"
              ref={sectionsRef["Photo Gallery"]}
              className="w-full"
            >
              <PhotoGallery details={finalSchoolDetail?.photos}
                isLoadings={isLoadings}
              />
            </div>
            <div
              id="Contact Details"
              ref={sectionsRef["Contact Details"]}
              className="w-full"
            >
              <OrganizationContact
                address={finalSchoolDetail?.school_location?.location_value || "NA"}
                mail={finalSchoolDetail?.contact_info?.email || "NA"}
                link={finalSchoolDetail?.contact_info?.website || "NA"}
                latitude={finalSchoolDetail?.school_location?.latitude || "NA"}
                longitude={finalSchoolDetail?.school_location?.longitude || "NA"}
                isLoadings={isLoadings}
              />
            </div>
          </div>
        )}
        <div className="w-fit min-w-fit hidden xl:flex flex-col gap-5 pb-4">
          <PersonaliseYourFeedCard isLoadings={isLoadings} />
          {/* isLoadings={isLoadings} */}
          <div className="w-full flex flex-col gap-5 pb-4">
            {isLoadings ? (<h5 className="w-full h-7 skeleton-medium-gray rounded-lg"></h5>) : (<h5 className="text-base lg:text-xl font-semibold text-darkBlue">Recommended School</h5>)}

            {nearByData?.data &&
              nearByData?.data.map((ele, index) => (
                <RecomendedSchoolCard
                  key={index}
                  schoolImage={ele?.banner || ""}
                  schoolName={ele?.name || "NA"}
                  schoolLocation={ele?.school_location || "NA"}
                  latitude={ele?.school_location?.latitude || "NA"}
                  longitude={ele?.school_location?.longitude || "NA"}
                  handleDetail={handleDetailpage}
                  id={ele?._id}
                  isLoadings={isLoadings}
                />
              ))}
          </div>
        </div>
      </div>
      <FindCta
        ctaHeading="Have any questions or doubts for us?"
        ctaSubheading="Have any questions about this school while applying? Let us know, and we'll get back to you!"
      />
    </PublicPageTemplate>
  );
};

export default FindSchoolDetailPage;
