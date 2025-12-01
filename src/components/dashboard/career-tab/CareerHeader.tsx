"use client";
import { FaArrowLeft, FaSearch, FaBell } from "react-icons/fa";
import React from "react";
import { usePathname } from "next/navigation";

export default function HeaderBar() {
  const pathname = usePathname();

  return (
    <div className="flex justify-between items-center bg-white p-3 rounded-xl shadow-md w-full">
      {/* Left - Back + Title */}
      <div className="flex items-center space-x-2">
        <FaArrowLeft className="text-gray-700" />
        <h1 className="text-sm font-semibold text-gray-900">Mathematics Job Applications</h1>
      </div>

      {/* Right - Search + Bell (only if pathname matches) */}
      {pathname === "/career/tables-details" && (
        <div className="flex items-center space-x-3">
          <div className="flex items-center border rounded-md px-2 py-1 bg-gray-50 shadow-sm">
            <FaSearch className="text-gray-400 mr-2 text-sm" />
            <input
              type="text"
              placeholder="Search..."
              className="outline-none bg-transparent text-sm w-32"
            />
          </div>
          <div className="bg-red-50 p-2 rounded-md shadow-sm cursor-pointer">
            <FaBell className="text-red-500 text-sm" />
          </div>
        </div>
      )}
    </div>
  );
}
