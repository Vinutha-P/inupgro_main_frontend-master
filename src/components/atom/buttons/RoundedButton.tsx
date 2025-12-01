import type { ButtonVariantProps } from "@/types";
import type React from "react";

const RoundedButton: React.FC<ButtonVariantProps> = ({
	buttonName,
	withBackground,
	width,
	height,
	fontBold,
	textColor,
	onClick,
	textSize,
	icon: Icon,
	disabled
}) => {
	return (
		<button
			type="button"
			onClick={onClick}
			disabled={disabled}
			className={`min-h-[2.37rem] min-w-fit px-2 flex items-center justify-between ${
				fontBold ? "font-semibold" : "font-normal"
			} ${
				withBackground
					? "text-white bg-primaryLight hover:bg-[#2a67a9]"
					: "text-darkText bg-softBlue hover:!text-white hover:bg-primaryOverlay"
			} rounded-lg hover:shadow-md ${textSize || ""}
			${disabled ? "opacity-80 cursor-not-allowed pointer-events-none" : ""}
			`}
			style={{ width, height, color: textColor }}
		>
			{Icon && <Icon className="text-sm" />}
			<span className="text-center mx-auto" style={{ fontSize: textSize }}>{buttonName}</span>
		</button>
	);
};

export default RoundedButton;
