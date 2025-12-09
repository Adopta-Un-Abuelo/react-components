import {
	ComponentPropsWithoutRef,
	useEffect,
	useState,
	createRef,
} from "react";
import styled, { keyframes } from "styled-components";
import { Player } from "@lottiefiles/react-lottie-player";
import Color from "@constants/ColorV2";
import Text from "../../Text/Text";
import AnimationPop from "../../../assets/animations/pop.json";

const Container = styled.div`
	display: flex;
	flex-direction: column;
	position: relative;
	width: 100%;
`;
const InputStyled = styled.input<{
	$lineColor?: string;
	$thumbColor?: string;
	$backValue: number;
	$backgroundColor?: string;
}>`
	width: 100%;
	-webkit-appearance: none;
	appearance: none;
	height: 8px;
	background: ${(props) =>
		"linear-gradient(to right, " +
		(props.$lineColor ? props.$lineColor : Color.text.primary) +
		", " +
		(props.$lineColor ? props.$lineColor : Color.text.primary) +
		" " +
		props.$backValue +
		"px, " +
		(props.$backgroundColor
			? props.$backgroundColor
			: Color.surface.primaryLow) +
		" " +
		props.$backValue +
		"px, " +
		(props.$backgroundColor
			? props.$backgroundColor
			: Color.surface.primaryLow) +
		" 100%)"};
	outline: none;
	border-radius: 10px;
	margin: 18px 0px;
	-webkit-appearance: none;

	&::-moz-range-thumb {
		-webkit-appearance: none;
		height: 44px;
		width: 44px;
		border: 2px solid white;
		appearance: none;
		border-radius: 50%;
		background-color: ${(props) =>
			props.$thumbColor ? props.$thumbColor : Color.surface.primary};
		background-image: url("https://adoptaunabuelo.org/wp-content/uploads/2023/03/heart_icon.svg");
		background-position: center;
		background-size: 18px;
		background-repeat: no-repeat;
		cursor: pointer;
		filter: drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.04));
	}
	&::-webkit-slider-thumb {
		-webkit-appearance: none;
		height: 44px;
		width: 44px;
		border: 2px solid white;
		appearance: none;
		border-radius: 50%;
		background-color: ${(props) =>
			props.$thumbColor ? props.$thumbColor : Color.surface.primary};
		background-image: url("https://adoptaunabuelo.org/wp-content/uploads/2023/03/heart_icon.svg");
		background-position: center;
		background-size: 18px;
		background-repeat: no-repeat;
		cursor: pointer;
		filter: drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.04));
		transition: transform 0.1s ease-in-out, box-shadow 0.1s ease-in-out;
		&:active {
			transform: scale(1.1);
			box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.08);
		}
	}
`;
const RangeValue = styled.div<{ $value: number }>`
	left: ${(props) => props.$value + "px"};
	position: absolute;
	top: -8px;
`;
const RangeValueSpan = styled.span`
	height: 24px;
	padding: 0 1em;
	line-height: 24px;
	text-align: center;
	background: ${Color.surface.neutralLow};
	color: ${Color.text.neutralHard};
	font-family: "Poppins";
	font-size: 12px;
	display: block;
	position: absolute;
	top: -2em;
	left: 50%;
	transform: translate(-50%, 0);
	border-radius: 6px;
	&::before {
		content: "";
		position: absolute;
		width: 0;
		height: 0;
		border-top: 10px solid ${Color.surface.neutralLow};
		border-left: 5px solid transparent;
		border-right: 5px solid transparent;
		top: 100%;
		left: 50%;
		margin-left: -5px;
		margin-top: -1px;
	}
`;
const BottomRow = styled.div`
	display: flex;
	flex: 1;
	flex-direction: row;
	justify-content: space-between;
	margin-top: 8px;
`;
const PresentKeyframes = keyframes`
	40% { transform: rotate(0deg) }
 	60% { transform: rotate(-10deg) scale(1.2) }
 	80% { transform: rotate(10deg) scale(1.2)}
 	100% { transform: rotate(0deg) }
`;
const PresentContainer = styled.div`
	position: absolute;
	top: -35px;
	gap: 12px;
	display: flex;
	flex-direction: column;
	align-items: center;
	transform-origin: bottom center;
	animation-name: ${PresentKeyframes};
	animation-duration: 2s;
`;
const PresentDot = styled.div<{
	$colorSuccess: string;
	$color: string;
	$isSelected: boolean;
}>`
	width: 10px;
	height: 10px;
	border-radius: 44px;
	border: 2px solid white;
	background-color: ${(props) =>
		props.$isSelected ? props.$colorSuccess : props.$colorSuccess};
`;
const PresentView = styled.div<{
	$color: string;
	$colorSuccess: string;
	$isSelected: boolean;
}>`
	display: flex;
	width: 36px;
	height: 36px;
	justify-content: center;
	align-items: center;
	border-radius: 44px;
	cursor: pointer;
	transform: ${(props) =>
		props.$isSelected
			? "translateY(-8px)"
			: "translateY(0px)"};
	transition: transform 0.05s ease-out;
	box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.04);
	background-color: ${(props) =>
		props.$isSelected ? props.$colorSuccess : props.$color};
	border: 1px solid rgba(0, 29, 61, 0.10);
	&:hover {
		transform: ${(props) =>
			`scale(1.2) ${
				props.$isSelected ? "translateY(-8px)" : "translateY(0px)"
			}`};
	}
`;
const PresentPlayer = styled.div`
	position: absolute;
	top: -40px;
	height: 100px;
	width: 100px;
`;

const InputRange = (props: InputRangeProps) => {
	const elem = createRef<any>();
	const [width, setWidth] = useState(0);
	const [value, setValue] = useState<number>(
		props.value && typeof props.value === "number"
			? props.value
			: props.defaultValue && typeof props.defaultValue === "number"
			? props.defaultValue
			: 0
	);
	const { style, hideRange, unit, ...restProps } = props;

	useEffect(() => {
		if (elem.current) setWidth(elem.current.offsetWidth);
	}, [elem.current]);

	useEffect(() => {
		if (props.value && typeof props.value === "number")
			setValue(props.value);
	}, [props.value]);

	const onChange = (e: any) => {
		setValue(parseInt(e.target.value));
		props.onChange && props.onChange(e);
	};

	return (
		<Container ref={elem} style={style}>
			{!hideRange && (
				<RangeValue
					role="range"
					id="bubbleHeight"
					$value={
						props.min && props.max
							? ((value - props.min) / (props.max - props.min)) *
							  width
							: (value / 100) * width
					}
				>
					<RangeValueSpan>{value}</RangeValueSpan>
				</RangeValue>
			)}
			{props.presents?.map((item) => {
				const itemPosition =
					props.min && props.max
						? ((item.value - props.min) / (props.max - props.min)) *
						  width
						: (item.value / 100) * width;
				const isSelected = value >= item.value ? true : false;
				return (
					<PresentContainer
						style={{
							left: `calc(${itemPosition}px - 22px)`,
						}}
					>
						{isSelected && (
							<PresentPlayer>
								<Player
									style={{
										height: "100%",
										width: "100%",
									}}
									autoplay={true}
									loop={false}
									keepLastFrame={true}
									src={AnimationPop}
								/>
							</PresentPlayer>
						)}
						<PresentView
							$colorSuccess={item.colorSuccess}
							$color={item.color}
							$isSelected={isSelected}
							onClick={() => item.onClick && item.onClick()}
						>
							<item.icon
								height={20}
								width={20}
								color={isSelected ? "white" : item.colorSuccess}
							/>
						</PresentView>
						<PresentDot
							$color={item.color}
							$colorSuccess={item.colorSuccess}
							$isSelected={isSelected}
						/>
					</PresentContainer>
				);
			})}
			<InputStyled
				role="input"
				{...restProps}
				value={value}
				id="rangeHeight"
				type="range"
				$thumbColor={props.thumbColor}
				$lineColor={props.lineColor}
				$backgroundColor={props.backgroundColor}
				$backValue={
					props.min && props.max
						? ((value - props.min) / (props.max - props.min)) *
						  width
						: (value / 100) * width
				}
				onChange={onChange}
			/>
			{props.min && props.max && !props.hideLabels ? (
				<BottomRow>
					<Text type="p2" style={{ color: Color.text.neutralMedium }}>
						{props.min} {unit}
					</Text>
					<Text type="p2" style={{ color: Color.text.neutralMedium }}>
						{props.max} {unit}
					</Text>
				</BottomRow>
			) : null}
		</Container>
	);
};
export default InputRange;
export interface InputRangeProps extends ComponentPropsWithoutRef<"input"> {
	lineColor?: string;
	backgroundColor?: string;
	thumbColor?: string;
	min?: number;
	max?: number;
	unit?: string;
	hideRange?: boolean;
	hideLabels?: boolean;
	presents?: {
		value: number;
		icon: any;
		color: string;
		colorSuccess: string;
		onClick?: () => void;
	}[];
}
