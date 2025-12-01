"use client";
import React, { useState, useEffect } from "react";
import Chips from "@/components/atom/Chips";
import PillTabs from "@/components/atom/PillTabs";
import ViewAllWithPaginationContainer from "@/components/containers/ViewAllWithPaginationContainer";
import Image from "next/image";
import DemoImage from "@/assets/Big_Video_image.png";
import { GoPlay } from "react-icons/go";
import NewsCardNormal from "./NewsCardNormal";
import { useRouter } from "next/navigation";
import { useGetNewsByCategoryQuery } from "@/features/api/newsApiSlice";
import { extractFirstImageSrc, isVideoUrl } from "@/utils/helper";

interface SchoolNewsProps {
	newsData: string[];
	subCategories: { title: string }[];
	viewAllClick?: () => void;
}

const SchoolNews: React.FC<SchoolNewsProps> = ({ newsData, subCategories, viewAllClick }) => {
	const router = useRouter();
	const [isLoadings, setIsLoadings] = useState(true);
	const [activeTab, setActiveTab] = useState<any>(null);
	const [schoolPath, setSchoolPath] = useState<any>(null);

	useEffect(() => {
		const storedData = localStorage.getItem('school_sub_category_path');
		if (storedData) {
			setSchoolPath(storedData);
		}
	}, []);

	const { data: categoryVeiwAllNews } = useGetNewsByCategoryQuery({ path: schoolPath
		},{ skip: !schoolPath });

	const allNews = categoryVeiwAllNews?.news || [];
	const firstVideoNews = allNews.find((item: any) => isVideoUrl(item?.thumbnail));
	const isVideo = !!firstVideoNews;
	const firstImageNews = !isVideo ? allNews[0] : null;

	// Remaining news for bottom grid
	const remainingNews = allNews.filter((item: any) => {
		if (isVideo) return item.id !== firstVideoNews?.id;
		return item.id !== firstImageNews?.id;
	});

	useEffect(() => {
		if (subCategories?.length > 0) {
			const firstItem: any = subCategories[0];
			setActiveTab(firstItem?.title);
			setSchoolPath(firstItem?.change_sub_category);
			localStorage.setItem("school_sub_category_path", firstItem?.change_sub_category);
		}
	}, [subCategories]);

	const handleTabs = (data: any) => {
		localStorage.setItem("school_sub_category_path", data?.change_sub_category);
		setSchoolPath(data?.change_sub_category);
		if (data?.title) {
			setActiveTab(data?.title)
		}
	}

	const handleViewAll = (categorySlug: string, path?: any) => {
		let firstItem = subCategories;
		let result: any = firstItem?.filter((elem: any) => elem?.change_sub_category === schoolPath).map((item: any) => item?.view_all)[0];
		router.push(`/educational_news/${categorySlug}`);
		localStorage.setItem("sub_category_viewall", result)
		localStorage.removeItem("sub_category_path")
		localStorage.removeItem("school_sub_category_path")
		localStorage.removeItem("college_sub_category_path")
	}
	useEffect(() => {
		setTimeout(() => {
			setIsLoadings(false);
		}, 1200);
	}, []);
	return (
		<ViewAllWithPaginationContainer groupHeading="School News" viewAllClick={() => handleViewAll("school_news")} itemsPerPage={1} >
			<div className="w-full flex flex-col gap-2 lg:gap-5">
				<div className="w-full h-fit min-h-fit flex flex-wrap items-center justify-start gap-5 overflow-x-auto no-scrollbar">
					{
						subCategories?.length > 0 &&
						subCategories?.map((elem: any, index) => (
							<React.Fragment key={elem?.id || index}>
								<PillTabs
									key={index}
									tabName={elem?.title}
									isActive={activeTab === elem?.title}
									onClick={() => handleTabs(elem)}
									className="!text-xs h-[1.75rem] px-[1rem]"
								/>
							</React.Fragment>
						))
					}
				</div>
				{/* Banner Section */}
				<div className="w-full p-4 flex flex-col gap-2 lg:gap-3 bg-softBlue rounded-lg relative">
					<div>
						<Chips chiptext="#School" />
					</div>
					{isLoadings ? (
						<div className="w-full lg:w-full h-[265px] skeleton-medium-gray rounded-lg">

						</div>
					) : (
						<>
							{/* <div className="absolute top-6 left-6">
								<Chips chiptext="#School" />
							</div> */}
							<div className="w-full min-w-fit h-fit flex-box-center">
								{/* <div className="w-fit h-fit flex-box-center"> */}
								<div className="w-full h-fit">
									<Image
										width={100}
										height={0}
										sizes="100vw"
										src={isVideo ? firstVideoNews?.thumbnail : firstImageNews?.thumbnail || DemoImage}
										alt="News"
										className="w-full h-[14rem]  lg:h-[17.25rem] rounded-lg"
									/>
								</div>
								{isVideo && (
									<div className="absolute left-0 top-0 w-full h-full flex-box-center">
										<button className="w-fit h-fit">
											<GoPlay className="h-15 w-15 fill-white" />
										</button>
									</div>
								)}
							</div>
						</>
					)}


					{/* Author Section */}
					<div className="w-full flex flex-col-reverse lg:flex-col gap-4">
						{isLoadings ? (
							<div className="w-full h-[1.75rem] skeleton-medium-gray rounded-lg">
								<h6 className="text-[1rem] lg:text-[1.15rem] font-semibold text-transparent bg-gradient-to-r from-gray-300 to-gray-400 bg-clip-text">
									&nbsp;
								</h6>
							</div>
						) : (
							<h6 className="text-[1rem] lg:text-[1.15rem] font-semibold text-deepBlue hover:text-info cursor-pointer">
								{isVideo
									? firstVideoNews?.newsletter_heading
									: firstImageNews?.newsletter_heading}
							</h6>
						)}

						<div className="w-full flex items-center justify-start gap-4">
							<div className="flex-box-center gap-2 text-[0.575rem] font-semibold text-customGray">
								{isLoadings ? (
									<div className="w-[60px] h-[10px] skeleton-medium-gray rounded-lg"></div>
								) : (
									<p>By {isVideo ? firstVideoNews?.news_posted_by : firstImageNews?.news_posted_by}</p>
								)}
							</div>
							<div className="flex-box-center gap-2 text-[0.575rem] font-semibold text-customGray">
								{isLoadings ? (
									<div className="w-[60px] h-[10px] skeleton-medium-gray rounded-lg"></div>
								) : (
									<p>55K Views</p>
								)}
							</div>
							<div className="flex-box-center gap-2 text-[0.575rem] font-semibold text-customGray">
								{isLoadings ? (
									<div className="w-[80px] h-[10px] skeleton-medium-gray rounded-lg"></div>
								) : (
									<p>Posted 24 Hour Ago</p>
								)}
							</div>
						</div>
					</div>
				</div>
				{/* <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-4"> */}
				<div className="w-full flex justify-between gap-4">
					{
						remainingNews?.length > 0 &&
						remainingNews?.map((elem: any, index: number) => (
							<NewsCardNormal
								key={elem?.id || index}
								id={elem?.id}
								newsHeading={elem?.newsletter_heading}
								authorName={elem?.news_posted_by}
								totalViews={`2K`}
								time="24 Hours ago"
								newsDetail={elem?.newsletter_description}
								thumbnail={elem?.thumbnail}
								hashtag={elem?.hashtag}
								readMore={elem?.['view/read more']}
							/>
						))
					}
				</div>
			</div>
		</ViewAllWithPaginationContainer>
	);
};

export default SchoolNews;
