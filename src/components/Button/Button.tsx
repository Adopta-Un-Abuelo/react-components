import React, { ComponentPropsWithoutRef } from "react";

import ButtonPrimary from "./ButtonPrimary";
import ButtonSecondary from "./ButtonSecondary";
import ButtonText from "./ButtonText";
import ButtonImage from "./ButtonImage";
import CallToAction from "./CallToAction";

const Button = ({ design, onSuccess, ...restProps }: ButtonProps) => {
	return design === "secondary" ? (
		<ButtonSecondary onSuccess={onSuccess} {...restProps} />
	) : design === "text" ? (
		<ButtonText {...restProps} />
	) : design === "image" ? (
		<ButtonImage {...restProps} />
	) : design === "call-to-action" ? (
		<CallToAction {...restProps} />
	) : (
		<ButtonPrimary onSuccess={onSuccess} {...restProps} />
	);
};
export default Button;
export interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
	design?: "primary" | "secondary" | "text" | "image" | "call-to-action";
	size?: "small" | "normal";
	icon?: React.ReactElement;
	iconPosition?: "left" | "right";
	loading?: boolean;
	disabled?: boolean;
	success?: boolean;
	animationDelay?: number;
	animationTime?: number;
	countdown?: number;
	onSuccess?: (success: boolean) => void;
	onCountdownEnd?: () => void
}
