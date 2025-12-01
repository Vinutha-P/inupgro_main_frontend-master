import React from "react";
import { BiGridAlt } from "react-icons/bi";
import { CgFileDocument } from "react-icons/cg";
import { FiBriefcase } from "react-icons/fi";
import { LuMessageCircleQuestion, LuSettings } from "react-icons/lu";
import { PiGraduationCapBold } from "react-icons/pi";

const Sidebar = () => {
	return (
		<div className="w-[5%] bg-white rounded-xl shadow-md p-5 h-[85vh]">
			<div className="mb-10">
				<img src="/Logo_admin.png" alt="Logo" className="" />
			</div>

			<nav className="flex flex-col items-center space-y-6">
				<BiGridAlt className="w-5 h-5 text-gray-600" />
				<PiGraduationCapBold className="w-5 h-5 text-gray-600" />
				<FiBriefcase className="w-5 h-5 text-gray-600" />
				<CgFileDocument className="w-5 h-5 text-gray-600" />
				<LuMessageCircleQuestion className="w-5 h-5 text-gray-600" />
				<LuSettings className="w-5 h-5 text-gray-600" />
			</nav>
		</div>
	);
};

export default Sidebar;
