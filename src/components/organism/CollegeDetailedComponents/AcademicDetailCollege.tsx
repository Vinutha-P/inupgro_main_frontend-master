'use client';
import React, { useState } from "react";
import AcademicStatusOverviewPanel from "../AcademicStatusOverviewPanel";
import CollegeAcademic from "./CollegeAcademic";
import CollegeFeesBreakUp from "./CollegeFeesBreakUp";
import FacultySection from "../FacultySection";
import Facilities from "../Facilities";


const AcademicDetailCollege = ({ details }:any) => {
  const academicDetail = [
    "Academic Statistics",
    "Fees Breakup",
    "Faculty",
    "Facilities",
  ];

  const [activeTab, setActiveTab] = useState("Academic Statistics");
  const handleTabChange = (tabName: string) => {
    setActiveTab(tabName);
  };
  return (
    <div className="w-full flex flex-col gap-5">
      <AcademicStatusOverviewPanel
        tabNames={academicDetail}
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />
      <div className="w-full h-fit flex items-center justify-start">
        {activeTab === "Academic Statistics" && <CollegeAcademic details={details}/>}
        {activeTab === "Fees Breakup" && (
          <CollegeFeesBreakUp feesData={details?.college_fees} />
        )}
        {activeTab === "Faculty" && <FacultySection facultyData={details?.faculty}/>}
        {activeTab === "Facilities" && (
          <Facilities data={details?.facilities} />
        )}
      </div>
    </div>
  );
};

export default AcademicDetailCollege;
