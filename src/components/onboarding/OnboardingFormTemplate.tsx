import type React from "react";
import ProfileProgressCard from "./ProfileProgressCard";
import Sidebar from "./Sidebar";
import Header from "../organism/Header";
import Footer from "../organism/Footer";

const OnboardingFormTemplate: React.FC<
	React.PropsWithChildren<{ className?: string }>
> = ({ children, className }) => {
	return (
		<div className="">
			<Header />
			<div className="flex gap-5 p-20">
				<Sidebar />
				<div className={`w-[75%] rounded-xl ${className}`}>{children}</div>
				<ProfileProgressCard />
			</div>
			<Footer />
		</div>
	);
};

export default OnboardingFormTemplate;
