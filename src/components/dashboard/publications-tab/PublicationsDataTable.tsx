"use client";
import React, { useState, useEffect, useRef } from "react";
import { FaEllipsisV, FaPlus, FaChevronDown, FaEye } from "react-icons/fa";
import DataTable, { Column } from "../DataTable";
import Image from "next/image";
import { useRouter } from "next/navigation";

type PublicationStatus = "Active" | "Draft" | "Inactive";

type Publication = {
  id: number;
  cover?: string;
  title: string;
  author: string;
  class: string;
  subject: string;
  status: PublicationStatus;
  addedOn: string;
};

type ClassBookGroup = {
  className: string;
  bookCount: number;
  books: string[];
};

const publicationData: Publication[] = [
  {
    id: 1,
    title: "Foundations of Science - Grade 9",
    author: "Dr. R K Sharma",
    class: "Class 9",
    subject: "Science",
    status: "Active",
    addedOn: "19/06/2025",
  },
  {
    id: 2,
    title: "Algebra Basics - Grade 10",
    author: "Ms. L Tiwari",
    class: "Class 10",
    subject: "Mathematics",
    status: "Draft",
    addedOn: "19/06/2025",
  },
  {
    id: 3,
    title: "History of India - Grade 8",
    author: "Dr. S Patel",
    class: "Class 8",
    subject: "History",
    status: "Active",
    addedOn: "18/06/2025",
  },
  {
    id: 4,
    title: "English Literature - Grade 11",
    author: "Ms. A Kumar",
    class: "Class 11",
    subject: "English",
    status: "Inactive",
    addedOn: "17/06/2025",
  },
  {
    id: 5,
    title: "Physics Fundamentals - Grade 12",
    author: "Dr. M Singh",
    class: "Class 12",
    subject: "Physics",
    status: "Active",
    addedOn: "16/06/2025",
  },
];

// Sample data for Book by Govt. aggregated view
const classBookData: ClassBookGroup[] = [
  {
    className: "Class 3",
    bookCount: 45,
    books: [
      "Foundations of Science",
      "Algebra Basics",
      "World History",
      "Introduction to Programming",
      "Chemistry Essentials",
      "Physics Fundamentals",
      "Biology Basics",
      "Geography Made Easy",
      "English Grammar",
      "Mathematics Workbook",
    ],
  },
  {
    className: "Class 4",
    bookCount: 50,
    books: [
      "Advanced Mathematics",
      "Literature Analysis",
      "Modern Political Systems",
      "Computer Science Principles",
      "Biology",
      "Chemistry",
      "Physics Advanced",
      "Social Studies",
      "Language Arts",
      "Environmental Science",
    ],
  },
  {
    className: "Class 5",
    bookCount: 50,
    books: [
      "Advanced Mathematics",
      "Literature Analysis",
      "Modern Political Systems",
      "Computer Science Principles",
      "Biology",
      "Chemistry",
      "Physics Advanced",
      "Social Studies",
      "Language Arts",
      "Environmental Science",
    ],
  },
  {
    className: "Class 6",
    bookCount: 40,
    books: [
      "Science Fundamentals",
      "Math Concepts",
      "History Overview",
      "English Literature",
      "Geography",
      "Civics",
      "Economics Basics",
      "Art & Design",
    ],
  },
  {
    className: "Class 7",
    bookCount: 30,
    books: [
      "Physics Principles",
      "Chemistry Basics",
      "Biology Concepts",
      "Mathematics Advanced",
      "History of India",
      "English Grammar",
    ],
  },
  {
    className: "Class 8",
    bookCount: 60,
    books: [
      "Machine Learning",
      "Quantum Physics",
      "International Relations",
      "Data Analysis",
      "Behavioral Economics",
      "Advanced Chemistry",
      "Molecular Biology",
      "Statistics",
      "Calculus",
      "World Geography",
    ],
  },
  {
    className: "Class 9",
    bookCount: 55,
    books: [
      "Foundations of Science",
      "Algebra Advanced",
      "World History",
      "English Literature",
      "Physics Concepts",
      "Chemistry Principles",
      "Biology Advanced",
      "Geography",
      "Economics",
      "Political Science",
    ],
  },
  {
    className: "Class 10",
    bookCount: 70,
    books: [
      "Artificial Intelligence",
      "Cybersecurity",
      "Film Studies",
      "Statistical Mechanics",
      "Organic Chemistry",
      "Genetics",
      "Calculus Advanced",
      "Linear Algebra",
      "World Literature",
      "Modern History",
    ],
  },
  {
    className: "Class 11",
    bookCount: 65,
    books: [
      "Advanced Physics",
      "Organic Chemistry",
      "Biology Advanced",
      "Mathematics",
      "English",
      "History",
      "Geography",
      "Economics",
      "Political Science",
      "Computer Science",
    ],
  },
];

const statusStyles: Record<PublicationStatus, string> = {
  Active: "bg-[#3FC28A] text-white",
  Draft: "bg-gray-300 text-white",
  Inactive: "bg-[#F45B69] text-white",
};

const PublicationsDataTable = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"school" | "govt">("govt");
  const [selectedRows, setSelectedRows] = useState<(string | number)[]>([]);
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc" | null>(
    null
  );
  const [openActionMenu, setOpenActionMenu] = useState<number | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [subjectFilter, setSubjectFilter] = useState<string>("");
  const [classFilter, setClassFilter] = useState<string>("");

  // Format book names with truncation
  const formatBookNames = (books: string[], maxVisible: number = 6) => {
    if (books.length <= maxVisible) {
      return books.join(", ");
    }
    const visible = books.slice(0, maxVisible).join(", ");
    const remaining = books.length - maxVisible;
    return `${visible}, & ${remaining} more...`;
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      // Check if click is outside any action menu
      if (!target.closest(".action-menu-container")) {
        setOpenActionMenu(null);
      }
    };

    if (openActionMenu !== null) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openActionMenu]);

  const toggleRowSelection = (id: string | number) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const handleSort = (key: string, direction: "asc" | "desc" | null) => {
    setSortKey(key);
    setSortDirection(direction);
  };

  const toggleActionMenu = (id: number) => {
    setOpenActionMenu(openActionMenu === id ? null : id);
  };

  const handlePostBook = () => {
    router.push("/publications/publish-book");
  };

  // Columns for Book by Govt. view
  const govtColumns: Column<ClassBookGroup>[] = [
    {
      key: "className",
      header: "Class Name",
      sortable: true,
      render: (row) => (
        <span className="text-sm text-gray-900 font-medium">
          {row.className}
        </span>
      ),
    },
    {
      key: "bookCount",
      header: "No. of Books",
      sortable: true,
      render: (row) => (
        <span className="text-sm text-gray-700">{row.bookCount}</span>
      ),
    },
    {
      key: "bookName",
      header: "Book Name",
      sortable: true,
      render: (row) => (
        <span className="text-sm text-gray-700">
          {formatBookNames(row.books)}
        </span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      render: (row) => (
        <div className="flex justify-end">
          <button
            onClick={(e) => {
              e.stopPropagation();
              // Handle view details
            }}
            className="text-gray-600 hover:text-gray-800 transition-colors p-2"
            title="View Details"
          >
            <FaEye className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  // Columns for Books by School view (original)
  const schoolColumns: Column<Publication>[] = [
    {
      key: "sno",
      header: "S.No.",
      sortable: true,
      render: (_, index) => (
        <span className="text-sm text-gray-700">{index + 1}</span>
      ),
    },
    {
      key: "cover",
      header: "Cover",
      render: (row, index) => (
        <input
          type="checkbox"
          checked={selectedRows.includes(row.id)}
          onChange={() => toggleRowSelection(row.id)}
          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
        />
      ),
    },
    {
      key: "title",
      header: "Title",
      sortable: true,
      render: (row) => (
        <span className="text-sm text-gray-900 font-medium">{row.title}</span>
      ),
    },
    {
      key: "author",
      header: "Author",
      sortable: true,
      render: (row) => (
        <span className="text-sm text-gray-700">{row.author}</span>
      ),
    },
    {
      key: "class",
      header: "Class",
      sortable: true,
      render: (row) => (
        <span className="text-sm text-gray-700">{row.class}</span>
      ),
    },
    {
      key: "subject",
      header: "Subject",
      sortable: true,
      render: (row) => (
        <span className="text-sm text-gray-700">{row.subject}</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      sortable: true,
      render: (row) => (
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
            statusStyles[row.status]
          }`}
        >
          {row.status}
        </span>
      ),
    },
    {
      key: "addedOn",
      header: "Added on Date",
      sortable: true,
      render: (row) => (
        <span className="text-sm text-gray-700">{row.addedOn}</span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      render: (row) => (
        <div className="relative action-menu-container">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleActionMenu(row.id);
            }}
            className="text-gray-600 hover:text-gray-800 transition-colors p-2"
          >
            <FaEllipsisV className="w-4 h-4" />
          </button>
          {openActionMenu === row.id && (
            <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg border border-gray-200 z-10">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  // Handle edit
                  setOpenActionMenu(null);
                }}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-t-md"
              >
                Edit
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  // Handle analytics
                  setOpenActionMenu(null);
                }}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-b-md"
              >
                Analytics
              </button>
            </div>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      {/* Tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => setActiveTab("school")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === "school"
              ? "bg-white text-gray-900 shadow-sm"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          Books by School (120)
        </button>
        <button
          onClick={() => setActiveTab("govt")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === "govt"
              ? "bg-white text-gray-900 shadow-sm"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          Book by Govt. (640)
        </button>
      </div>

      {/* Heading and Toolbar - Only show for Books by School */}

      <div className="flex items-center justify-between flex-wrap gap-4">
        <h2 className="font-semibold text-gray-800 text-lg">
          Your Publications Library
        </h2>

        <div className="flex items-center gap-3 flex-wrap">
          {/* Status Filter */}
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-2 pr-8 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Status</option>
              <option value="Active">Active</option>
              <option value="Draft">Draft</option>
              <option value="Inactive">Inactive</option>
            </select>
            <FaChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs pointer-events-none" />
          </div>

          {/* Subject Filter */}
          <div className="relative">
            <select
              value={subjectFilter}
              onChange={(e) => setSubjectFilter(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-2 pr-8 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Subject</option>
              <option value="Science">Science</option>
              <option value="Mathematics">Mathematics</option>
              <option value="History">History</option>
              <option value="English">English</option>
              <option value="Physics">Physics</option>
            </select>
            <FaChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs pointer-events-none" />
          </div>

          {/* Class Filter */}
          <div className="relative">
            <select
              value={classFilter}
              onChange={(e) => setClassFilter(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-2 pr-8 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Class</option>
              <option value="Class 8">Class 8</option>
              <option value="Class 9">Class 9</option>
              <option value="Class 10">Class 10</option>
              <option value="Class 11">Class 11</option>
              <option value="Class 12">Class 12</option>
            </select>
            <FaChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs pointer-events-none" />
          </div>

          {/* Publish New Book Button */}
          <button
            onClick={handlePostBook}
            className="flex items-center gap-2 text-white bg-[#2E90FA] hover:bg-blue-600 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-sm"
          >
            <span className="w-5 h-5 border-white border-[1px] rounded-full flex items-center justify-center">
              <FaPlus className="w-3 h-3" />
            </span>
            Publish New Book
          </button>
        </div>
      </div>

      {/* Data Table */}
      {activeTab === "govt" ? (
        <DataTable
          data={classBookData}
          columns={govtColumns}
          keyExtractor={(row) => row.className}
          showCheckboxes={false}
          selectedRows={selectedRows}
          onRowSelect={toggleRowSelection}
          sortable={true}
          onSort={handleSort}
          sortKey={sortKey}
          sortDirection={sortDirection}
          headerBgColor="bg-[#EAECF0]"
          className="shadow-md rounded-xl border border-gray-200"
          tableClassName="font-sans"
          emptyMessage="No books found."
        />
      ) : (
        <DataTable
          data={publicationData}
          columns={schoolColumns}
          keyExtractor={(row) => row.id}
          showCheckboxes={false}
          selectedRows={selectedRows}
          onRowSelect={toggleRowSelection}
          sortable={true}
          onSort={handleSort}
          sortKey={sortKey}
          sortDirection={sortDirection}
          headerBgColor="bg-[#EAECF0]"
          className="shadow-md rounded-xl border border-gray-200"
          tableClassName="font-sans"
          emptyMessage="No publications found."
        />
      )}
    </div>
  );
};

export default PublicationsDataTable;
