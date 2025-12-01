'use client'
import type React from "react";
import Chips from "../atom/Chips";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface TopHighlightsCardProps {
	id: string;
	newsHeading: string;
	authorName: string;
	totalViews: string;
	time: string;
	newsDetails: string;
	thumbnail: string;
	hashtag: string;
	readMore: string;
}

const TopHighlightsCard: React.FC<TopHighlightsCardProps> = ({
	id,
	newsHeading,
	authorName,
	totalViews,
	time,
	newsDetails,
	thumbnail,
	hashtag,
	readMore
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
		<div className="w-full flex flex-col gap-4">
			{hashtag?.length > 0 && (
				<Chips chiptext={hashtag?.[0]}
					className="!w-fit !h-6 !px-0.5 !py-1 !text-[0.6rem]"
				/>
			)}
			<div className="w-full flex flex-col-reverse lg:flex-col gap-4" onClick={handleReadMore}>
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
				{isLoadings ? (
					<p className="w-full h-[2rem] skeleton-medium-gray rounded-lg"></p>
				) : (
					<p className="text-[0.79rem] text-grayText line-clamp-3">
						{newsDetails}
					</p>
				)}

			</div>
			{isLoadings ? (
				<button className="w-full h-[1rem] skeleton-medium-gray rounded-lg"></button>
			) : (
				<button
					type="button"
					className="w-fit h-[2.513rem] flex-box-center font-semibold text-primaryOverlay text-[0.8rem]"
					onClick={handleReadMore}
				>
					Read More
				</button>
			)}

		</div>
	);
};

export default TopHighlightsCard;
