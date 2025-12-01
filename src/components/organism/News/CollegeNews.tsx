import React, { useState, useEffect } from "react";
import NewsCardNormal from "./NewsCardNormal";
import PillTabs from "@/components/atom/PillTabs";
import ViewAllWithPaginationContainer from "@/components/containers/ViewAllWithPaginationContainer";
import Image from "next/image";
import Chips from "@/components/atom/Chips";
import DemoImage from "@/assets/Big_Video_image.png";
import { GoPlay } from "react-icons/go";
import { useGetNewsByCategoryQuery } from "@/features/api/newsApiSlice";
import { useRouter } from "next/navigation";
import { isVideoUrl } from "@/utils/helper";

interface CollegeNewsProps {
	newsData: string[];
	subCategories: { title: string }[];
	viewAllClick?: () => void;
}
const CollegeNews: React.FC<CollegeNewsProps> = ({ newsData, subCategories, viewAllClick }) => {
	const [isLoading, setIsLoading] = useState(true);
	const [activeTab, setActiveTab] = useState<any>(null);
	const [collegePath, setCollegePath] = useState<any>(null);


	const router = useRouter();


	useEffect(() => {
		const storedData = localStorage.getItem('college_sub_category_path');
		if (storedData) {
			setCollegePath(storedData);
		}
	}, []);

	const { data: categoryVeiwAllNews } = useGetNewsByCategoryQuery({
		path: collegePath},{ skip: !collegePath
	});

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
			setCollegePath(firstItem?.change_sub_category);
			localStorage.setItem("college_sub_category_path", firstItem?.change_sub_category);
		}
	}, [subCategories]);

	const handleTabs = (data: any) => {
		localStorage.setItem("college_sub_category_path", data?.change_sub_category)
		setCollegePath(data?.change_sub_category);
		if (data?.title) {
			setActiveTab(data?.title)
		}
	}

	const handleViewAll = (categorySlug: string, path?: any) => {
		router.push(`/educational_news/${categorySlug}`);
		const firstItem: any = subCategories;
		let result: any = firstItem?.filter((elem: any) => elem?.change_sub_category === collegePath).map((item: any) => item?.view_all)[0];
		localStorage.setItem("sub_category_viewall", result)
		localStorage.removeItem("sub_category_path")
		localStorage.removeItem("college_sub_category_path")
		localStorage.removeItem("school_sub_category_path")
	}

	useEffect(() => {
		setTimeout(() => {
			setIsLoading(false);
		}, 1200);
	}, []);
	return (
		<ViewAllWithPaginationContainer groupHeading="College News" viewAllClick={() => handleViewAll("college_news")} itemsPerPage={1} >
			<div className="w-full flex flex-col gap-2 lg:gap-5">
				<div className="w-full h-fit min-h-fit flex items-center justify-start gap-5 overflow-x-auto no-scrollbar">
					{
						subCategories?.length > 0 &&
						subCategories?.map((elem: any, index) => (
							<PillTabs
								key={index}
								tabName={elem?.title}
								isActive={activeTab === elem?.title}
								onClick={() => handleTabs(elem)}
								className="text-xs h-[1.75rem] px-[1rem]"
							/>
						))
					}
				</div>
				{/* Banner Section */}
				<div className="w-full p-4 flex flex-col gap-2 lg:gap-5 bg-softBlue rounded-lg relative">
					<div>
						<Chips chiptext="#College" />
					</div>
					{isLoading ? (
						<div className="w-full lg:w-full h-[265px] skeleton-medium-gray rounded-lg">

						</div>
					) : (
						<>
							{/* <div className="absolute top-6 left-6">
								<Chips chiptext="#College" />
							</div> */}


							{/* <div className="w-fit h-fit flex-box-center"> */}
							<div className="w-full h-fit">
								<Image
									width={0}
									height={0}
									sizes="100vw"
									src={isVideo ? firstVideoNews?.thumbnail : firstImageNews?.thumbnail || DemoImage}
									alt="News"
									className="w-full h-[14rem] rounded-lg"
								/>
							</div>
							{isVideo && (
								<div className="absolute left-0 top-0 w-full h-full flex-box-center">
									<button className="w-fit h-fit">
										<GoPlay className="h-15 w-15 fill-white" />
									</button>
								</div>
							)}

						</>
					)}

					{/* Author Section */}
					{/* <div className="w-full flex flex-col-reverse lg:flex-col gap-4">
						<h6 className="text-[1rem] lg:text-[1.15rem] font-semibold text-deepBlue hover:text-info cursor-pointer">
							{isVideo
								? firstVideoNews?.newsletter_heading
								: firstImageNews?.newsletter_heading}
						</h6>
						<div className="w-full flex items-center justify-start gap-4">
							<div className="flex-box-center gap-2 text-[0.575rem] font-semibold text-customGray">
								<p>By {isVideo ? firstVideoNews?.news_posted_by : firstImageNews?.news_posted_by}</p>
							</div>
							<div className="flex-box-center gap-2 text-[0.575rem] font-semibold text-customGray">
								<p>55K Views</p>
							</div>
							<div className="flex-box-center gap-2 text-[0.575rem] font-semibold text-customGray">
								<p>Posted 24 Hour Ago</p>
							</div>
						</div>
					</div> */}

					<div className="w-full flex flex-col-reverse lg:flex-col gap-4">
						{isLoading ? (
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
								{isLoading ? (
									<div className="w-[60px] h-[10px] skeleton-medium-gray rounded-lg"></div>
								) : (
									<p>By {isVideo ? firstVideoNews?.news_posted_by : firstImageNews?.news_posted_by}</p>
								)}
							</div>
							<div className="flex-box-center gap-2 text-[0.575rem] font-semibold text-customGray">
								{isLoading ? (
									<div className="w-[60px] h-[10px] skeleton-medium-gray rounded-lg"></div>
								) : (
									<p>55K Views</p>
								)}
							</div>
							<div className="flex-box-center gap-2 text-[0.575rem] font-semibold text-customGray">
								{isLoading ? (
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
						remainingNews?.map((elem: any) => (
							<NewsCardNormal
								key={elem?.id}
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

export default CollegeNews;
