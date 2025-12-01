import type React from "react";
import { useRouter } from "next/navigation";
import PrincipalForm from "../components/PrincipalForm";

function PrincipalProfileForm() {
	const router = useRouter();
	return (
		<PrincipalForm
			heading="Add College"
			localStorageKey="college-data"
			onPrevious={() => router.push("/onboarding-college/faculties-facilities")}
			onNext={() => router.push("/onboarding-college/workshop-placements-campus")}
		/>
	);
}

export default PrincipalProfileForm;
