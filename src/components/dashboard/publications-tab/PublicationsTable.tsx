"use client";
import React, { useState } from "react";

type TabType = "school" | "govt";

const PublicationsTable = () => {
  const [activeTab, setActiveTab] = useState<TabType>("school");

  const tabs = [
    { key: "school" as TabType, label: "Books by School", count: 120 },
    { key: "govt" as TabType, label: "Book by Govt.", count: 640 },
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-6 bg-[#eceff6] rounded-xl p-2">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => setActiveTab(tab.key)}
          className={`font-medium flex-1 text-center px-4 py-2.5 rounded-lg text-sm transition-all duration-200 ${
            activeTab === tab.key
              ? "bg-[#2E90FA] text-white shadow-sm font-semibold"
              : "text-[#667085] hover:text-[#191F33] bg-transparent"
          }`}
        >
          {tab.label} ({tab.count})
        </button>
      ))}
    </div>
  );
};

export default PublicationsTable;
