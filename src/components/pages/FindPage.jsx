"use client";
import React, { useState, useEffect } from "react";
import ViewAllContainer from "@/components/containers/NearYouContainer";
import FilterRow from "@/components/molecule/FilterRow";
import FindCta from "@/components/molecule/FindCta";
import FindSearchBarSection from "@/components/molecule/FindSearchBarSection";
import PersonaliseYourFeedCard from "@/components/molecule/PersonaliseYourFeedCard";
import TopSchoolCard from "@/components/molecule/TopSchoolCard";
import InstituteDetailCard from "@/components/organism/DetailCard";
import PublicPageTemplate from "@/components/templates/PublicPageTemplate";
import SearchInput from "../atom/SearchInput";
import { useGetAllSchoolsQuery } from "@/features/api/schoolApiSlice";
import { useGetAllCollegesQuery } from "@/features/api/collegeApiSlice";
import { useGetAllCoachingsQuery } from "@/features/api/instituteApiSlice";
import { useRouter } from "next/navigation";
import ChooseCarrerCard from "../molecule/ChooseCarrerCard";
import { useGetHomepageDataQuery } from "@/features/api/homepageApiSlice";
import { clearMultipleLocalStorageItems } from "@/utils/localStorageClear";

const FindPage = () => {
  
  const [searchData, setSearchData] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");
  const [institutionsCount, setInstitutionsCount] = useState(0);
  const [isLoadings, setIsLoadings] = useState(false);
  const { data: schooldetail, isLoading } = useGetAllSchoolsQuery({
    page: 1,
    limit: 2,
  }, { refetchOnMountOrArgChange: true });
  const { data: collegeDetail } = useGetAllCollegesQuery({ page: 1, limit: 2 }, { refetchOnMountOrArgChange: true });
  const { data: coachingDetail } = useGetAllCoachingsQuery({
    page: 1,
    limit: 2,
  }, { refetchOnMountOrArgChange: true });

  const { data: mobileSearchData, isFetching: mobileSearchIsFetching, error: mobileSearcError } = useGetHomepageDataQuery(
    {
      search: searchQuery,
      location: locationQuery,
      limit: 10,
      page: 1,
    },
    { skip: !searchQuery }
  );


  const route = useRouter();

  const handleSchoolViewAll = () => {
    route.push(`find/school`);
  };

  const handleCollegeViewAll = () => {
    route.push(`find/college`);
  };

  const handleCoachingViewAll = () => {
    route.push(`find/coaching`);
  };

  useEffect(() => {
    clearMultipleLocalStorageItems("school")
    clearMultipleLocalStorageItems("college")
    clearMultipleLocalStorageItems("coaching")
    localStorage.removeItem("types_of_coaching")
  }, [])

  useEffect(() => {
    if (
      schooldetail &&
      collegeDetail &&
      coachingDetail
    ) {
      const totalCount =
        (schooldetail?.data?.length * schooldetail?.totalPages || 0) +
        (collegeDetail?.data?.length * collegeDetail?.totalPages || 0) +
        (coachingDetail?.data?.length * coachingDetail?.totalPages || 0);
      setInstitutionsCount(totalCount);
    }
  }, [schooldetail, collegeDetail, coachingDetail]);

  return (
    <>
      <PublicPageTemplate>
        <div className="w-full flex flex-col gap-3 lg:gap-5 md:hidden">
          {isLoadings ? (
            <div className="w-full h-[2.5rem] skeleton-medium-gray" />
          ) : (

            <SearchInput width="100%" height="2.5rem" placeholderText="Search Me" data={mobileSearchData} isFetching={mobileSearchIsFetching} error={mobileSearcError} setLocationQuery={setLocationQuery} locationQuery={locationQuery} setSearchQuery={setSearchQuery} searchQuery={searchQuery} setSearchData={setSearchData} />
          )}
          <div className="w-full flex flex-col gap-3 md:hidden overflow-x-auto pb-2 no-scrollbar">
            <FilterRow showSchoolType={true} />
            {!mobileSearchIsFetching && !mobileSearcError && searchQuery ? (
              <strong className="text-sm text-neutralGray font-medium"> {mobileSearchData?.total_schools} School{mobileSearchData?.total_schools !== 1 ? "s" : ""} Found.</strong>
            ) : (
              <strong className="text-sm text-neutralGray font-medium"> {institutionsCount} Institution{institutionsCount !== 1 ? "s" : ""} Found.</strong>
            )}
          </div>
        </div>
        <div className="w-full md:flex gap-5 find-card ">
          <div className="w-full flex flex-col items-start justify-start gap-5">
            <div className={`w-full h-[3rem] lg:h-[5.25rem] px-6 hidden sm:flex items-center justify-start
              ${isLoadings ? "sekleton-light-gray" : "bg-white"
              } rounded-lg`}>
              {isLoadings ? (
                <div className="w-full h-[2rem] lg:h-[3rem] skeleton-medium-gray rounded-lg">
                  <h4 className="text-[1rem] lg:text-[1.3rem] font-semibold text-transparent bg-gradient-to-r from-gray-300 to-gray-400 bg-clip-text">
                  </h4>
                </div>
              ) : (
                <h4 className="text-[1rem] lg:text-[1.3rem] font-semibold text-deepBlue">
                  Let’s help you find best Schools and Colleges.
                </h4>
              )}
            </div>
            <FindSearchBarSection setSearchData={setSearchData} institutionsCount={institutionsCount} />

            {Array.isArray(searchData?.school_profiles) && searchData?.school_profiles?.length > 0 ? (
              <ViewAllContainer
                groupHeading="Top Records Near You"
                viewAllClick={handleSchoolViewAll}
              >
                {searchData?.school_profiles?.length > 0 && searchData?.school_profiles?.map((ele, index) => (
                  <InstituteDetailCard
                    key={ele?.id ?? index}
                    organisationName={ele?.name || "NA"}
                    organisationType={ele?.gender_specific || "NA"}
                    organisationAddress={ele?.school_location || {}}
                    organisationStatus={ele?.verification_status || "NA"}
                    organisationViews={ele?.number_of_views || "0"}
                    data={ele}
                    type="school"
                    latitude={ele?.school_location?.latitude || "NA"}
                    longitude={ele?.school_location?.longitude || "NA"}
                  />
                ))}
              </ViewAllContainer>
            ) : (
              <>

                <ViewAllContainer
                  groupHeading="Top Schools Near You"
                  viewAllClick={handleSchoolViewAll}
                >
                  {Array.isArray(schooldetail?.data) && schooldetail?.data?.length > 0 && schooldetail?.data?.map((ele, index) => (
                    <InstituteDetailCard
                      key={ele?.id ?? index}
                      organisationName={ele?.name || "NA"}
                      organisationType={ele?.gender_specific || "NA"}
                      organisationAddress={ele?.school_location || {}}
                      organisationStatus={ele?.verification_status || "NA"}
                      organisationViews={ele?.number_of_views || "0"}
                      data={ele}
                      type="school"
                      latitude={ele?.school_location?.latitude || "NA"}
                      longitude={ele?.school_location?.longitude || "NA"}
                    />
                  ))}
                </ViewAllContainer>

                <div className="career-feed-container !hidden md:flex lg:hidden flex-wrap justify-between w-full pl-1">
                  <div className={`w-[50%] rounded-lg md:p-4  ${isLoadings ? "bg-none" : "bg-white"}`}>
                    <ChooseCarrerCard isLoadings={isLoadings} />
                  </div>
                  <div className={`w-[50%] rounded-lg md:p-4  ${isLoadings ? "bg-none" : "bg-white"}`}>
                    <PersonaliseYourFeedCard isLoadings={isLoadings} />
                  </div>
                </div>

                <ViewAllContainer
                  groupHeading="Top College Near You"
                  viewAllClick={handleCollegeViewAll}
                >
                  {collegeDetail?.data?.length > 0 &&
                    collegeDetail?.data?.map((ele, index) => (
                      <InstituteDetailCard
                        key={ele?.id ?? index}
                        organisationName={ele?.name || "NA"}
                        organisationType={ele?.gender_specific || "NA"}
                        organisationAddress={ele?.college_location || {}}
                        organisationStatus={ele?.verification_status || "NA"}
                        organisationViews={ele?.number_of_views || "0"}
                        data={ele}
                        type="college"
                        latitude={ele?.college_location?.latitude || "NA"}
                        longitude={ele?.college_location?.longitude || "NA"}
                      />
                    ))}
                </ViewAllContainer>

                <ViewAllContainer
                  groupHeading="Top Institute Near You"
                  viewAllClick={handleCoachingViewAll}
                >
                  {coachingDetail?.data?.length > 0 &&
                    coachingDetail?.data?.map((ele, index) => (
                      <InstituteDetailCard
                        key={ele?.id ?? index}
                        organisationName={ele?.name || "NA"}
                        organisationType={ele?.gender_specific || "Co-ed"}
                        organisationAddress={ele?.coaching_location || "NA"}
                        organisationStatus={ele?.verification_status || "NA"}
                        organisationViews={ele?.number_of_views || "0"}
                        data={ele}
                        type="institute"
                        latitude={ele?.coaching_location?.latitude || "NA"}
                        longitude={ele?.coaching_location?.longitude || "NA"}
                      />
                    ))}
                </ViewAllContainer>
              </>
            )}
          </div>

          <section className="">
            <div className="hidden lg:block">
              <ChooseCarrerCard isLoadings={isLoadings} />
            </div>
            {/* <TopSchoolCard /> */}
            <div className="mt-5 hidden lg:block">
              <PersonaliseYourFeedCard isLoadings={isLoadings} />
            </div>
          </section>
        </div>
        <FindCta
          ctaHeading="Have any questions or doubts for us?"
          ctaSubheading="Have any questions about this school while applying? Let us know, and we’ll get back to you!"
        />
        

      </PublicPageTemplate>
    </>
  );
};

export default FindPage;
