'use client'
import React, { useEffect, useState } from "react";
import SelectButtonRoudedDark from "../atom/buttons/SelectButtonRoudedDark";
import DetailTiles from "../atom/DetailTiles";
import IconText from "../atom/IconText";
import { FaRegCircleCheck } from "react-icons/fa6";
import SolidButton from "../atom/buttons/SolidButton";
import { getCurrentYear } from "@/utils/helper";

const AcademicCriteria = ({ data }: any) => {
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const currentYear = getCurrentYear();

  useEffect(() => {
    if (data && typeof data === "object" && Object.keys(data).length > 0) {
      const firstYear = Object.keys(data)[0];
      const firstClass = data[firstYear]?.[0]?.class_name;

      setSelectedYear(firstYear || null);
      setSelectedClass(firstClass || null);
    }
  }, [data]);

  const getClassOptions = () => {
    if (!selectedYear || !data || !Array.isArray(data[selectedYear])) return [];
    return data[selectedYear]?.map((item: any) =>
      item?.class_name === "Nursery" ? "Nursery" : `${item?.class_name}`
    );
  };

  const currentClassData = selectedClass && selectedYear && data[selectedYear]?.find(
    (item: any) => item?.class_name === selectedClass?.replace("Class ", "")
  )?.details;

  const getAgeRange = () => {
    if (!currentClassData) return "";
    const { eligibility_start_age_in_years, eligibility_end_age_in_years } = currentClassData?.eligibility;
    return `${eligibility_start_age_in_years} Years`;
    // return `${eligibility_start_age_in_years} Years - ${eligibility_end_age_in_years} Years As on 01/01/2024`;
  };

  return (
    <div className="w-full h-fit p-2 md:p-5 flex flex-col gap-5 bg-white rounded-lg 2xl:max-w-[1250px]">
      <div className="w-full flex flex-col lg:flex-row lg:items-center justify-between gap-2">
        {/* <h4 className="text-xl lg:text-[1.75rem] font-semibold text-darkBlue"> */}
        <h6 className="text-darkBlue md:w-1/2">
          Admission Criteria & Eligibility
        </h6>
        <div className="w-full flex md:items-center md:justify-center lg:justify-end gap-5">
          <SolidButton buttonName={selectedYear || currentYear} />

          <SelectButtonRoudedDark
            buttonName={selectedClass || "Select Class"}
            options={getClassOptions()}
            onSelect={setSelectedClass}
          />
        </div>
      </div>

      <div className="w-full grid grid-cols-2 lg:grid-cols-5 gap-4">
        <DetailTiles
          tileDetail="Eligibility (Age)"
          tileHeading={getAgeRange() || "NA"}
        />
        <DetailTiles
          tileDetail="School Timing"
          tileHeading={
            currentClassData?.school_timing?.start_time && currentClassData?.school_timing?.end_time
              ? `${currentClassData.school_timing.start_time} - ${currentClassData.school_timing.end_time}`
              : "NA"
          }
        />
        <DetailTiles
          tileDetail="Total Seats"
          tileHeading={currentClassData?.total_seats.toString() || "NA"}
        />
        <DetailTiles
          tileDetail="Eligibility (Marks)"
          tileHeading={`${currentClassData?.eligibility_percentage ? `${currentClassData?.eligibility_percentage}%` : "NA"}`}
        />
        <DetailTiles
          tileDetail="Written Test"
          tileHeading={currentClassData?.written_test || "NA"}
        />
        <DetailTiles
          tileDetail="Form Availability"
          tileHeading={currentClassData?.form_availability || "NA"}
        />
        <DetailTiles
          tileDetail="Office Timing"
          tileHeading={`${currentClassData?.office_timing.start_time || "NA"} - ${currentClassData?.office_timing.end_time || "NA"}`}
        />
        <DetailTiles
          tileDetail="Form Payment"
          tileHeading={currentClassData?.form_payment || "NA"}
        />
        <DetailTiles
          tileDetail="Students Interaction"
          tileHeading={currentClassData?.students_interaction || "NA"}
        />
        <DetailTiles
          tileDetail="Parents Interaction"
          tileHeading={currentClassData?.parents_interaction || "NA"}
        />
      </div>

      <div className="w-full flex flex-col gap-5">
        <h6 className="text-darkBlue">
          Documents required at the time of Application / Admission
        </h6>
        <div className="w-full flex flex-col lg:flex-row lg:items-center justify-start gap-4">
          {currentClassData?.documents_required?.map((doc: any, index: any) => (
            <IconText icon={FaRegCircleCheck} key={index} text={doc} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AcademicCriteria;
