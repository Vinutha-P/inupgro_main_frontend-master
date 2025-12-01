import type React from "react";
import { useRouter } from "next/navigation";
import PrincipalForm from "../components/PrincipalForm";

function PrincipalProfileForm() {
	const router = useRouter();
	return (
		<PrincipalForm
			heading="Add Institute"
			localStorageKey="coaching-data"
			onPrevious={() => router.push("/onboarding-coaching/student-faculty")}
			onNext={() => router.push("/onboarding-coaching/clubs-gallery")}
		/>
	);
}

export default PrincipalProfileForm;
