import type { TemplateDefaultProps } from "@/types";
import type React from "react";
import Header from "../organism/Header";


const PublicAuthPageTemplate: React.FC<
	React.PropsWithChildren<{ className?: string }>
> = ({ children, className }) => {
	return (
		<div className="">
			<Header />
			<main
				className={`w-full bg-white h-full ${className}`}
			>
				<div className={` ${className} max-w-[95rem] mx-auto bg-white `}>
					{children}
				</div>
			</main>

		</div>
	);
};

export default PublicAuthPageTemplate;
