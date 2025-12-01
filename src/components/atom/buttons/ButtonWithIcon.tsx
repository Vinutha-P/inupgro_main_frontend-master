import { ButtonVariantProps } from "@/types";
import React from "react";

const ButtonWithIcon: React.FC<ButtonVariantProps> = ({
  height,
  width,
  buttonName,
  icon: Icon,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className="min-w-fit min-h-[2.5rem] flex-box-center text-primaryLight border border-primaryLight gap-2 rounded-lg"
      style={{ height, width }}
    >
      {Icon && <Icon className="w-5 h-5" />}
      <span className="font-semibold">{buttonName}</span>
    </button>
  );
};

export default ButtonWithIcon;
