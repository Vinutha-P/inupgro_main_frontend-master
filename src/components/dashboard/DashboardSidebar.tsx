"use client";

import {
  FaHome,
  FaCog,
  FaUsers,
  FaBriefcase,
  FaNewspaper,
  FaComments,
  FaTimes,
} from "react-icons/fa";
import Link from "next/link";
import { FC } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

interface SidebarProps {
  collapsed: boolean;
  toggleSidebar: () => void;
  isMobile?: boolean;
  isDrawerOpen?: boolean;
}

const DashboardSidebar: FC<SidebarProps> = ({
  collapsed,
  toggleSidebar,
  isMobile = false,
  isDrawerOpen = false,
}) => {
  const pathname = usePathname();

  const menu = [
    {
      icon: FaHome,
      label: "Dashboard",
      link: "/dashboard",
    },
    {
      icon: FaUsers,
      label: "Student Applications",
      link: "/students",
    },
    {
      icon: FaBriefcase,
      label: "Career",
      link: "/career",
    },
    {
      icon: FaNewspaper,
      label: "Publications",
      link: "/publications",
    },
    {
      icon: FaNewspaper,
      label: "News Management",
      link: "/news-management",
    },
    {
      icon: FaComments,
      label: "Feedback and Surveys",
      link: "/feedback-surveys",
    },
    {
      icon: FaCog,
      label: "Settings",
      link: "/setting",
    },
  ];

  const sidebarContent = (
    <>
      {/* Logo Section */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
        {collapsed && !isMobile ? (
          <div className="flex items-center justify-center w-full">
            <Image
              src="/dashLoogoo.png"
              alt="Logo"
              width={40}
              height={40}
              className="object-contain"
            />
          </div>
        ) : (
          <div className="flex items-center">
            <Image
              src="/dashLogo.png"
              alt="Logo"
              width={120}
              height={50}
              className="object-contain"
            />
          </div>
        )}
        {!isMobile && (
          <button
            onClick={toggleSidebar}
            className="text-gray-600 hover:text-gray-800 transition-colors p-1 rounded-md hover:bg-gray-100"
            aria-label="Toggle sidebar"
          >
            <Image
              src="/Panel-close.png"
              alt="Toggle"
              width={21}
              height={18}
              className={`transition-transform duration-300 ${
                collapsed ? "rotate-180" : "rotate-0"
              }`}
            />
          </button>
        )}
        {isMobile && (
          <button
            onClick={toggleSidebar}
            className="text-gray-600 hover:text-gray-800 transition-colors p-2 rounded-md hover:bg-gray-100"
            aria-label="Close sidebar"
          >
            <FaTimes className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Menu Items */}
      <nav className="flex-1 overflow-y-auto">
        <ul className="px-3 py-4 space-y-1">
          {menu.map((item, index) => {
            const isActive = pathname === item.link;
            const IconComponent = item.icon;

            return (
              <li key={index}>
                <Link
                  href={item.link}
                  onClick={isMobile ? toggleSidebar : undefined}
                  className={`flex items-center px-4 py-3 my-2 rounded-lg transition-all duration-200 group ${
                    isActive
                      ? "bg-[#2e90fa] text-white shadow-sm"
                      : "text-gray-700 hover:bg-gray-50 hover:text-[#2e90fa]"
                  }`}
                >
                  <span
                    className={`flex-shrink-0 transition-all ${
                      collapsed && !isMobile ? "text-xl" : "text-lg"
                    } ${
                      isActive
                        ? "text-white"
                        : "text-gray-600 group-hover:text-[#2e90fa]"
                    }`}
                  >
                    <IconComponent />
                  </span>
                  {(!collapsed || isMobile) && (
                    <span
                      className={`ml-4 font-medium text-sm ${
                        isActive
                          ? "text-white"
                          : "text-gray-700 group-hover:text-[#2e90fa]"
                      }`}
                    >
                      {item.label}
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );

  // Mobile Drawer View
  if (isMobile) {
    return (
      <>
        {/* Overlay */}
        {isDrawerOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
            onClick={toggleSidebar}
            aria-hidden="true"
          />
        )}

        {/* Drawer */}
        <div
          className={`fixed top-0 left-0 h-full bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
            isDrawerOpen ? "translate-x-0" : "-translate-x-full"
          } w-64`}
        >
          {sidebarContent}
        </div>
      </>
    );
  }

  // Desktop View
  return (
    <div
      className={`h-screen bg-white shadow-[10px_0px_24px_0px_#0000000A] rounded-2xl flex flex-col transition-all duration-300 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {sidebarContent}
    </div>
  );
};

export default DashboardSidebar;
