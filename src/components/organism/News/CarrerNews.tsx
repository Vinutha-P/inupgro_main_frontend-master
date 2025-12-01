import PillTabs from "@/components/atom/PillTabs";
import ViewAllContainer from "@/components/containers/NearYouContainer";
import CarrerNewsCard from "@/components/molecule/CarrerNewsCard";
import { useGetNewsByCategoryQuery } from "@/features/api/newsApiSlice";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface CarrerNewsProps {
	newsData: string[];
	subCategories: { title: string }[];
	viewAllClick?: () => void;
}

const CarrerNews: React.FC<CarrerNewsProps> = ({ newsData, subCategories, viewAllClick }) => {
	const [activeTab, setActiveTab] = useState<any>(null);
	const [careerPath, setCareerPath] = useState<any>(null);
	// const { data: categoryVeiwAllNews } = useGetNewsByCategoryQuery({
	// 	path: careerPath, skip: !careerPath
	// });
	const router = useRouter();

	useEffect(() => {
		const storedData = localStorage.getItem('sub_category_path');
		if (storedData) {
			setCareerPath(storedData);
		}
	}, []);

	const { data: categoryVeiwAllNews } = useGetNewsByCategoryQuery(
		{ path: careerPath }, { skip: !careerPath }
	);

	useEffect(() => {
		if (subCategories?.length > 0) {
			const firstItem: any = subCategories[0];
			setActiveTab(firstItem?.title);
			setCareerPath(firstItem?.change_sub_category);
			localStorage.setItem("sub_category_path", firstItem?.change_sub_category);
		}
	}, [subCategories]);

	const handleTabs = (data: any) => {
		localStorage.setItem("sub_category_path", data?.change_sub_category)
		setCareerPath(data?.change_sub_category);
		if (data?.title) {
			setActiveTab(data?.title)
		}
	}

	const handleViewAll = (categorySlug: string, path?: any) => {
		router.push(`/educational_news/${categorySlug}`);
		const firstItem: any = subCategories;
		let result: any = firstItem?.filter((elem: any) => elem?.change_sub_category === careerPath).map((item: any) => item?.view_all)[0];
		localStorage.setItem("sub_category_viewall", result)
		localStorage.removeItem("sub_category_path");
		localStorage.removeItem("college_sub_category_path")
		localStorage.removeItem("school_sub_category_path")
	}
	return (
		<ViewAllContainer groupHeading="Career News" viewAllClick={() => handleViewAll("career_news")}>
			<div className="w-full flex flex-col gap-2 lg:gap-5">
				<div className="w-full h-fit min-h-fit flex items-center justify-start gap-5 overflow-x-auto no-scrollbar ">
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
			</div>
			<div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-5 mt-5">
				{
					categoryVeiwAllNews?.news?.length > 0 &&
					categoryVeiwAllNews?.news?.map((elem: any) => (
						<CarrerNewsCard
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
		</ViewAllContainer>
	);
};

export default CarrerNews;
