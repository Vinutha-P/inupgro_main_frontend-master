"use client";

import PrincipalProfileForm from "@/components/onboarding/onboarding-coaching/PrincipalProfileForm";
import { store } from "@/lib/store";
import React, { Suspense } from "react";
import { Provider } from "react-redux";

const page = () => {
	return (
		<div>
			<Suspense fallback={<div>Loading...</div>}>
				<Provider store={store}>
					<PrincipalProfileForm />
				</Provider>
			</Suspense>
		</div >
	);
};

export default page;
