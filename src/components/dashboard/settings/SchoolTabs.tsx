"use client";
import React, { useState } from "react";
import BasicInformationKeyData from "./BasicInformationKeyData";

const tabs = [
    { id: "basic", label: "Basic Information & Key School Statistics" },
    { id: "fees", label: "Fees Structure" },
    { id: "academics", label: "Academics Statistics & Admission Criteria" },
    { id: "results", label: "School Results & Facilities" },
    { id: "principal", label: "Principal's Profile" },
    { id: "clubs", label: "School Clubs & Photo Gallery" },
];

export default function SchoolTabs() {
    const [activeTab, setActiveTab] = useState("basic");

    return (
        <div className="">
            <div className=" bg-white shadow-md rounded-lg">
                {/* Tabs */}
                <div className="flex space-x-6">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`py-6 font-medium  px-2 font-sans text-xs ${activeTab === tab.id
                                    ? "text-blue-600 border-b-2 border-blue-600"
                                    : "text-gray-700"
                                } hover:text-blue-600`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Content */}

            </div>


            <div>
                <div className="mt-6 bg-white shadow-md rounded-lg p-4">
                    {activeTab === "basic" && <div>
                        <BasicInformationKeyData />
                    </div>}
                    {activeTab === "fees" && <div>Fees Structure Content</div>}
                    {activeTab === "academics" && <div>Academics Statistics & Admission Criteria Content</div>}
                    {activeTab === "results" && <div>School Results & Facilities Content</div>}
                    {activeTab === "principal" && <div>Principal's Profile Content</div>}
                    {activeTab === "clubs" && <div>School Clubs & Photo Gallery Content</div>}
                </div>
            </div>
        </div>
    );
}
