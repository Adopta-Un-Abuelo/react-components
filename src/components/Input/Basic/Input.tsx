import { forwardRef, Ref } from "react";
import InputPrimary, { InputPrimaryProps } from "./InputPrimary";
import InputSecondary, { InputSecondaryProps } from "./InputSecondary";
import InputThird, { InputThirdProps } from "./InputThird";

const Input = forwardRef((props: InputProps, ref: Ref<HTMLInputElement>) => {
	return props.design === "primary" ? (
		<InputPrimary {...props} ref={ref} />
	) : props.design === "secondary" ? (
		<InputSecondary {...props} ref={ref} />
	) : props.design === "third" ? (
		<InputThird {...props} ref={ref} />
	) : (
		<InputSecondary {...props} design="secondary" ref={ref} />
	);
});

export default Input;
/**
 * Text input component with three visual design variants.
 * Supports all native HTML input attributes plus custom styling and error handling.
 *
 * @example
 * ```tsx
 * <Input
 *   design="secondary"
 *   placeholder="Enter your email"
 *   error="Invalid email format"
 * />
 * ```
 */
export type InputProps = (
	| InputPrimaryProps
	| InputSecondaryProps
	| InputThirdProps
) & {
	/** Input type: determines keyboard type and validation on mobile devices */
	type?: "text" | "email" | "date" | "password" | "time" | "number";
};
