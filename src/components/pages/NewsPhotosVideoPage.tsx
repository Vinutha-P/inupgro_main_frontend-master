"use client";
import React, { useEffect, useState,useRef, useCallback } from "react";
import PublicPageTemplate from "../templates/PublicPageTemplate";
import PersonaliseYourFeedCard from "../molecule/PersonaliseYourFeedCard";
import SideCardsContainer from "../containers/SideCardsContainer";
import Chips from "../atom/Chips";
import PageTitleSearchBar from "../molecule/PageTitleSearchBar";
import PhotosAndVideosSection from "../organism/News/PhotosAndVideosSection";
import NewsCta from "../molecule/NewsCta";
import { useGetAllNewsQuery } from "@/features/api/newsApiSlice";
import { useParams } from 'next/navigation'

const NewsPhotosVideoPage = () => {
	const [isLoadings, setIsLoadings] = useState(true);
	// const [page, setPage] = useState(1);
	// const observerTarget = useRef(null);
	// const {
	// 	data: newsData,
	// 	isLoading,
	// 	isFetching,
	// 	isError,
	// } = useGetAllNewsQuery(
	// 	{ page },
	// 	{
	// 		pollingInterval: 0,
	// 		refetchOnFocus: false,
	// 		refetchOnMountOrArgChange: false,
	// 	}
	// );

	// const hasMorePages = newsData?.currentPage < (newsData?.totalPages || 0);
	// const params = useParams();

	// const loadMore = useCallback(() => {
	// 	if (hasMorePages && !isFetching) {
	// 		setPage(prev => prev + 1);
	// 	}
	// }, [hasMorePages, isFetching, page]);

	// useEffect(() => {
	// 	const observer = new IntersectionObserver(
	// 		entries => {
	// 			const first = entries[0];

	// 			if (first?.isIntersecting) {
	// 				loadMore();
	// 			}
	// 		},
	// 		{
	// 			threshold: 0.1,
	// 			rootMargin: '100px',
	// 		}
	// 	);

	// 	const currentTarget = observerTarget.current;
	// 	if (currentTarget) {
	// 		observer.observe(currentTarget);
	// 	}

	// 	return () => {
	// 		if (currentTarget) {
	// 			observer.unobserve(currentTarget);
	// 		}
	// 	};
	// }, [loadMore]);
	useEffect(() => {
		setTimeout(() => {
			setIsLoadings(false);
		}, 1000);
	}, []);
	return (
		<PublicPageTemplate>
			<div className="flex gap-5">
				<div className="w-full h-fit p-2 lg:p-6 flex flex-col gap-5 bg-white rounded-lg left-part">
					<div className="w-full hidden lg:flex">
						<PageTitleSearchBar pageTitle="Photo & Video Gallery" />
					</div>
					<PhotosAndVideosSection />
					{/* {
						newsData?.["Photo and Video Gallery"]?.news?.length > 0 && newsData?.["Photo and Video Gallery"]?.news?.map((elem:any,index:string)=>(
						))
					} */}
				</div>
				<div className="w-fit min-w-fit hidden lg:flex flex-col gap-5">
					<SideCardsContainer isLoadings={isLoadings}>
						<div className="w-full flex flex-col gap-5">
							<p className="text-xl lg:text-[1.75rem]font-semibold text-darkBlue">
								Recent Topics
							</p>
							<Chips chiptext="#School" />
							<Chips chiptext="#College" />
							<Chips chiptext="#Institutes" />
							<Chips chiptext="See All Topics" />
						</div>
					</SideCardsContainer>
					<PersonaliseYourFeedCard isLoadings={isLoadings} />
				</div>
			</div>
			<NewsCta />
		</PublicPageTemplate>
	);
};

export default NewsPhotosVideoPage;
