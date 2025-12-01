import React, { useState, ReactNode, useEffect } from "react";
import RoundedButton from "../atom/buttons/RoundedButton";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface ViewAllWithPaginationContainerProps {
	groupHeading: string;
	viewAllClick?: () => void;
	data?: string[];
	children: React.ReactNode;

	itemsPerPage?: number;
}

const ViewAllWithPaginationContainer: React.FC<
	ViewAllWithPaginationContainerProps
> = ({ groupHeading, viewAllClick, data, children, itemsPerPage = 2, }) => {
	const fixedDotCount = 4;
	// const itemsPerPage = 2;
	const itemsPerPageCount: number = itemsPerPage ?? 2;

	const childrenArray = React.Children.toArray(children);
	// const totalVisibleItems = fixedDotCount * itemsPerPage;
	// const visibleChildren = childrenArray.slice(0, totalVisibleItems); // Only first 8 items

	const [currentSlide, setCurrentSlide] = useState(0);

	// const start = currentSlide * itemsPerPage;
	// const end = start + itemsPerPage;
	// const paginatedChildren = visibleChildren.slice(start, end);

	// const totalVisibleItems = fixedDotCount * itemsPerPageCount;
	// const visibleChildren = childrenArray.slice(0, totalVisibleItems);

	// const start = currentSlide * itemsPerPageCount;
	// const end = start + itemsPerPageCount;
	// const paginatedChildren = visibleChildren.slice(start, end);

	// New logic to repeat items if needed
	let visibleChildren: ReactNode[] = [];
	const totalVisibleItems = fixedDotCount * itemsPerPageCount;

	if (childrenArray.length === 0) {
		visibleChildren = []; // or render fallback message
	} else if (childrenArray?.length < totalVisibleItems) {
		const repeatCount = Math.ceil(totalVisibleItems / childrenArray.length);

		visibleChildren = Array.from({ length: repeatCount })
			.flatMap((_, repeatIndex) =>
				childrenArray.map((child, index) =>
					React.cloneElement(child as React.ReactElement, {
						key: `${repeatIndex}-${index}`,
					})
				)
			)
			.slice(0, totalVisibleItems);

		// visibleChildren = Array.from({ length: repeatCount })
		// 	.flatMap((_, repeatIndex) => childrenArray)
		// 	.slice(0, totalVisibleItems);
	} else {
		visibleChildren = childrenArray?.slice(0, totalVisibleItems);
	}

	const start = currentSlide * itemsPerPageCount;
	const end = start + itemsPerPageCount;
	const paginatedChildren = visibleChildren.slice(start, end);

	const goToPrev = () => {
		if (currentSlide > 0) setCurrentSlide(currentSlide - 1);
	};

	const goToNext = () => {
		if (currentSlide < fixedDotCount - 1) setCurrentSlide(currentSlide + 1);
	};
	const [isLoadings, setIsLoadings] = useState(true);
	useEffect(() => {
		setTimeout(() => {
			setIsLoadings(false);
		}, 1200);
	}, []);

	return (
		<>
			<section className={`w-full h-fit p-3 md:p-5 flex flex-col gap-3 rounded-lg ${isLoadings ? "sekleton-light-gray" : "bg-white"
				} `}>
				<div className="w-full flex-box-between">
					{isLoadings ? (
						<div className="w-[30%] h-[2rem] skeleton-medium-gray rounded-lg">
							<h6 className="text-[1rem] lg:text-[1.3rem] font-semibold text-transparent bg-gradient-to-r from-gray-300 to-gray-400 bg-clip-text">
							</h6>
						</div>
					) : (
						<h6 className="text-lg">{groupHeading}</h6>
					)}
					{isLoadings ? (
						<div className="w-[10%] h-[2rem] skeleton-medium-gray rounded-lg">
							<button className="text-[1rem] lg:text-[1.3rem] font-semibold text-transparent bg-gradient-to-r from-gray-300 to-gray-400 bg-clip-text">
							</button>
						</div>
					) : (
						<RoundedButton
							buttonName="View All"
							height="2.425rem"
							width="5rem"
							onClick={viewAllClick}
							withBackground={false}
							fontBold
							textColor="#0070F0E5"
							textSize="0.8rem"
						/>
					)}


				</div>
				{/* <div className="w-full flex flex-col gap-[2.875rem]">{children}</div> */}
				{/* <div className="w-full flex flex-col gap-[2.875rem]">{paginatedChildren}</div> */}
				{/* <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4"> */}
				{/* <div className="w-full flex flex-col gap-[2.875rem]"> */}
				{/* <div className="w-full flex flex-wrap gap-4 justify-center">
					{paginatedChildren}
				</div>			 */}
				{/* <div className="w-full flex flex-wrap gap-4 justify-center items-start">
					{paginatedChildren}
				</div> */}
				{visibleChildren?.length > 0 ? (
					<div className="w-full flex flex-col md:flex-row gap-4 items-start">
						{paginatedChildren}
					</div>
				) : (
					<div className="w-full text-center text-grayText py-8">No content available</div>
				)}
				<div className="w-full flex-box-between">
					{/* <div className="w-fit min-w-fit flex items-center justify-start gap-4">
						
						{[...Array(fixedDotCount)].map((_, idx) => (
							{isLoadings ? (
								<div className="w-full h-[2rem] lg:h-[3rem] skeleton-medium-gray rounded-lg">
								  
								</div>
							  ) : (
								<div
								key={idx}
								className={`w-[0.5rem] h-[0.5rem] rounded-full cursor-pointer ${idx === currentSlide ? "bg-primaryOverlay" : "bg-lightGray"
									}`}
								onClick={() => setCurrentSlide(idx)}
							/>
							  )}
							
						))}
					</div> */}

					<div className="w-fit min-w-fit flex items-center justify-start gap-4">
						{[...Array(fixedDotCount)].map((_, idx) => {
							return isLoadings ? (
								<div
									key={idx}
									className="w-[0.5rem] h-[0.5rem] rounded-full skeleton-medium-gray"
								></div>
							) : (
								<div
									key={idx}
									className={`w-[0.5rem] h-[0.5rem] rounded-full cursor-pointer ${idx === currentSlide ? "bg-primaryOverlay" : "bg-lightGray"
										}`}
									onClick={() => setCurrentSlide(idx)}
								/>
							);
						})}
					</div>

					<div className="w-fit min-w-fit flex items-center justify-end gap-5">

						{isLoadings ? (
							<div className="w-7 h-7 skeleton-medium-gray rounded-lg">

							</div>
						) : (
							<button className="w-7 h-7 rounded-full flex-box-center hover:bg-softBlue bg-lightestGray" onClick={goToPrev}
								disabled={currentSlide === 0}>
								<FiChevronLeft className="stroke-grayText group-hover:stroke-primaryOverlay" />
							</button>
						)}
						{isLoadings ? (
							<div className="w-7 h-7 skeleton-medium-gray rounded-lg">

							</div>
						) : (
							<button className="w-7 h-7 rounded-full flex-box-center group hover:bg-softBlue bg-lightestGray" onClick={goToNext}
								disabled={currentSlide === fixedDotCount - 1}>
								<FiChevronRight className="stroke-grayText group-hover:stroke-primaryOverlay" />
							</button>
						)}


					</div>
				</div>
			</section>
		</>
	);
};

export default ViewAllWithPaginationContainer;
