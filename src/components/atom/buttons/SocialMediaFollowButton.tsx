import { IconButtonProps } from "@/types";
import Link from "next/link";
import React from "react";

const SocialMediaFollowButton: React.FC<IconButtonProps> = ({
  icon: Icon,
  link,
}) => {
  return (
    <Link href={link || "/"} target="_blank" rel="noopener noreferrer">
      <button className="w-8 h-8 flex-box-center border-2 border-white rounded-full bg-transparent">
        <Icon className="w-[1.125rem] h-[1.125rem] fill-white" />
      </button>
    </Link>
  );
};

export default SocialMediaFollowButton;
