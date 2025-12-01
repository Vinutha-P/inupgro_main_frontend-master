import React from "react";
import { RxHamburgerMenu } from "react-icons/rx";

const HamburgerMenu = ({
	onClick,
	isOpen,
}: { onClick: () => void; isOpen: boolean }) => {
	return (
		<button type="button" onClick={onClick} className="relative z-80 mt-3">
			<div
				className={`w-6 h-0.5 bg-slate-600 mb-1.5 transition-transform duration-300 ${isOpen ? "rotate-45 translate-y-2" : ""}`}
			/>
			<div
				className={`w-6 h-0.5 bg-slate-600 mb-1.5 transition-opacity duration-300 ${isOpen ? "opacity-0" : "opacity-100"}`}
			/>
			<div
				className={`w-6 h-0.5 bg-slate-600 mb-1.5 transition-transform duration-300 ${isOpen ? "-rotate-45 -translate-y-2" : ""}`}
			/>
		</button>
	);
};

export default HamburgerMenu;
