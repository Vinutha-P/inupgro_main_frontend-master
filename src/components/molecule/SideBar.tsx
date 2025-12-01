import React from "react";
import Navbar from "../molecule/Navbar";
import RoundedButton from "../atom/buttons/RoundedButton";

const Links = [
	{ id: 1, name: "Find", link: "/find" },
	{ id: 2, name: "Educational News", link: "/educational_news" },
	{ id: 3, name: "Inspiration", link: "/inspiration" },
	{ id: 4, name: "Careers", link: "/careers" },
];

const Sidebar = ({
	isOpen,
	toggle,
	isOnboarding = false
}: { isOpen: boolean; toggle: () => void, isOnboarding?: boolean }) => {
	return (
		<div
			className={`fixed top-0 left-0 h-full w-[80vw] bg-white shadow-lg z-40 transition-transform duration-300 ease-in-out ${
				isOpen ? "translate-x-0" : "-translate-x-full"
			} lg:hidden`}
		>
			<div className="p-4 flex flex-col gap-8 items-center justify-center">
				<Navbar isOpen={isOpen} isLoading={false} Links={Links} isOnboarding={isOnboarding}/>
			</div>
			<div className="flex flex-col items-center gap-4 mt-10 w-full">
				<RoundedButton withBackground={false} buttonName="Join Us" />
				<RoundedButton withBackground={true} buttonName="Login" />
			</div>
			<div className="absolute bottom-0 w-full p-4 text-center text-gray-600 border-t border-gray-200">
				<p>Inupgro 2025. All rights reserved</p>
			</div>
		</div>
	);
};

export default Sidebar;
