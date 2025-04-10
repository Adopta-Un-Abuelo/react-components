import InputPrimary, { InputPrimaryProps } from "./InputPrimary";
import InputSecondary, { InputSecondaryProps } from "./InputSecondary";
import InputThird, { InputThirdProps } from "./InputThird";

const Input = (props: InputProps) => {
	return props.design === "primary" ? (
		<InputPrimary {...props} />
	) : props.design === "secondary" ? (
		<InputSecondary {...props} />
	) : props.design === "third" ? (
		<InputThird {...props} />
	) : <InputSecondary {...props} design="secondary" />;
};

export default Input;
export type InputProps = (
	| InputPrimaryProps
	| InputSecondaryProps
	| InputThirdProps
) & {
	type?: "text" | "email" | "date" | "password" | "time" | "number";
};
