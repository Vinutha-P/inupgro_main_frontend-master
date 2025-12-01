"use client";

import ClubsAndGalleryForm from "@/components/onboarding/onboarding-college/ClubsAndGalleryForm";
import { store } from "@/lib/store";
import React from "react";
import { Provider } from "react-redux";

const page = () => {
	return (
		<Provider store={store}>
			<ClubsAndGalleryForm />
		</Provider>
	);
};

export default page;
