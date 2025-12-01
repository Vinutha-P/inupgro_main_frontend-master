"use client"
import React, { useCallback, useEffect, useRef, useState } from "react";
import PublicPageTemplate from "@/components/templates/PublicPageTemplate";
import FilterRow from "../molecule/FilterRow";
import SearchInput from "../atom/SearchInput";
import ViewAllContainer from "../containers/NearYouContainer";
import InstituteDetailCard from "../organism/DetailCard";
import TopSchoolCard from "../molecule/TopSchoolCard";
import PersonaliseYourFeedCard from "../molecule/PersonaliseYourFeedCard";
import { useGetAllCollegesQuery } from "@/features/api/collegeApiSlice";
import FindCta from "@/components/molecule/FindCta";

const FindCollegePage = () => {
	const [page, setPage] = useState(1);
	const observerTarget = useRef(null);
	const [isLoadingSkeleton, setIsLoadingSkeleton] = useState(true)
	const limit = 5;

	const {
		data: collegeData,
		isLoading,
		isFetching,
		isError,
	} = useGetAllCollegesQuery(
		{ page, limit },
		{
			pollingInterval: 0,
			refetchOnFocus: false,
			refetchOnMountOrArgChange: true,
		}
	);
	const hasMorePages = collegeData?.currentPage < (collegeData?.totalPages || 0);

	const loadMore = useCallback(() => {
		if (hasMorePages && !isFetching) {
			setPage(prev => prev + 1);
		}
	}, [hasMorePages, isFetching]);

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
			<div className="w-full flex flex-col lg:flex-row gap-3 lg:gap-5 justify-between lg:items-center">
				<div className="w-full h-fit">
					<FilterRow />
				</div>
				<div className="w-[99%] sm:w-full xl:w-[25%]">
					<SearchInput width="100%" height="2.5rem" />
				</div>
				{/* <SearchInput width="18rem" height="2.5rem" /> */}
			</div>
			<div className="w-full flex gap-y-5 lg:gap-y-0 xl:w-[100%]">
				<div className="w-full flex flex-col items-start justify-start gap-5 lg:mr-5">
					<ViewAllContainer groupHeading="College Near You" showViewAll={false}>
						{isError ? (
							<div className="text-red-500">Error loading college</div>
						) : isLoading && !collegeData?.data?.length ? (
							<div className="text-gray-500">Loading college...</div>
						) : (
							<>
								{collegeData?.data?.length > 0 ? (collegeData?.data?.map((ele, index) => (
									<InstituteDetailCard
										key={index}
										organisationName={ele?.name || "NA"}
										organisationType={ele?.gender_specific}
										organisationAddress={ele?.college_location || "NA"}
										organisationStatus={ele?.verification_status || "NA"}
										organisationViews={ele?.number_of_views || "0"}
										data={ele}
										type="college"

									/>
								))
								) : (
									<div className="text-gray-500">No college found</div>
								)}
							</>
						)}
					</ViewAllContainer>
				</div>

				{/* Loading Spinner and Sentinel */}
				{isFetching && hasMorePages && (
					<div className="w-full text-center py-4">
						<div className="text-gray-500">Loading more colleges...</div>
					</div>
				)}
				<div ref={observerTarget} style={{ height: '1px' }} />


				<div className="w-fit min-w-fit hidden xl:flex flex-col gap-5 pb-4">
					<TopSchoolCard title="College" isLoadings={isLoadingSkeleton} />
					<PersonaliseYourFeedCard isLoadings={isLoadingSkeleton} />
				</div>
			</div>
			<FindCta
				ctaHeading="Have any questions or doubts for us?"
				ctaSubheading="Have any questions about this school while applying? Let us know, and we’ll get back to you!"
			/>
		</PublicPageTemplate>
	);
};

export default FindCollegePage;