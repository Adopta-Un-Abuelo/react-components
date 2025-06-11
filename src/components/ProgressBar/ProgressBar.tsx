import { useEffect, useState, ComponentPropsWithoutRef } from "react";
import styled from "styled-components";

import Color from "../../constants/Color";
import Text from "../Text/Text";
import { ColorV2 } from "../../constants";

const Container = styled.div`
	position: relative;
	height: 6px;
`;
const ProgressBackground = styled.div`
	display: flex;
	flex: 1;
	background-color: ${Color.background.soft};
	border-radius: 100px;
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
const PercentageView = styled.div`
	position: absolute;
	background-color: ${ColorV2.surface.primary};
	padding: 0px 4px;
	border-radius: 4px;
	top: -28px;
	gap: 12px;
	display: flex;
	flex-direction: column;
	align-items: center;
	transform-origin: bottom center;
`;

const ProgressBar = (props: Props) => {
	const {
		minValue = 0,
		maxValue = 100,
		progress,
		style,
		showPercentage,
		...restProps
	} = props;
	const [progressValue, setProgressValue] = useState<
		number | Array<{ value: number; color?: string }>
	>(
		typeof props.progress === "number"
			? 0
			: props.progress.map((item) => ({ value: 0, color: item.color }))
	);

	useEffect(() => {
		setProgressValue(props.progress);
	}, [props.progress]);

	return (
		<Container style={style}>
			{showPercentage &&
				(typeof progressValue === "number" ? (
					<PercentageView
						style={{
							left: `calc(${
								((progressValue as number) /
									(maxValue - minValue)) *
								100
							}% - 20px)`,
							backgroundColor: props.color
								? props.color
								: ColorV2.surface.primary,
						}}
					>
						<Text
							type="p2"
							weight="medium"
							style={{ color: "white" }}
						>
							{typeof progressValue === "number" &&
								`${(
									(progressValue / (maxValue - minValue)) *
									100
								).toFixed(0)}%`}
						</Text>
					</PercentageView>
				) : (
					progressValue.map((item, index) => (
						<PercentageView
							key={"progress-percentage-" + index}
							style={{
								left: `calc(${
									(item.value / (maxValue - minValue)) * 100
								}% - 20px)`,
								backgroundColor: item.color
									? item.color
									: ColorV2.surface.primary,
							}}
						>
							<Text
								type="p2"
								weight="medium"
								style={{ color: "white" }}
							>
								{`${(
									(item.value / (maxValue - minValue)) *
									100
								).toFixed(0)}%`}
							</Text>
						</PercentageView>
					))
				))}
			<ProgressBackground role="progress-bar" {...restProps}>
				{typeof progressValue === "number" ? (
					<Progress
						{...restProps}
						style={{
							height:
								props.style && props.style.height
									? props.style.height
									: 6,
						}}
						$progress={
							(progressValue / (maxValue - minValue)) * 100
						}
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
							$progress={
								(item.value / (maxValue - minValue)) * 100
							}
							color={item.color}
							$animationTime={props.animationTime}
							$animationDelay={props.animationDelay}
						/>
					))
				)}
			</ProgressBackground>
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
	showPercentage?: boolean;
}
