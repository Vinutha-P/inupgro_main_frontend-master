"use client";
import React from "react";
import { Provider } from "react-redux";
import { store } from "@/lib/store";
import FindCoachingPage from "@/components/pages/FindCoachingPage";
const page = () => {
	return (
		<Provider store={store}>
			<FindCoachingPage />
		</Provider>
	);
};

export default page;
