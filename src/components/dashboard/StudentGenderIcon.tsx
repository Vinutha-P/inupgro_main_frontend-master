"use client";

import Image from "next/image";
import { GenderStats } from "./overview/AdmissionsChartSection";

type StudentGenderIconProps = {
  genderStats: GenderStats;
};

export default function StudentGenderIcon({
  genderStats,
}: StudentGenderIconProps) {
  const students = [
    {
      gender: "Male" as const,
      count: genderStats.male.count,
      icon: "/male.png",
      change: genderStats.male.change.value,
      changeType: genderStats.male.change.type,
      iconColor: "#93C5FD", // light blue
    },
    {
      gender: "Female" as const,
      count: genderStats.female.count,
      icon: "/female.png",
      change: genderStats.female.change.value,
      changeType: genderStats.female.change.type,
      iconColor: "#FDE047", // yellow
    },
  ];

  return (
    <div className="flex md:flex-col sm:flex-row gap-3 h-full">
      {students.map((student, index) => {
        const arrow =
          student.changeType === "increase"
            ? "/trend-up.png"
            : "/trend-down.png";
        const changeColor =
          student.changeType === "increase" ? "#22C55E" : "#EF4444";

        return (
          <div
            key={index}
            className="flex-1 rounded-2xl bg-white border border-slate-200 shadow-[0_10px_25px_rgba(15,23,42,0.04)] p-4 md:p-5 flex flex-col justify-between"
          >
            <div className="text-sky-400 mb-3 md:mb-4">
              <Image
                src={student.icon}
                alt={student.gender}
                width={40}
                height={40}
                className="h-10 w-auto"
              />
            </div>

            <div className="mb-3">
              <div className="text-2xl md:text-3xl font-semibold text-slate-900 mb-1">
                {student.count.toLocaleString()}
              </div>
              <div className="text-sm md:text-base text-slate-400">
                {student.gender} Students
              </div>
            </div>

            <div
              className="flex items-center gap-2"
              style={{ color: changeColor }}
            >
              <Image
                src={arrow}
                alt={student.changeType}
                width={16}
                height={16}
                className="h-5 w-5"
              />
              <span
                className="text-md font-semibold"
                style={{ color: changeColor }}
              >
                {student.change}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
