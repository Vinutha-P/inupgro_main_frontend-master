"use client";

import { FiEye, FiEdit3, FiTrash2 } from "react-icons/fi";
import DataTable, { Column } from "../DataTable";

export type TrendingNewsRow = {
  sno: number;
  school: string;
  title: string;
  postedBy: string;
  date: string;
};

export type TrendingNewsTableProps = {
  title: string;
  filters: readonly string[];
  activeFilter: string;
  rows: readonly TrendingNewsRow[];
};

export default function TrendingNewsTable({
  title,
  filters,
  activeFilter,
  rows,
}: TrendingNewsTableProps) {
  const columns: Column<TrendingNewsRow>[] = [
    {
      key: "sno",
      header: "S.No.",
      headerClassName: "w-20",
      render: (row) => (
        <span className="font-bold text-slate-900">
          {String(row.sno).padStart(2, "0")}
        </span>
      ),
    },
    {
      key: "school",
      header: "School Name",
      render: (row) => (
        <span className="font-medium text-slate-900">{row.school}</span>
      ),
    },
    {
      key: "title",
      header: "News Title",
      className: "max-w-xs",
      render: (row) => <span className="text-slate-600">{row.title}</span>,
    },
    {
      key: "postedBy",
      header: "Posted By",
      render: (row) => (
        <span className="font-medium text-slate-900">{row.postedBy}</span>
      ),
    },
    {
      key: "date",
      header: "Posted Date",
      render: (row) => (
        <span className="font-medium text-slate-900">{row.date}</span>
      ),
    },
    {
      key: "actions",
      header: "Action",
      align: "center",
      render: () => (
        <div className="flex justify-center gap-2 text-slate-600">
          <button type="button" className="p-1.5 hover:text-slate-900">
            <FiEye />
          </button>
          <button type="button" className="p-1.5 hover:text-slate-900">
            <FiEdit3 />
          </button>
          <button
            type="button"
            className="p-1.5 text-red-600 hover:text-red-700"
          >
            <FiTrash2 />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-[0_10px_25px_rgba(15,23,42,0.04)] h-full overflow-hidden">
      <div className="flex items-center justify-between px-4 md:px-6 pt-4 pb-3">
        <div className="text-lg font-semibold text-slate-900">{title}</div>
        <select
          value={activeFilter}
          onChange={() => {}}
          className="h-9 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {filters.map((filter) => (
            <option key={filter} value={filter}>
              {filter}
            </option>
          ))}
        </select>
      </div>

      <DataTable
        data={[...rows]}
        columns={columns}
        keyExtractor={(row) => row.sno.toString()}
        headerBgColor="bg-slate-50"
        className="border-0 shadow-none"
        tableClassName="text-sm"
      />
    </div>
  );
}
