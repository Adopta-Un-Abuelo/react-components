import React, { ComponentPropsWithoutRef, useEffect, useState } from "react";
import styled from "styled-components";
import { Player } from "@lottiefiles/react-lottie-player";

import AnimationCheck from "../../assets/animations/button-check.json";
import AnimationLoading from "../../assets/animations/button-loading.json";

import Text from "../Text/Text";
import Color from "../../constants/Color";

const ButtonPrimary = styled.button<{
	$size?: "small" | "normal";
	$loading?: boolean;
	$countdown?: boolean;
	$success?: boolean;
}>`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	height: ${(props) => (props.$size === "small" ? "40px" : "56px")};
	padding: ${(props) =>
		props.$loading
			? "0px"
			: props.$size === "small"
			? "0px 12px"
			: "0px 24px"};
	border-radius: 1000px;
	border: none;
	color: white;
	background-color: ${(props) =>
		props.$success ? Color.status.color.success : Color.background.primary};
	opacity: ${(props) => (props.disabled ? 0.48 : 1)};
	transition: transform 0.05s ease-out, width 0.2s ease-out,
		background-color 0.2s ease-out, opacity 0.2s ease-out;
	min-width: ${(props) => (props.$size === "small" ? "80px" : "100px")};
	cursor: ${(props) =>
		props.disabled || props.$loading || props.$countdown
			? "default"
			: "pointer"};
	&:hover {
		background-color: ${(props) =>
			props.disabled || props.$loading || props.$countdown
				? Color.background.primary
				: Color.status.primary.hover};
	}
	&:active {
		transform: ${(props) =>
			props.disabled || props.$loading || props.$countdown
				? "none"
				: "scale(0.95)"};
	}
`;
const Label = styled(Text)<{
	$size?: "small" | "normal";
	$icon: boolean;
}>`
	display: flex;
	align-items: center;
	gap: 6px;
	font-size: ${(props) => (props.$size === "small" ? "14px" : "15px")};
	width: 100%;
	margin-left: ${(props) => (props.$icon ? 6 : 0)};
	color: white;
`;

const Button = ({
	loading,
	success,
	size,
	animationDelay,
	onSuccess,
	icon,
	iconPosition,
	animationTime,
	countdown,
	onCountdownEnd,
	...restProps
}: Props) => {
	// const [showLabel, setShowLabel] = useState(true);
	// const [prevLabel, setPrevLabel] = useState(restProps.children);
	const [secondsRemaining, setSecondsRemaining] = useState(
		countdown ? countdown : 0
	);

	useEffect(() => {
		if (countdown) {
			const intervalId = setInterval(() => {
				setSecondsRemaining((prevSeconds) => prevSeconds - 1);
			}, 1000);
			if (secondsRemaining <= 0) {
				clearInterval(intervalId);
				onCountdownEnd && onCountdownEnd();
			}
			return () => clearInterval(intervalId);
		} else {
			setSecondsRemaining(0);
		}
	}, [secondsRemaining, countdown]);

	// useEffect(() => {
	// 	if (prevLabel !== restProps.children) {
	// 		setShowLabel(false);
	// 		delay(animationDelay ? animationDelay : 600).then(() => {
	// 			setShowLabel(true);
	// 			setPrevLabel(restProps.children);
	// 		});
	// 	}
	// }, [restProps.children]);

	const delay = (ms: number) =>
		new Promise((resolve) => setTimeout(resolve, ms));

	return (
		<ButtonPrimary
			role="button"
			type="button"
			$loading={loading}
			$countdown={secondsRemaining > 0}
			$success={success}
			$size={size}
			{...restProps}
			onClick={(e: any) =>
				restProps.onClick &&
				!loading &&
				secondsRemaining <= 0 &&
				!restProps.disabled &&
				restProps.onClick(e)
			}
		>
			{success ? (
				<Player
					style={{
						height: size === "small" ? 25 : 30,
						width: size === "small" ? 25 : 30,
					}}
					autoplay={true}
					loop={false}
					keepLastFrame={true}
					src={AnimationCheck}
					onEvent={(event: any) => {
						if (event === "complete") {
							onSuccess && onSuccess(true);
						}
					}}
				/>
			) : loading ? (
				<Player
					style={{ width: size === "small" ? 80 : 100 }}
					autoplay={true}
					loop={true}
					src={AnimationLoading}
				/>
			) : (
				<>
					{icon && iconPosition !== "right" && icon}
					<Label
						role="label"
						type="p"
						weight="medium"
						$size={size}
						$icon={icon ? true : false}
						style={{
							width: "unset",
							margin: "0px 6px",
							fontWeight: restProps.style?.fontWeight
								? restProps.style?.fontWeight
								: 500,
							fontSize: restProps.style?.fontSize
								? restProps.style?.fontSize
								: size === "small"
								? 14
								: 15,
							color: restProps.style?.color
								? restProps.style.color
								: "white",
							// opacity: showLabel ? 1 : 0,
							// transform: showLabel
							// 	? "translateY(0px)"
							// 	: "translateY(10px)",
							transition:
								"opacity " +
								(animationTime ? animationTime : 0.3) +
								"s ease-out, transform " +
								(animationTime ? animationTime : 0.3) +
								"s ease-out",
						}}
					>
						{restProps.children}
						{secondsRemaining > 0 &&
							` ${secondsRemaining} segundos`}
					</Label>
					{icon && iconPosition === "right" && icon}
				</>
			)}
		</ButtonPrimary>
	);
};
export default Button;
export interface Props extends ComponentPropsWithoutRef<"button"> {
	size?: "small" | "normal";
	icon?: React.ReactElement;
	iconPosition?: "left" | "right";
	loading?: boolean;
	success?: boolean;
	animationDelay?: number;
	animationTime?: number;
	countdown?: number;
	onSuccess?: (success: boolean) => void;
	onCountdownEnd?: () => void;
}
