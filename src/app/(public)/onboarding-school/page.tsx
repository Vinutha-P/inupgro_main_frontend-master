"use client";

import SchoolOnboarding from "@/components/onboarding/onboarding-school/SchoolOnboarding";
import React from "react";
import { store } from "@/lib/store";
import { Provider } from "react-redux";

const page = () => {
	return (
		<Provider store={store}>
			<SchoolOnboarding />
		</Provider>
	);
};

export default page;
