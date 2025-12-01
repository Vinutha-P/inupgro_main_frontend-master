
'use client';
import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
	MdOutlineKeyboardArrowLeft,
	MdOutlineKeyboardArrowRight,
} from "react-icons/md";

const InstituteImageCarousel = ({ images, width }: any) => {
	const limitedImages = images?.slice(0, 3);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isPlaying, setIsPlaying] = useState(true);

	// Auto-play functionality
	// useEffect(() => {
	//   let interval;
	//   if (isPlaying) {
	//     interval = setInterval(() => {
	//       setCurrentIndex((prevIndex) =>
	//         prevIndex === sampleImages.length - 1 ? 0 : prevIndex + 1
	//       );
	//     }, 3000);
	//   }
	//   return () => clearInterval(interval);
	// }, [isPlaying]);

	const nextSlide = () => {
		setCurrentIndex((prevIndex) =>
			prevIndex === limitedImages?.length - 1 ? 0 : prevIndex + 1,
		);
		setIsPlaying(false);
	};

	const prevSlide = () => {
		setCurrentIndex((prevIndex) =>
			prevIndex === 0 ? limitedImages?.length - 1 : prevIndex - 1,
		);
		setIsPlaying(false);
	};

	const goToSlide = (index: number) => {
		setCurrentIndex(index);
		setIsPlaying(false);
	};

	return (
		<div
			className={
				"mt-0 lg:max-w-[20rem] xxl:max-w-[30rem] md:h-[15rem] h-[17rem] flex-box-centerr relative carousel-container"
			}
		>
			{/* lg:max-w-[28.125rem] */}
			<div className="w-full h-full flex-box-center overflow-hidden rounded-lg xxl:mb-0 mb-[0px]">
				<div className="relative w-full h-full">
					<Image
						width={450}
						height={350}
						quality={100}
						src={limitedImages?.[currentIndex]?.link}
						alt="img-alt"
						className={
							"carousel-image max-w-lg h-full lg:max-w-[20em] xxl:max-w-[30rem] rounded-lg transition-opacity duration-500 object-cover"
						}
						priority
					/>

					{/* lg:w-[28.125rem] */}
				</div>

				<div className="absolute bottom-8 w-full flex-box-center gap-16">
					<button
						type="button"
						className="absolute left-2 h-fit w-fit flex-box-center hover:opacity-75 transition-opacity"
						onClick={prevSlide}
						aria-label="Previous slide"
					>
						<MdOutlineKeyboardArrowLeft className="w-9 h-9 fill-white" />
					</button>

					<div className="w-fit min-w-fit md:flex items-center justify-center gap-4 hidden">
						{/* {images?.length > 0 && images?.map((ele: any, index: number) => ( */}
						{limitedImages && limitedImages?.map((ele: any, index: number) => (
							<button
								type="button"
								key={index}
								onClick={() => goToSlide(index)}
								className={`w-[0.625rem] h-[0.625rem] rounded-full transition-colors duration-300 ${currentIndex === index ? "bg-white" : "bg-darkBlue"
									}`}
								aria-label={`Go to slide ${index + 1}`}
							/>
						))}
					</div>

					<button
						type="button"
						className="absolute right-2 h-fit w-fit flex-box-center hover:opacity-75 transition-opacity"
						onClick={nextSlide}
						aria-label="Next slide"
					>
						<MdOutlineKeyboardArrowRight className="w-9 h-9 fill-white" />
					</button>
				</div>
			</div>
		</div>
	);
};

export default InstituteImageCarousel;
