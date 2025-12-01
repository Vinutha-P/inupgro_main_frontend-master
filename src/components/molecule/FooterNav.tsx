import Link from "next/link";
import React from "react";

interface FooterNavProps {
  data: { id: number; name: string; link: string }[];
  title: string;
  isLoadings: boolean;
}

const FooterNav: React.FC<FooterNavProps> = ({ data, title, isLoadings }) => {
  return (
    <div className="w-fit min-w-fit flex flex-col items-start gap-5">
      {isLoadings ? (
        <div className=" w-[80px] h-6 skeleton-medium-gray"></div>
      )
        : (
          <p className="font-bold text-white">{title}</p>
        )
      }
      <ul className="w-fit min-w-fit flex flex-col gap-5">
        {isLoadings
          ? data.map((obj) => (
            <li key={obj?.id} className="text-blueTint w-[75px] h-6 skeleton-medium-gray">
              <div className="h-[100%] w-[100%]" />
            </li>
          ))
          : data?.map((obj) => (
            <li key={obj?.id} className="text-[#E1EBFF]">
              {/* <Link href={obj.link} target="_blank" rel="noopener noreferrer"> */}
              <Link href={obj?.link || "/"} rel="noopener noreferrer">
                {obj?.name}
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default FooterNav;
