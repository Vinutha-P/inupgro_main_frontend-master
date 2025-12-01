'use client'
import React, { useEffect, useRef, useState } from "react";
import ViewAllContainer from "../containers/NearYouContainer";
import Image from "next/image";
import {
	MdOutlineKeyboardArrowLeft,
	MdOutlineKeyboardArrowRight,
} from "react-icons/md";

interface PhotoGalleryProps {
	details: { _id: string; link: string }[];
}

const PhotoGallery = ({ details }: PhotoGalleryProps) => {
	const scrollContainerRef = useRef<HTMLDivElement>(null);
	const [isLoadings, setIsLoadings] = useState(true);
	const scroll = (direction: "left" | "right") => {
		if (scrollContainerRef.current) {
			const { current } = scrollContainerRef;
			const scrollAmount =
				direction === "left" ? -current.offsetWidth : current.offsetWidth;
			current.scrollBy({ left: scrollAmount, behavior: "smooth" });
		}
	};
	useEffect(() => {
		setTimeout(() => {
		  setIsLoadings(false);
		}, 1000);
	  }, []);

	return (
		<ViewAllContainer groupHeading="Photo Gallery" showViewAll={false}>
			<div className="relative">
				<button
					type="button"
					onClick={() => scroll("left")}
					className={`absolute left-[-17px] top-1/2 transform -translate-y-1/2 z-10 p-2 shadow-md rounded-full ${isLoadings ? "bg-gray-300" : "bg-white"}`}
					aria-label="Scroll Left"
				>
					{isLoadings ? (<></>) : (<MdOutlineKeyboardArrowLeft size={24} />)}
				</button>

				<div
					ref={scrollContainerRef}
					className="flex overflow-x-auto no-scrollbar gap-3 md:gap-4"
					style={{ scrollSnapType: "x mandatory" }}
				>
					{details?.length > 0 && details?.map((ele,index) => (
						<div
							key={ele?._id || `fallback-${index}` || index}
							className="min-w-[19.26rem] h-fit rounded-lg"
							style={{ scrollSnapAlign: "start" }}
						>
							{isLoadings ? (<div className="w-full h-[12.313rem] rounded-lg skeleton-medium-gray"></div>) : (
								<Image
								width={0}
								height={0}
								sizes="100vh"
								src={ele?.link}
								alt="photo-gallery"
								className="w-full h-[12.313rem] rounded-lg object-cover"
							/>
							)}							
						</div>
					))}
				</div>

				<button
					type="button"
					onClick={() => scroll("right")}
					className={`absolute right-0 top-1/2 transform -translate-y-1/2 z-10 p-2 shadow-md rounded-full ${isLoadings ? "bg-gray-300" : "bg-white"}`}
					aria-label="Scroll Right"
				>
					{isLoadings ? (<></>) : (<MdOutlineKeyboardArrowRight size={24} />)}
					
				</button>
			</div>
		</ViewAllContainer>
	);
};

export default PhotoGallery;
