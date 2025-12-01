import React from "react";
import { useCreateCollegeMutation } from "@/features/api/collegeApiSlice";
import ClubsAndGallery from "../components/ClubsGalleryCommon";

const ClubsAndGalleryForm = () => {
    const [createCollege] = useCreateCollegeMutation();

    return (
        <ClubsAndGallery
            heading="College"
            localStorageKey="college-data"
            submitFunction={createCollege}
            redirectPath="/find/college-detail"
            previousPath="/onboarding-college/workshop-placements-campus"
        />
    );
};

export default ClubsAndGalleryForm;
