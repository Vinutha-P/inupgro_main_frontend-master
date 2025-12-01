'use client';
import React, { useState } from "react";
import StudentsCardRow from "../molecule/StudentsCardRow";
import SelectButtonRoudedDark from "../atom/buttons/SelectButtonRoudedDark";
import DetailTiles from "../atom/DetailTiles";

export interface Student {
  name: string;
  package: string;
company: string;
  image: string;
  isGraduate: boolean;
  _id: string;
}

export interface YearData {
  year: string;
  total_company: number;
  total_registration: number;
  total_offers: number;
  highest_CTC: string;
  lowest_CTC: string;
  students: Student[];
  _id: string;
}

export interface PlacementData {
  [key: string]: YearData;
}

export interface TransformedStudent {
  student_name: string;
  marks: string;
  exam_type: string;
  profile_picture: string;
}

const PlacementHighlight = ({ placementData }: any) => {
  if (!placementData || Object.keys(placementData).length === 0) {
    return <p>No placement data available.</p>;
  }
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const years: string[] = Object.keys(placementData);

  const formatCtc = (ctc: string): string => {
    return `${parseInt(ctc.replace(/[₹,]/g, "")) / 100000} LPA`;
  };

  const handleYearSelect = (year: string): void => {
    setSelectedYear(year);
  };

  const getCurrentData = (): YearData => {
    return selectedYear ? placementData[selectedYear] : placementData[years[0]];
  };

  const transformStudents = (data: YearData): TransformedStudent[] => {
    return data?.students?.map(student => ({
      student_name: student?.name,
      marks: student?.package,
      exam_type: student?.company,
      profile_picture: student?.image
    }));
  };

  const currentData = getCurrentData();
  const transformedStudents = transformStudents(currentData);

  return (
    <section className="w-full h-fit p-2 md:p-5 flex flex-col gap-5 bg-white rounded-lg 2xl:max-w-[1250px]">
      <h6 className="">
        Placement Highlights for {currentData.year}
      </h6>
      {/* <div className="w-full flex flex-col gap-5">
        <div className="w-full grid grid-cols-3 gap-5">
          <DetailTiles
            tileHeading={currentData.total_company.toString()}
            tileDetail="Total Company"
          />
          <DetailTiles
            tileHeading={currentData.total_registration.toString()}
            tileDetail="Total Registration"
          />
          <DetailTiles
            tileHeading={currentData.total_offers.toString()}
            tileDetail="Total Offers"
          />
        </div>
        <div className="w-full grid grid-cols-2 gap-5">
          <DetailTiles
            tileHeading={formatCtc(currentData.highest_CTC)}
            tileDetail="Highest CTC"
          />
          <DetailTiles
            tileHeading={formatCtc(currentData.lowest_CTC)}
            tileDetail="Lowest CTC"
          />
        </div>
      </div> */}
      <div className="w-full flex flex-wrap gap-3 md:gap-4">
        <div className="flex-[1_1_calc(33.33%-13.33px)]">
          <DetailTiles
            tileHeading={currentData?.total_company?.toString()}
            tileDetail="Total Company"
          />
        </div>
        <div className="flex-[1_1_calc(33.33%-13.33px)]">
          <DetailTiles
            tileHeading={currentData?.total_registration?.toString()}
            tileDetail="Total Registration"
          />
        </div>
        <div className="flex-[1_1_calc(33.33%-13.33px)]">
          <DetailTiles
            tileHeading={currentData?.total_offers?.toString()}
            tileDetail="Total Offers"
          />
        </div>
        <div className="flex-[1_1_calc(50%-10px)]">
          <DetailTiles
            tileHeading={formatCtc(currentData?.highest_CTC)}
            tileDetail="Highest CTC"
          />
        </div>
        <div className="flex-[1_1_calc(50%-10px)]">
          <DetailTiles
            tileHeading={formatCtc(currentData?.lowest_CTC)}
            tileDetail="Lowest CTC"
          />
        </div>
      </div>

      <div className="w-full h-fit flex flex-col gap-3 bg-white rounded-lg">
        <div className="flex-box-between">
          {/* <h4 className="text-xl lg:text-[1.75rem] font-semibold text-deepBlue"> */}
          <h6 className="">
            Student List
          </h6>
          <div className="w-fit min-w-fit flex items-center justify-end gap-2">
            <SelectButtonRoudedDark
              buttonName={selectedYear || years[0]}
              options={years}
              onSelect={handleYearSelect}
            />

          </div>
        </div>
        {/* <div className="w-full h-fit grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 overflow-x-auto no-scrollbar gap-3 md:gap-4"> */}
          <StudentsCardRow students={transformedStudents} />
        {/* </div> */}
      </div>
    </section>
  )

};

export default PlacementHighlight;
