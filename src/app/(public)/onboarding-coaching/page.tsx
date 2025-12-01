"use client";

import React from "react";
import CoachingOnboarding from "@/components/onboarding/onboarding-coaching/CoachingOnboarding";
import { Provider } from "react-redux";
import { store } from "@/lib/store";

const page = () => {
	return (
		<Provider store={store}>
			<CoachingOnboarding />
		</Provider>
	);
};

export default page;
