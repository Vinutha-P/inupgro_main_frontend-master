import React from 'react'
import DetailTiles from '../../atom/DetailTiles'
import ProgressBarTile from '../../molecule/ProgressBarTile'
import { calculateRatio, getAcademicYear } from '@/utils/helper';

const CollegeAcademic = ({ details }: any) => {
  let data = details?.academic_statistics;
  const progressBars = [
    {
      backgroundClr: "#12B76A",
      width: "30%",
      leftValue: "The Doon School",
      rightValue: "NA",
    },
    {
      backgroundClr: "#F79009",
      width: "50%",
      leftValue: "Other Schools",
      rightValue: "10000",
    },
  ];
  return (
    <div className="w-full h-fit p-2 md:p-5 flex flex-col gap-5 bg-white rounded-lg 2xl:max-w-[1250px]">
      {/* <h4 className="text-xl lg:text-[1.75rem] font-semibold text-darkBlue"> */}
      <h6 className=" text-darkBlue">
        Academic Statistics
      </h6>
      <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 grid-flow-dense">
        <div className="w-full h-fit col-span-2 md:col-span-1">
          <DetailTiles
            tileHeading="Graduation"
            tileDetail="Class Offered"
            height="6.5rem"
          />
        </div>
        <DetailTiles
          tileHeading={data?.language_of_instruction || "NA"}
          tileDetail="Language of Instruction"
          height="6.5rem"
        />
        <DetailTiles
          tileHeading={getAcademicYear() || "NA"}
          tileDetail="Academic Session"
          height="6.5rem"
        />
        <DetailTiles
          // tileHeading={data?.student_faculty_ratio || "NA"}
          // tileHeading={calculateRatio(data?.total_capacity, data?.total_faculty) || "NA"}
          tileHeading={calculateRatio(
            details?.academic_statistics?.total_capacity ?? details?.total_capacity,
            details?.academic_statistics?.total_faculty ?? details?.total_faculty
          ) || "NA"}
          tileDetail="Student Faculty Ratio"
          height="6.5rem"
        />
        <div className="w-full h-fit col-span-2 md:col-span-1">
          <ProgressBarTile
            tileHeading="Total Faculty"
            height="6.5rem"
            progressBars={progressBars}
          />
        </div>
        <DetailTiles
          tileHeading={data?.college_format || "Day Format"}
          tileDetail="College Format"
          height="6.5rem"
        />
      </div>
    </div>
  )
}

export default CollegeAcademic
