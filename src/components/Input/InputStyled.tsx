import { ComponentPropsWithRef, forwardRef } from "react";
import styled from "styled-components";
import Color from "../../constants/ColorV2";

const Input = styled.input<{ $hideCalendar?: boolean }>`
	font-family: "Poppins";
	font-size: 15px;
	border: none;
	outline: none;
	padding: 0px;
	background-color: transparent;
	color: ${Color.text.neutralHard};
	width: 100%;
	cursor: inherit;
	&::placeholder {
		color: ${Color.text.neutralMedium};
	}
`;
const InputStyled = forwardRef((props: InputStyledProps, ref: any) => {
	return (
		<Input
			ref={ref}
			role="input"
			{...props}
            $hideCalendar={props.hideCalendar}
			maxLength={props.type === "date" ? 10 : props.maxLength}
		/>
	);
});
export default InputStyled;
export interface InputStyledProps extends ComponentPropsWithRef<"input"> {
	type?:
		| "text"
		| "tel"
		| "email"
		| "date"
		| "password"
		| "time"
		| "number"
		| "range"
		| "range-date"
		| "date"
		| "image"
		| "chat"
		| "code"
		| "location";
	hideCalendar?: boolean;
}
