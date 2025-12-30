import DashboardPageTemplate from "@/components/dashboard-templates/DashboardPageTemplate";
import SummaryCards from "@/components/dashboard/Card";
import CareerTable from "@/components/dashboard/career-tab/CareerTable";
import TopHeadingWithSearchBar from "@/components/dashboard/students-tab/TopHeadingWithSearchBar";
import React from "react";

export default function StudentApplications() {
  return (
    <>
      <DashboardPageTemplate>
        <div className="mx-4 flex flex-col gap-5">
          <TopHeadingWithSearchBar />
          {/* Cards */}
          <SummaryCards />

          <CareerTable />
        </div>
      </DashboardPageTemplate>
    </>
  );
}
