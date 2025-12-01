"use client";
import LoginFormPage from "@/components/auth-pages/LoginFormPage";
import React from "react";
import { Provider } from "react-redux";
import { store } from "../../../../lib/store";

const page = () => {
  return (
    <div>
      <Provider store={store}>
        <LoginFormPage />
      </Provider>
    </div>
  );
};

export default page;
