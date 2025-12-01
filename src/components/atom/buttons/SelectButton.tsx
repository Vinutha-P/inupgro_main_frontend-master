import { ButtonVariantProps } from "@/types";
import React from "react";
import { FiChevronDown } from "react-icons/fi";

const SelectButton:React.FC<ButtonVariantProps> = ({fontBold,buttonName,withBackground,width}) => {
  return (
    <button
      className={`h-[3rem] px-4 flex-box-center gap-[0.625rem] ${
        fontBold ? "font-semibold" : "font-normal"
      } ${
        withBackground
          ? "text-white bg-primaryOverlay"
          : "text-brandSecondary bg-softBlue"
      } border border-brandSecondary rounded-lg`}
      style={{ width }}
    >
      <span>{buttonName}</span>
      <FiChevronDown className="w-6 h-6 stroke-[3px]"/>
    </button>
  );
};

export default SelectButton;
