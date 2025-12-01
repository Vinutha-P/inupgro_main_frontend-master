"use client";
import React, { useState } from "react";
import Pagination from "../Pagination";

// Define a type for a candidate row
type Candidate = {
  name: string;
  status: "Selected" | "In Process" | "Rejected";
  position: string;
  date: string;
  email: string;
  phone: string;
};

// Sample Data
const allData: Candidate[] = [
  {
    name: "Akshay Khurana",
    status: "Selected",
    position: "Mathematics HOD",
    date: "20/10/2024",
    email: "xyz@gmail.com",
    phone: "9876543210",
  },
  {
    name: "Ishani Datta",
    status: "In Process",
    position: "Mathematics HOD",
    date: "20/10/2024",
    email: "xyz@gmail.com",
    phone: "9876543210",
  },
  {
    name: "Akshay Khurana",
    status: "Rejected",
    position: "Mathematics HOD",
    date: "20/10/2024",
    email: "xyz@gmail.com",
    phone: "9876543210",
  },
];

const statusStyles: Record<Candidate["status"], string> = {
  Selected: "bg-[#ecf9f3] text-[#3FC28A]",
  "In Process": "bg-[#f8f4e4] text-[#EFBE12]",
  Rejected: "bg-[#feeff0] text-[#F45B69]",
};

const CareetApplicationsTable: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("all");

  const filteredData =
    activeTab === "all"
      ? allData
      : allData.filter(
          (item) => item.status.toLowerCase() === activeTab.toLowerCase()
        );

  const tabs: { key: string; label: string }[] = [
    { key: "all", label: `All (${allData.length})` },
    {
      key: "Selected",
      label: `Selected (${
        allData.filter((d) => d.status === "Selected").length
      })`,
    },
    {
      key: "In Process",
      label: `In Process (${
        allData.filter((d) => d.status === "In Process").length
      })`,
    },
    {
      key: "Rejected",
      label: `Rejected (${
        allData.filter((d) => d.status === "Rejected").length
      })`,
    },
  ];

  return (
    <div className="">
      {/* Tabs */}
      <div className="flex justify-between gap-6 mb-4 bg-[#eceff6] rounded-lg p-4">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`font-medium flex-1 text-center p-2 rounded-lg text-base ${
              activeTab === tab.key ? "bg-white text-black" : "text-[#667085]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white shadow-md rounded-xl overflow-auto">
        <table className="min-w-full text-sm border border-gray-200">
          <thead className="bg-gray-50 border-b border-gray-200 text-left">
            <tr>
              <th className="px-4 py-3">S.No.</th>
              <th className="px-4 py-3">Candidate Name</th>
              <th className="px-4 py-3">Applied for</th>
              <th className="px-4 py-3">Applied Date</th>
              <th className="px-4 py-3">Email Address</th>
              <th className="px-4 py-3">Mobile Number</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row, i) => (
              <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-4 py-3">{i + 1}</td>
                <td className="px-4 py-3">{row.name}</td>
                <td className="px-4 py-3 ">{row.position}</td>
                <td className="px-4 py-3">{row.date}</td>
                <td className="px-4 py-3">{row.email}</td>
                <td className="px-4 py-3">{row.phone}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-3 py-1 rounded-md text-xs font-medium ${statusStyles[row.status]}`}
                  >
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
            {filteredData.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center py-4 text-gray-400">
                  No data available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Pagination />
    </div>
  );
};

export default CareetApplicationsTable;
