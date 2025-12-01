"use client";

import ClubsAndGalleryForm from "@/components/onboarding/onboarding-school/ClubsAndGalleryForm";
import React from "react";
import { store } from "@/lib/store";
import { Provider } from "react-redux";

const page = () => {
	return (
		<Provider store={store}>
			<ClubsAndGalleryForm />
		</Provider>
	);
};

export default page;
