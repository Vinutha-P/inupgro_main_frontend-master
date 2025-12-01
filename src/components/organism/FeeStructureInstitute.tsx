'use client';
import React, { useEffect, useState } from "react";
import PrincipalProfileCard from "../molecule/PrincipalProfileCard";
import SelectButtonRoudedDark from "../atom/buttons/SelectButtonRoudedDark";

interface FeeData {
  subject?: string;
  seats: number;
  fees: number;
  batch: string;
  duration: string;
  _id: string;
}

interface StateData {
  [key: string]: {
    [key: string]: FeeData[];
  };
}

interface FeeStructureInstituteProps {
  feeStructureData: StateData;
}

const FeeStructureInstitute: React.FC<FeeStructureInstituteProps> = ({ feeStructureData, principalData }: any) => {
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [selectedClass, setSelectedClass] = useState<string | null>(null);

  const states = Object.keys(feeStructureData);
  const classes = selectedState ? Object.keys(feeStructureData[selectedState]) : [];
  const subjects = selectedState && selectedClass ? feeStructureData[selectedState][selectedClass] : [];

  const handleStateSelect = (state: string) => {
    setSelectedState(state);
    const initialClasses = Object.keys(feeStructureData[state]);
    if (initialClasses?.length > 0) {
      setSelectedClass(initialClasses[0]);
    }
  };
  const handleClassSelect = (classNum: string) => {
    setSelectedClass(classNum);
  };

  useEffect(() => {
    if (states.length > 0) {
      setSelectedState(states[0]);

      if (feeStructureData[states[0]]) {
        const initialClasses = Object.keys(feeStructureData[states[0]]);
        if (initialClasses?.length > 0) {
          setSelectedClass(initialClasses[0]);
        }
      }
    }
  }, [feeStructureData]);

  if (!feeStructureData || Object.keys(feeStructureData).length === 0) return;

  return (
    <div className="w-full h-fit flex flex-col lg:flex-row items-center gap-5">
      <div className="w-full h-full p-3 lg:px-5 lg:py-7 flex flex-col gap-5 bg-white rounded-lg">
        <div className="flex-between mt-2">
          {/* <h4 className="text-xl lg:text-[1.75rem] font-semibold text-darkBlue"> */}
          <h6 className="text-darkBlue">
            Subject and Fee
          </h6>
          <div className="w-fit min-w-fit flex items-center justify-end gap-2">
            <SelectButtonRoudedDark
              buttonName={selectedState || "State"}
              options={states}
              onSelect={handleStateSelect}
            />
            <SelectButtonRoudedDark
              buttonName={selectedClass || ""}
              options={classes}
              onSelect={handleClassSelect}
            />
          </div>
        </div>

        <div className="w-full flex flex-col gap-2">
          <div className="w-full grid grid-cols-5 p-2 bg-background">
            {["Subject", "Seats", "Fees", "Batch", "Duration"]?.map((header) => (
              <div key={header} className=" md:p-4 md:text-center ">
                <p className="text-xs md:text-sm lg:text-base font-semibold text-darkBlue">{header}</p>
              </div>
            ))}
          </div>

          <div className="w-full flex flex-col bg-white overflow-x-auto">
            {subjects?.length > 0 ? (
              subjects?.map((subject: any, index: number) => (
                <div key={subject?._id || `subject-${index}`} className="w-full grid grid-cols-5 bg-background p-2">
                  <div className="md:p-2 md:text-center">
                    <p className="text-[10px] sm:text-sm lg:text-base text-darkBlue">{subject?.subject || "NA"}</p>
                  </div>
                  <div className="md:p-2 md:text-center">
                    <p className="text-[10px] sm:text-sm lg:text-base text-darkBlue">{subject?.seats || "NA"}</p>
                  </div>
                  <div className="md:p-2 md:text-center">
                    <p className="text-[10px] sm:text-sm lg:text-base text-darkBlue">{subject?.fees || "NA"}</p>
                  </div>
                  <div className="md:p-2 md:text-center">
                    <p className="text-[10px] sm:text-sm lg:text-base text-darkBlue">{subject?.batch || "NA" }</p>
                  </div>
                  <div className="md:p-2 md:text-center">
                    <p className="text-[10px] sm:text-sm lg:text-base text-darkBlue">{subject?.duration || "NA"}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500 py-4">No data available</div>
            )}
          </div>
        </div>
      </div>

      <PrincipalProfileCard
        principalAge={`${principalData?.age || "-"} Years old`}
        principalName={principalData?.name || "NA"}
        degree={principalData?.metadata || "NA"}
        experience={`${principalData?.experience || "-"} years of experience`}
        award={principalData?.award || []}
        personality={principalData?.personality || []}
        principalImage={principalData?.profile_picture || "NA"}
      />
    </div>
  );
};

export default FeeStructureInstitute;