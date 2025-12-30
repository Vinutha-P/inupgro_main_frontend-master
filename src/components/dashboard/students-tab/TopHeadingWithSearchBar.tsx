"use client";
import React from "react";
import { FaBell, FaSearch } from "react-icons/fa";
import Image from "next/image";

interface TopHeadingWithSearchBarProps {
  schoolName?: string;
  onSearch?: (query: string) => void;
}

const TopHeadingWithSearchBar: React.FC<TopHeadingWithSearchBarProps> = ({
  schoolName = "Jaipur School",
  onSearch,
}) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onSearch) {
      onSearch(e.target.value);
    }
  };

  return (
    <div className="flex justify-between items-center">
      <div>
        <p className="text-sm text-gray-600 font-medium">Welcome</p>
        <h1 className="text-xl font-bold text-gray-800 mt-1">{schoolName}</h1>
      </div>
      <div className="flex items-center gap-4 w-[70%]">
        <div className="relative bg-white w-[92%] rounded-lg shadow-sm">
          <input
            type="text"
            placeholder="Search..."
            onChange={handleSearchChange}
            className="pl-10 pr-4 py-2.5 border w-full border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          />
          <FaSearch className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <div className="w-12 h-12 bg-white rounded-full flex justify-center items-center shadow-sm hover:shadow-md transition-shadow cursor-pointer">
          <FaBell className="h-5 w-5 text-gray-600" />
        </div>
      </div>
    </div>
  );
};

export default TopHeadingWithSearchBar;
