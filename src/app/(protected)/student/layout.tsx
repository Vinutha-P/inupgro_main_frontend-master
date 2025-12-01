"use client";

import { ReactNode, Suspense } from "react";
import RouteGuard from "@/components/RouteGuard";
import StudentDashboardHeader from "@/components/student/StudentDashboardHeader";
import Header from "../../../components/organism/Header";
import { Provider } from "react-redux";
import { store } from "../../../lib/store";

export default function StudentLayout({ children }: { children: ReactNode }) {
  return (
    <RouteGuard allowedRoles={["Student"]}>
      <Suspense fallback={<div>Loading...</div>}>
        <Provider store={store}>
          <Header />
          {children}
        </Provider>
      </Suspense>
    </RouteGuard>
  );
}
