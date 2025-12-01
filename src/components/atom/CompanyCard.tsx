import Image from "next/image";
import React from "react";
import CompanyDemoimage from "@/assets/Comapny_Demo_Image.png";

interface CompanyCardProps {
  companyName: string;
  companyLogo: string;
}

const CompanyCard: React.FC<CompanyCardProps> = ({ companyName, companyLogo }) => {
  return (
    <div className="">
      <div className="px-4 pt-1 pb-2 flex flex-col items-center gap-[0.3125rem] border border-[#B2DDFF] rounded-lg">
        <div className="h-10 w-full">
          <Image
            width={0}
            height={0}
            sizes="100vw"
            src={companyLogo}
            alt="img-alt"
            className="w-full h-full object-contain"
          />
        </div>

        <p className="text-xs font-semibold text-deepBlue">{companyName}</p>
      </div>
    </div>
  );
};

export default CompanyCard;
