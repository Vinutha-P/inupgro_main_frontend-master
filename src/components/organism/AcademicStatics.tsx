'use client'
import React, { useEffect, useState } from "react";
import DetailTiles from "../atom/DetailTiles";
import ProgressBarTile from "../molecule/ProgressBarTile";
import { calculateRatio, getAcademicYear } from "@/utils/helper";

const AcademicStatistics = ({ details }: any) => {
  let data = details?.academics_stats;

  const [isLoadings, setIsLoadings] = useState(true);
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

  useEffect(() => {
    setTimeout(() => {
      setIsLoadings(false);
    }, 1000);
  }, []);

  return (
    <div className={`w-full h-fit p-3 md:p-5 flex flex-col gap-3 md:gap-5 rounded-lg ${isLoadings ? "sekleton-light-gray" : "bg-white "}`}>
      {
        isLoadings ? (<h6 className="w-[50%] h-7 skeleton-dark-gray rounded-lg"></h6>) : (
          <h6 className="text-darkBlue">
            Academic Statistics
          </h6>
        )
      }
      <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 grid-flow-dense">
        <div className="w-full h-fit col-span-2 md:col-span-1">
          <DetailTiles
            tileHeading={data?.classed_offered?.default || "NA"}
            tileDetail="Class Offered"
            height="6.5rem"
          />
        </div>
        <DetailTiles
          tileHeading={data?.language_of_instruction?.join(", ") || "NA"}
          tileDetail="Language of Instruction"
          height="6.5rem"
        />
        <DetailTiles
          tileHeading={getAcademicYear()}
          tileDetail="Academic Session"
          height="6.5rem"
        />
        <DetailTiles
          // tileHeading={data?.student_faculty_ratio || "NA"}
          // tileHeading={calculateRatio(data?.total_capacity,data?.total_faculty) || "NA"}
          tileHeading={calculateRatio(
            details?.academic_statistics?.total_capacity ?? details?.total_capacity,
            details?.academic_statistics?.total_faculty ?? details?.total_faculty
          ) || "NA"}
          tileDetail="Student Faculty Ratio"
          height="6.5rem"
        />

        <div className="w-full h-fit col-span-2 md:col-span-1">
          <ProgressBarTile
            tileHeading="Class Offered"
            height="6.5rem"
            progressBars={progressBars}
          />
        </div>
        <DetailTiles
          tileHeading={Array.isArray(data?.school_format) && data.school_format.length > 0 ? data?.school_format[0] : "NA"}
          tileDetail="School Format"
          height="6.5rem"
        />
      </div>
    </div>
  );
};

export default AcademicStatistics;

