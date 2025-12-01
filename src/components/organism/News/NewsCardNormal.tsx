'use client'
import Chips from "@/components/atom/Chips";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import NewsImage from "@/assets/News_Photo_Image.png";
import { useRouter } from "next/navigation";

interface NewsCardNormalProps {
	id: string;
	newsHeading: string;
	authorName: string;
	totalViews: string;
	time: string;
	newsDetail: string;
	thumbnail: string;
	hashtag: string;
	readMore: string;
}

const NewsCardNormal: React.FC<NewsCardNormalProps> = ({
	id,
	newsHeading,
	authorName,
	totalViews,
	time,
	newsDetail,
	thumbnail,
	hashtag,
	readMore,
}) => {

	const router = useRouter();
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		setTimeout(() => {
			setIsLoading(false);
		}, 1200);
	}, []);

	const handleReadMore = () => {
		localStorage.setItem("readMore_Path", readMore)
		router.push(`/educational_news/news-detail?${id}`)
	}

	return (
		<div className="w-full p-4 flex flex-col gap-5 bg-white hover:bg-softBlue rounded-lg shadow-sm relative">
			<div>
				{hashtag?.length > 0 && (
					<Chips chiptext={hashtag?.[0]} />
				)}
			</div>
			{isLoading ? (
				<div className="w-full lg:w-full h-[265px] skeleton-medium-gray rounded-lg">

				</div>
			) : (
				<>
					{/* <div className="absolute top-6 left-6">
						{hashtag?.length > 0 && (
							<Chips chiptext={hashtag?.[0]} />
						)}
					</div> */}

					{
						thumbnail &&
						<Image
							width={0}
							height={0}
							src={thumbnail || NewsImage}
							sizes="100vw"
							alt="News Image"
							className="w-full h-[14rem] rounded-lg"
						/>
					}
				</>
			)}



			<div className="w-full flex flex-col-reverse lg:flex-col gap-4" onClick={handleReadMore}>
				{isLoading ? (
					<div className="w-full h-[2rem] skeleton-medium-gray rounded-lg">
						<h6 className="text-[1rem] lg:text-[1.3rem] font-semibold text-transparent bg-gradient-to-r from-gray-300 to-gray-400 bg-clip-text">
							&nbsp;
						</h6>
					</div>
				) : (
					<h6 className="text-[1rem] h-[2rem] lg:text-[1rem] leading-[22px] font-semibold text-deepBlue ">
						{newsHeading}
					</h6>
				)}


				<ul className="w-full flex gap-5 list-disc text-[0.575rem] font-semibold text-customGray marker:text-[#D1D1D6]">
					{isLoading ? (
						<li className="w-[60px] h-[10px] skeleton-medium-gray rounded-lg"></li>
					) : (
						<li className="list-none">By {authorName}</li>
					)}
					{isLoading ? (
						<li className="w-[60px] h-[10px] skeleton-medium-gray rounded-lg"></li>
					) : (
						<li className="list-disc marker:ml-2">{totalViews} Views</li>
					)}


					{isLoading ? (
						<li className="w-[60px] h-[10px] skeleton-medium-gray rounded-lg"></li>
					) : (
						<li className="list-disc marker:ml-2">Posted {time}</li>
					)}
				</ul>
			</div>
			<div className="w-full text-left flex items-center justify-start">
				{isLoading ? (
					<p className="w-full h-[2rem] skeleton-medium-gray rounded-lg"></p>
				) : (
					<p className="text-[0.79rem] text-grayDark line-clamp-3">
						{newsDetail}
					</p>
				)}

			</div>
			<button
				type="button"
				className="w-fit h-[2.513rem] flex-box-center font-semibold text-primaryOverlay text-[0.8rem]"
				onClick={handleReadMore}
			>
				Read More
			</button>
		</div>
	);
};

export default NewsCardNormal;
