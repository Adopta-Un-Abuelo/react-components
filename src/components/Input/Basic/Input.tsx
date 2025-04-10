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
export type InputProps = (
	| InputPrimaryProps
	| InputSecondaryProps
	| InputThirdProps
) & {
	type?: "text" | "email" | "date" | "password" | "time" | "number";
};
