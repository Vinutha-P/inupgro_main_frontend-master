
import React from "react";
import DashboardPageTemplate from "@/components/dashboard-templates/DashboardPageTemplate";

import HeaderBar from "@/components/dashboard/career-tab/CareerHeader";
import BasicInfo from "@/components/dashboard/career-tab/BasicInfo";


export default function StudentApplications() {
  return (
    <>
      <DashboardPageTemplate>
        <div className="mx-4 flex flex-col gap-5">

          <HeaderBar />
         <BasicInfo />
        </div>

      </DashboardPageTemplate>
    </>
  );
}
