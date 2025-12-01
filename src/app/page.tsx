"use client";
import FindPage from "@/components/pages/FindPage";
import { store } from "@/lib/store";
import React from "react";
import { Provider } from "react-redux";

const page = () => {
	return (
		<div>
			<Provider store={store}>
				<FindPage />
			</Provider>
		</div>
	);
};

export default page;
