'use client'
import React, { useEffect, useState } from "react";
import ProgressbarWithValue from "./ProgressbarWithValue";

interface ProgressBarData {
  backgroundClr: string;
  width: string;
  leftValue: string;
  rightValue: string;
}

interface ProgressBarTileProps {
  tileHeading: string;
  height?: string;
  progressBars: ProgressBarData[];
  isHeadingLeft?: boolean;
}

const ProgressBarTile: React.FC<ProgressBarTileProps> = ({
  height,
  tileHeading,
  progressBars,
  isHeadingLeft,
}) => {
  const [isLoadings, setIsLoadings] = useState(true);

  useEffect(() => {
      setTimeout(() => {
        setIsLoadings(false);
      }, 1000);
    }, []);
  return (
    <div
      className={`w-full min-h-[4.313rem] p-3 md:p-6 flex flex-col  ${
        isHeadingLeft ? "items-start gap-4" : "items-center gap-2"
      } justify-center ${isLoadings ? "skeleton-dark-gray" : "bg-background"} rounded-lg`}
      style={{ height }}
    >
      {
        isLoadings ? (<p className="skeleton-medium-gray rounded-lg w-[85%] h-4"></p>) : (<p className={`${isHeadingLeft ? "text-base":"text-xs"} text-navy`}>{tileHeading}</p>)
      }
      
      <div className={`w-full flex flex-col ${isHeadingLeft? "gap-4":"gap-2"}`}>
        {progressBars.map((bar, index) => (
          <ProgressbarWithValue
            key={index}
            backgroundClr={bar.backgroundClr}
            width={bar.width}
            leftValue={bar.leftValue}
            rightValue={bar.rightValue}
            isLoadings={isLoadings}
          />
        ))}
      </div>
    </div>
  );
};

export default ProgressBarTile;
