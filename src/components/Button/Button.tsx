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
/**
 * Button component with multiple visual variants and built-in loading/success states.
 *
 * @example
 * ```tsx
 * <Button design="primary" loading={isLoading}>
 *   Submit
 * </Button>
 * ```
 */
export interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
	/** Visual variant: `primary` for main actions, `secondary` for less emphasis, `text` for minimal style, `image` for icon-only, `call-to-action` for prominent CTAs */
	design?: "primary" | "secondary" | "text" | "image" | "call-to-action";
	/** Button size: `normal` (default) or `small` for compact layouts */
	size?: "small" | "normal";
	icon?: React.ReactElement;
	iconPosition?: "left" | "right";
	/** Shows animated loading spinner (Lottie animation) */
	loading?: boolean;
	disabled?: boolean;
	/** Triggers success animation (Lottie checkmark) */
	success?: boolean;
	/** Delay in milliseconds before showing loading animation */
	animationDelay?: number;
	/** Duration in milliseconds for success animation before callback */
	animationTime?: number;
	/** Time in seconds to display countdown on button */
	countdown?: number;
	/** Callback fired when success animation completes */
	onSuccess?: (success: boolean) => void;
	/** Callback fired when countdown reaches zero */
	onCountdownEnd?: () => void
}
