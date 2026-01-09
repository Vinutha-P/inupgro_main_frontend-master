"use client";
import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FaEllipsisV, FaPlus, FaCheck, FaTimes } from "react-icons/fa";
import DataTable, { Column } from "../DataTable";

const jobData = [
  {
    id: 1,
    jobTitle: "Mathematics HOD",
    jobType: "Full Time",
    daysRemaining: 27,
    status: "active",
    postedDate: "20/10/2024",
    applications: 798,
  },
  {
    id: 2,
    jobTitle: "Chemistry",
    jobType: "Full Time",
    daysRemaining: 27,
    status: "Expire",
    postedDate: "20/10/2024",
    applications: 798,
  },
  {
    id: 3,
    jobTitle: "Physics",
    jobType: "Full Time",
    daysRemaining: 27,
    status: "active",
    postedDate: "20/10/2024",
    applications: 798,
  },
  {
    id: 4,
    jobTitle: "Biology",
    jobType: "Full Time",
    daysRemaining: 27,
    status: "Expire",
    postedDate: "20/10/2024",
    applications: 798,
  },
  {
    id: 5,
    jobTitle: "Economics",
    jobType: "Full Time",
    daysRemaining: 27,
    status: "active",
    postedDate: "20/10/2024",
    applications: 798,
  },
  {
    id: 6,
    jobTitle: "Hindi",
    jobType: "Full Time",
    daysRemaining: 27,
    status: "Expire",
    postedDate: "20/10/2024",
    applications: 798,
  },
  {
    id: 7,
    jobTitle: "Biology",
    jobType: "Full Time",
    daysRemaining: 27,
    status: "active",
    postedDate: "20/10/2024",
    applications: 798,
  },
  {
    id: 8,
    jobTitle: "Chemistry",
    jobType: "Full Time",
    daysRemaining: 27,
    status: "Expire",
    postedDate: "20/10/2024",
    applications: 798,
  },
  {
    id: 9,
    jobTitle: "Economics",
    jobType: "Full Time",
    daysRemaining: 27,
    status: "active",
    postedDate: "20/10/2024",
    applications: 798,
  },
];

type JobData = {
  id: number;
  jobTitle: string;
  jobType: string;
  daysRemaining: number;
  status: string;
  postedDate: string;
  applications: number;
};

const CareerTable = () => {
  const router = useRouter();
  const [selectedRows, setSelectedRows] = useState<(string | number)[]>([]);
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc" | null>(
    null
  );

  const getStatusStyles = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-[#3FC28A1A] text-[#3FC28A]";
      case "expire":
        return "bg-[#F45B691A] text-[#F45B69]";
      default:
        return "bg-[#3FC28A1A] text-[#3FC28A]";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return <FaCheck className="w-3 h-3" />;
      case "expire":
        return <FaTimes className="w-3 h-3" />;
      default:
        return <FaCheck className="w-3 h-3" />;
    }
  };

  const toggleRowSelection = (id: string | number) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const handleSort = (key: string, direction: "asc" | "desc" | null) => {
    setSortKey(key);
    setSortDirection(direction);
  };

  const columns: Column<JobData>[] = [
    {
      key: "sno",
      header: "S.No.",
      sortable: true,
      render: (_, index) => (
        <span className="text-sm text-gray-700">{index + 1}</span>
      ),
    },
    {
      key: "jobTitle",
      header: "Jobs",
      render: (row) => (
        <div>
          <div
            className="text-sm font-medium text-gray-900 cursor-pointer hover:text-blue-600"
            onClick={() => router.push("/career/job-details")}
          >
            {row.jobTitle}
          </div>
          <div className="text-xs text-gray-500 mt-1">{row.jobType}</div>
          <div className="text-xs text-gray-500">
            {row.daysRemaining} days remaining
          </div>
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (row) => (
        <span
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyles(
            row.status
          )}`}
        >
          {getStatusIcon(row.status)}
          {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
        </span>
      ),
    },
    {
      key: "postedDate",
      header: "Posted Date",
      render: (row) => (
        <span className="text-sm text-gray-700">{row.postedDate}</span>
      ),
    },
    {
      key: "applications",
      header: "Applications",
      render: (row) => (
        <div className="flex items-center gap-2">
          <Image
            src="/Userss.png"
            alt="Applications"
            width={20}
            height={20}
            className="object-contain"
          />
          <span className="text-sm text-gray-700">
            {row.applications} Applications
          </span>
        </div>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      render: () => (
        <div className="flex items-center justify-between gap-3">
          <button className="bg-[#D1E9FF] hover:bg-[#B8D9F5] rounded-md text-[#2E90FA] px-4 py-2 text-sm font-medium transition-colors">
            View Applications
          </button>
          <FaEllipsisV className="text-gray-600 cursor-pointer hover:text-gray-800 transition-colors" />
        </div>
      ),
    },
  ];

  const handlePostJob = () => {
    router.push("/career/career-postjob");
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-gray-800 text-lg">
          Recently Posted Jobs
        </h2>
        <button
          onClick={handlePostJob}
          className="flex items-center gap-2 text-white bg-[#2E90FA] hover:bg-blue-600 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-sm"
        >
          <span className="w-5 h-5 border-white border-[1px] rounded-full flex items-center justify-center">
            <FaPlus className="w-3 h-3" />
          </span>
          Post a job
        </button>
      </div>

      <DataTable
        data={jobData}
        columns={columns}
        keyExtractor={(row) => row.id}
        showCheckboxes={true}
        selectedRows={selectedRows}
        onRowSelect={toggleRowSelection}
        sortable={true}
        onSort={handleSort}
        sortKey={sortKey}
        sortDirection={sortDirection}
        headerBgColor="bg-[#EAECF0]"
        footer={
          <div className="flex justify-end">
            <button className="text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors flex items-center gap-1">
              View all
              <span className="text-gray-400">→</span>
            </button>
          </div>
        }
      />
    </>
  );
};

export default CareerTable;
