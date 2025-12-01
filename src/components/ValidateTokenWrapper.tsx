"use client";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { usePathname, useRouter } from "next/navigation";
import { RootState } from "@/lib/store";
import {
  validateCredentialsStart,
  validateCredentialsSuccess,
  validateCredentialsFailure,
} from "@/features/auth/authSlice";
import { useGetTeacherProfileQuery } from "@/features/api/teacherApiSlice";
import { useGetStudentProfileQuery } from "@/features/api/studentsApiSlice";
import { useGetInstituteProfileQuery } from "@/features/api/academicInstitutes";

const publicRoutes = [
  "/",
  "/find",
  "/find/", // for subpaths
  "/educational_news",
  "/educational_news/",
  "/inspiration",
  "/inspiration/",
  "/careers",
  "/careers/",
  "/careers/[slug]", // optional
  "/login",
  "/register",
  "/forgot-password",
  "/about-us",
  "/disclaimer",
  "/contact-us",
  "/privacy-policy",
  "/terms-conditions"
];

const ValidateTokenWrapper = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const token = useSelector((state: RootState) => state.auth.token);
  const role = useSelector((state: RootState) => state.auth.role);
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const isValidating = useSelector(
    (state: RootState) => state.auth.isValidating
  );

  // State to track if we're in the browser (client-side)
  const [mounted, setMounted] = useState(false);
  // Function to check if the current path is public
  const isPublicPath = (path: string) => {
    return publicRoutes.some((route) => {
      const cleanedRoute = route.replace(/\[.*?\]/g, ""); // remove dynamic [slug]
      return path === cleanedRoute || path.startsWith(cleanedRoute + "/");
    });
  };

  // Set mounted to true only on the client
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const isPublic = isPublicPath(pathname);

    if (isPublicPath(pathname)) {
      return;
    }

     if (!isPublic && (!isAuthenticated || !token)) {
      router.push("/login");
    }
  }, [pathname, mounted, isAuthenticated, token, isValidating, router]);

  // Fetch profile data based on role, but only if mounted (client-side)
  const {
    data: teacherProfile,
    error: teacherError,
    isLoading: teacherLoading,
  } = useGetTeacherProfileQuery(undefined, {
    skip: !mounted || role !== "Teacher",
  });

  const {
    data: studentProfile,
    error: studentError,
    isLoading: studentLoading,
  } = useGetStudentProfileQuery(undefined, {
    skip: !mounted || role !== "Student",
  });

  const {
    data: instituteProfile,
    error: instituteError,
    isLoading: instituteLoading,
  } = useGetInstituteProfileQuery(undefined, {
    skip: !mounted || role !== "Institution",
  });

  useEffect(() => {
    if (!mounted) return; // Skip validation on the server
    if (!token || isAuthenticated || isValidating) return;

    dispatch(validateCredentialsStart());

    if (role === "Teacher") {
      if (teacherProfile) {
        dispatch(validateCredentialsSuccess({ user: teacherProfile }));
      } else if (teacherError) {
        dispatch(
          validateCredentialsFailure(
            (teacherError as any).message || "Failed to fetch teacher profile"
          )
        );
        router.push("/login");
      }
    } else if (role === "Student") {
      if (studentProfile) {
        dispatch(validateCredentialsSuccess({ user: studentProfile }));
      } else if (studentError) {
        dispatch(
          validateCredentialsFailure(
            (studentError as any).message || "Failed to fetch student profile"
          )
        );
        router.push("/login");
      }
    } else if (role === "Institution") {
      if (instituteProfile) {
        dispatch(validateCredentialsSuccess({ user: instituteProfile }));
      } else if (instituteError) {
        dispatch(
          validateCredentialsFailure(
            (instituteError as any).message ||
            "Failed to fetch institute profile"
          )
        );
        router.push("/login");
      }
    } else {
      dispatch(validateCredentialsFailure("Invalid user role"));
      router.push("/login");
    }
  }, [
    mounted,
    token,
    role,
    isAuthenticated,
    isValidating,
    teacherProfile,
    teacherError,
    studentProfile,
    studentError,
    instituteProfile,
    instituteError,
    dispatch,
    router,
  ]);



  // Optionally, show a loading state during validation (uncomment if needed)
  if (isValidating || teacherLoading || studentLoading || instituteLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return <>{children}</>;
};

export default ValidateTokenWrapper;