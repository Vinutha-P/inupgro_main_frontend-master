'use client'
import { useEffect, useMemo, useState } from "react";
import SelectButtonRoudedDark from "../atom/buttons/SelectButtonRoudedDark";
import StudentsCardRow from "../molecule/StudentsCardRow";

interface TopRankingStudentSectionProps {
  details: {
    [year: string]: {
      year: string;
      classes: Array<{
        class_name: string;
        students: Array<{
          student_name: string;
          marks: string;
          exam_type: string;
          profile_picture: string;
        }>;
      }>;
    };
  };
}

const TopRankingStudentSection: React.FC<TopRankingStudentSectionProps> = ({ details }) => {
  const [selectedYear, setSelectedYear] = useState<string>("2024");
  const [selectedClass, setSelectedClass] = useState<string>("");

  const years = useMemo(() =>  Object.keys(details), [details]);

  const classes = useMemo(() => {
    if (!details[selectedYear]?.classes) return [];
    return details[selectedYear].classes.map(c => c.class_name);
  }, [details, selectedYear]);

  const students = useMemo(() => {
    if (!details[selectedYear]?.classes) return [];
    const classData = details[selectedYear].classes.find(c => c.class_name === selectedClass);
    return classData?.students || [];
  }, [details, selectedYear, selectedClass]);

  useEffect(() => {
    if (classes.length > 0) {
      setSelectedClass(classes[0]);
    }
  }, [classes]);

  return (
    <section className="w-full h-fit px-2 md:px-6 py-[1.625rem] flex flex-col gap-3 md:gap-4 bg-white rounded-lg ">
      <div className="flex-between">
        {/* <h4 className="text-xl lg:text-[1.75rem] font-semibold text-deepBlue"> */}
        <h6 className="">
          Top Ranking Student List
        </h6>
        <div className="w-fit min-w-fit flex items-center justify-end gap-2">
          <SelectButtonRoudedDark 
            buttonName={selectedYear}
            options={years}
            onSelect={setSelectedYear}
          />
          <SelectButtonRoudedDark 
            buttonName={`Class ${selectedClass}`}
            options={classes.map(c => `Class ${c}`)}
            onSelect={(option:any) => setSelectedClass(option.split(' ')[1])}
          />
        </div>
      </div>
      {/* <div className="w-full h-fit grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 overflow-x-auto no-scrollbar gap-3 md:gap-4"> */}
      <StudentsCardRow students={students} />
      {/* </div> */}
    </section>
  );
};

export default TopRankingStudentSection;
