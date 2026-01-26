import { ComponentPropsWithoutRef } from "react";
import styled from "styled-components";

import Color from "@constants/ColorV2";

const PStyled = styled.p`
	font-family: "Poppins";
	margin: 0px;
	color: ${Color.text.neutralHard};
`;

const P = (props: ParagraphProps) => {
	const { style, type, children, weight, ...rest } = props;

	return (
		<PStyled
			style={{
				fontSize:
					type === "p"
						? 15
						: type === "p2"
							? 14
							: type === "c1"
								? 13
								: type === "c2"
									? 12
									: type === "o1"
										? 13
										: 12,
				fontWeight:
					weight === "semibold"
						? 600
						: weight === "medium"
							? 500
							: 400,
				textTransform:
					type === "o1" || type === "o2" ? "uppercase" : "none",
				...style,
			}}
			{...rest}
		>
			{children}
		</PStyled>
	);
};
export default P;
export interface ParagraphProps extends ComponentPropsWithoutRef<"p"> {
	type: "p" | "p2" | "c1" | "c2" | "o1" | "o2";
	weight?: "medium" | "semibold" | "regular";
}
