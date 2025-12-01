import type { Url } from "next/dist/shared/lib/router/router";
import type { IconType } from "react-icons";

export interface ButtonsProps {
	buttonName: string;
	click?: string;
	isSelected?: boolean;
	onClick?: () => void;
}

export interface ButtonVariantProps extends ButtonsProps {
	withBackground?: boolean;
	width?: string;
	height?: string;
	fontBold?: boolean;
	textColor?: string;
	icon?: IconType;
	onClick?: () => void;
	textSize?: string;	
	disabled?: boolean;	
}

export interface IconButtonProps {
	buttonName?: string;
	icon: IconType;
	link: Url;
}
