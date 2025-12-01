'use client';
import React, { useEffect, useState } from 'react'
import SideCardsContainer from '../containers/SideCardsContainer'
import PersonaliseYourFeedCard from '../molecule/PersonaliseYourFeedCard'
import Chips from '../atom/Chips'
import NewsDetailCard from '../molecule/NewsDetailCard'
import SelectButtonRoudedDark from '../atom/buttons/SelectButtonRoudedDark'
import PageTitleSearchBar from '../molecule/PageTitleSearchBar'
import PublicPageTemplate from '../templates/PublicPageTemplate'
import NewsCta from '../molecule/NewsCta'
import { useSearchAllNewsQuery } from '@/features/api/newsApiSlice';
import { useSearchParams, useRouter } from 'next/navigation';

const TagResultsPage = () => {
  const searchParams = useSearchParams();
  const tag = searchParams.get('tag');
  const [searchText, setSearchText] = useState("");
  const [debouncedSearchText, setDebouncedSearchText] = useState("");
  const [isLoadings, setIsLoadings] = useState(true);
  const { data: hashTagData } = useSearchAllNewsQuery({
    query:debouncedSearchText ? debouncedSearchText : tag
  });

  useEffect(() => {
    setTimeout(() => {
      setIsLoadings(false);
    }, 1000);
  }, []);

  useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedSearchText(searchText);
      }, 300); // wait 300ms after user stops typing
      return () => clearTimeout(handler);
    }, [searchText]);
  
  return (
    <PublicPageTemplate>
      <div className="full-width">
        <div className="w-full h-fit p-2 lg:p-6 flex flex-col gap-5 bg-white rounded-lg">
          <div className="w-full hidden lg:flex">
            <PageTitleSearchBar pageTitle="#Tag Results"  onSearch={(val: any) => setSearchText(val)}/>
          </div>
          <div className="w-full flex justify-start gap-5">
            <SelectButtonRoudedDark buttonName="Date" />
            <SelectButtonRoudedDark buttonName="Popularity" />
            <SelectButtonRoudedDark buttonName="Language" />
          </div>
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-5">
            {
              hashTagData && hashTagData?.[0]?.data?.map((elem: any) => (
                <NewsDetailCard
                  key={elem?.id}
                  id={elem?.id}
                  newsHeading={elem?.newsletter_heading}
                  authorName={elem?.news_posted_by}
                  totalViews="55K"
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
  )
}

export default TagResultsPage
