"use client";
import { useState, useMemo } from "react";
import SummaryCards from "../Card";
import { FaTrash, FaEllipsisV, FaChevronDown } from "react-icons/fa";
import { useRouter } from "next/navigation";
import TopHeadingWithSearchBar from "./TopHeadingWithSearchBar";
import DataTable, { Column } from "../DataTable";

interface Student {
  applicationNumber: string;
  studentName: string;
  classApplied: string;
  currentClass: string;
  age: number;
  parentName: string;
  parentMobileNumber: string;
  status: "active" | "applied" | "rejected";
}

const mockStudentData: Student[] = [
  {
    applicationNumber: "#123456",
    studentName: "Akshay Khurana",
    classApplied: "8th",
    currentClass: "10th",
    age: 15,
    parentName: "Ganpath Rao",
    parentMobileNumber: "9876543210",
    status: "active",
  },
  {
    applicationNumber: "#123456",
    studentName: "Ishita Khurana",
    classApplied: "8th",
    currentClass: "-",
    age: 15,
    parentName: "Ganpath Rao",
    parentMobileNumber: "9876543210",
    status: "applied",
  },
  {
    applicationNumber: "#123456",
    studentName: "Akshay Khurana",
    classApplied: "8th",
    currentClass: "10th",
    age: 15,
    parentName: "Ganpath Rao",
    parentMobileNumber: "9876543210",
    status: "rejected",
  },
  {
    applicationNumber: "#123456",
    studentName: "Ishita Khurana",
    classApplied: "8th",
    currentClass: "-",
    age: 15,
    parentName: "Ganpath Rao",
    parentMobileNumber: "9876543210",
    status: "active",
  },
  {
    applicationNumber: "#123456",
    studentName: "Akshay Khurana",
    classApplied: "8th",
    currentClass: "10th",
    age: 15,
    parentName: "Ganpath Rao",
    parentMobileNumber: "9876543210",
    status: "applied",
  },
];

type TabType = "all" | "applied" | "active";

interface TabConfig {
  key: TabType;
  label: string;
  count: number;
}

const tabConfigs: TabConfig[] = [
  { key: "all", label: "All Students", count: 1477 },
  { key: "applied", label: "Applied Students", count: 230 },
  { key: "active", label: "Active Students", count: 230 },
];

export default function StudentAllDataTable() {
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const [selectedYear, setSelectedYear] = useState("2024");
  const [selectedClass, setSelectedClass] = useState("Class 10");
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();

  const getStatusBadgeStyles = (status: string): string => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-[#3FC28A1A] text-[#3FC28A]";
      case "applied":
        return "bg-[#EFBE121A] text-[#EFBE12]";
      case "rejected":
        return "bg-[#F45B691A] text-[#F45B69]";
      default:
        return "bg-[#3FC28A1A] text-[#3FC28A]";
    }
  };

  const formatStatusText = (status: string): string => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const totalPages = 10;
  const getPageNumbers = (): (number | string)[] => {
    const pages: (number | string)[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 3; i++) pages.push(i);
        pages.push("...");
        pages.push(8, 9, 10);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, 2, 3);
        pages.push("...");
        for (let i = totalPages - 2; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1, 2, 3);
        pages.push("...");
        pages.push(currentPage - 1, currentPage, currentPage + 1);
        pages.push("...");
        pages.push(8, 9, 10);
      }
    }
    return pages;
  };

  const filteredStudents = mockStudentData.filter((student) => {
    if (activeTab === "all") return true;
    return student.status === activeTab;
  });

  const allColumns: Column<Student>[] = useMemo(
    () => [
      {
        key: "applicationNumber",
        header: "Application no.",
        render: (row) => (
          <span className="text-sm text-gray-700">{row.applicationNumber}</span>
        ),
      },
      {
        key: "studentName",
        header: "Student Name",
        render: (row) => (
          <span
            className="text-sm font-medium text-gray-900 hover:text-blue-600 cursor-pointer"
            onClick={() => router.push(`/students/students-application`)}
          >
            {row.studentName}
          </span>
        ),
      },
      {
        key: "classApplied",
        header: "Class Applied",
        render: (row) => (
          <span className="text-sm text-gray-700">{row.classApplied}</span>
        ),
      },
      {
        key: "currentClass",
        header: "Current Class",
        render: (row) => (
          <span className="text-sm text-gray-700">{row.currentClass}</span>
        ),
      },
      {
        key: "age",
        header: "Age",
        render: (row) => (
          <span className="text-sm text-gray-700">{row.age}</span>
        ),
      },
      {
        key: "parentName",
        header: "Parent Name",
        render: (row) => (
          <span className="text-sm text-gray-700">{row.parentName}</span>
        ),
      },
      {
        key: "parentMobileNumber",
        header: "Parent's Mobile Number",
        render: (row) => (
          <span className="text-sm text-gray-700">
            {row.parentMobileNumber}
          </span>
        ),
      },
      {
        key: "status",
        header: "Status",
        render: (row) => (
          <span
            className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadgeStyles(
              row.status
            )}`}
          >
            {formatStatusText(row.status)}
          </span>
        ),
      },
    ],
    [router]
  );

  const appliedColumns: Column<any>[] = [
    {
      key: "applicationNumber",
      header: "Application No.",
      render: (row) => (
        <span className="text-sm text-gray-700">{row.applicationNumber}</span>
      ),
    },
    {
      key: "studentName",
      header: "Student Name",
      render: (row) => (
        <span className="text-sm font-medium text-gray-900">{row.name}</span>
      ),
    },
    {
      key: "classApplied",
      header: "Class Applied",
      render: (row) => (
        <span className="text-sm text-gray-700">{row.classApplied}</span>
      ),
    },
    {
      key: "age",
      header: "Age",
      render: (row) => <span className="text-sm text-gray-700">{row.age}</span>,
    },
    {
      key: "parentName",
      header: "Parent Name",
      render: (row) => (
        <span className="text-sm text-gray-700">{row.parentName}</span>
      ),
    },
    {
      key: "parentMobile",
      header: "Parent's Mobile",
      render: (row) => (
        <span className="text-sm text-gray-700">{row.parentMobile}</span>
      ),
    },
    {
      key: "subject",
      header: "Subject",
      render: (row) => (
        <span className="text-sm text-gray-700">{row.subject}</span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      render: () => (
        <div className="flex gap-3 items-center">
          <FaTrash className="h-4 w-4 text-red-500 cursor-pointer hover:text-red-700" />
          <FaEllipsisV className="h-4 w-4 text-gray-600 cursor-pointer hover:text-gray-800" />
        </div>
      ),
    },
  ];

  const activeColumns: Column<any>[] = [
    {
      key: "studentId",
      header: "Student ID",
      render: (row) => (
        <span className="text-sm text-gray-700">{row.studentId}</span>
      ),
    },
    {
      key: "studentName",
      header: "Student Name",
      render: (row) => (
        <span className="text-sm font-medium text-gray-900">{row.name}</span>
      ),
    },
    {
      key: "dateOfJoining",
      header: "Date of Joining",
      render: (row) => (
        <span className="text-sm text-gray-700">{row.dateOfJoining}</span>
      ),
    },
    {
      key: "currentClass",
      header: "Current Class",
      render: (row) => (
        <span className="text-sm text-gray-700">{row.currentClass}</span>
      ),
    },
    {
      key: "age",
      header: "Age",
      render: (row) => <span className="text-sm text-gray-700">{row.age}</span>,
    },
    {
      key: "parentName",
      header: "Parent Name",
      render: (row) => (
        <span className="text-sm text-gray-700">{row.parentName}</span>
      ),
    },
    {
      key: "parentMobile",
      header: "Parent's Mobile",
      render: (row) => (
        <span className="text-sm text-gray-700">{row.parentMobile}</span>
      ),
    },
    {
      key: "subject",
      header: "Subject",
      render: (row) => (
        <span className="text-sm text-gray-700">{row.subject}</span>
      ),
    },
  ];

  const appliedData = [
    {
      applicationNumber: "#5678",
      name: "Bob",
      classApplied: "Grade 5",
      age: 10,
      parentName: "Ms. Lee",
      parentMobile: "8765432109",
      subject: "Math",
    },
  ];

  const activeData = [
    {
      studentId: "A001",
      name: "Charlie",
      dateOfJoining: "2023-01-15",
      currentClass: "Grade 6",
      age: 11,
      parentName: "Mr. Kumar",
      parentMobile: "7654321098",
      subject: "Science",
    },
  ];

  return (
    <div className="px-4 space-y-6  text-gray-800">
      <TopHeadingWithSearchBar />

      <SummaryCards />

      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-800">Students List</h3>
        <div className="flex gap-4">
          {/* Year Select */}
          <div className="relative group">
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-sm font-medium text-gray-700 cursor-pointer transition-all duration-200 hover:border-gray-400 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm min-w-[100px]"
            >
              <option value="2021">2021</option>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <FaChevronDown className="h-4 w-4 text-gray-400" />
            </div>
          </div>

          {/* Class Select */}
          <div className="relative group">
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-sm font-medium text-gray-700 cursor-pointer transition-all duration-200 hover:border-gray-400 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm min-w-[120px]"
            >
              <option value="Class 9">Class 9</option>
              <option value="Class 10">Class 10</option>
              <option value="Class 11">Class 11</option>
              <option value="Class 12">Class 12</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <FaChevronDown className="h-4 w-4 text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-2 mb-4 bg-[#eceff6] rounded-lg p-1">
        {tabConfigs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`font-semibold flex-1 text-center py-2.5 px-4 rounded-lg transition-all ${
              activeTab === tab.key
                ? "bg-white text-gray-800 shadow-sm"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      {activeTab === "all" && (
        <DataTable
          data={filteredStudents}
          columns={allColumns}
          keyExtractor={(row, index) => `${row.applicationNumber}-${index}`}
          headerBgColor="bg-gray-50"
          pagination={{
            currentPage,
            totalPages,
            onPageChange: setCurrentPage,
          }}
        />
      )}

      {activeTab === "applied" && (
        <DataTable
          data={appliedData}
          columns={appliedColumns}
          keyExtractor={(row, index) => `${row.applicationNumber}-${index}`}
          headerBgColor="bg-gray-50"
        />
      )}

      {activeTab === "active" && (
        <DataTable
          data={activeData}
          columns={activeColumns}
          keyExtractor={(row, index) => `${row.studentId}-${index}`}
          headerBgColor="bg-gray-50"
        />
      )}
    </div>
  );
}
