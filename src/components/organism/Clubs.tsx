'use client'
import type React from "react";
import { useEffect, useRef, useState } from "react";
import ViewAllContainer from "../containers/NearYouContainer";
import ClubCard from "../molecule/ClubCard";
import {
	MdOutlineKeyboardArrowLeft,
	MdOutlineKeyboardArrowRight,
} from "react-icons/md";

interface ClubDetails {
	clubName: string;
	clubImage: string;
	club_description: string;
}

const Clubs: React.FC<{ details: ClubDetails[] }> = ({ details }) => {
	const scrollContainerRef = useRef<HTMLDivElement>(null);
	const [cc, setIsLoadings] = useState(true);
	const [isLoading, setIsLoading] = useState(true);

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
			setIsLoading(false);
		}, 1000);
	}, []);

	return (
		<>
			<ViewAllContainer
				groupHeading="Clubs"
				showViewAll={false}
				className="w-full"
			>
				<div className="relative">
					{/* Left Scroll Button */}
					
					<button
						type="button"
						onClick={() => scroll("left")}
						className={`absolute left-[-17px] top-1/2 transform -translate-y-1/2 z-10 p-2  shadow-md rounded-full ${isLoading ? "bg-gray-300" : "bg-white"}`}
						aria-label="Scroll Left"
					>
						{isLoading ? (<></>) : (<MdOutlineKeyboardArrowLeft size={24} />)}
						
					</button>


					{/* Scrollable Container */}
					<div
						ref={scrollContainerRef}
						// className="flex overflow-x-auto no-scrollbar snap-x snap-mandatory space-x-4 px-8"
						className="flex overflow-x-auto no-scrollbar snap-x snap-mandatory gap-3 md:gap-4"
					>
						{details && 
						details?.filter(club => club?.clubName)
						?.map((club, index) => (
							<div
								key={index}
								className="snap-center flex-shrink-0 w-full sm:w-[300px]"
							>
								<ClubCard
									clubName={club?.clubName || "NA"}
									chipText={`#${club?.clubName.toLowerCase().split(" ")[0]}`}
									clubImage={club?.clubImage}
									description={club?.club_description || "NA"}
									isLoadings={isLoading}
								/>
							</div>
						))}
					</div>
			
					<button
						type="button"
						onClick={() => scroll("right")}
						className={`absolute right-[-15px] top-1/2 transform -translate-y-1/2 z-10 p-2 bg-white shadow-md rounded-full ${isLoading ? "bg-gray-300" : "bg-white"}`}
						aria-label="Scroll Right"
					>
							{isLoading ? (<></>) : (<MdOutlineKeyboardArrowRight size={24} />)}
						
					</button>
				</div>
			</ViewAllContainer>
		</>
	);
};

export default Clubs;
