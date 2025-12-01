"use client";

import React from "react";
import { Provider } from "react-redux";
import { store } from "../../../../lib/store";
import ForgotPasswordPage from "@/components/auth-pages/ForgotPasswordPage";

const page = () => {
    return (
        <div>
            <Provider store={store}>
                <ForgotPasswordPage />
            </Provider>
        </div>
    );
};

export default page;
