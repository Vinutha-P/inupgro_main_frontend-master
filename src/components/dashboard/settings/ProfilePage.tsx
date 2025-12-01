// "use client";
// import React, { useState } from "react";
// import { FaUserEdit, FaTrashAlt } from "react-icons/fa";
// import SchoolTabs from "./SchoolTabs";
// import ChangePassword from "./ChangePassword";
// import ArchivedNews from "./ArchivedNews";
// import NewsCards from "./NewsCards";

// const tabs = [
//     { id: "edit", label: "Edit Profile" },
//     { id: "password", label: "Change Password" },
//     { id: "archived", label: "Archived News" },
//     { id: "privacy", label: "Privacy Policy" },
//     { id: "terms", label: "Terms & Conditions" },
// ];

// export default function ProfilePage() {
//     const [activeTab, setActiveTab] = useState("edit");

//     return (
//         <div className="min-h-full bg-gray-100">
//             <div className="bg-white border shadow-md rounded-lg">
//                 {/* Header */}
//                 <div className="flex justify-between items-center mb-4 py-6 px-14">
//                     <div>
//                         <h1 className="text-2xl font-semibold">Jaipur School</h1>
//                         <p className="text-gray-500">Admin</p>
//                     </div>
//                 </div>

//                 {/* Tabs */}
//                 <div className="border-t">
//                     <div className="flex justify-between py-6 px-6">
//                         <div className="flex items-center space-x-4 ">
//                             {tabs.map((tab) => (
//                                 <button
//                                     key={tab.id}
//                                     onClick={() => setActiveTab(tab.id)}
//                                     className={`text-sm px-4 py-2 rounded font-sans ${activeTab === tab.id
//                                         ? "bg-blue-900 text-white"
//                                         : "text-gray-700 hover:text-blue-900"
//                                         }`}
//                                 >
//                                     {tab.label}
//                                 </button>
//                             ))}

//                         </div>
//                         <button className="ml-auto flex items-center text-sm text-blue-900 hover:underline">
//                             <FaTrashAlt className="mr-1" /> Delete Account
//                         </button>
//                     </div>
//                 </div>
//             </div>



//             <div className="mt-4">
//                 {/* Content */}
//                 <div className="font-sans text-sm">
//                     {activeTab === "edit" && <div><SchoolTabs /></div>}
//                     {activeTab === "password" && <div><ChangePassword /></div>}
//                     {activeTab === "archived" && <div><ArchivedNews /></div>}
//                     {activeTab === "privacy" && <div><NewsCards /></div>}
//                     {activeTab === "terms" && <div><NewsCards /></div>}
//                 </div>
//             </div>
//         </div>
//     );
// }



"use client";
import React, { useState } from "react";
import { FaUserEdit, FaTrashAlt } from "react-icons/fa";
import SchoolTabs from "./SchoolTabs";
import ChangePassword from "./ChangePassword";
import ArchivedNews from "./ArchivedNews";
import NewsCards from "./NewsCards";
import DeleteNews from "./DeleteNews";
// import DeleteAccount from "./DeleteAccount"; // ✅ Import new component

const tabs = [
    { id: "edit", label: "Edit Profile" },
    { id: "password", label: "Change Password" },
    { id: "archived", label: "Archived News" },
    { id: "privacy", label: "Privacy Policy" },
    { id: "terms", label: "Terms & Conditions" },
];

export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState("edit");

    return (
        <div className="min-h-full bg-gray-100">
            <div className="bg-white border shadow-md rounded-lg">
                {/* Header */}
                <div className="flex justify-between items-center mb-4 py-6 px-14">
                    <div>
                        <h1 className="text-2xl font-semibold">Jaipur School</h1>
                        <p className="text-gray-500">Admin</p>
                    </div>
                </div>

                {/* Tabs */}
                <div className="border-t">
                    <div className="flex justify-between py-6 px-6">
                        <div className="flex items-center space-x-4">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`text-sm px-4 py-2 rounded font-sans ${activeTab === tab.id
                                            ? "bg-blue-900 text-white"
                                            : "text-gray-700 hover:text-blue-900"
                                        }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                        {/* ✅ Update button to act like a tab switcher */}
                        <button
                            onClick={() => setActiveTab("deleteAccount")}
                            className={`text-sm px-4 py-2 rounded font-sans ml-auto flex items-center
    ${activeTab === "deleteAccount"
                                    ? "bg-blue-900 text-white"
                                    : "text-gray-700 hover:text-blue-900"}`}
                        >
                            <FaTrashAlt className="mr-1" /> Delete Account
                        </button>

                    </div>
                </div>
            </div>

            <div className="mt-4">
                {/* Tab Content */}
                <div className="font-sans text-sm">
                    {activeTab === "edit" && <SchoolTabs />}
                    {activeTab === "password" && <ChangePassword />}
                    {activeTab === "archived" && <ArchivedNews />}
                    {activeTab === "privacy" && <NewsCards />}
                    {activeTab === "terms" && <NewsCards />}
                    {activeTab === "deleteAccount" && <DeleteNews />} {/* ✅ new content */}
                </div>
            </div>
        </div>
    );
}
