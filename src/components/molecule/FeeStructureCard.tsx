import React from "react";

interface FeeStructureCardProps {
	cardTitle: string;
	cardValue: string;
	cardSubText: string;
	isLoadings: boolean;
}

const FeeStructureCard: React.FC<FeeStructureCardProps> = ({
	cardSubText,
	cardTitle,
	cardValue,
	isLoadings,
}) => {
	return (
		<>
			<div className={`w-full p-[1.20rem] flex flex-col gap-2 text-deepBlue hover:bg-lightBlueCustom rounded-lg ${isLoadings ? "skeleton-dark-gray" : "bg-background"}`}>
				{isLoadings ? (<p className="w-[158px] h-6 skeleton-medium-gray rounded-lg"></p>) : (<p className="text-base">{cardTitle}</p>)}
				{isLoadings ? (<p className="w-[158px] h-6 skeleton-medium-gray rounded-lg"></p>) : (<p className="text-xl font-semibold">{cardValue}</p>)}
				{isLoadings ? (<p className="w-[158px] h-6 skeleton-medium-gray rounded-lg"></p>) : (<p className="text-xs text-grayText">{cardSubText}</p>)}
			</div>
		</>
	);
};

export default FeeStructureCard;
