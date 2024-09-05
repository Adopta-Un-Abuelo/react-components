import { useEffect, useState, ComponentPropsWithoutRef } from "react";
import styled from "styled-components";

import Color from "../../constants/Color";

const Container = styled.div`
	display: flex;
	flex: 1;
	height: 6px;
	background-color: ${Color.background.soft};
	border-radius: 8px;
	overflow: hidden;
`;
const Progress = styled.div<{
	$progress: number;
	color?: string;
	$animationTime?: number;
	$animationDelay?: number;
}>`
	background: ${(props) =>
		props.color ? props.color : Color.background.primary};
	width: ${(props) => props.$progress + "%"};
	height: 6px;
	transition: ${(props) =>
		"width " +
		(props.$animationTime ? props.$animationTime : 0) +
		"s ease-out " +
		(props.$animationDelay ? props.$animationDelay : 0) +
		"s"};
`;

const ProgressBar = (props: Props) => {
	const { minValue = 0, maxValue = 100, progress, ...restProps } = props;
	const [progressValue, setProgressValue] = useState<
		number | Array<{ value: number; color?: string }>
	>(
		typeof props.progress === "number"
			? 0
			: props.progress.map((item) => ({ value: 0, color: item.color })),
	);

	useEffect(() => {
		setProgressValue(props.progress);
	}, [props.progress]);

	return (
		<Container role="progress-bar" {...restProps}>
			{typeof progressValue === "number" ? (
				<Progress
					{...restProps}
					style={{
						height:
							props.style && props.style.height
								? props.style.height
								: 6,
					}}
					$progress={(progressValue / (maxValue - minValue)) * 100}
					color={props.color}
					$animationTime={props.animationTime}
					$animationDelay={props.animationDelay}
				/>
			) : (
				progressValue.map((item, index) => (
					<Progress
						{...restProps}
						key={"progress-value-" + index}
						style={{
							height:
								props.style && props.style.height
									? props.style.height
									: 6,
						}}
						$progress={(item.value / (maxValue - minValue)) * 100}
						color={item.color}
						$animationTime={props.animationTime}
						$animationDelay={props.animationDelay}
					/>
				))
			)}
		</Container>
	);
};
export default ProgressBar;
export interface Props extends ComponentPropsWithoutRef<"div"> {
	progress:
		| number
		| Array<{
				value: number;
				color?: string;
		  }>;
	minValue?: number;
	maxValue?: number;
	color?: string;
	animationTime?: number;
	animationDelay?: number;
}
