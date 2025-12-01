
import DashboardPageTemplate from "@/components/dashboard-templates/DashboardPageTemplate";
import StudentApplicationsTable from "@/components/dashboard/students-tab/studentAllData";
import StudentsApplicationForm from "@/components/dashboard/students-tab/StudentsApplicationForm";
import React from "react";


export default function StudentApplications() {
  return (
    <>
      <DashboardPageTemplate>
        <StudentsApplicationForm />
      </DashboardPageTemplate>
    </>
  );
}
