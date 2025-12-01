"use client";
import React from "react";
import DashboardPageTemplate from "@/components/dashboard-templates/DashboardPageTemplate";
import HeaderBar from "@/components/dashboard/career-tab/CareerHeader";
import NewsManagementDataTable from "@/components/dashboard/news-management/NewsManagementDataTable";
import TopHeadingWithSearchBar from "@/components/dashboard/students-tab/TopHeadingWithSearchBar";
import NewsManagementCard from "@/components/dashboard/news-management/NewsManagementCard";

export default function StudentApplications() {
  return (
    <>
      <DashboardPageTemplate>
        <div className="mx-4 flex flex-col gap-5">

          {/* <Header */}
          <TopHeadingWithSearchBar />
          <NewsManagementCard />
          <NewsManagementDataTable />
        </div>

      </DashboardPageTemplate>
    </>
  );
}
