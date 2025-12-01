
import DashboardPageTemplate from "@/components/dashboard-templates/DashboardPageTemplate";
import FeedbackList from "@/components/dashboard/feedback-surveys-data/FeedbackSurveys";
import StudentApplicationsTable from "@/components/dashboard/students-tab/studentAllData";
import React from "react";


export default function StudentApplications() {
  return (
    <>
      <DashboardPageTemplate>
        
        {/* <FeedbackList > */}
        <FeedbackList />
      </DashboardPageTemplate>
    </>
  );
}
