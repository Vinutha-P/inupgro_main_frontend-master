
import DashboardPageTemplate from "@/components/dashboard-templates/DashboardPageTemplate";
import StudentApplicationsTable from "@/components/dashboard/students-tab/studentAllData";
import React from "react";

const stats = [
  { title: "Total Students", value: "589", icon: "👨‍🎓", bg: "bg-blue-100" },
  { title: "New Admission", value: "2,517", icon: "📝", bg: "bg-yellow-100" }
];

const studentData = Array(12).fill({
  applicationNo: "#123456",
  studentName: "Akshay Khurana",
  classApplied: "8th",
  currentClass: "10th",
  age: "15",
  parentName: "Ganpath Rao",
  parentMobile: "9876543210",
  status: "Active"
});

export default function StudentApplications() {
  return (
    <>
      <DashboardPageTemplate>
        <StudentApplicationsTable />
      </DashboardPageTemplate>
    </>
  );
}
