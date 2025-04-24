import {
	ReactElement,
	useEffect,
	useState,
	useRef,
	CSSProperties,
	forwardRef,
	Ref,
	useImperativeHandle,
} from "react";
import styled, { keyframes } from "styled-components";

import Color from "../../../constants/ColorV2";
import Text from "../../Text/Text";
import InputStyled, { InputStyledProps } from "./InputStyled";

const fadeInAnimation = keyframes`
	from {
		opacity: 0;
		height: 0;
		transform: translateY(-10px);
	}
	to {
		opacity: 1;
		height: 20px;
		transform: translateY(0);
	}
`;
const Container = styled.div``;
const InputContainer = styled.div<{
	$focus: boolean;
	$error: boolean;
	$disabled: boolean;
}>`
	display: flex;
	flex: 1;
	align-items: center;
	border-radius: 12px;
	height: 56px;
	min-height: 56px;
	outline: none;
	box-shadow: 0 0 0
		${(props) =>
			props.$focus
				? "2px " + Color.border.neutralMedium
				: props.$error
				? "1px " + Color.text.red
				: "1px " + Color.border.neutralSoft};
	padding: 0px 16px;
	background-color: ${(props) =>
		props.$disabled ? Color.border.neutralSoft : "white"};
	cursor: ${(props) => (props.$disabled ? "default" : "text")};
	opacity: ${(props) => (props.$disabled ? 0.4 : 1)};
`;
const ErrorDiv = styled.div<{ $error: boolean }>`
	margin: 0px 8px;
	display: flex;
	animation-name: ${(props) => (props.$error ? fadeInAnimation : "none")};
	animation-duration: 0.25s;
`;
const Column = styled.div`
	position: relative;
	display: flex;
	flex: 1;
	flex-direction: column;
`;
const Placeholder = styled(Text)<{
	$focus: boolean;
	$error: boolean;
}>`
	position: absolute;
	top: ${(props) => (props.$focus ? "-2px" : "6px")};
	left: 0px;
	color: ${Color.text.neutralMedium};
	font-size: ${(props) => (props.$focus ? "12px" : "15px")} !important;
	transition: top 0.1s ease-out, font-size 0.1s ease-out;
`;
const InputSecondary = forwardRef(
	(props: InputSecondaryProps, ref: Ref<HTMLInputElement>) => {
		const input = useRef<HTMLInputElement>(null);
		const [focus, setFocus] = useState(false);
		const [defaultFocus, setDefaultFocus] = useState(false);

		const { LeftContent, containerStyle, error, design, ...restProps } =
			props;

		useImperativeHandle(ref, () => input.current!);

		useEffect(() => {
			setDefaultFocus(props.defaultValue || props.value ? true : false);
		}, [props.defaultValue, props.value]);

		const onInputFocus = (e: any) => {
			setFocus(true);
			props.onFocus && props.onFocus(e);
		};

		const onInputBlur = (e: any) => {
			setFocus(false);
			props.onBlur && props.onBlur(e);
		};

		return (
			<Container style={containerStyle}>
				<InputContainer
					$error={error ? true : false}
					style={props.style}
					$focus={focus}
					$disabled={props.disabled ? true : false}
					onClick={() => {
						input.current?.focus();
					}}
				>
					{LeftContent}
					<Column>
						<Placeholder
							role="placeholder"
							type="p"
							$focus={
								focus || (defaultFocus && input.current?.value)
									? true
									: false
							}
							$error={error ? true : false}
						>
							{props.placeholder}
						</Placeholder>
						<InputStyled
							ref={input}
							{...restProps}
							placeholder=""
							style={{
								marginTop: 14,
								...props.style,
							}}
							onFocus={onInputFocus}
							onBlur={onInputBlur}
						/>
					</Column>
				</InputContainer>
				{error && (
					<ErrorDiv role="error" $error={props.error ? true : false}>
						<Text
							type="p"
							weight="medium"
							style={{
								color: Color.text.red,
								marginTop: 4,
								fontSize: 13,
								lineHeight: "18px",
							}}
						>
							{error}
						</Text>
					</ErrorDiv>
				)}
			</Container>
		);
	}
);
export default InputSecondary;
export interface InputSecondaryProps extends InputStyledProps {
	LeftContent?: ReactElement;
	containerStyle?: CSSProperties;
	error?: string | undefined;
	design?: "secondary";
}
