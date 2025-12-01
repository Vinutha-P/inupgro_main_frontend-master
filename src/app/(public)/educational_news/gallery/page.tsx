"use client";
import NewsPhotosVideoPage from "@/components/pages/NewsPhotosVideoPage";
import { store } from "@/lib/store";
import React from "react";
import { Provider } from "react-redux";

const page = () => {
	return (
		<div>
			<Provider store={store}>
				<NewsPhotosVideoPage />
			</Provider>
		</div>
	);
};

export default page;
