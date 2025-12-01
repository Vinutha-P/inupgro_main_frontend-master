"use client"
import React, { useCallback, useEffect, useRef, useState } from "react";
import PublicPageTemplate from "@/components/templates/PublicPageTemplate";
import FilterRow from "../molecule/FilterRow";
import SearchInput from "../atom/SearchInput";
import ViewAllContainer from "../containers/NearYouContainer";
import InstituteDetailCard from "../organism/DetailCard";
import TopSchoolCard from "../molecule/TopSchoolCard";
import PersonaliseYourFeedCard from "../molecule/PersonaliseYourFeedCard";
import { useGetAllSchoolsQuery } from "@/features/api/schoolApiSlice";
import FindCta from "@/components/molecule/FindCta";
import { useGetHomepageDataQuery } from "@/features/api/homepageApiSlice";

const FindSchoolPage = () => {
  const [searchData, setSearchData] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");
  const [page, setPage] = useState(1);
  const observerTarget = useRef(null);
  const [isLoadingSkeleton, setIsLoadingSkeleton] = useState(true)

  const limit = 5;

  const {
    data: schoolsData,
    isLoading,
    isFetching,
    isError,
  } = useGetAllSchoolsQuery(
    { page, limit },
    {
      pollingInterval: 0,
      refetchOnFocus: false,
      refetchOnMountOrArgChange: true,
    }
  );


  const { data: schoolSearchData, isFetching: schoolSearchIsFetching, error: schoolSearcError } = useGetHomepageDataQuery(
    {
      search: searchQuery,
      location: locationQuery,
      limit: 10,
      page: 1,
    },
    { skip: !searchQuery }
  );

  const hasMorePages = schoolsData?.currentPage < (schoolsData?.totalPages || 0)

  const loadMore = useCallback(() => {
    if (hasMorePages && !isFetching) {
      setPage((prev) => prev + 1)
    }
  }, [hasMorePages, isFetching])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore()
        }
      },
      {
        threshold: 0.1,
        rootMargin: '100px',
      }
    )

    const currentTarget = observerTarget.current
    if (currentTarget) {
      observer.observe(currentTarget)
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget)
      }
    }
  }, [loadMore])

  useEffect(() => {
    setTimeout(() => {
      setIsLoadingSkeleton(false)
    }, 1000)
  }, [])

  return (
    <PublicPageTemplate>
      <div className="w-full flex flex-col lg:flex-row gap-3 lg:gap-8 justify-between lg:items-center">
        <div className="w-full h-fit">
          <FilterRow showSchoolType={true} />

        </div>
        <div className="w-[99%] sm:w-full xl:w-[25%]">
          <SearchInput width="100%" height="2.5rem" data={schoolSearchData} isFetching={schoolSearchIsFetching} error={schoolSearcError} setLocationQuery={setLocationQuery} locationQuery={locationQuery} setSearchQuery={setSearchQuery} searchQuery={searchQuery} setSearchData={setSearchData} />
        </div>
      </div>
      <div className="w-full flex gap-5">
        <div className="w-full flex flex-col items-start justify-start gap-5">
          {searchData && searchData?.school_profiles?.length > 0 ? (
            <ViewAllContainer groupHeading="School Near You" showViewAll={false}>
              {schoolSearcError ? (
                <div className="text-red-500">Error loading schools</div>
              ) : schoolSearchIsFetching && !searchData?.school_profiles?.length ? (
                <div className="text-gray-500">Loading schools...</div>
              ) : (
                <>
                  {searchData?.school_profiles?.length > 0 ? (
                    searchData.school_profiles.map((ele, index) => (
                      <InstituteDetailCard
                        key={`${ele?.id || index}`}
                        organisationName={ele?.name || "NA"}
                        organisationType={ele?.gender_specific}
                        organisationAddress={ele?.school_location || {}}
                        organisationStatus={ele?.verification_status || "NA"}
                        organisationViews={ele?.number_of_views || "0"}
                        data={ele}
                        type="school"
                      />
                    ))
                  ) : (
                    <div className="text-gray-500">No schools found</div>
                  )}
                </>
              )}
            </ViewAllContainer>
          ) : (
            <ViewAllContainer groupHeading="School Near You" showViewAll={false}>
              {isError ? (
                <div className="text-red-500">Error loading schools</div>
              ) : isLoading && !schoolsData?.data?.length ? (
                <div className="text-gray-500">Loading schools...</div>
              ) : (
                <>
                  {schoolsData?.data?.length > 0 ? (
                    schoolsData.data.map((ele, index) => (
                      <InstituteDetailCard
                        key={`${ele?.id || index}`}
                        organisationName={ele?.name || "NA"}
                        organisationType={ele?.gender_specific}
                        organisationAddress={ele?.school_location || {}}
                        organisationStatus={ele?.verification_status || "NA"}
                        organisationViews={ele?.number_of_views || "0"}
                        data={ele}
                        type="school"
                      />
                    ))
                  ) : (
                    <div className="text-gray-500">No schools found</div>
                  )}
                </>
              )}
            </ViewAllContainer>
          )}
          {/* Loading Spinner and Sentinel */}
          {isFetching && hasMorePages && (
            <div className="w-full text-center py-4">
              <div className="text-gray-500">Loading more schools...</div>
            </div>
          )}
          <div ref={observerTarget} style={{ height: '1px' }} />

          <div className=" hidden lg:hidden career-feed-container md:flex flex-wrap gap-2 w-full">
            <div className="lg:w-[49%] bg-white rounded-lg p-4">
              <TopSchoolCard isLoadings={isLoadingSkeleton} />
            </div>
            <div className="lg:w-[49%] bg-white rounded-lg p-4">
              <PersonaliseYourFeedCard isLoadings={isLoadingSkeleton} />
            </div>
          </div>
        </div>

        <section className="hidden xl:flex flex-col gap-5 pb-4">
          <TopSchoolCard title="School" isLoadings={isLoadingSkeleton} />
          <PersonaliseYourFeedCard className="h-[21.4rem]" isLoadings={isLoadingSkeleton}
          />
        </section>
      </div>
      <FindCta
        ctaHeading="Have any questions or doubts for us?"
        ctaSubheading="Have any questions about this school while applying? Let us know, and we’ll get back to you!"
      />
    </PublicPageTemplate>
  );
};

export default FindSchoolPage;