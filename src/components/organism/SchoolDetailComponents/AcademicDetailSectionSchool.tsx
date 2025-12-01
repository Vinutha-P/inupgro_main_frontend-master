"use client";
import React, { useState } from "react";
import AcademicStatusOverviewPanel from "../AcademicStatusOverviewPanel";
import AcademicStatistics from "../AcademicStatics";
import AcademicCriteria from "@/components/molecule/AcademicCriteria";
import Facilities from "../Facilities";
import SchoolResults from "./SchoolResults";

const AcademicDetailSectionSchool = ({ details }: any) => {
	const academicDetail = [
		"Academic Statistics",
		"Admission Criteria & Eligibility",
		"School Results",
		"Facilities",
	];
	const [activeTab, setActiveTab] = useState("Academic Statistics");
	const handleTabChange = (tabName: string) => {
		setActiveTab(tabName);
	};
	return (
		<div className="w-full flex flex-col gap-[1.875rem]">
			<AcademicStatusOverviewPanel
				tabNames={academicDetail}
				activeTab={activeTab}
				onTabChange={handleTabChange}
			/>
			<div className="w-full h-fit flex items-center justify-start">
				{activeTab === "Academic Statistics" && (
					<AcademicStatistics details={details || {}} />
				)}
				{activeTab === "Admission Criteria & Eligibility" && (
					<AcademicCriteria data={details?.admission_criteria || {}} />
				)}
				{activeTab === "School Results" && (
					<SchoolResults data={details?.school_results || {}} />
				)}
				{activeTab === "Facilities" && (
					<Facilities data={details?.facilities || {}} />
				)}
			</div>
		</div>
	);
};

export default AcademicDetailSectionSchool;
