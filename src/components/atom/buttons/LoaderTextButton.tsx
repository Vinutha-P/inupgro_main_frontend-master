import type { ButtonVariantProps } from "@/types";
import type React from "react";

const LoaderTextButton: React.FC<ButtonVariantProps & { isLoading?: boolean }> = ({
  buttonName,
  withBackground,
  width,
  height,
  fontBold,
  textColor,
  onClick,
  textSize,
  icon: Icon,
  isLoading = false,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isLoading}  // Disable the button during loading
      className={`min-h-[2.37rem] min-w-fit px-4 flex items-center justify-center ${
        fontBold ? "font-semibold" : "font-normal"
      } ${
        withBackground
          ? "text-white bg-primaryLight hover:bg-[#2a67a9]"
          : "text-darkText bg-softBlue hover:!text-white hover:bg-primaryOverlay"
      } rounded-lg hover:shadow-md ${textSize || ""} disabled:opacity-60`}
      style={{ width, height, color: textColor }}
    >
      {/* Flex to show both loader and text */}
      <div className="flex items-center">
        {isLoading && (
          <div className="border-2 border-t-2 border-gray-200 border-t-primaryLight w-5 h-5 rounded-full animate-spin mr-2"></div>
        )}
        <span className="text-center mx-auto" style={{ fontSize: textSize }}>
          {buttonName}
        </span>
      </div>
    </button>
  );
};

export default LoaderTextButton;
