import React, { ComponentPropsWithoutRef } from "react";
import styled from "styled-components";

import Color from "../../constants/Color";

const CallToActionStyled = styled.button<{
	$loading?: boolean;
	$size?: string;
}>`
	display: flex;
	gap: 8px;
	align-items: center;
	background: none;
	border: none;
	cursor: ${(props) =>
		props.disabled || props.$loading ? "default" : "pointer"};
	opacity: ${(props) => (props.disabled || props.$loading ? 0.5 : 1)};
	color: ${(props) =>
		props.style?.color ? props.style.color : Color.text.primary};
	font-family: "Poppins", "sans-serif";
	font-size: ${(props) => (props.$size === "small" ? "14px" : "16px")};
	&:hover {
		text-decoration: ${(props) =>
			props.disabled || props.$loading ? "none" : "underline"};
	}
`;

const CallToAction = ({
	icon,
	iconPosition,
	loading,
	size,
	...restProps
}: Props) => {
	return (
		<CallToActionStyled
			role="button"
			$loading={loading}
			$size={size}
			disabled={restProps.disabled}
			{...restProps}
			onClick={(e: any) =>
				restProps.onClick &&
				!loading &&
				!restProps.disabled &&
				restProps.onClick(e)
			}
		>
			{iconPosition !== "right" ? icon : undefined}
			{restProps.children}
			{iconPosition === "right" ? icon : undefined}
		</CallToActionStyled>
	);
};
export default CallToAction;
export interface Props extends ComponentPropsWithoutRef<"button"> {
	size?: "small" | "normal";
	icon?: React.ReactElement;
	iconPosition?: "left" | "right";
	loading?: boolean;
}
