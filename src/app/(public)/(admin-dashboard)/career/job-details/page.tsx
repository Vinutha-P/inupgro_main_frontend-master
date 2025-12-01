
import React from "react";
import DashboardPageTemplate from "@/components/dashboard-templates/DashboardPageTemplate";
import JobDetailsPage from "@/components/dashboard/career-tab/JobDetails";


export default function StudentApplications() {
  return (
    <>
      <DashboardPageTemplate>
        <div className="mx-4 flex flex-col gap-5">          

          <JobDetailsPage />
        </div>

      </DashboardPageTemplate>
    </>
  );
}
