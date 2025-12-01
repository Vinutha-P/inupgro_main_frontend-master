"use client";
import React from "react";
import FindSchoolPage from "@/components/pages/FindSchoolPage";
import { Provider } from "react-redux";
import { store } from "@/lib/store";
const page = () => {
	return (
		<Provider store={store}>
			<FindSchoolPage />
		</Provider>
	);
};

export default page;
