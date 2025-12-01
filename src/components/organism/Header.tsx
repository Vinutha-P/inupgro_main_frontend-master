"use client";
import React, { useState, useEffect, use } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import Logo from "../atom/Logo";
import Navbar from "../molecule/Navbar";
import HamburgerMenu from "../molecule/HamburgerMenu";
import RoundedButton from "../atom/buttons/RoundedButton";
import IconText from "../atom/IconText";
import { IoLocationOutline } from "react-icons/io5";
import Sidebar from "../molecule/SideBar";
import { useRouter, usePathname } from "next/navigation";
import { FaPersonDotsFromLine } from "react-icons/fa6";
import authenticatedUserIcon from "@/assets/Authenticated-userIcon.png";
import notificationIcon from "@/assets/Notifications-icon.png";
import Image from "next/image";
import { logout } from "@/features/auth/authSlice";
import { useLogoutMutation } from "../../features/api/authApiSlice";
import Link from "next/link";
const Links = [
	{ id: 1, name: "Find", link: "/find" },
	{ id: 2, name: "Educational News", link: "/educational_news" },
	{ id: 3, name: "Inspiration", link: "/inspiration" },
	{ id: 4, name: "Careers", link: "/careers" },
];
const Header = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoadings, setIsLoadings] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [logoutError, setLogoutError] = useState<string | null>(null);

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
    "/onboarding-coaching/coaching-details"
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
    };

    if (isDropdownOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isDropdownOpen]);

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
      setLogoutError(null);
      setIsDropdownOpen(false);
      localStorage.removeItem("logged_in")
      localStorage.removeItem("onboarding_skipped")
      localStorage.removeItem("payment_successfull")
      localStorage.removeItem("institute-register-address")
      localStorage.removeItem("institute-register")
      localStorage.removeItem("selected_type")

      if (!refreshToken) {
        throw new Error("No refresh token available");
      }

      await logoutMutation({ refreshToken }).unwrap();
    } catch (err: any) {
      setLogoutError(err.message || "Failed to logout");
      console.error("Logout error:", err);
    }
  };

  return (
    <header
      className={`w-full h-[4rem] md:h-[5rem] px-5 lg:px-20 sticky top-0 left-0 flex-box-center z-[9999999]  ${
        isLoadings
          ? "sekleton-light-gray"
          : "bg-white shadow-[0px_1px_4px_0px_#0000000F]"
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
      <Sidebar isOpen={isMenuOpen} toggle={toggleMenu} isOnboarding={isOnboarding} />
      <nav className="w-full max-w-[95rem] flex items-center justify-between">
        <div className="w-fit min-w-fit h-fit min-h-fit flex items-center gap-2">
          {isLoadings ? (
            <div className="w-[120px] h-[28px] lg:w-[120px] lg:h-[40px] skeleton-medium-gray" />
          ) : (
            <Logo />
          )}
          {isLoadings ? (
            <div className="w-[100px] h-[28px] lg:w-[160px] lg:h-[40px] skeleton-medium-gray" />
          ) : (
            <IconText
              icon={IoLocationOutline}
              text="Jaipur, Rajasthan"
              textColor="#444444"
              fill="#666666"
            />
          )}
        </div>
        <div className="w-full hidden lg:flex-box-center">
          <Navbar isOpen={isMenuOpen} isLoading={isLoadings} Links={Links} isOnboarding={isOnboarding}/>
        </div>
        <div className="w-fit min-w-fit hidden lg:flex items-center justify-end gap-4">
          {isLoadings ? (
            <div className="w-[100px] h-[40px] skeleton-medium-gray" />
          ) : isAuthenticated ? (
            <Image
              src={notificationIcon}
              className="mr-2 cursor-pointer"
              width={24}
              height={24}
              alt="Notification icon"
            />
          ) : (
            <RoundedButton
              withBackground={false}
              buttonName="Join Us"
              onClick={handleRegister}
            />
          )}

          {isLoadings ? (
            <div className="w-[100px] h-[40px] skeleton-medium-gray" />
          ) : isAuthenticated ? (
            <div className="relative">
              <Image
                id="profile-image"
                src={user?.profilePic || authenticatedUserIcon}
                className="cursor-pointer rounded-full border"
                width={56}
                height={56}
                alt="suer"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              />
              {isDropdownOpen && (
                <div
                  id="profile-dropdown"
                  className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50"
                >
                  {role == "Student"  && (
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
            <RoundedButton
              withBackground={true}
              buttonName="Login"
              onClick={handleLogin}
            />
          )}
        </div>
        <div className="lg:hidden">
          {isLoadings ? (
            <div className="w-7 h-7 skeleton-medium-gray" />
          ) : (
            <HamburgerMenu onClick={toggleMenu} isOpen={isMenuOpen} />
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
