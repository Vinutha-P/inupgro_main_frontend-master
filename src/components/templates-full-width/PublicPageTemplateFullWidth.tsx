import type { TemplateDefaultProps } from "@/types";
import type React from "react";
import Header from "../organism/Header";
import Footer from "../organism/Footer";

const PublicPageTemplateFullWidth: React.FC<
	React.PropsWithChildren<{ className?: string }>
> = ({ children, className }) => {
	return (
		<div className="w-full flex flex-col items-center h-full">
			<Header />
			<main
				className={`w-full h-full flex-box-center bg-white ${className}`}
			>
				<div className=" ${className} w-full">
					{children}
				</div>
			</main>
			<Footer />
		</div>
	);
};

export default PublicPageTemplateFullWidth;
