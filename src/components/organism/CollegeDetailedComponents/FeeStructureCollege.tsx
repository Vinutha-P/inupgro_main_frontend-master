'use client';
import React, { useEffect, useState } from "react";
import SelectButtonRoudedDark from "../../atom/buttons/SelectButtonRoudedDark";
import PrincipalProfileCard from "../../molecule/PrincipalProfileCard";
import DetailTiles from "../../atom/DetailTiles";

interface Fee {
  round: number;
  cutoff: string;
  scholarship: string;
  total_fee: string;
  yearly_fee: string;
}

interface Eligibility {
  eligibility_criteria?: string;
  cutoff: string;
  total_seats: number;
  remaining_seats: number;
}

interface BranchData {
  fee: Fee;
  eligibility: Eligibility;
  duration: string;
  examination: string;
  _id: string;
}

interface CourseData {
  [key: string]: BranchData; // For branch names like "CS", "ECE"
}

interface Course {
  course_name: string;
  data: CourseData;
  _id: string;
}

interface PrincipalProfileCardProps {
  principalAge: string;
  principalName: string;
  degree: string;
  experience: string;
  award: string;
}

interface FeeStructureCollegeProps {
  courses: Course[];
}

const FeeStructureCollege = ({ courses, principalDetail }: any) => {
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [selectedBranch, setSelectedBranch] = useState<string | null>(null);
  const [courseOptions, setCourseOptions] = useState<string[]>([]);
  const [branchOptions, setBranchOptions] = useState<string[]>([]);
  const [currentData, setCurrentData] = useState<BranchData | null>(null);

  useEffect(() => {
    if (Array.isArray(courses) && courses.length > 0) {
      const courseNames = courses.map(course => course?.course_name || "NA");
      setCourseOptions(courseNames);
      setSelectedCourse(courseNames[0]);
    }
  }, [courses]);

  useEffect(() => {
    if (selectedCourse && courses?.length > 0) {
      const courseData = courses.find((course: any) => course?.course_name === selectedCourse);
      if (courseData?.data) {
        const branches = Object.keys(courseData.data || {});
        setBranchOptions(branches);
        setSelectedBranch(branches[0]);
      }
    }
  }, [selectedCourse, courses]);

  useEffect(() => {
    if (selectedCourse && selectedBranch && courses?.length > 0) {
      const courseData = courses.find((course:any) => course?.course_name === selectedCourse);
      const branchData = courseData?.data?.[selectedBranch];
      if (branchData) {
        setCurrentData(branchData);
      } else {
        setCurrentData(null);
      }
    }
  }, [selectedCourse, selectedBranch, courses]);

  const handleCourseSelect = (course: React.SetStateAction<string | null>) => {
    setSelectedCourse(course);
  };

  const handleBranchSelect = (branch: React.SetStateAction<string | null>) => {
    setSelectedBranch(branch);
  };
  return (
    <div className="w-full h-full flex flex-col lg:flex-row items-center lg:items-start gap-5 md:gap-4">
      <div className="w-full h-full lg:min-h-[33rem] px-3 lg:px-5 lg:py-4 flex flex-col gap-5 bg-white rounded-lg">
        <div className="flex-between py-3">
          {/* <h4 className="text-xl lg:text-[1.75rem] font-semibold text-darkBlue"> */}
          <h6 className="text-darkBlue">
            Courses
          </h6>
          <div className="w-fit min-w-fit flex items-center justify-end gap-2">
            <SelectButtonRoudedDark
              buttonName={selectedCourse || "Select Course"}
              options={courseOptions}
              onSelect={handleCourseSelect}
            />
            <SelectButtonRoudedDark
              buttonName={selectedBranch || "Select Branch"}
              options={branchOptions}
              onSelect={handleBranchSelect}
            />
          </div>
        </div>

        {currentData && (
          <>
            {/* <div className="w-full grid grid-col-1 md:grid-cols-3 gap-3 md:gap-4"> */}
            <div className="w-full flex flex-wrap gap-3 md:gap-4">
              <div className="flex-[1_1_calc(33.33%-13.33px)]">
                <DetailTiles
                  tileDetail="Course Name"
                  tileHeading={selectedCourse || "NA"}
                />
              </div>
              <div className="flex-[1_1_calc(33.33%-13.33px)]">
                <DetailTiles
                  tileDetail="Duration"
                  tileHeading={currentData?.duration || "NA"}
                />
              </div>
              <div className="flex-[1_1_calc(33.33%-13.33px)]">
                <DetailTiles
                  tileDetail="Examination"
                  tileHeading={currentData?.examination || "NA"}
                />
              </div>
            </div>

            <div className="w-full flex flex-col gap-5">
              {/* <h4 className="text-xl lg:text-[1.75rem] font-semibold text-darkBlue"> */}
              <h6 className="text-darkBlue">
                Fee
              </h6>
              <div className="w-full flex flex-wrap gap-3 md:gap-4">

                <div className="flex-[1_1_calc(33.33%-13.33px)]">
                  <DetailTiles
                    tileDetail="Round"
                    tileHeading={currentData?.fee?.round ? currentData?.fee?.round.toString() : "NA"}
                  />
                </div>
                <div className="flex-[1_1_calc(33.33%-13.33px)]">
                  <DetailTiles
                    tileDetail="Cut-off"
                    tileHeading={currentData?.fee?.cutoff || "NA"}
                  />
                </div>
                <div className="flex-[1_1_calc(33.33%-13.33px)]">
                  <DetailTiles
                    tileDetail="Scholarship"
                    tileHeading={currentData?.fee?.scholarship || "NA"}
                  />
                </div>

                {/* Next 2 tiles */}
                <div className="flex-[1_1_calc(50%-10px)]">
                  <DetailTiles
                    tileDetail="Total Fee"
                    tileHeading={currentData?.fee?.total_fee || "NA"}
                  />
                </div>
                <div className="flex-[1_1_calc(50%-10px)]">
                  <DetailTiles
                    tileDetail="Yearly Fee"
                    tileHeading={currentData?.fee?.yearly_fee || "NA"}
                  />
                </div>
              </div>

              {/* <div className="w-full grid grid-col-2 md:grid-cols-3 gap-[0.625rem]">
                <div className="w-full h-fit grid-cols-2 md:grid-cols-1">
                  <DetailTiles
                    tileDetail="Round"
                    tileHeading={currentData.fee.round.toString()}
                  />
                </div>
                <DetailTiles
                  tileDetail="Cut-off"
                  tileHeading={currentData.fee.cutoff}
                />
                <DetailTiles
                  tileDetail="Scholarship"
                  tileHeading={currentData.fee.scholarship}
                />
              </div>
              <div className="w-full grid grid-cols-2 gap-[0.625rem]">
                <DetailTiles
                  tileDetail="Total Fee"
                  tileHeading={currentData.fee.total_fee}
                />
                <DetailTiles
                  tileDetail="Yearly Fee"
                  tileHeading={currentData.fee.yearly_fee}
                />
              </div> */}
            </div>

            <div className="w-full flex flex-col gap-5 pb-3">
              {/* <h4 className="text-xl lg:text-[1.75rem] font-semibold text-darkBlue"> */}
              <h6 className="text-darkBlue">
                Eligibility
              </h6>
              {/* <div className="w-full grid grid-col-2 md:grid-cols-4 gap-3 md:gap-4"> */}
              <div className="w-full flex flex-wrap gap-3 md:gap-4">
                <div className="flex-[1_1_calc(33.33%-13.33px)]">
                  <DetailTiles
                    tileDetail="Eligibility Criteria"
                    tileHeading={
                      currentData?.eligibility?.eligibility_criteria || "JEE"
                    }
                  />
                </div>
                <div className="flex-[1_1_calc(33.33%-13.33px)]">
                  <DetailTiles
                    tileDetail="Cut-off"
                    tileHeading={currentData?.eligibility?.cutoff || "NA"}
                  />
                </div>
                <div className="flex-[1_1_calc(33.33%-13.33px)]">
                  <DetailTiles
                    tileDetail="Total Seats"
                    tileHeading={currentData?.eligibility?.total_seats?.toString() || "NA"}
                  />
                </div>
                <div className="flex-[1_1_calc(33.33%-13.33px)]">
                  <DetailTiles
                    tileDetail="Remaining Seats"
                    tileHeading={currentData?.eligibility?.remaining_seats?.toString() || "NA"}
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <PrincipalProfileCard
        principalAge={`${principalDetail?.age} Years Old` || "NA"}
        principalName={principalDetail?.name || "NA"}
        degree={principalDetail?.metadata}
        award={principalDetail?.award || []}
        experience={`${principalDetail?.experience} + Years of Experience` || "NA"}
        personality={principalDetail?.personality || []}
        principalImage={principalDetail?.profile_picture}
      />
    </div>
  );
};

export default FeeStructureCollege;
