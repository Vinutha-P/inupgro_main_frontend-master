
'use client';
import React, { Suspense } from "react";
import DashboardPageTemplate from "@/components/dashboard-templates/DashboardPageTemplate";
import HeaderBar from "@/components/dashboard/career-tab/CareerHeader";
import NewsManagementDataTable from "@/components/dashboard/news-management/NewsManagementDataTable";
import TopHeadingWithSearchBar from "@/components/dashboard/students-tab/TopHeadingWithSearchBar";
import NewsManagementCard from "@/components/dashboard/news-management/NewsManagementCard";
import NewsDetails from "@/components/dashboard/news-management/NewsDetails";
import NewsSidebars from "@/components/dashboard/news-management/NewsSidebars";
import Breadcrumb from "@/components/dashboard/Breadcrumb";
import NewsSidebarData from "@/components/dashboard/news-management/NewsSidebarData";
import CreateNewsForm from "@/components/dashboard/news-management/CreateNewsForm";


export default function StudentApplications() {
  return (
    <>
      <DashboardPageTemplate>
        <div className="mx-4 mb-8">
          <Breadcrumb />
        </div>
        <Suspense fallback={<div>Loading content...</div>}>
          <div className="mx-4 flex gap-5">
            <div className="w-[71%]">
              <CreateNewsForm />
            </div>
            <div className="w-[29%]">
              <NewsSidebarData />
            </div>
          </div>
        </Suspense>

      </DashboardPageTemplate>
    </>
  );
}
