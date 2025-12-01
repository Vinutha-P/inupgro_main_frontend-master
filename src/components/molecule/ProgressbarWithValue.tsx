import React from "react";

interface ProgressbarWithValueProps {
  leftValue: string;
  rightValue: string;
  width: string;
  backgroundClr: string;
  isLoadings: boolean;
}

const ProgressbarWithValue: React.FC<ProgressbarWithValueProps> = ({
  leftValue,
  rightValue,
  width,
  backgroundClr,
  isLoadings,
}) => {
  return (
    <div className="w-full flex flex-col gap-2">
      {
        isLoadings ? (<div className="w-full h-2 flex items-start justify-start skeleton-medium-gray rounded-full"></div>) : (<div className="w-full h-1 flex items-start justify-start bg-customGrayBlue rounded-full">
          <div
            className="h-full rounded-full"
            style={{ width, backgroundColor: backgroundClr }}
          />
        </div>)}

      <div className="w-full flex-box-between">
        {
          isLoadings ? (<p className="w-20 h-2 skeleton-medium-gray rounded-lg"></p>) : (<p className="text-xs font-semibold text-midnight">{leftValue}</p>)
        }
        {
          isLoadings ? (<p className="w-20 h-2 skeleton-medium-gray rounded-lg"></p>) : ( <p className="text-xs font-semibold text-midnight">{rightValue}</p>)
        }
       
      </div>
    </div>
  );
};

export default ProgressbarWithValue;
