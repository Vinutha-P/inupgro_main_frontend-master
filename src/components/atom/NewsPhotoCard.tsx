import Image from "next/image";
import React from "react";
import NewDemoImage from "@/assets/News_Photo_Image.png";

const NewsPhotoCard = ({ thumbnail }: { thumbnail: string }) => {
	return (
		<>
			{
				thumbnail &&
				<Image
					width={0}
					height={0}
					sizes="100vw"
					src={thumbnail || NewDemoImage}
					alt="News"
					className="h-[14rem] w-[100%] lg:h-[17.25rem] object-cover rounded-lg"
				/>
			}
		</>
	);
};

export default NewsPhotoCard;
