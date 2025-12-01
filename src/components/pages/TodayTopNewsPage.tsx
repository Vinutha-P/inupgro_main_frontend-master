'use client';
import React, { useEffect, useState, useCallback, useRef } from "react";
import PageTitleSearchBar from "../molecule/PageTitleSearchBar";
import SideCardsContainer from "../containers/SideCardsContainer";
import Chips from "../atom/Chips";
import PersonaliseYourFeedCard from "../molecule/PersonaliseYourFeedCard";
import PublicPageTemplate from "../templates/PublicPageTemplate";
import NewsDetailCard from "../molecule/NewsDetailCard";
import NewsCta from "../molecule/NewsCta";
import SelectButtonRoudedDark from "../atom/buttons/SelectButtonRoudedDark";
import { useGetNewsByCategoryQuery, useSearchAllNewsQuery, useSearchNewsByCategoryAndPhraseQuery } from "@/features/api/newsApiSlice";
import { useParams, useRouter } from 'next/navigation'
import { formatCategory } from "@/utils/helper";
import { skipToken } from "@reduxjs/toolkit/query";

const languageOptions = ["English", "Hindi"]
const popularityOptions = ["English", "Hindi"]

const TodayTopNewsPage = () => {
	const [isLoadings, setIsLoadings] = useState(true);
	const [searchText, setSearchText] = useState("");
	const [debouncedSearchText, setDebouncedSearchText] = useState("");
	const [selectedDate, setSelectedDate] = useState("");
	const [selectedPopularity, setSelectedPopularity] = useState("");
	const [selectedLanguage, setSelectedLanguage] = useState("");

	const [pathName, setPathName] = useState<string | null>(null);
	const [sbViewAll, setSbViewAll] = useState<string | null>(null);

	// const pathName = localStorage?.getItem("category_path");
	// const sbViewAll = localStorage?.getItem("sub_category_viewall");

	// Call the search API only when debouncedSearchText changes
	const { data: searchResults, isLoading: isSearching } = useSearchNewsByCategoryAndPhraseQuery(
		debouncedSearchText ? { path: `${pathName}/search/${debouncedSearchText}` } : skipToken);

	// Call the search API only when date changes
	const { data: dateResults } = useSearchNewsByCategoryAndPhraseQuery(
		selectedDate ? { path: `${pathName}/date/${selectedDate}` } : skipToken);

	// Call the search API only when language changes
	const { data: languageResults } = useSearchNewsByCategoryAndPhraseQuery(
		selectedLanguage ? { path: `${pathName}/language/${selectedLanguage}` } : skipToken);

	const params = useParams();
	const router = useRouter();
	const category = params.category;
	const formattedCategory = category ? formatCategory(category as string) : '';

	useEffect(() => {
		setTimeout(() => {
			setIsLoadings(false);
		}, 1000);
		// localStorage.removeItem("sub_category_path")
		setPathName(localStorage.getItem("category_path"));
		setSbViewAll(localStorage.getItem("sub_category_viewall"));
	}, []);

	const { data: categoryVeiwAllNews } = useGetNewsByCategoryQuery(
		{ path: pathName },
		{ skip: !pathName }
	);
	const { data: subCategoryVeiwAllNews } = useGetNewsByCategoryQuery(
		{ path: sbViewAll },
		{ skip: !sbViewAll }
	);

	const isCategory = pathName ? categoryVeiwAllNews : subCategoryVeiwAllNews;

	const categoryData = isCategory?.flatMap((elem: any) => elem?.data || []);
	const recentTopicsData = isCategory?.flatMap((elem: any) => elem?.["Recent Topics"] || []);

	const finalNewsData =
		debouncedSearchText && searchResults?.length > 0
			? searchResults.flatMap((item: any) => item?.data || [])
			: selectedDate && dateResults?.length > 0
				? dateResults.flatMap((item: any) => item?.data || [])
				: selectedLanguage && languageResults?.length > 0
					? languageResults.flatMap((item: any) => item?.data || [])
					: categoryData;

	// Debounce searchText to avoid too many API calls
	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedSearchText(searchText);
		}, 300); // wait 300ms after user stops typing
		return () => clearTimeout(handler);
	}, [searchText]);

	const handleDate = (val: any) => {
		setSelectedDate(val)
		setSelectedPopularity("")
	}

	const handlePopularity = (val: any) => {
		setSelectedPopularity(val)
		setSelectedDate("")
		setSelectedLanguage("")
	}

	const handleLanguage = (val: any) => {
		setSelectedLanguage(val)
		setSelectedDate("")
		setSelectedPopularity("")
	}

	return (
		<PublicPageTemplate>
			<div className="flex gap-5">
				<div className="w-full h-fit p-2 lg:p-6 flex flex-col gap-5 bg-white rounded-lg left-part">
					<div className="w-full hidden lg:flex">
						<PageTitleSearchBar pageTitle={formattedCategory} onSearch={(val: any) => setSearchText(val)} />
					</div>
					<div className="w-full flex justify-start gap-5">
						<SelectButtonRoudedDark
							buttonName="Date"
							selectedDate={selectedDate}
							onSelect={(val: any) => handleDate(val)} />
						<SelectButtonRoudedDark
							buttonName="Popularity"
							selectedValue={selectedPopularity}
							options={popularityOptions}
							onSelect={(val: any) => handlePopularity(val)}
						/>
						<SelectButtonRoudedDark
							buttonName="Language"
							selectedValue={selectedLanguage}
							options={languageOptions}
							onSelect={(val: any) => handleLanguage(val)} />
					</div>
					<div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-5">
						{
							finalNewsData?.length > 0 &&
							finalNewsData?.map((elem: any) => (
								<NewsDetailCard
									key={elem?.id}
									id={elem?.id}
									newsHeading={elem?.newsletter_heading}
									authorName={elem?.news_posted_by}
									totalViews="2K"
									time="24 Hours ago"
									newsDetail={elem?.newsletter_description}
									thumbnail={elem?.thumbnail}
									readMore={elem?.['view/read more']}
									hashtag={elem?.hashtag}
								/>
							))
						}

					</div>
				</div>
				<div className="w-fit min-w-fit hidden lg:flex flex-col gap-5">
					<SideCardsContainer isLoadings={isLoadings}>
						<div className="w-full flex flex-col gap-5">
							{/* <h4 className="text-xl lg:text-[1.75rem] font-semibold text-darkBlue"> */}
							<h6 className="text-darkBlue">
								Recent Topics
							</h6>
							{
								recentTopicsData?.length > 0 &&
								recentTopicsData?.map((elem: string, index: number) => (
									<Chips key={index} chiptext={elem} />
								))
							}
						</div>
					</SideCardsContainer>
					<PersonaliseYourFeedCard isLoadings={isLoadings} />
				</div>
			</div>
			<NewsCta />
		</PublicPageTemplate>
	);
};

export default TodayTopNewsPage;
