import DashboardPageTemplate from "@/components/dashboard-templates/DashboardPageTemplate";
import PublicationForm from "@/components/dashboard/publications-tab/PublicationForm";
import React from "react";

export default function PublishBookPage() {
  return (
    <>
      <DashboardPageTemplate>
        <PublicationForm />
      </DashboardPageTemplate>
    </>
  );
}
