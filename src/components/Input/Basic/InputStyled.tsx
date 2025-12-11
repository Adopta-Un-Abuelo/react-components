import { ComponentPropsWithRef, forwardRef } from "react";
import styled from "styled-components";
import Color from "../../../constants/ColorV2";

const Input = styled.input`
	font-family: "Poppins";
	font-size: 14px;
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
	return <Input role="input" ref={ref} {...props} />;
});
export default InputStyled;
export interface InputStyledProps extends ComponentPropsWithRef<"input"> {}
