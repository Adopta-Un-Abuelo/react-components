import { ComponentPropsWithoutRef } from "react";
import styled from "styled-components";

import Color from "@constants/Color";

const Container = styled.div`
	display: flex;
	flex-direction: row;
`;
const Step = styled.div<{ $isSelected: boolean }>`
	display: flex;
	height: 8px;
	width: 8px;
	border-radius: 5px;
	margin-right: 16px;
	background-color: ${(props) =>
		props.$isSelected ? Color.background.primary : Color.text.low};
`;

const BreadCrumb = ({ steps = 1, selectedStep = 0, ...restProps }: Props) => {
	const stepsArray = Array.from(Array(steps).keys());

	return (
		<Container role="bread-crumb" {...restProps}>
			{stepsArray.map((item, index) => (
				<Step
					key={"crumb" + index}
					$isSelected={selectedStep === index}
				/>
			))}
		</Container>
	);
};
export default BreadCrumb;
/**
 * Step indicator component displaying circular dots to show progress through a multi-step flow.
 * Highlights the current active step with primary color.
 *
 * @example
 * ```tsx
 * <BreadCrumb steps={4} selectedStep={1} />
 * ```
 */
export interface Props extends ComponentPropsWithoutRef<"div"> {
	/** Current active step index (0-based) */
	selectedStep?: number;
	/** Total number of steps to display */
	steps: number;
}
