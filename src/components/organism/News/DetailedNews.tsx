import Chips from "@/components/atom/Chips";
import Image from "next/image";
import React from "react";
import NesImage from "@/assets/News_Photo_Image.png";

interface DetailedNewsProps {
	newsHeading: string;
	authorName: string;
	newDescription: string;
	thumbnail: string;
	totalViews: string;
	time: string;
	hashtag: string;
}

const DetailedNews: React.FC<DetailedNewsProps> = ({
	newsHeading,
	authorName,
	newDescription,
	thumbnail,
	totalViews,
	time,
	hashtag,
}) => {
	return (
		<div className="w-full p-2 lg:p-6 flex flex-col gap-5 bg-white rounded">
			{/* News Heading Section */}
			<div className="w-full flex flex-col gap-4 lg:flex-row lg:justify-betweeen items-start">
				<div className="w-full flex flex-col gap-5">
					<p className="text-sm md:text-base lg:text-[1.75rem] lg:leading-[2.275rem] font-bold">
						{newsHeading} test
					</p>
					<div className="w-full flex flex-col-reverse lg:flex-col gap-5">
						<div className="flex-box-start">
							<div className="flex-box-center gap-1 lg:gap-2 text-[0.675rem] font-semibold text-customGray">
								<p>By</p>
								<p>{authorName}</p>
							</div>
							<div className="flex-box-center gap-1 lg:gap-2 text-[0.675rem] font-semibold text-customGray">
								<p>{totalViews}</p>
								<p>Views</p>
							</div>
							<div className="flex-box-center gap-1 lg:gap-2 text-[0.675rem] font-semibold text-customGray">
								<p>Posted</p>
								<p>{time}</p>
							</div>
						</div>
					</div>
				</div>
				{hashtag?.length > 0 && (
					<Chips chiptext={hashtag?.[0]} />
				)}
			</div>
			<div className="w-full h-fit">
				{
					thumbnail &&
					<Image
						width={0}
						height={0}
						src={thumbnail || NesImage}
						alt="News Image"
						className="w-full h-[14rem] lg:h-[31.25rem] rounded-lg"
					/>
				}
			</div>
			<div className="w-full flex flex-col gap-1 lg:gap-5">
				<p className="text-base lg:text-xl font-semibold text-darkText">
					Detail News
				</p>
				<div className="w-full flex flex-col gap-1 lg:gap-8">
					<p className="text-sm lg:text-base text-grayDark">{newDescription}</p>
					{/* <p className="text-sm lg:text-base text-grayDark">
						Edtech unicorn upGrad, renowned for its innovative online education
						platforms, announced plans to raise $34 million in debt funding from
						EvolutionX. The partnership, aimed at expanding upGrad's global
						reach and enhancing its technological infrastructure, promises to
						revolutionise the ed-tech landscape. This strategic move comes as
						upGrad seeks to capitalise on
					</p>
					<p className="text-sm lg:text-base text-grayDark">
						Edtech unicorn upGrad, renowned for its innovative online education
						platforms, announced plans to raise $34 million in debt funding from
						EvolutionX. The partnership, aimed at expanding upGrad's global
						reach and enhancing its technological infrastructure, promises to
						revolutionise the ed-tech landscape. This strategic move comes as
						upGrad seeks to capitalise on
					</p>
					<p className="text-sm lg:text-base text-grayDark">
						Edtech unicorn upGrad, renowned for its innovative online education
						platforms, announced plans to raise $34 million in debt funding from
						EvolutionX. The partnership, aimed at expanding upGrad's global
						reach and enhancing its technological infrastructure, promises to
						revolutionise the ed-tech landscape. This strategic move comes as
						upGrad seeks to capitalise on
					</p> */}
				</div>
			</div>
		</div>
	);
};

export default DetailedNews;
