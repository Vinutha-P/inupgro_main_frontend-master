import type React from "react";
import type { TemplateDefaultProps } from "@/types";

const SideCardsContainer: React.FC<
	React.PropsWithChildren<{ className?: string, isLoadings?: Boolean }>
> = ({ children, className, isLoadings }) => {
	return (
		<>
			{/* <div
				 	className={`md:w-[15.06rem] px-3 py-5 flex items-center justiy-center  rounded-lg md:mt-0 mt-4 side-cards-container ${isLoadings ? "sekleton-light-gray" : "bg-white"}
				 ${className}`}> */}
			<div
				className={`lg:w-[15rem] px-3 py-5 flex items-center justiy-center rounded-lg md:mt-0 mt-4 side-cards-container ${isLoadings ? "sekleton-light-gray" : "bg-white"}
		${className}`}>
				{children}
			</div>
		</>
	);
};

export default SideCardsContainer;
