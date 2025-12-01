"use client";

import CollegeOnboarding from "@/components/onboarding/onboarding-college/CollegeOnboarding";
import React from "react";
import { store } from "@/lib/store";
import { Provider } from "react-redux";

const page = () => {
    return (
        <Provider store={store}>
            <CollegeOnboarding />
        </Provider>
    );
};

export default page;
