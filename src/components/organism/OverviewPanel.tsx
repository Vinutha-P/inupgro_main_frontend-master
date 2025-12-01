// 'use client'
// import type React from "react";
// import PillTabs from "../atom/PillTabs";
// import OverviewPanelSkelton from "../skelton-components/OverviewPanelSkelton";
// import { useEffect, useState } from "react";

// const OverviewPanel: React.FC<any> = ({ tabNames, activeTab, onTabClick }) => {
// 	const [isLoadings, setIsLoadings] = useState(true);

// 	useEffect(() => {
// 		setTimeout(() => {
// 			setIsLoadings(false);
// 		}, 1000);
// 	}, []);
// 	return (
// 		<>
// 			{/* <div className={`w-full p-2 md:p-5 flex justify-start items-center gap-4 overflow-x-auto rounded-lg no-scrollbar ${isLoadings ? "sekleton-light-gray" : "bg-white"}`}>
// 				{tabNames ? (
// 					tabNames.map((tabName: any, index: number) => (
// 						<PillTabs
// 							key={index}
// 							tabName={tabName}
// 							onClick={() => onTabClick(tabName)}
// 							isActive={tabName === activeTab}
// 						/>
// 					))
// 				) : (
// 					<OverviewPanelSkelton />
// 				)}
// 			</div> */}
// 			<div
// 				className={` p-2 md:p-3 rounded-lg flex overflow-x-auto no-scrollbar w-full  ${isLoadings ? "sekleton-light-gray" : "bg-white"
// 					}`}
// 			>
// 				<div className="p-2 flex justify-start items-center gap-4 overflow-x-auto ">
// 					{tabNames ? (
// 						tabNames.map((tabName: any, index: number) => (
// 							<PillTabs
// 								key={index}
// 								tabName={tabName}
// 								onClick={() => onTabClick(tabName)}
// 								isActive={tabName === activeTab}
// 							/>
// 						))
// 					) : (
// 						<OverviewPanelSkelton />
// 					)}
// 				</div>
// 			</div>

// 		</>
// 	);
// };

// export default OverviewPanel;


'use client';
import type React from "react";
import PillTabs from "../atom/PillTabs";
import OverviewPanelSkelton from "../skelton-components/OverviewPanelSkelton";
import { useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const OverviewPanel: React.FC<any> = ({ tabNames, activeTab, onTabClick }) => {
	const [isLoadings, setIsLoadings] = useState(true);
	const [isMobile, setIsMobile] = useState(false);
	const scrollRef = useRef<HTMLDivElement | null>(null);
	const scrollAmount = 200; 

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth <= 768);
		};

		handleResize();
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	useEffect(() => {
		const timeout = setTimeout(() => {
			setIsLoadings(false);
		}, 1000);
		return () => clearTimeout(timeout);
	}, []);

	const shouldUseCarousel = isMobile || (tabNames?.length > 6);
	
	const scrollLeft = () => {
		if (scrollRef.current) {
			scrollRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
		}
	};

	const scrollRight = () => {
		if (scrollRef.current) {
			scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
		}
	};

	return (
		<div
			className={`relative p-2 md:p-3 rounded-lg w-full ${
				isLoadings ? "sekleton-light-gray" : "bg-white"
			}`}
		>
			{/* Scroll Buttons (if carousel is active) */}
			{shouldUseCarousel && (
				<>
					<button
						className="flex-box-center absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-lg"
						onClick={scrollLeft}
					>
						<FaChevronLeft />
											</button>
					<button
						className="flex-box-center absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-lg"
						onClick={scrollRight}
					>
						<FaChevronRight />
					</button>
				</>
			)}

			<div
				ref={scrollRef}
				className={`p-2 flex justify-start items-center gap-4 transition-all ${
					shouldUseCarousel ? "overflow-x-auto no-scrollbar scroll-smooth" : "flex-wrap"
				}`}
			>
				{tabNames ? (
					tabNames?.map((tabName: any, index: number) => (
						<PillTabs
							key={index}
							tabName={tabName}
							onClick={() => onTabClick(tabName)}
							isActive={tabName === activeTab}
						/>
					))
				) : (
					<OverviewPanelSkelton />
				)}
			</div>
		</div>
	);
};

export default OverviewPanel;
