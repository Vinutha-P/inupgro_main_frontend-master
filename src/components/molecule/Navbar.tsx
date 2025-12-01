import React from "react";
import NavbarLink from "../atom/NavBarLinks";
import { usePathname } from "next/navigation"; // ✅ Step 1

// const Links = [
// 	{ id: 1, name: "Find", link: "/find" },
// 	{ id: 2, name: "Educational News", link: "/educational_news" },
// 	{ id: 3, name: "Inspiration", link: "/inspiration" },
// 	{ id: 4, name: "Careers", link: "/careers" },
// ];

const Navbar = ({
	isOpen,
	isLoading,
	Links,
	isOnboarding = false
}: { isOpen: boolean; isLoading: boolean, Links: any, isOnboarding?: boolean }) => {
	const pathname = usePathname(); // ✅ Step 2

	return (
		<ul
			className={`w-fit min-w-fit h-fit flex flex-col lg:flex-row items-center justify-center gap-5 transition-all duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
				} lg:flex-row`}
		>
			{isLoading ? (
				Links?.map((obj:any) => (
					<div
						key={obj?.id}
						className="lg:w-[90px] lg:h-[40px] sekleton-medium-gray"
					/>
				))
			) : (
				<>
					{Links?.map((obj:any) => (
						<NavbarLink
							key={obj?.id}
							name={obj?.name}
							link={obj?.link}
							active={pathname === obj?.link} // ✅ Step 3
							disabled={isOnboarding}
						/>
					))}
				</>
			)}
		</ul>
	);
};

export default Navbar;
