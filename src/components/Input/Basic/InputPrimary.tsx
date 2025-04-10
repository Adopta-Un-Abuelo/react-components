import { ReactElement, useEffect, useState, CSSProperties } from "react";
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
	$focus?: boolean;
	$error?: boolean;
	$disabled: boolean;
}>`
	position: relative;
	display: flex;
	flex: 1;
	align-items: center;
	border-radius: 6px;
	height: 40px;
	min-height: 40px;
	outline: none;
	box-shadow: 0 0 0
		${(props) =>
			props.$focus ? "1px " + Color.border.neutralHard : "none"};
	padding: 0px 8px;
	background-color: ${(props) =>
		props.$focus
			? "white"
			: props.$error
			? Color.surface.redSoft
			: Color.surface.neutralSoft};
	opacity: ${(props) => (props.$disabled ? 0.48 : 1)};
`;
const ErrorDiv = styled.div<{ $error: boolean }>`
	margin: 2px 8px 0px;
	font-style: normal;
	font-weight: 500;
	font-size: 13px;
	line-height: 20px;
	display: flex;
	color: ${Color.text.red};
	animation-name: ${(props) => (props.$error ? fadeInAnimation : "none")};
	animation-duration: 0.25s;
`;
const Column = styled.div`
	display: flex;
	flex: 1;
	flex-direction: column;
`;
const InputPrimary = (props: InputPrimaryProps) => {
	const { LeftContent, design, error, containerStyle, ...restProps } = props;

	const [inputValue, setInputValue] = useState<
		string | number | readonly string[] | undefined
	>(undefined);
	const [focus, setFocus] = useState(false);

	useEffect(() => {
		setInputValue(props.value);
	}, [props.value]);

	const onInputChange = (e: any) => {
		setInputValue(e.target.value);
		props.onChange && props.onChange(e);
	};

	const onInputFocus = (e: any) => {
		setFocus(true);
		props.onFocus && props.onFocus(e);
	};

	const onInputBlur = (e: any) => {
		setFocus(false);
		props.onBlur && props.onBlur(e);
	};

	return (
		<Container style={props.containerStyle}>
			<InputContainer
				$error={props.error ? true : false}
				style={props.style}
				$focus={focus}
				$disabled={props.disabled ? true : false}
			>
				{LeftContent}
				<Column>
					<InputStyled
						{...restProps}
						value={inputValue}
						onChange={onInputChange}
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
							fontSize: 14,
							lineHeight: "18px",
						}}
					>
						{error}
					</Text>
				</ErrorDiv>
			)}
		</Container>
	);
};
export default InputPrimary;
export interface InputPrimaryProps extends InputStyledProps {
	LeftContent?: ReactElement;
	containerStyle?: CSSProperties;
	error?: string | undefined;
	design?: "primary";
}
