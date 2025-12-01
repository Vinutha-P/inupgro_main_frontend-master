'use client';
import React, { useEffect, useState } from "react";
import PublicPageTemplate from "../templates/PublicPageTemplate";
import NewsDetailCard from "../molecule/NewsDetailCard";
import PageTitleSearchBar from "../molecule/PageTitleSearchBar";
import SideCardsContainer from "../containers/SideCardsContainer";
import Chips from "../atom/Chips";
import PersonaliseYourFeedCard from "../molecule/PersonaliseYourFeedCard";
import DetailedNews from "../organism/News/DetailedNews";
import NewsCta from "../molecule/NewsCta";
import ViewAllWithPaginationContainer from "../containers/ViewAllWithPaginationContainer";
import { useGetNewsByCategoryQuery } from "@/features/api/newsApiSlice";
import { ConstantText } from "../../utils/constants";
import { useRouter } from "next/navigation";

const NewsDetailPage = () => {
  const [isLoadings, setIsLoadings] = useState(true);
  const [detailPath, setDetailPath] = useState<any>(null);

  const router = useRouter();
  const { RECENT_TOPICS, RECOMMENDED_NEWS } = ConstantText;

  useEffect(() => {
    setTimeout(() => {
      setIsLoadings(false);
    }, 1000);

    const storedData = localStorage.getItem('readMore_Path');
    if (storedData) {
      setDetailPath(storedData);
    }
  }, []);
  const { data: categoryVeiwAllNews } = useGetNewsByCategoryQuery({
    path: detailPath},{ skip: !detailPath
  });

  const handleTopNewsViewAllClick = (categorySlug: string, path: any) => {
    router.push(`/educational_news/${categorySlug}`);
    localStorage.setItem("category_path", path)
  };

  return (
    <PublicPageTemplate>
      <div className="full-width">
        <div className="w-full h-fit flex flex-col gap-5 rounded-lg">
          <div className="w-full p-2 lg:p-6 hidden lg:flex  bg-white ">
            <PageTitleSearchBar />
          </div>
          <DetailedNews
            newsHeading={categoryVeiwAllNews?.newsletter_heading}
            authorName={categoryVeiwAllNews?.news_posted_by}
            newDescription={categoryVeiwAllNews?.newsletter_description}
            thumbnail={categoryVeiwAllNews?.thumbnail}
            totalViews={"75K"}
            time={"24 Hours ago"}
            hashtag={categoryVeiwAllNews?.hashtag}
          />
          <ViewAllWithPaginationContainer groupHeading="Recommended News"
            viewAllClick={() => handleTopNewsViewAllClick("recommended_news", categoryVeiwAllNews?.[RECOMMENDED_NEWS]?.view_all)}
            itemsPerPage={2}
          >
            {/* <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-5"> */}
            {
              categoryVeiwAllNews?.[RECOMMENDED_NEWS]?.news?.map((elem: any) => (
                <div className="w-full lg:w-[48%]" key={elem?.id}>
                  <NewsDetailCard
                    key={elem?.id}
                    id={elem?.id}
                    newsHeading={elem?.newsletter_heading}
                    authorName={elem?.news_posted_by}
                    thumbnail={elem?.thumbnail}
                    totalViews="75K"
                    time="24 Hours ago"
                    newsDetail={elem?.newsletter_description}
                    readMore={elem?.['view/read more']}
                  />
                </div>
              ))
            }
            {/* </div> */}
          </ViewAllWithPaginationContainer>
        </div>
        {/* Right Section */}
        <div className="w-fit min-w-fit hidden lg:flex flex-col gap-5">
          <SideCardsContainer isLoadings={isLoadings}>
            <div className="w-full flex flex-col gap-5">
              <p className="text-xl lg:text-[1.75rem]font-semibold text-darkBlue">
                Recent Topics
              </p>
              {
                categoryVeiwAllNews?.[RECENT_TOPICS].length > 0 &&
                categoryVeiwAllNews?.[RECENT_TOPICS].map((elem: any, index: number) => (
                  <Chips chiptext={elem} key={index} />
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

export default NewsDetailPage;
