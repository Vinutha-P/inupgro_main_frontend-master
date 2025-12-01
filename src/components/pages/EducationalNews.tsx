import React, { useState, useEffect } from "react";
import PublicPageTemplate from "../templates/PublicPageTemplate";
import NewsCta from "../molecule/NewsCta";
import ViewAllWithPaginationContainer from "../containers/ViewAllWithPaginationContainer";
import TopNewsCard from "../organism/News/TopNewsCard";
import TopHighlightsCard from "../molecule/TopHighlightsCard";
import RecommendedNewsCard from "../molecule/RecommendedNewsCard";
import TopStudentNewsCard from "../molecule/TopStudentNewsCard";
import SchoolNews from "../organism/News/SchoolNews";
import CollegeNews from "../organism/News/CollegeNews";
import NewsVideoCard from "../atom/NewVideoCard";
import CarrerNews from "../organism/News/CarrerNews";
import RoundedButton from "../atom/buttons/RoundedButton";
import { useRouter } from "next/navigation";
import { useGetAllNewsQuery, useGetNewsByCategoryQuery, useSearchAllNewsQuery } from "@/features/api/newsApiSlice";
import PageTitleSearchBar from "../molecule/PageTitleSearchBar";

interface EducationalNewsProps {
	viewAllClick: () => void;
}

const EducationalNews: React.FC<EducationalNewsProps> = ({ viewAllClick }) => {
	const [isLoadings, setIsLoadings] = useState(true);
	const { data: newsdetail, isLoading } = useGetAllNewsQuery({ page: 1, limit: 2 },
		{
			refetchOnMountOrArgChange: true,
			refetchOnFocus: true,
		});

	const [searchText, setSearchText] = useState("");
	const [debouncedSearchText, setDebouncedSearchText] = useState("");
	const [schoolSubCategories, setSchoolSubCategories] = useState<{ title: string }[]>([]);
	const [collegeSubCategories, setCollegeSubSategories] = useState<{ title: string }[]>([]);
	const [careerSubCategories, setCareerSubSategories] = useState<{ title: string }[]>([]);

	const [categorizedNews, setCategorizedNews] = useState({
		todayNews: { news: [], view_all: "" },
		recommendedNews: { news: [], view_all: "" },
		topStudentStories: { news: [], view_all: "" },
		topHighlights: { news: [], view_all: "" },
		schoolNews: { news: [] },
		collegeNews: { news: [] },
		careerNews: { news: [] },
		photoVideoGallery: { news: [], view_all: "" },
	});
	const router = useRouter();

	useEffect(() => {
		localStorage.removeItem("category_path");
		localStorage.removeItem("sub_category_viewall");
		localStorage.removeItem("readMore_Path");
	}, [])

	// Debounce searchText to avoid too many API calls
	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedSearchText(searchText);
		}, 300); // wait 300ms after user stops typing
		return () => clearTimeout(handler);
	}, [searchText]);

	// Call the search API only when debouncedSearchText changes
	const { data: searchResults, isLoading: isSearching } = useSearchAllNewsQuery(
		{ query: debouncedSearchText},{ skip: !debouncedSearchText }
	);

	const subCategory = (category: any) => {
		if (!category || typeof category !== 'object') return [];

		return Object.entries(category).map(([title, value]) => ({
			title,
			...(typeof value === 'object' && value !== null ? value : {}),
		}));
	};
	useEffect(() => {
		if (newsdetail) {
			const schoolNews = newsdetail['School News'] || {};
			const collegeNews = newsdetail['College News'] || {};
			const careerNews = newsdetail['Career News'] || {};
			if (schoolNews['sucategory-filter']) {
				const schoolData: any = subCategory(schoolNews['sucategory-filter']);
				setSchoolSubCategories(schoolData);
			}

			if (collegeNews['sucategory-filter']) {
				const collegeData: any = subCategory(collegeNews['sucategory-filter']);
				setCollegeSubSategories(collegeData);
			}

			if (careerNews['sucategory-filter']) {
				const careerData: any = subCategory(careerNews['sucategory-filter']);
				setCareerSubSategories(careerData);
			}

			setCategorizedNews({
				todayNews: newsdetail["Today’s Top News"] || {},
				recommendedNews: newsdetail['Recommended News'] || {},
				topStudentStories: newsdetail['Top Student Stories'] || {},
				topHighlights: newsdetail['Top Highlights'] || {},
				schoolNews,
				collegeNews,
				careerNews,
				photoVideoGallery: newsdetail['Photo and Video Gallery'] || {},

			});
		}
	}, [newsdetail]);

	const { todayNews, recommendedNews, topStudentStories, topHighlights, schoolNews, careerNews, collegeNews, photoVideoGallery } = categorizedNews;

	const handleTopNewsViewAllClick = (categorySlug: string, path: any) => {
		router.push(`/educational_news/${categorySlug}`);
		localStorage.setItem("category_path", path)
	};

	const handleDetail = (id: string) => {
		router.push(`/educational_news/news_detail?id=${id}`);
	};

	const handlePhotoVideoViewAllClick = (path: any) => {
		router.push("/educational_news/gallery");
		localStorage.setItem("category_path", path)
	};

	useEffect(() => {
		setTimeout(() => {
			setIsLoadings(false);
		}, 1200);
	}, []);

	return (
		<PublicPageTemplate>
			<div className={`w-full p-4 flex flex-col sm:flex-row items-center justify-between rounded-lg ${isLoadings ? "sekleton-light-gray" : "bg-white"
				}`}>

				{isLoadings ? (
					<div className="w-full h-[2rem] lg:h-[3rem] skeleton-medium-gray rounded-lg">
						<h6 className="text-[1rem] lg:text-[1.3rem] font-semibold text-transparent bg-gradient-to-r from-gray-300 to-gray-400 bg-clip-text">
						</h6>
					</div>
				) : (
					<h6 className="text-darkBlue text-[1rem] lg:text-[1.3rem] font-semibold lg:whitespace-nowrap">Welcome To Educational News Section.</h6>

				)}
				<div>
					<PageTitleSearchBar isIcon={false} onSearch={(val: any) => setSearchText(val)} />
				</div>
			</div>
			<div className="full-width max-h-[960px]">
				<div className="w-full flex flex-col gap-5">

					{/* today top news */}
					<ViewAllWithPaginationContainer
						groupHeading="Today’s Top News"
						viewAllClick={() => handleTopNewsViewAllClick("today_top_news", todayNews?.view_all)}
						itemsPerPage={1}
					>
						{
							todayNews?.news?.length > 0 &&
							todayNews?.news?.map((elem: any, index) => (
								<div className="w-full p-4 rounded-lg hover:bg-softBlue" key={elem?.id}>
									<TopNewsCard
										// key={elem?.id}
										id={elem?.id}
										newsHeading={elem?.newsletter_heading}
										authorName={elem?.news_posted_by}
										totalViews={`2K`}
										time="24 Hours ago"
										newsDetails={elem?.newsletter_description}
										newsDetailsNext="This strategic move comes as upGrad seeks to capitalise on the soaring demand for ..."
										thumbnail={elem?.thumbnail}
										hashtag={elem?.hashtag}
										readMore={elem?.['view/read more']}
										handleDetail={() => handleDetail(elem?.id)}
									/>
								</div>
							))
						}
					</ViewAllWithPaginationContainer>

					{/* recommended news */}
					<ViewAllWithPaginationContainer
						groupHeading="Recommended News"
						viewAllClick={() => handleTopNewsViewAllClick("recommended_news", recommendedNews?.view_all)}
						itemsPerPage={3}
					>
						{
							recommendedNews?.news?.length > 0 &&
							recommendedNews?.news?.map((elem: any) => (
								<div className="w-full sm:w-[48%] lg:w-[33.2%] lg:h-full" key={elem?.id}>
									<RecommendedNewsCard
										// key={elem?.id}
										id={elem?.id}
										newsHeading={elem?.newsletter_heading}
										authorName={elem?.news_posted_by}
										totalViews={`2K`}
										thumbnail={elem?.thumbnail}
										hashtag={elem?.hashtag}
										time="24 Hours ago"
										readMore={elem?.['view/read more']}

									/>
								</div>
							))
						}

					</ViewAllWithPaginationContainer>
				</div>

				{/* top highlight */}
				{/* Right Sidebar Section */}
				<div className={`w-full max-w-[25%] p-2 lg:p-6 hidden xl:flex flex-col gap-1 rounded-lg  ${isLoadings ? "sekleton-light-gray h-[20vh]" : "bg-white max-h-[910px] overflow-y-auto no-scrollbar"
					}`}>
					{
						isLoadings ? (
							<h6 className="h-6 w-24 skeleton-medium-gray rounded-lg"></h6>
						) : (
							<div className="flex justify-between items-center">

								<h6 className=" font-semibold text-darkBlue">Top HighLights</h6>
								<div className="items-end flex justify-end">

									{isLoadings ? (
										<div className="w-20 h-[2rem] skeleton-medium-gray rounded-lg">

										</div>
									) : (
										<RoundedButton
											buttonName="View All"
											height="2.425rem"
											width="5rem"
											onClick={viewAllClick}
											withBackground={false}
											fontBold
											textColor="#0070F0E5"
											textSize="0.8rem"
										/>
									)}


								</div>
							</div>
						)
					}

					{/* <TopHighlightsCard
				newsHeading="Odisha’s Purnati Khuntia bags Rowland Fellowship from Harvard University"
				authorName="Thomas Christian"
				totalViews="55K"
				time="24 Hours ago"
				newsDetails="Edtech unicorn upGrad, renowned for its innovative online education platforms, announced plans to raise $34 million in debt..."
			/> */}

					{
						topHighlights?.news?.length > 0 &&
						topHighlights?.news?.map((elem: any) => (
							<TopHighlightsCard
								key={elem?.id}
								id={elem?.id}
								authorName={elem?.news_posted_by}
								newsHeading={elem?.newsletter_heading}
								totalViews={`2K`}
								time="24 Hours ago"
								newsDetails={elem?.newsletter_description}
								thumbnail={elem?.thumbnail}
								hashtag={elem?.hashtag}
								readMore={elem?.[`view/read more`]}

							/>
						))
					}

				</div>
			</div>

			{/* top student stories */}
			<ViewAllWithPaginationContainer
				groupHeading="Top Student Stories"
				viewAllClick={() => handleTopNewsViewAllClick("top_student_stories", topStudentStories?.view_all)} itemsPerPage={4} >
				{/* <div className="w-full grid grid-cols-1 gap-2 lg:grid-cols-3 lg:gap-4" > */}
				{
					topStudentStories?.news?.length > 0 &&
					topStudentStories?.news?.map((elem: any) => (
						<div className="w-full lg:w-[32.5%] min-h-full" key={elem?.id}>
							<TopStudentNewsCard
								// key={elem?.id}
								id={elem?.id}
								newsHeading={elem?.newsletter_heading}
								authorName={elem?.news_posted_by}
								totalViews={`2K`}
								thumbnail={elem?.thumbnail}
								hashtag={elem?.hashtag}
								time="24 Hours ago"
								readMore={elem?.['view/read more']}

							/>
						</div>
					))
				}
				{/* </div> */}
			</ViewAllWithPaginationContainer>

			{/* school news */}
			<SchoolNews
				newsData={schoolNews?.news}
				subCategories={schoolSubCategories}
			/>
			{/* college news */}
			<CollegeNews
				newsData={collegeNews?.news}
				subCategories={collegeSubCategories}
			/>

			{/* career news */}
			<CarrerNews
				newsData={careerNews?.news}
				subCategories={careerSubCategories}
			/>

			{/* photo and gallery */}
			<ViewAllWithPaginationContainer
				groupHeading="Photo & Video Gallery"
				viewAllClick={() => handlePhotoVideoViewAllClick(photoVideoGallery?.view_all)}
				itemsPerPage={4}
			>
				{photoVideoGallery?.news?.flat().map((elem: any, index: number) => (
					<NewsVideoCard key={index} url={elem} />
				))}
			</ViewAllWithPaginationContainer>
			<NewsCta />
		</PublicPageTemplate>
	);
};

export default EducationalNews;
