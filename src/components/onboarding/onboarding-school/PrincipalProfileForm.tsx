import type React from "react";
import { useRouter } from "next/navigation";
import PrincipalForm from "../components/PrincipalForm";

function PrincipalProfileForm() {
	const router = useRouter();
	return (
		<PrincipalForm
			heading="Add School"
			localStorageKey="school-data"
			onPrevious={() => router.push("/onboarding-school/result-display")}
			onNext={() => router.push("/onboarding-school/clubs-gallery")}
		/>
	);
}

export default PrincipalProfileForm;
