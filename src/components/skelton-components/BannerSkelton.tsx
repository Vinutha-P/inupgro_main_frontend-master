"use client";
import React from "react";
import OrganisationDetailCard from "@/components/molecule/OrganisationDetailCard";
import Chips from "@/components/atom/Chips";
import RoundedButton from "@/components/atom/buttons/RoundedButton";
import Image from "next/image";

const BannerSkelton = ({ details }: any) => {

  return (
    <>
  
  <div
      className="w-full h-auto min-h-[15rem] lg:h-[24rem] p-2 md:p-5 flex flex-col justify-between bg-cover bg-center bg-lightBorder rounded-lg left-part"
   
    >
      <div className="w-full flex-box-between">
        <p className="text-base md:text-xl font-semibold text-white bg-white w-[168px] h-[11px] rounded-[11px]"></p>
        <p className="text-base md:text-xl font-semibold text-white bg-white w-[111px] h-[26px] rounded-[11px]"></p>
      </div>
      <div className="w-full hidden lg:flex items-end justify-between">
       <div
           className="w-fit min-h-[8.75rem] bg-softBlue h-fit p-2 lg:p-5 flex items-center gap-5 rounded-lg bg-overlayWhite"
         >
           <div className="w-fit h-fit bg-panelGray rounded-lg w-[100px] h-[100px]">
            
           </div>
           <div className="sm:min-w-fit max-w-[40rem] flex flex-col gap-2">
             {/* <h4 className="text-xl lg:text-[1.75rem] font-semibold text-deepBlue w-[321px] h-[16px]  bg-mutedGray rounded-[16px]"> */}
             <h4 className="w-[321px] h-[16px]  bg-mutedGray rounded-[16px]">
              
             </h4>
            <div className="flex items-center mt-4">
            <div className="w-[182px] h-[9px]  bg-mutedGray rounded-[16px] mr-4">  
             </div>
             <div className="w-[92px] h-[9px]  bg-mutedGray rounded-[16px]">  
             </div>
            </div>

            <div className="flex items-center mt-4">
            <div className="w-[16px] h-[7px]  bg-mutedGray rounded-[16px] mr-4">  
             </div>
             <div className="w-[44px] h-[7px]  bg-mutedGray rounded-[16px]">  
             </div>
            </div>
           </div>
         </div>
        <div className="w-[148px] h-[48px] bg-mutedGray rounded-[8px]">
        </div>
      </div>
    </div>
    </>
  );
};

export default BannerSkelton;
