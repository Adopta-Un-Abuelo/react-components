import { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";

import Text, { TextProps } from "./Text";

const fadeInOut = keyframes`
  0% { opacity: 0; transform: translateY(10px); }
  20% { opacity: 1; transform: translateY(0); }
  80% { opacity: 1; transform: translateY(0); }
  100% { opacity: 0; transform: translateY(-10px); }
`;

const RotatingText = styled.span`
	display: inline-block;
	animation: ${fadeInOut} 2.5s ease-in-out infinite;
`;

const TextAnimated = ({ children, ...props }: TextAnimatedProps) => {
	const [index, setIndex] = useState(0);

	useEffect(() => {
		const timer = setInterval(
			() => {
				setIndex((prev) => (prev + 1) % props.options.length);
			},
			props.interval ? props.interval : 2500
		);
		return () => clearInterval(timer);
	}, [props.options.length]);

	const [before, after] = (children as string)?.split("{{data}}");

	return (
		<Text {...props}>
			{before}
			<RotatingText key={props.options[index]}>
				{props.options[index]}
			</RotatingText>
            {after}
		</Text>
	);
};
export default TextAnimated;
export type TextAnimatedProps = TextProps & {
	options: string[];
	interval?: number;
};
