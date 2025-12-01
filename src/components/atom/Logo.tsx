"use client";
import Image from "next/image";
import React from "react";
import CompanyLogo from "@/assets/Logo_Header.png";
import { useRouter } from "next/navigation";

interface LogoProps {
	className?: string;
}

const Logo = ({
	className = "w-[7.375rem] min-h-7 lg:w-[8.5rem] lg:min-h-[1.5rem]",
}: LogoProps) => {
	const route = useRouter();
	const handleNaviagtion = () => {
		route.push("/find");
	};

	return (
		<div className="w-fit h-fit" onClick={handleNaviagtion}>
			<Image
				width={0}
				height={0}
				sizes="100vh"
				quality={100}
				src={CompanyLogo}
				alt="logo"
				className={className}
			/>
		</div>
	);
};

export default Logo;
