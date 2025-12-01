'use client'
import { useState, useEffect } from "react";
import type { TemplateDefaultProps } from "@/types";
import type React from "react";
import Header from "../organism/Header";
import DashboardSidebar from "../dashboard/DashboardSidebar";
import { useRouter } from "next/navigation";

const DashboardPageTemplate: React.FC<
	React.PropsWithChildren<{ className?: string }>
> = ({ children, className }) => {
	const [collapsed, setCollapsed] = useState(false);
	const [showPopup, setShowPopup] = useState(false);

	const toggleSidebar = () => setCollapsed(!collapsed);
	const router = useRouter()

	useEffect(() => {
		const skipped = localStorage.getItem("onboarding_skipped");
		const formCompleted = localStorage.getItem("form_completed");
		const isLoggedIn = localStorage.getItem("logged_in");
		if (isLoggedIn === "true") {
			setShowPopup(false); 
			return; // Stop here
		}
		if (skipped === "true" && formCompleted !== "true") {
			setShowPopup(true); // Show popup to complete forms
		}
	}, []);

	const handleCompleteClick = () => {
		let data = localStorage.getItem("selected_type")
		setShowPopup(true);
		if (data) {
			let type = data?.toLocaleLowerCase();
			router.push(`/onboarding-${type}`);
		}
	};
	return (
		<div className="flex h-screen overflow-hidden p-12 bg-[#EDF3FF]">

			<DashboardSidebar collapsed={collapsed} toggleSidebar={toggleSidebar} />
			<main className={`flex-1 ml-${collapsed ? '80px' : '256px'}  overflow-y-auto no-scrollbar`}>
				{children}
			</main>
			{showPopup && (
				<div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
					<div className="bg-white p-6 rounded-xl w-[90%] max-w-md shadow-lg text-center">
						<h2 className="text-xl font-semibold mb-2">Complete Your Onboarding</h2>
						<p className="mb-4">Please fill all the required details to access the full dashboard.</p>
						<button
							className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
							onClick={handleCompleteClick}
						>
							Complete Now
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default DashboardPageTemplate;
