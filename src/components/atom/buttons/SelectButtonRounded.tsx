import type { ButtonVariantProps } from "@/types";
import type React from "react";
import { FiChevronDown } from "react-icons/fi";

const SelectButtonRounded: React.FC<ButtonVariantProps> = ({
	fontBold,
	buttonName,
	width,
	isSelected,
	onClick,
}) => {
	return (
		<button
			type="button"
			onClick={onClick}
			// className={`h-[2.5rem]  min-w-28 px-2 flex-box-center gap-[0.625rem] text-brandPrimary bg-[#fff] font-semibold ${
			// 	fontBold ? "font-semibold" : "font-normal"
			// } hover:bg-darkBlue hover:text-white border border-brandSecondary rounded-lg`}
			// style={{ width }}
			className={`h-[2.5rem] min-w-[7rem] md:min-w-28 px-2 flex-box-center gap-[0.625rem] 
				font-semibold border border-brandSecondary rounded-lg transition-all 
				${isSelected ? "bg-darkBlue text-white" : "bg-white text-brandPrimary"}`}
			style={{ width }}
		>
			<span className="md:text-[0.95rem] text-[0.760rem] sm:text-[0.875rem]">{buttonName}</span>
			<FiChevronDown className="w-6 h-6 stroke-[1.5px] -ml-2" />
		</button>
	);
};

export default SelectButtonRounded;
