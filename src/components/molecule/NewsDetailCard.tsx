'use client'
import React, { useEffect, useState } from "react";
import Chips from "../atom/Chips";
import Image from "next/image";
import NewsImage from "@/assets/News_Photo_Image.png";
import { useRouter } from "next/navigation";

interface NewsDetailCardProps {
  id?: string;
  newsHeading: string;
  authorName: string;
  totalViews: string;
  time: string;
  newsDetail: string;
  thumbnail?: string;
  readMore?: string;
  hashtag?: string;
}

const NewsDetailCard: React.FC<NewsDetailCardProps> = ({
  id,
  newsHeading,
  authorName,
  totalViews,
  time,
  newsDetail,
  thumbnail = "",
  readMore = "",
  hashtag = "",
}) => {
  const router = useRouter();
  const [isLoadings, setIsLoadings] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoadings(false);
    }, 1200);
  }, []);

  const handleReadMore = () => {
    localStorage.setItem("readMore_Path", readMore)
    router.push(`/educational_news/news-detail?${id}`)
  }
  return (
    <div className="w-full p-4 flex flex-col gap-5 bg-white hover:bg-softBlue rounded-lg shadow-sm">
      {/*
       {hashtag?.length > 0 && (
        <Chips chiptext={hashtag?.[0]} />
      )}
      {
        thumbnail &&
        <Image
          width={0}
          height={0}
          src={thumbnail}
          sizes="100vw"
          alt="News Image"
          className="w-full h-[14rem] md:h-[18.25rem] lg:h-[21.25rem] rounded-lg"
        />
      }
       */}

      {isLoadings ? (
              <div className="w-[300px] lg:w-[350px] h-[265px] skeleton-medium-gray rounded-lg">
      
              </div>
            ) : (
              <>
                <div className="absolute top-6 left-6">
                  {hashtag?.length > 0 && (
                    <Chips chiptext={hashtag?.[0]} />
                  )}
                </div>
      
                {
                  thumbnail &&
                  <Image
                    width={0}
                    height={0}
                    src={thumbnail}
                    sizes="100vw"
                    alt="News Image"
                    // className="w-full h-[14rem] md:h-[18.25rem] lg:h-[17.25rem] rounded-lg"
                    className="w-full h-[14rem] rounded-lg"
                  />
                }
              </>
            )}

      {/* Heading and author info */}
      {/* <div className="w-full flex flex-col-reverse lg:flex-col gap-4">
        <p className="text-sm md:text-base lg:text-[1.75rem] lg:leading-[2.275rem] font-bold">
          {newsHeading}
        </p>
        <div className="w-full flex-box-between gap-4">
          <div className="flex-box-center gap-2 text-xs font-semibold text-customGray">
            <p>By</p>
            <p>{authorName}</p>
          </div>
          <div className="flex-box-center gap-2 text-xs font-semibold text-customGray">
            <p>{totalViews}</p>
            <p>Views</p>
          </div>
          <div className="flex-box-center gap-2 text-xs font-semibold text-customGray">
            <p>Posted</p>
            <p>{time}</p>
          </div>
        </div>
      </div> */}
      <div className="w-full flex flex-col-reverse lg:flex-col gap-4">
        {isLoadings ? (
          <div className="w-full h-[2rem] lg:h-[3rem] skeleton-medium-gray rounded-lg">
            <h6 className="text-[1rem] lg:text-[1.3rem] font-semibold text-transparent bg-gradient-to-r from-gray-300 to-gray-400 bg-clip-text">
              &nbsp;
            </h6>
          </div>
        ) : (
          <h6 className="text-[1rem] lg:text-[1rem] leading-[22px] font-semibold text-deepBlue">
            {newsHeading}
          </h6>
        )}


        <ul className="w-full flex gap-5 list-disc text-[0.575rem] font-semibold text-customGray marker:text-[#D1D1D6]">
          {isLoadings ? (
            <li className="w-[60px] h-[10px] skeleton-medium-gray rounded-lg"></li>
          ) : (
            <li className="list-none">By {authorName}</li>
          )}


          {isLoadings ? (
            <li className="w-[60px] h-[10px] skeleton-medium-gray rounded-lg"></li>
          ) : (
            <li className="list-disc marker:ml-2">{totalViews} Views</li>
          )}


          {isLoadings ? (
            <li className="w-[60px] h-[10px] skeleton-medium-gray rounded-lg"></li>
          ) : (
            <li className="list-disc marker:ml-2">Posted {time}</li>
          )}
        </ul>
      </div>


      <div className="w-full text-left flex items-center justify-start">
        <p className="text-sm md:text-base text-grayDark line-clamp-5">{newsDetail}</p>
      </div>
      <button className="w-fit h-[2.513rem] flex-box-center font-semibold text-primaryOverlay"
        onClick={handleReadMore}
      >
        Read More
      </button>
    </div>
  );
};

export default NewsDetailCard;
