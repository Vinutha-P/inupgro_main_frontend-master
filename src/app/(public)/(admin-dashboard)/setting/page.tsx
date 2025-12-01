
import DashboardPageTemplate from "@/components/dashboard-templates/DashboardPageTemplate";
import ProfilePage from "@/components/dashboard/settings/ProfilePage";
import React from "react";


export default function StudentApplications() {
  return (
    <>
      <DashboardPageTemplate>
        <div className="pl-6">
        <ProfilePage />
        </div>
      </DashboardPageTemplate>
    </>
  );
}
