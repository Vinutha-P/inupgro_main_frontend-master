import React from "react";
import SocialMediaFollowButton from "../atom/buttons/SocialMediaFollowButton";
import {
  RiFacebookFill,
  RiInstagramLine,
  RiLinkedinFill,
  RiTwitterXFill,
} from "react-icons/ri";

const socialMediaLinks = [
  { icon: RiFacebookFill, link: "https://www.facebook.com/people/Inupgro/100093428230252/" },
  { icon: RiTwitterXFill, link: "https://x.com/INUPGRO1" },
  { icon: RiLinkedinFill, link: "https://www.linkedin.com/company/inupgro/posts/?feedView=all" },
  { icon: RiInstagramLine, link: "https://www.instagram.com/inupgro/" }
];

const SocialMedianButtonRow = ({ isLoadings }: { isLoadings: Boolean }) => {
  return (
    <>
      <div className="w-fit min-w-fit flex items-center justify-start gap-5">
        {isLoadings ? (
          socialMediaLinks.map((social, index) => (
            <div
              key={index}
              className="w-8 h-8 skeleton-medium-gray rounded-full"
            />
          ))
        ) : (
          socialMediaLinks.map((social, index) => (
            <SocialMediaFollowButton
              key={index}
              icon={social.icon}
              link={social.link}
            />
          ))
        )}
      </div>
    </>
  );
};

export default SocialMedianButtonRow;
