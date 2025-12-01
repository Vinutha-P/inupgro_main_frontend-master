import React from "react";
import { useCreateSchoolMutation } from "@/features/api/schoolApiSlice";
import ClubsAndGallery from "../components/ClubsGalleryCommon";

const ClubsAndGalleryForm = () => {
	const [createSchool] = useCreateSchoolMutation();

	return (
		<ClubsAndGallery
		    heading="School"
			localStorageKey="school-data"
			submitFunction={createSchool}
			redirectPath="/find/school-detail"
			previousPath="/onboarding-school/principal-profile"
		/>
	);
};

export default ClubsAndGalleryForm;
