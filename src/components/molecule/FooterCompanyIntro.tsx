'use client';
import Image from "next/image";
import React, { useEffect, useState } from "react";
import FooterLogo from "@/assets/Logo_Footer.png";
import SocialMedianButtonRow from "./SocialMedianButtonRow";

const FooterCompanyIntro = ({ isLoadings }: { isLoadings: boolean }) => {

  return (
    <div className="w-full min-w-fit flex flex-col  lggap-11">
      <div className="">
        {isLoadings ? (
          <div className="w-[200px] h-10 skeleton-medium-gray mb-4" />
        ) : (
          <Image
            width={0}
            height={0}
            sizes="100vh"
            src={FooterLogo}
            alt="Inupgro"
            className="w-[12.5rem] h-[2.5rem] md:mx-auto lg:mx-0 mb-4"
          />
        )}
        {isLoadings ? (
          <div className="pb-3 max-w-[32.5rem] h-[72px] skeleton-medium-gray" />
        ) : (
          <p className="text-white pb-3 max-w-[32.5rem] md:mx-auto lg:mx-0 md:text-[1rem] md:text-center lg:text-left text-[0.875rem]">
            Inupgro is a dynamic community dedicated to helping students advance
            their careers by providing comprehensive digital solutions, including
            a vast library of e-books.
          </p>
        )}

      </div>
      {/* <div className="w-fit h-fit hidden lg:flex">
        <SocialMedianButtonRow />
      </div> */}
    </div>
  );
};

export default FooterCompanyIntro;
