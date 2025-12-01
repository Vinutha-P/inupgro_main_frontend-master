"use client";

import { ReactNode, Suspense } from "react";
import RouteGuard from "@/components/RouteGuard";
import Header from "../../../components/organism/Header";
import { Provider } from "react-redux";
import ProfilePageTemplate from "../../../components/templates-profile-page/ProfilePageTemplate";
import Footer from "../../../components/organism/Footer";
import { store } from "../../../lib/store";

export default function TeacherLayout({ children }: { children: ReactNode }) {
  return (
    // <RouteGuard allowedRoles={['Teacher']}>
    <Suspense fallback={<div>Loading...</div>}>
      <Provider store={store}>
        <Header />
        <ProfilePageTemplate>
          {children}
        </ProfilePageTemplate>
        <Footer />
      </Provider>
    </Suspense>
    // </RouteGuard>
  );
}
