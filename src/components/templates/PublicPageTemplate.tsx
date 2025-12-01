import type { TemplateDefaultProps } from "@/types";
import type React from "react";
import Header from "../organism/Header";
import Footer from "../organism/Footer";

const PublicPageTemplate: React.FC<
	React.PropsWithChildren<{ className?: string }>
> = ({ children, className }) => {
	return (
		<div className="w-full flex flex-col items-center h-full">
			<Header />
			<main
				className={`w-full px-4 lg:px-20 custom-padding py-5 lg:py-10 h-full flex-box-center ${className}`}
			>
				<div className="w-full flex flex-col gap-3 lg:gap-5 max-w-[95rem] mx-auto ${className}">					
					{children}
				</div>
			</main>
			<Footer />
		</div>
	);
};

export default PublicPageTemplate;
