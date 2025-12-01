
import React from "react";
import DashboardPageTemplate from "@/components/dashboard-templates/DashboardPageTemplate";
import CareetApplicationsTable from "@/components/dashboard/career-tab/CareerDataTable";
import HeaderBar from "@/components/dashboard/career-tab/CareerHeader";


export default function StudentApplications() {
  return (
    <>
      <DashboardPageTemplate>
        <div className="mx-4 flex flex-col gap-5">

          <HeaderBar />
          <CareetApplicationsTable />
        </div>

      </DashboardPageTemplate>
    </>
  );
}
