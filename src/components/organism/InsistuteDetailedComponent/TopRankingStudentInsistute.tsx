'use client'
import { useEffect, useMemo, useState, useRef } from "react";
import SelectButtonRoudedDark from "@/components/atom/buttons/SelectButtonRoudedDark";
import StudentsCardRow from "@/components/molecule/StudentsCardRow";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import SolidButton from "@/components/atom/buttons/SolidButton";

interface StudentData {
  student_name: string;
  marks: string;
  profile_picture: string;
  image?: string;
  examType: string;
  isGraduate: boolean;
  _id: string;
}

interface TopRankingStudentSectionProps {
  data: {
    [examType: string]: {
      [year: string]: StudentData[];
    };
  };
}

const TopRankingStudentInstitute: React.FC<TopRankingStudentSectionProps> = ({ data }) => {
  const examTypes = useMemo(() => Object.keys(data), [data]);

  const [selectedExam, setSelectedExam] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<string>("");
  

  const years = useMemo(() => {
    if (!selectedExam || !data?.[selectedExam]) return [];
    return Object.keys(data[selectedExam]);
  }, [data, selectedExam]);

  const students = useMemo(() => {
    if (!selectedExam || !selectedYear || !data[selectedExam] || !data[selectedExam][selectedYear]) {
      return [];
    }

    return data[selectedExam][selectedYear].map(student => ({
      student_name: student.student_name,
      marks: student.marks,
      exam_type: student.examType,
      profile_picture: (student?.profile_picture) ||  (student?.image)
    }));
  }, [data, selectedExam, selectedYear]);

  useEffect(() => {
    if (examTypes.length > 0 && selectedExam === "") {
      setSelectedExam(examTypes[0]);
    }
  }, [examTypes, selectedExam]);

  useEffect(() => {
    if (years.length > 0 && (!selectedYear || !years.includes(selectedYear))) {
      const sortedYears = [...years].sort((a, b) => b.localeCompare(a));
      setSelectedYear(sortedYears[0]);
    }
  }, [years, selectedYear]);

  return (
    <section className="w-full h-fit px-2 md:px-6 py-[1.625rem] flex flex-col gap-3 md:gap-4 bg-white rounded-lg">
      <div className="flex-between">
        {/* <h4 className="text-xl lg:text-[1.75rem] font-semibold text-deepBlue"> */}
        <h6 className="">
          Top Ranking Student List
        </h6>
        <div className="w-fit min-w-fit flex items-center justify-end gap-2">
          <SelectButtonRoudedDark
            buttonName={selectedExam}
            options={examTypes}
            onSelect={setSelectedExam}
          />
          <SolidButton buttonName={selectedYear}/>
      
        </div>
      </div>
      {/* <div className="w-full h-fit flex overflow-x-auto  pb-2 no-scrollbar gap-3 md:gap-4 max-w-[71.5vw]"> */}
        <StudentsCardRow students={students} />      
      {/* </div> */}
    </section>
  );
};

export default TopRankingStudentInstitute;