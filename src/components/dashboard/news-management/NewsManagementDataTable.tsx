"use client";
import React, { useState, useEffect, useMemo } from "react";
import { FiEdit, FiEye } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { useGetAllNewsQuery } from "@/features/api/educationNewsApiSlice";
import { useDispatch } from "react-redux";
import { setNewsDetails } from "@/features/newsSlice";
import { formatDate } from "@/utils/helper";
import DataTable, { Column } from "../DataTable";
import Image from "next/image";

type NewsItem = {
  _id: string;
  name?: string;
  title: string;
  categoryDetails?: { name: string };
  postedBy?: string;
  createdAt: string;
  status: "pending" | "published" | "draft" | "declined";
};

// Status badge component
const StatusBadge = ({ status }: { status: string }) => {
  const getStatusStyles = (status: string) => {
    const lowerStatus = status.toLowerCase();
    switch (lowerStatus) {
      case "published":
        return "bg-green-100 text-green-700 border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "draft":
        return "bg-purple-100 text-purple-700 border-purple-200";
      case "declined":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const formatStatus = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusStyles(
        status
      )}`}
    >
      {formatStatus(status)}
    </span>
  );
};

export default function NewsManagementDataTable() {
  const [activeTab, setActiveTab] = useState<string>("pending");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc" | null>(
    null
  );
  const pageSize = 10;

  const {
    data: details,
    isLoading,
    refetch,
  } = useGetAllNewsQuery(
    {
      status: activeTab,
      sortType: sortDirection || "asc",
      sortBy: sortKey || "",
      page: currentPage,
      limit: pageSize,
    },
    {
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true,
    }
  );

  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (details) {
      const extractedData = {
        totalPublishedNews: details.totalPublishedNews,
        publishedNewsAnalytics: details.publishedNewsAnalytics,
        totalActiveReaders: details.totalActiveReaders,
        activeReadersAnalytics: details.activeReadersAnalytics,
        totalTrendingNews: details.totalTrendingNews,
        trendingNewsAnalytics: details.trendingNewsAnalytics,
      };

      dispatch(setNewsDetails(extractedData));
    }
  }, [details, dispatch]);

  // Reset page when tab changes
  useEffect(() => {
    setCurrentPage(1);
    setSortKey(null);
    setSortDirection(null);
  }, [activeTab]);

  const newsData: NewsItem[] = details?.data || [];

  // Get count for a specific status
  // Note: API filters by status, so we get accurate count only for active tab
  const getCount = (status: string) => {
    if (status === activeTab) {
      // For active tab, use totalCount from API response
      return details?.totalCount || newsData.length || 0;
    }
    // For other tabs, try to get count from data if API returns all statuses
    // Otherwise this will be 0, which is acceptable
    if (details?.data && Array.isArray(details.data)) {
      return details.data.filter(
        (d: any) => d?.status?.toLowerCase() === status.toLowerCase()
      ).length;
    }
    return 0;
  };

  const tabs = [
    { key: "pending", label: `Pending News (${getCount("pending")})` },
    { key: "published", label: `Published News (${getCount("published")})` },
    { key: "draft", label: `Draft News (${getCount("draft")})` },
    { key: "declined", label: `Declined News (${getCount("declined")})` },
  ];

  const handleSort = (key: string, direction: "asc" | "desc" | null) => {
    // Map column keys to API field names (exclude non-sortable columns)
    const sortKeyMap: Record<string, string> = {
      name: "name",
      title: "title",
      status: "status",
      postedBy: "postedBy",
      createdAt: "createdAt",
    };

    const apiSortKey = sortKeyMap[key] || null;
    setSortKey(apiSortKey);
    setSortDirection(direction);
    setCurrentPage(1);
  };

  const handleViewClick = (id: string) => {
    router.push(`/news-management/news-details?id=${id}`);
  };

  const handleEditClick = (id: string) => {
    router.push(`/news-management/edit-news?id=${id}`);
  };

  const columns: Column<NewsItem>[] = useMemo(
    () => [
      {
        key: "sno",
        header: "S.No.",
        render: (_, index) => {
          const sno = (currentPage - 1) * pageSize + index + 1;
          return <span className="text-gray-600">{sno}</span>;
        },
        className: "w-16",
      },
      {
        key: "name",
        header: "School Name",
        render: (row) => (
          <span className="text-gray-900 font-medium">
            {row?.name || "N/A"}
          </span>
        ),
        sortable: true,
      },
      {
        key: "title",
        header: "News Title",
        render: (row) => (
          <span className="text-gray-900" title={row.title}>
            {row.title?.length > 50
              ? `${row.title.substring(0, 50)}...`
              : row.title}
          </span>
        ),
        sortable: true,
      },
      {
        key: "category",
        header: "News Category",
        render: (row) => (
          <span className="text-gray-700">
            {row?.categoryDetails?.name || "N/A"}
          </span>
        ),
      },
      {
        key: "status",
        header: "Status",
        render: (row) => <StatusBadge status={row.status} />,
        sortable: true,
      },
      {
        key: "postedBy",
        header: "Posted By",
        render: (row) => (
          <span className="text-gray-700">{row?.postedBy || "N/A"}</span>
        ),
        sortable: true,
      },
      {
        key: "createdAt",
        header: "Posted Date",
        render: (row) => (
          <span className="text-gray-700">
            {formatDate(row?.createdAt || "")}
          </span>
        ),
        sortable: true,
      },
      {
        key: "actions",
        header: "Actions",
        render: (row) => (
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleViewClick(row._id)}
              className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors"
              title="View Details"
            >
              <FiEye className="w-4 h-4" />
            </button>
            {row.status !== "declined" && (
              <button
                onClick={() => handleEditClick(row._id)}
                className="p-1.5 text-gray-600 hover:bg-gray-50 rounded transition-colors"
                title="Edit News"
              >
                <FiEdit className="w-4 h-4" />
              </button>
            )}
          </div>
        ),
        className: "w-24",
      },
    ],
    [currentPage, pageSize]
  );

  // Calculate total pages from API response
  const totalPages =
    details?.totalPages ||
    (details?.totalCount ? Math.ceil(details.totalCount / pageSize) : 1) ||
    1;

  return (
    <div className="mb-12">
      {/* Tabs */}
      <div className="flex justify-between gap-2 mb-4 bg-[#eceff6] rounded-lg p-1">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`font-medium flex-1 text-center p-2.5 rounded-lg text-sm transition-all ${
              activeTab === tab.key
                ? "bg-white text-gray-900 shadow-sm"
                : "text-[#667085] hover:text-gray-900"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Table Container with Create Button */}
      <div className="relative">
        <DataTable
          data={newsData}
          columns={columns}
          keyExtractor={(row) => row._id}
          sortable={true}
          onSort={handleSort}
          sortKey={sortKey}
          sortDirection={sortDirection}
          pagination={{
            currentPage,
            totalPages,
            onPageChange: setCurrentPage,
          }}
          emptyMessage="No news available for this status"
          className="mb-4"
          rowHover={true}
          headerBgColor="bg-gray-50"
        />

        {/* Floating Create Button */}
        <button
          onClick={() => router.push("/news-management/create-news")}
          className="fixed bottom-8 right-8 z-50 "
          title="Create News"
        >
          <Image src="/plusc.png" alt="Create News" width={70} height={70} />
        </button>
      </div>
    </div>
  );
}
