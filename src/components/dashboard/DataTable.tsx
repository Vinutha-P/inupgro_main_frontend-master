"use client";

import React, { useState, ReactNode } from "react";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";

export interface Column<T> {
  key: string;
  header: string | ReactNode;
  render?: (row: T, index: number) => ReactNode;
  sortable?: boolean;
  align?: "left" | "center" | "right";
  className?: string;
  headerClassName?: string;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  keyExtractor: (row: T, index: number) => string | number;
  showCheckboxes?: boolean;
  selectedRows?: (string | number)[];
  onRowSelect?: (id: string | number) => void;
  onSelectAll?: (selected: boolean) => void;
  sortable?: boolean;
  onSort?: (key: string, direction: "asc" | "desc" | null) => void;
  sortKey?: string | null;
  sortDirection?: "asc" | "desc" | null;
  headerBgColor?: string;
  rowHover?: boolean;
  className?: string;
  tableClassName?: string;
  emptyMessage?: string;
  pagination?: {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
  };
  footer?: ReactNode;
}

export default function DataTable<T extends Record<string, any>>({
  data,
  columns,
  keyExtractor,
  showCheckboxes = false,
  selectedRows = [],
  onRowSelect,
  onSelectAll,
  sortable = false,
  onSort,
  sortKey = null,
  sortDirection = null,
  headerBgColor = "bg-gray-50",
  rowHover = true,
  className = "",
  tableClassName = "",
  emptyMessage = "No data available",
  pagination,
  footer,
}: DataTableProps<T>) {
  const handleSort = (key: string) => {
    if (!sortable || !onSort) return;

    if (sortKey === key) {
      if (sortDirection === "asc") {
        onSort(key, "desc");
      } else if (sortDirection === "desc") {
        onSort(key, null);
      } else {
        onSort(key, "asc");
      }
    } else {
      onSort(key, "asc");
    }
  };

  const allSelected =
    data.length > 0 &&
    data.every((row) => selectedRows.includes(keyExtractor(row, 0)));

  const handleSelectAll = () => {
    if (onSelectAll) {
      onSelectAll(!allSelected);
    }
  };

  const getPageNumbers = (): (number | string)[] => {
    if (!pagination) return [];
    const { currentPage, totalPages } = pagination;
    const pages: (number | string)[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 3; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages - 1, totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, 2);
        pages.push("...");
        for (let i = totalPages - 2; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1, 2);
        pages.push("...");
        pages.push(currentPage - 1, currentPage, currentPage + 1);
        pages.push("...");
        pages.push(totalPages - 1, totalPages);
      }
    }
    return pages;
  };

  return (
    <div
      className={`bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden font-sans ${className}`}
    >
      <div className="overflow-x-auto">
        <table
          className={`min-w-full divide-y divide-gray-200 font-sans ${tableClassName}`}
        >
          <thead className={headerBgColor}>
            <tr>
              {showCheckboxes && (
                <th className="px-4 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={handleSelectAll}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                  />
                </th>
              )}
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`px-4 py-3 text-left text-sm font-semibold text-gray-700 font-sans ${
                    column.align === "center"
                      ? "text-center"
                      : column.align === "right"
                      ? "text-right"
                      : ""
                  } ${column.headerClassName || ""}`}
                >
                  <div className="flex items-center gap-2">
                    {typeof column.header === "string" ? (
                      <span>{column.header}</span>
                    ) : (
                      column.header
                    )}
                    {column.sortable && sortable && (
                      <button
                        onClick={() => handleSort(column.key)}
                        className="flex flex-col items-center justify-center hover:opacity-70 transition-opacity ml-1"
                      >
                        <FaChevronUp
                          className={`w-2.5 h-2.5 ${
                            sortKey === column.key && sortDirection === "asc"
                              ? "text-gray-900"
                              : "text-gray-400"
                          }`}
                        />
                        <FaChevronDown
                          className={`w-2.5 h-2.5 -mt-0.5 ${
                            sortKey === column.key && sortDirection === "desc"
                              ? "text-gray-900"
                              : "text-gray-400"
                          }`}
                        />
                      </button>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (showCheckboxes ? 1 : 0)}
                  className="px-4 py-8 text-center text-sm text-gray-500"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((row, index) => {
                const rowKey = keyExtractor(row, index);
                const isSelected = selectedRows.includes(rowKey);

                return (
                  <tr
                    key={rowKey}
                    className={`${
                      rowHover ? "hover:bg-gray-50 transition-colors" : ""
                    } ${isSelected ? "bg-blue-50" : ""}`}
                  >
                    {showCheckboxes && (
                      <td className="px-4 py-4 whitespace-nowrap">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => onRowSelect?.(rowKey)}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                        />
                      </td>
                    )}
                    {columns.map((column) => (
                      <td
                        key={column.key}
                        className={`px-4 py-3 font-sans ${
                          column.align === "center"
                            ? "text-center"
                            : column.align === "right"
                            ? "text-right"
                            : ""
                        } ${column.className || ""}`}
                      >
                        {column.render
                          ? column.render(row, index)
                          : (row[column.key] as ReactNode)}
                      </td>
                    ))}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
      {pagination && (
        <div className="flex justify-center items-center gap-2 mt-6 pb-4 px-4">
          <button
            onClick={() =>
              pagination.onPageChange(Math.max(1, pagination.currentPage - 1))
            }
            disabled={pagination.currentPage === 1}
            className="px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 text-sm font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
          >
            ← Previous
          </button>
          {getPageNumbers().map((page, index) => (
            <button
              key={index}
              onClick={() =>
                typeof page === "number" && pagination.onPageChange(page)
              }
              disabled={page === "..."}
              className={`px-4 py-2 border rounded-md text-sm font-medium transition-colors shadow-sm ${
                page === pagination.currentPage
                  ? "bg-blue-600 text-white border-blue-600"
                  : page === "..."
                  ? "border-transparent bg-transparent shadow-none cursor-default"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() =>
              pagination.onPageChange(
                Math.min(pagination.totalPages, pagination.currentPage + 1)
              )
            }
            disabled={pagination.currentPage === pagination.totalPages}
            className="px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 text-sm font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
          >
            Next →
          </button>
        </div>
      )}
      {footer && <div className="px-4 pb-4">{footer}</div>}
    </div>
  );
}
