"use client";
import React, { useState, useEffect, useRef } from "react";
import PublicPageTemplate from "../templates/PublicPageTemplate";
import PersonaliseYourFeedCard from "../molecule/PersonaliseYourFeedCard";
import RecomendedSchoolCard from "../molecule/RecomendedSchoolCard";
import PageAddress from "../atom/PageAddress";
import FindCta from "../molecule/FindCta";
import { useRouter, useSearchParams } from "next/navigation";
import FacultyCard from "../molecule/FacultyCard";
import ViewAllContainer from "../containers/NearYouContainer";
import OrganizationContact from "../organism/OrganizationContact";
import PhotoGallery from "../organism/PhotoGallery";
import FeeStructureInstitute from "../organism/FeeStructureInstitute";
import {
  useGetCoachingByIdQuery,
  useSearchNearbyCoachingsQuery,
} from "@/features/api/instituteApiSlice";
import InstituteDetailBanner from "../organism/InsistuteDetailedComponent/InstituteDetailBanner";
import TopRankingStudentInsistute from "../organism/InsistuteDetailedComponent/TopRankingStudentInsistute";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import RoundedButton from "../atom/buttons/RoundedButton";
import { clearMultipleLocalStorageItems } from "@/utils/localStorageClear";

const FindInstituteDetailPage = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [userData, setUserData] = useState({});
  const { data: coachingDetail } = useGetCoachingByIdQuery(id);

  const finalCoachingDetail = coachingDetail || userData || {};

  const latitude = finalCoachingDetail?.coaching_location?.latitude;
  const longitude = finalCoachingDetail?.coaching_location?.longitude;

  const { data: nearByData } = useSearchNearbyCoachingsQuery({
    latitude,
    longitude,
    limit: 6,
    skip: !finalCoachingDetail,
  });

  const router = useRouter();

  useEffect(() => {
    clearMultipleLocalStorageItems("coaching");
    const localData = localStorage.getItem("coaching-data");
    if (localData) {
      setUserData(JSON.parse(localData));
    }
  }, []);

  const scrollRef = useRef();

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleBack = () => router.push("/onboarding-coaching/clubs-gallery");
  // const handlePublish = () => router.push("/subscription/subscription-plans");
  const handlePublish = () => router.push("/dashboard");

  return (
    <PublicPageTemplate>
      <div className="flex w-full justify-between items-center">
        <PageAddress
          type="Coaching"
          name={finalCoachingDetail?.name || "NA"}
        />
        {!finalCoachingDetail?.isActive && (
          <div className="flex gap-4">
            <RoundedButton
              withBackground={false}
              textColor="#2E90FA"
              buttonName="Go Back"
              fontBold
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
          <InstituteDetailBanner details={finalCoachingDetail} />

          <FeeStructureInstitute
            feeStructureData={finalCoachingDetail?.subject_fees || {}}
            principalData={finalCoachingDetail?.principal || {}}
          />

          {finalCoachingDetail?.top_ranking_students && (
            <TopRankingStudentInsistute
              data={finalCoachingDetail?.top_ranking_students}
            />
          )}

          {finalCoachingDetail?.faculty?.length > 0 && (
            <ViewAllContainer groupHeading="Faculty" showViewAll={false}>
              <div className="relative w-full">
                <button
                  onClick={() => scroll("left")}
                  className="absolute z-10 left-0 top-1/2 -translate-y-1/2 bg-white rounded-full shadow-md p-2"
                >
                  <FaChevronLeft />
                </button>
                <div
                  ref={scrollRef}
                  className="w-full h-fit flex overflow-x-auto pb-2 scroll-smooth no-scrollbar"
                >
                  {finalCoachingDetail.faculty.map((ele, index) => (
                    <div
                      key={index}
                      className="flex-shrink-0 w-1/2 sm:w-1/3 lg:w-1/5 px-1 sm:px-2"
                    >
                      <FacultyCard
                        facultyName={ele?.name || "NA"}
                        subject={ele?.department || "NA"}
                        facultyimg={ele?.image || "NA"}
                      />
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => scroll("right")}
                  className="absolute z-10 right-0 top-1/2 -translate-y-1/2 bg-white rounded-full shadow-md p-2"
                >
                  <FaChevronRight />
                </button>
              </div>
            </ViewAllContainer>
          )}

          {finalCoachingDetail?.photos?.length > 0 && (
            <PhotoGallery details={finalCoachingDetail?.photos} />
          )}

          <OrganizationContact
            latitude={latitude || "NA"}
            longitude={longitude || "NA"}
            address={
              finalCoachingDetail?.coaching_location?.location_value || "NA"
            }
            mail={finalCoachingDetail?.contact_info?.email || "NA"}
            link={
              finalCoachingDetail?.contact_info?.website ||
              "https://claude.ai.com"
            }
          />
        </div>

        {/* Right Sidebar */}
        <div className="w-fit min-w-fit hidden xl:flex flex-col gap-5 pb-4">
          <PersonaliseYourFeedCard />
          <div className="w-full flex flex-col gap-5 pb-4">
            <p className="text-base lg:text-xl font-semibold text-darkBlue">
              Recommended Institute
            </p>
            {nearByData?.data?.map((ele, index) => (
              <RecomendedSchoolCard
                key={index}
                schoolImage={ele?.banner || "NA"}
                schoolName={ele?.name || "NA"}
                schoolLocation={
                  ele?.coaching_location?.location_value || "NA"
                }
                title=""
              />
            ))}
          </div>
        </div>
      </div>

      <FindCta
        ctaHeading="Have any questions or doubts for us?"
        ctaSubheading="Have any questions about this school while applying? Let us know, and we’ll get back to you!"
      />
    </PublicPageTemplate>
  );
};

export default FindInstituteDetailPage;
