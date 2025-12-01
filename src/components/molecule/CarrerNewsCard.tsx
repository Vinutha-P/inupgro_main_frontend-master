'use client'
import Chips from "@/components/atom/Chips";
import Image from "next/image";
import NewsImage from "@/assets/News_Photo_Image.png";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface CarrerNewsCard {
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

const CarrerNewsCard: React.FC<CarrerNewsCard> = ({
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
		<>
			<div className={`w-full p-3 flex flex-col md:flex-row gap-4 hover:bg-softBlue rounded-lg shadow-sm ${isLoadings ? "sekleton-light-gray" : "bg-white"
				}`}>
				{isLoadings ? (
					<div className="w-full h-[240px] skeleton-medium-gray rounded-lg">

					</div>
				) : (
					<>
						{
							thumbnail &&
							
							<Image
								width={0}
								height={0}
								src={thumbnail}
								sizes="100vw"
								alt="News Image"
								className="w-full max-w-[15rem] h-[15rem] rounded-lg"
							/>
						}
					</>
				)}

				{/* Heading and author info */}
				<div className="w-full flex flex-col gap-2" onClick={handleReadMore}>
					<div className="w-full flex flex-col gap-2">
						<div className="flex items-start justify-between gap-2">
							{isLoadings ? (
								<div className="w-full h-[2rem] lg:h-[3rem] skeleton-medium-gray rounded-lg">
									<h6 className="text-[1rem] lg:text-[1.3rem] font-semibold text-transparent bg-gradient-to-r from-gray-300 to-gray-400 bg-clip-text">
										&nbsp;
									</h6>
								</div>
							) : (
								<h6 className="text-[1rem] lg:text-[1.15rem] font-semibold text-deepBlue cursor-pointer">
									{newsHeading}
								</h6>
							)}
							{isLoadings ? (
								<div className="!w-fit !h-4 !px-0.5 !py-0 !text-[0.6rem] skeleton-medium-gray rounded-lg">

								</div>
							) : (
								<>
									{hashtag?.length > 0 && (
										<Chips chiptext={hashtag?.[0]}
											className=""
										/>
									)}
								</>
							)}


						</div>

						<ul className="w-full flex gap-5 list-disc text-[0.575rem] font-semibold text-customGray marker:text-[#D1D1D6]">
							{isLoadings ? (
								<li className="w-[60px] h-[10px] skeleton-medium-gray rounded-lg"></li>
							) : (
								<li className="list-none text-xs">By {authorName}</li>
							)}
							{isLoadings ? (
								<li className="w-[60px] h-[10px] skeleton-medium-gray rounded-lg"></li>
							) : (
								<li className="list-disc marker:ml-2 text-xs">{totalViews} Views</li>
							)}


							{isLoadings ? (
								<li className="w-[60px] h-[10px] skeleton-medium-gray rounded-lg"></li>
							) : (
								<li className="list-disc marker:ml-2 text-xs">Posted {time}</li>
							)}
						</ul>
					</div>
					<div className="w-full text-left flex items-center justify-start">
						{isLoadings ? (
							<p className="w-full h-[2rem] skeleton-medium-gray rounded-lg"></p>
						) : (
							<p className="text-[0.75rem] text-grayDark line-clamp-[5]">
								{newsDetail}
							</p>
						)}

					</div>
					{isLoadings ? (
						<button className="w-10 h-[1rem] skeleton-medium-gray rounded-lg"></button>
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
			</div>
		</>
	);
};

export default CarrerNewsCard;
