import DashboardPageTemplate from "@/components/dashboard-templates/DashboardPageTemplate";
import PublicationsSummaryCards from "@/components/dashboard/publications-tab/PublicationsSummaryCards";
import PublicationsTable from "@/components/dashboard/publications-tab/PublicationsTable";
import PublicationsDataTable from "@/components/dashboard/publications-tab/PublicationsDataTable";
import TopHeadingWithSearchBar from "@/components/dashboard/students-tab/TopHeadingWithSearchBar";
import React from "react";

export default function PublicationsPage() {
  return (
    <>
      <DashboardPageTemplate>
        <div className="mx-4 flex flex-col gap-5">
          <TopHeadingWithSearchBar />
          {/* Summary Cards */}
          <PublicationsSummaryCards />

          {/* Tabs */}
          <PublicationsTable />

          {/* Data Table with Filters */}
          <PublicationsDataTable />
        </div>
      </DashboardPageTemplate>
    </>
  );
}
