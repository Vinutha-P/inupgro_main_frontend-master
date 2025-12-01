"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import Modal from "@/components/atom/modals/WarningModal";
import ModalCard from "./auth-pages/update-profile-details/ModalCard";

const ROLE_REDIRECTS = {
  Student: "/student/book-library",
  Teacher: "/teacher-dashboard",
  Institution: "/dashboard",
};

type Role = keyof typeof ROLE_REDIRECTS;

const RouteGuard = ({
  children,
  allowedRoles,
}: {
  children: React.ReactNode;
  allowedRoles: Role[];
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, role, isValidating, user, token } = useSelector(
    (state: RootState) => state.auth
  );

  const [clientReady, setClientReady] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    setClientReady(true);
  }, []);

  useEffect(() => {
    if (!clientReady || isValidating) return;

    // 1. Check authentication
    if (!isAuthenticated || !token) {
      router.push("/login");
      return;
    }

    // 2. Handle role-specific redirect
    if (role && pathname === "/" && ROLE_REDIRECTS[role as keyof typeof ROLE_REDIRECTS]) {
      setShouldRedirect(true);
      return;
    }

    // 3. Check if role is allowed for current route group
    if (role && !allowedRoles.includes(role as Role)) {
      router.push("/unauthorized");
      return;
    }

    // 4. Check profile completion status
    if (role && user) {
      const profileComplete = user.isProfileCompleted ?? true;
      const profileRoute = `/student/profile`; // Adjust for other roles if needed

      if (!profileComplete && pathname !== profileRoute) {
        setShowProfileModal(true);
      }
    }
  }, [
    isAuthenticated,
    role,
    user,
    clientReady,
    router,
    allowedRoles,
    isValidating,
    pathname,
    token,
  ]);

  // Handle the redirect after state update
  useEffect(() => {
    if (shouldRedirect && role) {
      router.push(ROLE_REDIRECTS[role as Role]);
      setShouldRedirect(false);
    }
  }, [shouldRedirect, role, router]);


useEffect(() => {
  if (!clientReady || !user || !role) return;

  const profileComplete = user.isProfileCompleted ?? true;
  const profileRoute = `/student/profile`; // Adjust per role

  if (!profileComplete && pathname !== profileRoute) {
    setShowProfileModal(true);
  } else {
    setShowProfileModal(false);
  }
}, [user, role, pathname, clientReady, router]);

useEffect(() => {
  if (showProfileModal) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }

  return () => {
    document.body.style.overflow = "";
  };
}, [showProfileModal]);


  if (!clientReady || isValidating) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  
  const isProfileIncomplete =
    role && user && !(user.isProfileCompleted ?? true);
  const isOnProfileRoute = pathname === "/student/profile"; 

  return (
    <div className={isProfileIncomplete && showProfileModal ? "" : ""}>
      {showProfileModal && pathname !== "/student/profile" && (
        <>
          <div className="fixed top-0 inset-0 bg-black backdrop-blur-[4px] bg-opacity-50 z-40 pointer-events-auto w-full overflow-hidden h-screen" />
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  z-50">
            <ModalCard role={role} />
          </div>
        </>
      )}
      {children}
    </div>
  );
};

export default RouteGuard;
