"use client";
import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import Logo from "../atom/Logo";
import Sidebar from "../molecule/SideBar";
import { useRouter, usePathname } from "next/navigation";
import { useLogoutMutation } from "../../features/api/authApiSlice";
import Link from "next/link";
import {
  FiChevronDown,
  FiSearch,
  FiGlobe,
  FiMenu,
  FiUser,
} from "react-icons/fi";
import {
  HiOutlineViewGrid,
  HiOutlineSparkles,
  HiOutlineLightningBolt,
  HiOutlineNewspaper,
} from "react-icons/hi";

const Links = [
  { id: 1, name: "Explore", link: "/find", icon: HiOutlineViewGrid },
  { id: 2, name: "Inspiration", link: "/inspiration", icon: HiOutlineSparkles },
  { id: 3, name: "Career", link: "/careers", icon: HiOutlineLightningBolt },
  { id: 4, name: "News", link: "/educational_news", icon: HiOutlineNewspaper },
];
const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoadings, setIsLoadings] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [goalDropdownOpen, setGoalDropdownOpen] = useState(false);
  const goalDropdownRef = useRef<HTMLDivElement>(null);

  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const user = useSelector((state: RootState) => state.auth.user);
  const role = useSelector((state: RootState) => state.auth.role);
  const refreshToken = useSelector(
    (state: RootState) => state.auth.refreshToken
  );

  const [logoutMutation, { isLoading: isLoggingOut }] = useLogoutMutation();

  // Detect if on any onboarding page
  const isOnboarding = [
    "/onboarding-school",
    "/onboarding-college",
    "/onboarding-coaching",
    "/onboarding-school/school-details",
    "/onboarding-college/college-details",
    "/onboarding-coaching/coaching-details",
  ].some((onboardPath) => pathname?.startsWith(onboardPath));

  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     router.push("/login");
  //   }
  // }, [isAuthenticated]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoadings(false);
    }, 1000);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const dropdown = document.getElementById("profile-dropdown");
      const profileImage = document.getElementById("profile-image");
      if (
        dropdown &&
        profileImage &&
        !dropdown.contains(event.target as Node) &&
        !profileImage.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
      if (
        goalDropdownRef.current &&
        !goalDropdownRef.current.contains(event.target as Node)
      ) {
        setGoalDropdownOpen(false);
      }
    };

    if (isDropdownOpen || goalDropdownOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isDropdownOpen, goalDropdownOpen]);

  const handleLogin = () => {
    router.push("/login");
  };

  const handleRegister = () => {
    router.push("/register");
  };

  const handleProfileClick = () => {
    setIsDropdownOpen(false);
    router.push("/onboarding-school");
  };

  const handleLogout = async () => {
    try {
      setIsDropdownOpen(false);
      localStorage.removeItem("logged_in");
      localStorage.removeItem("onboarding_skipped");
      localStorage.removeItem("payment_successfull");
      localStorage.removeItem("institute-register-address");
      localStorage.removeItem("institute-register");
      localStorage.removeItem("selected_type");

      if (!refreshToken) {
        throw new Error("No refresh token available");
      }

      await logoutMutation({ refreshToken }).unwrap();
    } catch (err: any) {
      console.error("Logout error:", err);
    }
  };

  const goalOptions = ["School", "College", "Coaching", "Career"];

  return (
    <header
      className={`w-full h-[4rem] md:h-[5rem] px-5 lg:px-20 sticky top-0 left-0 flex items-center z-[9999999] ${
        isLoadings
          ? "sekleton-light-gray"
          : "bg-gradient-to-b from-[#4174cd] to-[#1266be]"
      }`}
    >
      {isMenuOpen && (
        <div
          onClick={toggleMenu}
          onKeyDown={(e) => e.key === "Enter" && toggleMenu()}
          role="button"
          tabIndex={0}
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
        />
      )}
      <Sidebar
        isOpen={isMenuOpen}
        toggle={toggleMenu}
        isOnboarding={isOnboarding}
      />
      <nav className="w-full max-w-[95rem] flex items-center justify-between gap-4">
        {/* Left Section: Logo, Brand Name, Choose Goal Dropdown */}
        <div className="w-fit min-w-fit h-fit flex items-center gap-3">
          {isLoadings ? (
            <div className="w-[120px] h-[28px] lg:w-[120px] lg:h-[40px] skeleton-medium-gray" />
          ) : (
            <>
              <div className="flex items-center gap-3">
                <div className="brightness-0 invert">
                  <Logo />
                </div>
              </div>
              <div className="h-6 w-px bg-white opacity-50"></div>
              <div className="relative" ref={goalDropdownRef}>
                <button
                  onClick={() => setGoalDropdownOpen(!goalDropdownOpen)}
                  className="flex items-center gap-2 text-white hover:opacity-80 transition-opacity"
                >
                  <span className="text-sm lg:text-base">Choose Goal</span>
                  <FiChevronDown
                    className={`w-4 h-4 transition-transform ${
                      goalDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {goalDropdownOpen && (
                  <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                    {goalOptions.map((goal) => (
                      <button
                        key={goal}
                        onClick={() => {
                          setGoalDropdownOpen(false);
                          // Handle goal selection logic here
                        }}
                        className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                      >
                        {goal}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Central Section: Search Bar */}
        <div className="hidden lg:flex flex-1 max-w-2xl mx-4">
          {isLoadings ? (
            <div className="w-full h-10 skeleton-medium-gray rounded-lg" />
          ) : (
            <div className="relative w-full">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                <FiSearch className="w-5 h-5 text-white" />
              </div>
              <input
                type="text"
                placeholder="Search for School, College, and more..."
                className="w-full h-10 pl-12 pr-4 bg-white/20  border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
            </div>
          )}
        </div>

        {/* Right Section: Navigation Links and Icons */}
        <div className="w-fit min-w-fit hidden lg:flex items-center justify-end gap-6">
          {isLoadings ? (
            <div className="w-[400px] h-[40px] skeleton-medium-gray" />
          ) : (
            <>
              {/* Navigation Links with Icons */}
              <div className="flex items-center gap-6">
                {Links.map((link) => {
                  const Icon = link.icon;
                  const isActive = pathname === link.link;
                  return (
                    <Link
                      key={link.id}
                      href={link.link}
                      className={`flex items-center gap-2 text-white hover:opacity-80 transition-opacity ${
                        isActive ? "opacity-100 font-semibold" : "opacity-90"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="text-sm lg:text-base">{link.name}</span>
                    </Link>
                  );
                })}
              </div>

              {/* Menu/User Circular Button */}
              {isAuthenticated ? (
                <div className="relative">
                  <button
                    id="profile-image"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center gap-1 hover:bg-white/30 transition-colors"
                  >
                    <FiMenu className="w-4 h-4 text-white" />
                    <FiUser className="w-4 h-4 text-white" />
                  </button>
                  {isDropdownOpen && (
                    <div
                      id="profile-dropdown"
                      className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50"
                    >
                      {role == "Student" && (
                        <Link
                          href={"/student/book-library/"}
                          className="w-full block px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Dashboard
                        </Link>
                      )}
                      <button
                        onClick={handleProfileClick}
                        className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Profile
                      </button>
                      <button
                        onClick={handleLogout}
                        disabled={isLoggingOut}
                        className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isLoggingOut ? "Logging out..." : "Logout"}
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleRegister}
                    className="px-4 py-2 text-white bg-transparent border border-white/30 rounded-lg hover:bg-white/20 transition-colors text-sm font-medium"
                  >
                    Join Us
                  </button>
                  <button
                    onClick={handleLogin}
                    className="px-4 py-2 text-white bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg hover:bg-white/30 transition-colors text-sm font-medium"
                  >
                    Login
                  </button>
                </div>
              )}

              {/* Globe Icon Button */}
              <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center hover:bg-white/30 transition-colors">
                <FiGlobe className="w-5 h-5 text-white" />
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="lg:hidden">
          {isLoadings ? (
            <div className="w-7 h-7 skeleton-medium-gray" />
          ) : (
            <button
              onClick={toggleMenu}
              className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center"
            >
              <div className="relative">
                <div
                  className={`w-5 h-0.5 bg-white mb-1.5 transition-transform duration-300 ${
                    isMenuOpen ? "rotate-45 translate-y-2" : ""
                  }`}
                />
                <div
                  className={`w-5 h-0.5 bg-white mb-1.5 transition-opacity duration-300 ${
                    isMenuOpen ? "opacity-0" : "opacity-100"
                  }`}
                />
                <div
                  className={`w-5 h-0.5 bg-white mb-1.5 transition-transform duration-300 ${
                    isMenuOpen ? "-rotate-45 -translate-y-2" : ""
                  }`}
                />
              </div>
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
