"use client";
import React, { Suspense } from "react";
import DashboardPageTemplate from "@/components/dashboard-templates/DashboardPageTemplate";
import Breadcrumb from "@/components/dashboard/Breadcrumb";
import NewsDetailsWrapper from "./NewsDetailsWrapper";

export default function StudentApplications() {
  return (
    <>
      <DashboardPageTemplate>
        <div className="mx-4 mb-8">
          <Breadcrumb />
        </div>
        <Suspense fallback={<div className="text-center p-4">Loading...</div>}>
          <NewsDetailsWrapper />
        </Suspense>
      </DashboardPageTemplate>
    </>
  );
}
