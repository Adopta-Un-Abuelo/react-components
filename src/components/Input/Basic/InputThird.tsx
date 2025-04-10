import {
	ReactElement,
	useEffect,
	useState,
	CSSProperties,
	useRef,
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
	$focus?: boolean;
	$error?: boolean;
	$disabled: boolean;
}>`
	position: relative;
	display: flex;
	flex: 1;
	align-items: center;
	padding: 0px;
	height: 34px;
	min-height: 34px;
	outline: none;
	border-bottom: 1px solid
		${(props) =>
			props.$focus
				? Color.border.neutralHard
				: Color.border.neutralMedium};
	opacity: ${(props) => (props.$disabled ? 0.5 : 1)};
`;
const ErrorDiv = styled.div<{ $error: boolean }>`
	animation-name: ${(props) => (props.$error ? fadeInAnimation : "none")};
	animation-duration: 0.25s;
	margin: 0px;
`;
const Column = styled.div`
	display: flex;
	flex: 1;
	flex-direction: column;
`;
const InputThird = forwardRef(
	(props: InputThirdProps, ref: Ref<HTMLInputElement>) => {
		const { LeftContent, design, error, containerStyle, ...restProps } =
			props;
		const input = useRef<HTMLInputElement>(null);

		const [inputValue, setInputValue] = useState<
			string | number | readonly string[] | undefined
		>(undefined);
		const [focus, setFocus] = useState(false);

		useImperativeHandle(ref, () => input.current!);

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
							ref={input}
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
export default InputThird;
export interface InputThirdProps extends InputStyledProps {
	LeftContent?: ReactElement;
	containerStyle?: CSSProperties;
	error?: string | undefined;
	design?: "third";
}
