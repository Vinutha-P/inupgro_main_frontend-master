'use client';
import React, { useEffect, useState } from "react";
import SelectButtonRoudedDark from "../../atom/buttons/SelectButtonRoudedDark";
import StudentsCardRow from "../../molecule/StudentsCardRow";

interface StudentCardProps {
  studentName: string;
  marks: string;
  examType: string;
  profilePicture: string;
}

const ScholarshipStudents: React.FC = ({ scholarshipData }: any) => {
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [yearOptions, setYearOptions] = useState<string[]>([]);
  const [students, setStudents] = useState<StudentCardProps[]>([]);

  // Initialize year options on component mount
  useEffect(() => {
    if (!scholarshipData) return;
    const years = Object.keys(scholarshipData);
    setYearOptions(years);
    if (years.length > 0) {
      setSelectedYear(years[0]);
    }
  }, [scholarshipData]);

  // Update students when year changes
  useEffect(() => {
    if (!scholarshipData || !selectedYear || !scholarshipData[selectedYear]) return;
    if (selectedYear && scholarshipData[selectedYear]) {
      const formattedStudents = scholarshipData[selectedYear]?.map(
        (student: any) => ({
          student_name: student?.name,
          marks: student?.package,
          exam_type: student?.company,
          profile_picture: student?.image,
        })
      );
      setStudents(formattedStudents);
    }
  }, [selectedYear, scholarshipData]);

  const handleYearSelect = (year: string) => {
    setSelectedYear(year);
  };

  return (
    <section className="w-full h-fit p-3 md:p-5 flex flex-col gap-3 bg-white rounded-lg">
      <div className="flex-box-between">
        {/* <h4 className="text-xl lg:text-[1.75rem] font-semibold text-deepBlue"> */}
        <h6 className="">
          Scholarship Student List
        </h6>
        <div className="w-fit min-w-fit flex items-center justify-end gap-2">
          <SelectButtonRoudedDark
            buttonName={selectedYear || "Select Year"}
            options={yearOptions}
            onSelect={handleYearSelect}
          />
        </div>
      </div>
      {/* <div className="w-full h-fit grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 overflow-x-auto no-scrollbar gap-3 md:gap-4"> */}
        <StudentsCardRow students={students} />
      {/* </div> */}
    </section>
  );
};

export default ScholarshipStudents;
