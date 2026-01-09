"use client";
import { useState, useEffect, useLayoutEffect } from "react";
import type { TemplateDefaultProps } from "@/types";
import type React from "react";
import Header from "../organism/Header";
import DashboardSidebar from "../dashboard/DashboardSidebar";
import { useRouter } from "next/navigation";
import { FaBars } from "react-icons/fa";

const DashboardPageTemplate: React.FC<
  React.PropsWithChildren<{ className?: string }>
> = ({ children, className }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  // Initialize with a function to check if we're on mobile (client-side only)
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth < 768;
    }
    return false;
  });
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const router = useRouter();

  // Handle mobile detection and responsive behavior - use useLayoutEffect for earlier execution
  useLayoutEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        setIsDrawerOpen(false);
      }
    };

    // Check immediately
    checkMobile();

    // Add resize listener
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const toggleSidebar = () => {
    if (isMobile) {
      setIsDrawerOpen(!isDrawerOpen);
    } else {
      setCollapsed(!collapsed);
    }
  };

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

  useEffect(() => {
    const skipped = localStorage.getItem("onboarding_skipped");
    const formCompleted = localStorage.getItem("form_completed");
    const isLoggedIn = localStorage.getItem("logged_in");
    if (isLoggedIn === "true") {
      setShowPopup(false);
      return; // Stop here
    }
    if (skipped === "true" && formCompleted !== "true") {
      setShowPopup(true); // Show popup to complete forms
    }
  }, []);

  const handleCompleteClick = () => {
    let data = localStorage.getItem("selected_type");
    setShowPopup(true);
    if (data) {
      let type = data?.toLocaleLowerCase();
      router.push(`/onboarding-${type}`);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#EDF3FF]">
      {/* Mobile Drawer Sidebar */}
      {isMobile && (
        <DashboardSidebar
          collapsed={false}
          toggleSidebar={toggleDrawer}
          isMobile={true}
          isDrawerOpen={isDrawerOpen}
        />
      )}

      {/* Combined Sidebar and Content Container with Padding */}
      <div className={`flex flex-1 ${isMobile ? "p-0" : "p-6"} gap-3`}>
        {/* Desktop Sidebar - Only shown on desktop */}
        {!isMobile && (
          <div className="flex-shrink-0">
            <DashboardSidebar
              collapsed={collapsed}
              toggleSidebar={toggleSidebar}
              isMobile={false}
              isDrawerOpen={false}
            />
          </div>
        )}

        {/* Main Content Area */}
        <div className="flex flex-col min-w-0 w-full">
          {/* Mobile Hamburger Button - Show on mobile, hide on desktop */}
          {isMobile && (
            <div className="flex items-center justify-between p-4 bg-white shadow-sm md:hidden">
              <button
                onClick={toggleDrawer}
                className="text-gray-700 hover:text-gray-900 p-2 rounded-md hover:bg-gray-100 transition-colors"
                aria-label="Open menu"
              >
                <FaBars className="w-6 h-6" />
              </button>
            </div>
          )}

          {/* Content */}
          <main className={`no-scrollbar ${className || ""}`}>{children}</main>
        </div>
      </div>

      {/* Onboarding Popup */}
      {showPopup && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-[90%] max-w-md shadow-lg text-center">
            <h2 className="text-xl font-semibold mb-2">
              Complete Your Onboarding
            </h2>
            <p className="mb-4">
              Please fill all the required details to access the full dashboard.
            </p>
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
              onClick={handleCompleteClick}
            >
              Complete Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPageTemplate;
