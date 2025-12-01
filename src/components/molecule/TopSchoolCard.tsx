import React from "react";
import SideCardsContainer from "../containers/SideCardsContainer";
import Chips from "../atom/Chips";

const TopSchoolCard = ({isLoadings,title } : {isLoadings:boolean, title:string}) => {
	return (
		<>
			<SideCardsContainer className="h-[15.25rem]" isLoadings={isLoadings}>
				<div className="w-full flex flex-col gap-5">
					{isLoadings ? (<h6 className="sekleton-light-gray w-[264px] h-7">
						
					</h6>) : (
						<h6 className=" text-deepBlue">
						{/* <h4 className="text-xl lg:text-[1.4rem] font-bold text-deepBlue"> */}
						Top {title}
					</h6>)}
					
					<Chips chiptext="The Doon School" />
					<Chips chiptext="Sanskrit Senior Secondary School" className="h-11" />
					<Chips chiptext="Ravinder Tagore School" />
					<Chips chiptext="Modi Public School" />
				</div>
			</SideCardsContainer>
		</>
	);
};

export default TopSchoolCard;
