"use client";

import React from "react";
import { Provider } from "react-redux";
import { store } from "../../../../lib/store";
import ResetPasswordPage from "@/components/auth-pages/ResetPasswordPage";

const page = () => {
    return (
        <div>
            <Provider store={store}>
                <ResetPasswordPage />
            </Provider>
        </div>
    );
};

export default page;
