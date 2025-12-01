
import React from "react";
import DashboardPageTemplate from "@/components/dashboard-templates/DashboardPageTemplate";
import CareetApplicationsTable from "@/components/dashboard/career-tab/CareerDataTable";
import HeaderBar from "@/components/dashboard/career-tab/CareerHeader";
import PostJobForm from "@/components/dashboard/career-tab/CareerJobForm";


export default function StudentApplications() {
  return (
    <>
      <DashboardPageTemplate>

        <PostJobForm />


      </DashboardPageTemplate>
    </>
  );
}
