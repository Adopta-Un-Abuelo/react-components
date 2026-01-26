import { ComponentPropsWithoutRef } from "react";
import styled from "styled-components";
import media from "styled-media-query";

import Color from "@constants/ColorV2";

const D1 = styled.h1`
	padding: 0px;
	margin: 0px;
	font-family: "Poppins", "sans-serif";
	color: ${Color.text.neutralHard};
	font-size: 52px;
	line-height: 64px;
	${media.lessThan("medium")`
		font-size: 48px;
		line-height: 60px;
    `}
`;
const H1 = styled.h1`
	padding: 0px;
	margin: 0px;
	font-family: "Poppins", "sans-serif";
	color: ${Color.text.neutralHard};
	font-size: 48px;
	line-height: 56px;
	${media.lessThan("medium")`
		font-size: 32px;
		line-height: 40px;
    `}
`;
const H2 = styled.h2`
	padding: 0px;
	margin: 0px;
	font-family: "Poppins", "sans-serif";
	color: ${Color.text.neutralHard};
	font-size: 40px;
	line-height: 48px;
	${media.lessThan("medium")`
		font-size: 28px;
		line-height: 36px;
    `}
`;
const H3 = styled.h3`
	padding: 0px;
	margin: 0px;
	font-family: "Poppins", "sans-serif";
	color: ${Color.text.neutralHard};
	font-size: 28px;
	line-height: 36px;
	${media.lessThan("medium")`
		font-size: 24px;
		line-height: 32px;
    `}
`;
const H4 = styled.h4`
	padding: 0px;
	margin: 0px;
	font-family: "Poppins", "sans-serif";
	color: ${Color.text.neutralHard};
	font-size: 24px;
	line-height: 32px;
	${media.lessThan("medium")`
		font-size: 20px;
		line-height: 28px;
    `}
`;
const H5 = styled.h5`
	padding: 0px;
	margin: 0px;
	font-family: "Poppins", "sans-serif";
	color: ${Color.text.neutralHard};
	font-size: 20px;
	line-height: 28px;
	${media.lessThan("medium")`
		font-size: 18px;
		line-height: 26px;
    `}
`;
const H6 = styled.h6`
	padding: 0px;
	margin: 0px;
	font-family: "Poppins", "sans-serif";
	color: ${Color.text.neutralHard};
	font-size: 18px;
	line-height: 26px;
	${media.lessThan("medium")`
		font-size: 16px;
		line-height: 24px;
    `}
`;

const Header = (props: HeaderProps) => {
	const { children, type, weight, style, ...rest } = props;

	if (type === "d1")
		return (
			<D1
				style={{
					fontWeight:
						weight === "semibold"
							? 600
							: weight === "medium"
								? 500
								: 400,
					...style,
				}}
				{...rest}
			>
				{children}
			</D1>
		);
	else if (type === "h1")
		return (
			<H1
				style={{
					fontWeight:
						weight === "semibold"
							? 600
							: weight === "medium"
								? 500
								: 400,
					...style,
				}}
				{...rest}
			>
				{children}
			</H1>
		);
	else if (type === "h2")
		return (
			<H2
				style={{
					fontWeight:
						weight === "semibold"
							? 600
							: weight === "medium"
								? 500
								: 400,
					...style,
				}}
				{...rest}
			>
				{children}
			</H2>
		);
	else if (type === "h3")
		return (
			<H3
				style={{
					fontWeight:
						weight === "semibold"
							? 600
							: weight === "medium"
								? 500
								: 400,
					...style,
				}}
				{...rest}
			>
				{children}
			</H3>
		);
	else if (type === "h4")
		return (
			<H4
				style={{
					fontWeight:
						weight === "semibold"
							? 600
							: weight === "medium"
								? 500
								: 400,
					...style,
				}}
				{...rest}
			>
				{children}
			</H4>
		);
	else if (type === "h5")
		return (
			<H5
				style={{
					fontWeight:
						weight === "semibold"
							? 600
							: weight === "medium"
								? 500
								: 400,
					...style,
				}}
				{...rest}
			>
				{children}
			</H5>
		);
	else
		return (
			<H6
				style={{
					fontWeight:
						weight === "semibold"
							? 600
							: weight === "medium"
								? 500
								: 400,
					...style,
				}}
				{...rest}
			>
				{children}
			</H6>
		);
};
export default Header;
export interface HeaderProps extends ComponentPropsWithoutRef<"h1"> {
	type: "d1" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
	weight?: "semibold" | "medium" | "regular";
}
