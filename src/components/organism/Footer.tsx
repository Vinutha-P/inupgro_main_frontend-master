'use client';
import React, { useEffect, useState } from "react";
import FooterCompanyIntro from "../molecule/FooterCompanyIntro";
import FooterNav from "../molecule/FooterNav";
import SocialMedianButtonRow from "../molecule/SocialMedianButtonRow";

const NavData1 = [
	{
		id: 1,
		name: "About Us",
		link: "/about-us",
	},
	{
		id: 2,
		name: "Disclaimer",
		link: "/disclaimer",
	},
]; 

const NavData2 = [
	{
		id: 1,
		name: "Contact Us",
		link: "/contact-us",
	},
	{
		id: 2,
		name: "Privacy Policy",
		link: "/privacy-policy",
	},
	{
		id: 3,
		name: "Terms & Conditions",
		link: "/terms-conditions",
	},
];

const Footer = () => {
	const [isLoadings, setIsLoadings] = useState(true);

	useEffect(() => {
		setTimeout(() => {
			setIsLoadings(false);
		}, 1000);
	}, []);
	return (
		<footer className={`w-full h-fit px-5 lg:px-20 py-10 flex  justify-center ${isLoadings ? "sekleton-light-gray" : "bg-deepBlue"}`}>
			<div className="w-full max-w-[95rem] flex flex-col items-center lg:gap-[3.19rem]">
				<div className="w-full flex flex-col lg:flex-row lg:justify-between gap-11">
					<FooterCompanyIntro
						isLoadings={isLoadings}
					/>


					<div className="w-full lg:w-fit min-w-fit flex items-start justify-between md:justify-center md:gap-[7.875rem]">
						<FooterNav data={NavData1} title="Company" isLoadings={isLoadings} />
						<FooterNav data={NavData2} title="Help & Support" isLoadings={isLoadings} />
					</div>
				</div>
				<div className="w-full flex-box-center lg:justify-start mt-12 mb-3 lg:mt-0 lg:mb-0">
					<SocialMedianButtonRow
						isLoadings={isLoadings}
					/>
				</div>
				<hr className={`w-full hidden lg:block ${isLoadings ? "border-gray-300 animate-pulse" : "!border-[#FFFFFF40]"}`} />
				<div className="w-full flex flex-col lg:flex-row items-center lg:justify-between gap-3 text-blueTint">
					{isLoadings ? (<p className="w-[250px] h-6 skeleton-medium-gray"></p>)
						: (<p>Inupgro 2025. All rights reserved</p>)
					}
					{/* {isLoadings ? (<p className="w-[250px] h-6 skeleton-medium-gray"></p>)
						: (<p>Terms & Privacy</p>)
					} */}



				</div>
			</div>
		</footer >
	);
};

export default Footer;
