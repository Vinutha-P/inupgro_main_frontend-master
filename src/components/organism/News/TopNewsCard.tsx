'use client'
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Demoimage from "@/assets/Top_News_Demo_Image.png";
import Chips from "@/components/atom/Chips";
import { useRouter } from "next/navigation";

interface TopNewsCardProps {
	id: string;
	newsHeading: string;
	authorName: string;
	totalViews: string;
	time: string;
	newsDetails: string;
	newsDetailsNext: string;
	thumbnail: string;
	readMore: string;
	hashtag: string[];
	handleDetail: () => void;
}

const TopNewsCard: React.FC<TopNewsCardProps> = ({
	id,
	newsHeading,
	authorName,
	totalViews,
	time,
	newsDetails,
	newsDetailsNext,
	thumbnail,
	readMore,
	hashtag,
	handleDetail,
}) => {
	const router = useRouter();
	const [isLoadings, setIsLoadings] = useState(true);



	const handleReadMore = () => {
		localStorage.setItem("readMore_Path", readMore)
		router.push(`/educational_news/news-detail?${id}`)
	}
	useEffect(() => {
		setTimeout(() => {
			setIsLoadings(false);
		}, 1100);
	}, []);
	return (
		<div className="w-full flex flex-col lg:flex-row items-start justify-start gap-2 lg:gap-4">
			{hashtag?.length > 0 && (
				<div className="w-fit lg:hidden flex">
					<Chips chiptext={hashtag?.[0]} />
				</div>
			)}


			{isLoadings ? (
				<div className="w-[300px] lg:w-[350px] h-[265px] skeleton-medium-gray rounded-lg">

				</div>
			) : (
				<div className="relative w-full lg:w-[55%] h-[265px]"
					onClick={handleDetail}
					onKeyDown={(e) => e.key === 'Enter' && handleDetail()}
				>
					<Image
						width={0}
						height={0}
						src={thumbnail || Demoimage}
						alt="Top News Image"
						className="w-full lg:w-[100%] h-[100%] object-cover rounded-lg"
					/>
				</div>
			)}

			{/* News Heading Section */}
			<div className="flex flex-col gap-2 lg:gap-4">
				<div className="w-full flex flex-collg:flex-row gap-4 items-start">
					<div className="w-full flex flex-col-reverse lg:flex-col gap-1 lg:gap-4">
						{isLoadings ? (
							<div className="w-full h-[2rem] lg:h-[3rem] skeleton-medium-gray rounded-lg">
								<h6 className="text-[1rem] lg:text-[1.3rem] font-semibold text-transparent bg-gradient-to-r from-gray-300 to-gray-400 bg-clip-text">
								</h6>
							</div>
						) : (
							<h6 className="text-[1rem] lg:text-[1.15rem] font-semibold text-deepBlue cursor-pointer">
								{newsHeading}
							</h6>
						)}

						<ul className="w-full flex flex-col-reverse lg:flex-col gap-5 list-disc">
							<li className="flex-box-start">
								<ul className="flex-box-center gap-1 lg:gap-6 text-xs font-semibold text-customGray marker:text-[#D1D1D6]">

									{isLoadings ? (
										<li className="w-[60px] h-[10px] skeleton-medium-gray rounded-lg"></li>
									) : (

										<li className="list-none">By {authorName}</li>
									)
									}
									{isLoadings ? (
										<li className="w-[60px] h-[10px] skeleton-medium-gray rounded-lg"></li>
									) : (

										<li className="list-disc marker:ml-2">{totalViews} Views</li>
									)
									}
									{isLoadings ? (
										<li className="w-[60px] h-[10px] skeleton-medium-gray rounded-lg"></li>
									) : (

										<li className="list-disc marker:ml-2">Posted {time}</li>
									)
									}
								</ul>
							</li>
						</ul>
					</div>
					<div className="w-fit hidden lg:flex">
						<Chips
							chiptext="#topNews"
							className=""
						/>
					</div>
				</div>
				{/* News Detail Section */}
				<div className="w-full flex-box-center">
					{isLoadings ? (
						<p className="w-full h-[2rem] skeleton-medium-gray rounded-lg"></p>
					) : (

						<p className="text-sm text-grayDark line-clamp-[5]">
							{newsDetails}
						</p>
					)
					}
				</div>
				<div className="w-full">
					{isLoadings ? (
						<p className="w-full h-[2rem] skeleton-medium-gray rounded-lg"></p>
					) : (

						<p className="text-sm  text-grayDark line-clamp-[5]">
							{newsDetailsNext}
						</p>
					)
					}

				</div>
				{isLoadings ? (
					<p className="w-[100px] h-[2rem] skeleton-medium-gray rounded-lg"></p>
				) : (

					<button
						type="button"
						className="w-fit h-[2.513rem] flex-box-center font-semibold text-primaryOverlay text-[0.8rem]"
						onClick={handleReadMore}
					>
						Read More
					</button>
				)
				}

			</div>
		</div>
	);
};

export default TopNewsCard;
