import type React from "react";
import NewsImage from "@/assets/News_Photo_Image.png";
import Image from "next/image";
import Chips from "../atom/Chips";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface RecommendedNewsCardProps {
	id: string;
	newsHeading: string;
	authorName: string;
	totalViews: string;
	thumbnail: string;
	hashtag: string[];
	time: string;
	readMore: string;
}

const RecommendedNewsCard: React.FC<RecommendedNewsCardProps> = ({
	id,
	newsHeading,
	authorName,
	totalViews,
	thumbnail,
	hashtag,
	time,
	readMore,
}) => {
	const router = useRouter();
	const [isLoadings, setIsLoadings] = useState(true);
	useEffect(() => {
		setTimeout(() => {
			setIsLoadings(false);
		}, 1000);
	}, []);


	const handleReadMore = () => {
		localStorage.setItem("readMore_Path", readMore)
		router.push(`/educational_news/news-detail?${id}`)
	}

	return (
		<div className="w-full flex flex-col  gap-5 bg-white p-2 hover:bg-softBlue lg:rounded-lg shadow-sm relative">
			<div className="">
						{hashtag?.length > 0 && (
							<Chips chiptext={hashtag?.[0]} />
						)}
					</div>
			{isLoadings ? (
				<div className="w-[300px] lg:w-[350px] h-[265px] skeleton-medium-gray rounded-lg">

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

			
			{/* Heading and author info */}
			<div className="w-full flex flex-col-reverse lg:flex-col gap-4" onClick={handleReadMore}>
				{isLoadings ? (
					<div className="w-full h-[2rem] lg:h-[3rem] skeleton-medium-gray rounded-lg">
						<h6 className="text-[1rem] lg:text-[1.3rem] font-semibold text-transparent bg-gradient-to-r from-gray-300 to-gray-400 bg-clip-text">
						</h6>
					</div>
				) : (
					<h6 className="text-[1rem] lg:text-[1rem] leading-[22px] font-semibold text-deepBlue">
						{newsHeading}
					</h6>
				)}
				<ul className="w-full flex flex-col-reverse lg:flex-col gap-5 list-disc">
					<li className="flex-box-start">
						<ul className="flex-box-center gap-1 lg:gap-6  text-[0.575rem] font-semibold text-customGray marker:text-[#D1D1D6]">

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

		</div>
	);
};

export default RecommendedNewsCard;
