import React from "react";
import ProgressbarWithValue from "./ProgressbarWithValue";

interface FeeStructureProgressCardProps {
	cardTitle: string;
	cardSubText: string;
	progressBar: {
		backgroundClr: string;
		leftValue: string;
		rightValue: string;
		width: string;
	};
	isLoadings: boolean;
}

const FeeStructureProgressCard: React.FC<FeeStructureProgressCardProps> = ({
	cardTitle,
	cardSubText,
	progressBar,
	isLoadings,
}) => {
	return (
		<div className={`}w-full p-[0.9375rem] flex flex-col gap-2 text-deepBlue hover:bg-lightBlueCustom rounded-lg ${isLoadings ? "skeleton-dark-gray" : "bg-background"}`}>
			{isLoadings ? (<p className="w-[158px] h-6 skeleton-medium-gray rounded-lg"></p>) : (<p className="text-base">{cardTitle}</p>)}

			<ProgressbarWithValue
				backgroundClr={progressBar.backgroundClr}
				leftValue={progressBar.leftValue}
				rightValue={progressBar.rightValue}
				width={progressBar.width}
				isLoadings={isLoadings}
			/>
			{isLoadings ? (<p className="w-[158px] h-6 skeleton-medium-gray rounded-lg"></p>) : (<p className="text-xs text-grayText">{cardSubText}</p>)}

		</div>
	);
};

export default FeeStructureProgressCard;
