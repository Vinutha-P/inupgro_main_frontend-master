"use client";
import React, { useEffect, useRef, useState } from "react";
import PublicPageTemplate from "../templates/PublicPageTemplate";
import OrganizationContact from "../organism/OrganizationContact";
import PhotoGallery from "../organism/PhotoGallery";
import PlacementHighlight from "../organism/PlacementHighlight";
import SchoolarshipStudents from "../organism/CollegeDetailedComponents/SchoolarshipStudents";
import Clubs from "../organism/Clubs";
import Workshops from "../organism/Workshops";
import FeeStructureCollege from "../organism/CollegeDetailedComponents/FeeStructureCollege";
import OverviewPanel from "../organism/OverviewPanel";
import CampusCompany from "../organism/CollegeDetailedComponents/CampusCompany";
import CollegeDetailedDetailBannerComponent from "../organism/CollegeDetailedComponents/CollegeDetailBannerComponent";
import AcademicDetailCollege from "../organism/CollegeDetailedComponents/AcademicDetailCollege";
import PersonaliseYourFeedCard from "../molecule/PersonaliseYourFeedCard";
import RecomendedSchoolCard from "../molecule/RecomendedSchoolCard";
import FindCta from "../molecule/FindCta";
import PageAddress from "../atom/PageAddress";
import { useRouter, useSearchParams } from "next/navigation";
import {
  useGetCollegeByIdQuery,
  useSearchNearbyCollegesQuery,
} from "@/features/api/collegeApiSlice";
import KeyStatics from "../organism/KeyStatics";
import RoundedButton from "../atom/buttons/RoundedButton";
import { FaChevronLeft } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { setParamId } from "@/features/globalSlice";

const FindCollegeDetailsPage = () => {
  const searchParams = useSearchParams();
  const [isLoadings, setIsLoadings] = useState(true);
  const dispatch = useDispatch();
  const id = searchParams.get("id");
  const [activeTab, setActiveTab] = useState("Key School Statistics");
  const [userData, setUserData] = useState({});
  const { data: collegeDetails } = useGetCollegeByIdQuery(id);
  const finalCollegeDetail = collegeDetails || userData || {};

  const latitude = finalCollegeDetail?.college_location?.latitude;
  const longitude = finalCollegeDetail?.college_location?.longitude;

  const { data: nearByData } = useSearchNearbyCollegesQuery({
    latitude,
    longitude,
    limit:6,
    skip: !finalCollegeDetail,
  });

  const router = useRouter();

  const tiles = [
    { tileDetail: "Ownership", tileHeading: finalCollegeDetail?.ownership || "NA" },
    { tileDetail: "University", tileHeading: finalCollegeDetail?.university || "NA" },
    { tileDetail: "Year of Establishment", tileHeading: finalCollegeDetail?.year_of_establishment || "NA" },
    { tileDetail: "Co-ed Status", tileHeading: finalCollegeDetail?.co_ed_status || "NA" },
    { tileDetail: "Campus Area", tileHeading: finalCollegeDetail?.campus_area || "NA" },
    { tileDetail: "Campus Type", tileHeading: finalCollegeDetail?.campus_type || "NA" },
  ];

  const sectionsRef = {
    "Key College Statistics": useRef(null),
    Workshops: useRef(null),
    Courses: useRef(null),
    "Placement Highlight": useRef(null),
    "Academic Statistics": useRef(null),
    "Contact Details": useRef(null),
    Clubs: useRef(null),
    "Photo gallery": useRef(null),
  };

  const tabNames = Object.keys(sectionsRef);

  const handleTabClick = (tabName) => {
    const element = sectionsRef[tabName]?.current;
    if (element) {
      const headerOffset = 100;
      const offsetTop = element.getBoundingClientRect().top + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetTop, behavior: "smooth" });
    }
    setActiveTab(tabName);
  };

  const handleDetailpage = (id) => {
    router.push(`/find/college-detail?id=${id}`);
  };

  const handleBack = () => router.push("/onboarding-college/clubs-gallery");
  // const handlePublish = () => router.push("/subscription/subscription-plans");
  const handlePublish = () => router.push("/dashboard");

  useEffect(() => {
    setTimeout(() => {
      setIsLoadings(false);
    }, 1000);

    const localData = localStorage.getItem("college-data");
    if (localData) {
      setUserData(JSON.parse(localData));
    }
  }, []);

  return (
    <PublicPageTemplate>
      <div className="flex w-full justify-between items-center">
        <PageAddress type="College" name={finalCollegeDetail?.name || "NA"} />
        {!finalCollegeDetail?.isActive && (
          <div className="flex gap-4">
            <RoundedButton
              withBackground={false}
              textColor="#2E90FA"
              buttonName="Go Back"
              fontBold={true}
              icon={FaChevronLeft}
              onClick={handleBack}
            />
            <RoundedButton
              buttonName="Publish"
              withBackground
              onClick={handlePublish}
              fontBold
            />
          </div>
        )}
      </div>

      <div className="left-part">
        <div className="w-full flex flex-col items-start justify-start gap-5">
          <CollegeDetailedDetailBannerComponent details={finalCollegeDetail} />

          <OverviewPanel
            tabNames={tabNames}
            onTabClick={handleTabClick}
            activeTab={activeTab}
          />

          {finalCollegeDetail && (
            <>
              <div className="w-full" id="Key College Statistics" ref={sectionsRef["Key College Statistics"]}>
                <KeyStatics tiles={tiles} heading="Key College Statistics" />
              </div>
              <div className="w-full" id="Courses" ref={sectionsRef["Courses"]}>
                <FeeStructureCollege
                  courses={finalCollegeDetail?.courses || []}
                  principalDetail={finalCollegeDetail?.principal || {}}
                />
              </div>
              <div id="Scholarship Students">
                <SchoolarshipStudents scholarshipData={finalCollegeDetail?.scholarship_students || {}} />
              </div>
              <div className="w-full" id="Academic Statistics" ref={sectionsRef["Academic Statistics"]}>
                <AcademicDetailCollege details={finalCollegeDetail} />
              </div>
              <div className="w-full" id="Workshops" ref={sectionsRef["Workshops"]}>
                <Workshops workshops={finalCollegeDetail?.workshops || []} />
              </div>
              <div id="Placement Highlight" ref={sectionsRef["Placement Highlight"]}>
                <PlacementHighlight placementData={finalCollegeDetail?.placement_highlights || {}} />
              </div>

              <CampusCompany placementData={finalCollegeDetail?.campus_opportunities || {}} />

              {finalCollegeDetail?.clubs?.length > 0 && (
                <div className="w-full" id="Clubs" ref={sectionsRef["Clubs"]}>
                  <Clubs details={finalCollegeDetail?.clubs} />
                </div>
              )}

              <div className="w-full" id="Photo gallery" ref={sectionsRef["Photo gallery"]}>
                <PhotoGallery details={finalCollegeDetail?.photos || []} />
              </div>

              <div className="w-full" id="Contact Details" ref={sectionsRef["Contact Details"]}>
                <OrganizationContact
                  address={finalCollegeDetail?.college_location?.location_value || "NA"}
                  mail={finalCollegeDetail?.contact_info?.email || "NA"}
                  link={finalCollegeDetail?.contact_info?.website || "NA"}
                  latitude={latitude || "NA"}
                  longitude={longitude || "NA"}
                />
              </div>
            </>
          )}
        </div>

        <div className="w-fit min-w-fit hidden xl:flex flex-col gap-5 pb-4">
          <PersonaliseYourFeedCard isLoadings={isLoadings} />
          <div className="w-full flex flex-col gap-5 pb-4">
            <h5 className="text-base lg:text-xl font-semibold text-darkBlue">
              Recommended College
            </h5>
            {nearByData?.data?.map((ele, index) => (
              <RecomendedSchoolCard
                key={index}
                schoolImage={ele?.banner}
                schoolName={ele?.name || "NA"}
                schoolLocation={ele?.college_location || "NA"}
                latitude={ele?.college_location?.latitude || "NA"}
                longitude={ele?.college_location?.longitude || "NA"}
                id={ele?._id}
                handleDetail={handleDetailpage}
                title="" // from admin-panel-ui branch
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

export default FindCollegeDetailsPage;
