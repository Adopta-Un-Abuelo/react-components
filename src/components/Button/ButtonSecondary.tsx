import React, { ComponentPropsWithoutRef, useEffect, useState } from "react";
import styled from "styled-components";
import { Player } from "@lottiefiles/react-lottie-player";

import AnimationCheck from "@animations/button-check.json";
import AnimationLoading from "@animations/button-loading.json";

import Text from "@components/Text/Text";
import Color from "@constants/Color";

const ButtonSecondary = styled.button<{
	$size?: "small" | "normal";
	$loading?: boolean;
	$success?: boolean;
}>`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	height: ${(props) => (props.$size === "small" ? "36px" : "56px")};
	padding: ${(props) =>
		props.$loading
			? "0px"
			: props.$size === "small"
				? "0px 12px"
				: "0px 24px"};
	border-radius: 1000px;
	border: ${(props) =>
		props.$success
			? "none"
			: "1px solid " +
				(props.color ? props.color : Color.background.primary)};
	opacity: ${(props) => (props.disabled ? 0.48 : 1)};
	background-color: ${(props) =>
		props.$success ? Color.status.color.success : "transparent"};
	transition:
		transform 0.05s ease-out,
		width 0.2s ease-out,
		background-color 0.2s ease-out;
	min-width: ${(props) => (props.$size === "small" ? "80px" : "100px")};
	gap: 8px;
	cursor: ${(props) =>
		props.disabled || props.$loading ? "default" : "pointer"};
	&:hover {
		background-color: ${(props) =>
			props.disabled || props.$loading
				? "transparent"
				: Color.background.primary + "30"};
	}
	&:active {
		transform: ${(props) =>
			props.disabled || props.$loading ? "none" : "scale(0.95)"};
	}
`;
const Label = styled(Text)<{ $size?: "small" | "normal" }>`
	font-size: ${(props) => (props.$size === "small" ? "14px" : "15px")};
	width: 100%;
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
	...restProps
}: Props) => {
	const [showLabel, setShowLabel] = useState(true);
	const [prevLabel, setPrevLabel] = useState(restProps.children);
	const [loadingAnimation, setLoadingAnimation] = useState(undefined);

	useEffect(() => {
		createAnimation();
	}, []);

	useEffect(() => {
		if (prevLabel !== restProps.children) {
			setShowLabel(false);
			delay(animationDelay ? animationDelay : 600).then(() => {
				setShowLabel(true);
				setPrevLabel(restProps.children);
			});
		}
	}, [restProps.children]);

	const createAnimation = () => {
		const json = JSON.stringify(AnimationLoading);
		if (restProps.style?.color) {
			//Get rgb colors
			var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(
				restProps.style.color,
			);
			if (result) {
				const rgb = {
					r: parseInt(result[1], 16),
					g: parseInt(result[2], 16),
					b: parseInt(result[3], 16),
				};
				let temp = json.replaceAll(
					"[1,1,1]",
					`[${rgb.r / 255},${rgb.g / 255},${rgb.b / 255}]`,
				);
				setLoadingAnimation(JSON.parse(temp));
			} else {
				let temp = json.replaceAll(
					"[1,1,1]",
					`[${0 / 255},${143 / 255},${245 / 255}]`,
				);
				setLoadingAnimation(JSON.parse(temp));
			}
		} else {
			let temp = json.replaceAll(
				"[1,1,1]",
				`[${0 / 255},${143 / 255},${245 / 255}]`,
			);
			setLoadingAnimation(JSON.parse(temp));
		}
	};

	const delay = (ms: number) =>
		new Promise((resolve) => setTimeout(resolve, ms));

	return (
		<ButtonSecondary
			role="button"
			{...restProps}
			onClick={(e: any) =>
				restProps.onClick &&
				!loading &&
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
					onEvent={(event) => {
						if (event === "complete") {
							onSuccess && onSuccess(true);
						}
					}}
				/>
			) : loading && loadingAnimation ? (
				<Player
					style={{ width: size === "small" ? 80 : 100 }}
					autoplay={true}
					loop={true}
					src={loadingAnimation}
				/>
			) : (
				<>
					{icon && iconPosition !== "right" && icon}
					<Label
						role="label"
						type="p"
						weight="medium"
						$size={size}
						style={{
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
								: Color.text.primary,
							opacity: showLabel ? 1 : 0,
							transform: showLabel
								? "translateY(0px)"
								: "translateY(10px)",
							transition:
								"opacity " +
								(animationTime ? animationTime : 0.3) +
								"s ease-out, transform " +
								(animationTime ? animationTime : 0.3) +
								"s ease-out",
						}}
					>
						{prevLabel}
					</Label>
					{icon && iconPosition === "right" && icon}
				</>
			)}
		</ButtonSecondary>
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
	onSuccess?: (success: boolean) => void;
}
