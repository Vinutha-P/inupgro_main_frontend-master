"use client";
import NewsPhotoCard from "@/components/atom/NewsPhotoCard";
import React, { useState, useEffect, useRef, useCallback } from "react";
import AcademicStatusOverviewPanel from "../AcademicStatusOverviewPanel";
import RoundedButton from "@/components/atom/buttons/RoundedButton";
import NewsVideoCard from "@/components/atom/NewVideoCard";
import { useGetAllNewsQuery, useGetNewsByCategoryQuery } from "@/features/api/newsApiSlice";
import { useParams } from 'next/navigation'
import { ConstantText } from "@/utils/constants";

const PhotosAndVideosSection = () => {
  const PhotosAndVideos = ["Photos", "Videos"];
  const [activeTab, setActiveTab] = useState("Photos");
  const [photosData,setPhotosData] = useState<string[]>([]);
  const [videosData,setVideosData] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const observerTarget = useRef(null);
  const {
    data: newsData,
    isLoading,
    isFetching,
    isError,
  } = useGetAllNewsQuery(
    { page },
    {
      pollingInterval: 0,
      refetchOnFocus: false,
      refetchOnMountOrArgChange: false,
    }
  );
  
  // const {
  //   data: nwsCategoryData
  // } = useGetNewsByCategoryQuery({
  //   newscategory_id:7,offset: 1  });

  const {PHOTOS_VIDEO_GALLERY} = ConstantText;

  const hasMorePages = newsData?.currentPage < (newsData?.totalPages || 0);
  const params = useParams();

  const loadMore = useCallback(() => {
    if (hasMorePages && !isFetching) {
      setPage(prev => prev + 1);
    }
  }, [hasMorePages, isFetching, page]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        const first = entries[0];

        if (first?.isIntersecting) {
          loadMore();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '100px',
      }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [loadMore]);

  useEffect(() => {
    if (newsData?.[PHOTOS_VIDEO_GALLERY]?.news?.length > 0) {
      const newPhotos: string[] = [];
      const newVideos: string[] = [];

      newsData?.[PHOTOS_VIDEO_GALLERY]?.news.forEach((item: any) => {
        const url = item?.[0];
        if (typeof url === "string") {
          if (url.endsWith(".webm") || url.endsWith(".mp4") || url.includes("video")) {
            newVideos.push(url);
          } else {
            newPhotos.push(url);
          }
        }
      });

      setPhotosData((prev) => [...prev, ...newPhotos]);
      setVideosData((prev) => [...prev, ...newVideos]);
    }
  }, [newsData]);

  const handleTabChange = (tabName: string) => {
    setActiveTab(tabName);
  };

  return (
    <section className="w-full flex flex-col items-center jus gap-5">
      <AcademicStatusOverviewPanel
        tabNames={PhotosAndVideos}
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />
      {activeTab === "Photos" && (
        <div className="w-full h-fit grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {photosData.map((elem, index) => (
            <NewsPhotoCard key={index} thumbnail={elem} />
          ))}
        </div>
      )}
      {activeTab === "Videos" && (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {videosData.map((elem, index) => (
            <NewsVideoCard key={index} url={elem} />
          ))}
        </div>
      )}
      <div className="w-full flex-box-between">
        <div className="w-full flex items-center jsutify-start gap-5">
          <RoundedButton buttonName="Previuos" />
          <RoundedButton buttonName="Next" />
        </div>
        <div className="w-fit min-w-fit flex items-center justify-end">
          <p className="text-steelGray">
            Page {""} <span className="font-semibold">1</span> of{" "}
            <span className="font-semibold">10</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default PhotosAndVideosSection;
