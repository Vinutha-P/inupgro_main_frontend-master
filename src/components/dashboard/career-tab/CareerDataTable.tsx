"use client";
import React, { useState } from "react";
import DataTable, { Column } from "../DataTable";
import { FaCheck, FaClock, FaTimes } from "react-icons/fa";

// Define a type for a candidate row
type Candidate = {
  id: number;
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
    id: 1,
    name: "Akshay Khurana",
    status: "Selected",
    position: "Mathematics HOD",
    date: "20/10/2024",
    email: "xyz@gmail.com",
    phone: "9876543210",
  },
  {
    id: 2,
    name: "Ishani Datta",
    status: "In Process",
    position: "Mathematics HOD",
    date: "20/10/2024",
    email: "xyz@gmail.com",
    phone: "9876543210",
  },
  {
    id: 3,
    name: "Akshay Khurana",
    status: "Rejected",
    position: "Mathematics HOD",
    date: "20/10/2024",
    email: "xyz@gmail.com",
    phone: "9876543210",
  },
  {
    id: 4,
    name: "Priya Sharma",
    status: "Selected",
    position: "Mathematics HOD",
    date: "19/10/2024",
    email: "priya@gmail.com",
    phone: "9876543211",
  },
  {
    id: 5,
    name: "Rahul Verma",
    status: "In Process",
    position: "Mathematics HOD",
    date: "18/10/2024",
    email: "rahul@gmail.com",
    phone: "9876543212",
  },
];

const statusStyles: Record<Candidate["status"], string> = {
  Selected: "bg-[#ecf9f3] text-[#3FC28A]",
  "In Process": "bg-[#f8f4e4] text-[#EFBE12]",
  Rejected: "bg-[#feeff0] text-[#F45B69]",
};

const getStatusIcon = (status: Candidate["status"]) => {
  switch (status) {
    case "Selected":
      return <FaCheck className="w-3 h-3" />;
    case "In Process":
      return <FaClock className="w-3 h-3" />;
    case "Rejected":
      return <FaTimes className="w-3 h-3" />;
    default:
      return null;
  }
};

const CareetApplicationsTable: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc" | null>(
    null
  );

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

  const handleSort = (key: string, direction: "asc" | "desc" | null) => {
    setSortKey(key);
    setSortDirection(direction);
  };

  const columns: Column<Candidate>[] = [
    {
      key: "sno",
      header: "S.No.",
      sortable: true,
      render: (_, index) => (
        <span className="text-sm text-gray-700 font-medium">{index + 1}</span>
      ),
    },
    {
      key: "name",
      header: "Candidate Name",
      sortable: true,
      render: (row) => (
        <span className="text-sm text-gray-900 font-medium">{row.name}</span>
      ),
    },
    {
      key: "position",
      header: "Applied for",
      sortable: true,
      render: (row) => (
        <span className="text-sm text-gray-700">{row.position}</span>
      ),
    },
    {
      key: "date",
      header: "Applied Date",
      sortable: true,
      render: (row) => (
        <span className="text-sm text-gray-700">{row.date}</span>
      ),
    },
    {
      key: "email",
      header: "Email Address",
      sortable: true,
      render: (row) => (
        <span className="text-sm text-gray-700">{row.email}</span>
      ),
    },
    {
      key: "phone",
      header: "Mobile Number",
      sortable: true,
      render: (row) => (
        <span className="text-sm text-gray-700">{row.phone}</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      sortable: true,
      render: (row) => (
        <span
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold ${
            statusStyles[row.status]
          }`}
        >
          {getStatusIcon(row.status)}
          {row.status}
        </span>
      ),
    },
  ];

  return (
    <div className="font-sans">
      {/* Tabs */}
      <div className="flex flex-wrap justify-between gap-2 mb-6 bg-[#eceff6] rounded-xl p-2">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`font-medium flex-1 text-center px-4 py-2.5 rounded-lg text-sm transition-all duration-200 ${
              activeTab === tab.key
                ? "bg-white text-[#191F33] shadow-sm font-semibold"
                : "text-[#667085] hover:text-[#191F33]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Table */}
      <DataTable
        data={filteredData}
        columns={columns}
        keyExtractor={(row) => row.id}
        sortable={true}
        onSort={handleSort}
        sortKey={sortKey}
        sortDirection={sortDirection}
        headerBgColor="bg-[#EAECF0]"
        className="shadow-md rounded-xl border border-gray-200"
        tableClassName="font-sans"
        emptyMessage="No applications found for this status."
      />
    </div>
  );
};

export default CareetApplicationsTable;
