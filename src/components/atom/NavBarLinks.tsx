import Link from "next/link";
import React from "react";

interface NavbarLinkProps {
  name: string;
  link: string;
  active: boolean;
  disabled?: boolean;
}

const NavbarLink: React.FC<NavbarLinkProps> = ({ name, link, active, disabled }) => {
  if (disabled) {
    return (
      <li className={`opacity-50 cursor-not-allowed ${active ? "font-semibold" : "text-grayDark"}`}>
        <span>{name}</span>
      </li>
    );
  }
  return (
    <li className={` ${active ? "font-semibold" : "text-grayDark"}`}>
      <Link href={link  || "/"}>{name}</Link>
    </li>
  );
};

export default NavbarLink;
