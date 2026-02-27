import React, { CSSProperties, useState } from "react";
import styled from "styled-components";

import Color from "@constants/ColorV2";

const Container = styled.div`
	display: flex;
	flex-direction: row;
	border: 1px solid ${Color.border.neutralSoft};
	width: fit-content;
	border-radius: 100px;
	overflow: hidden;
	padding: 2px;
	background-color: ${Color.surface.invert};
`;
const Cell = styled.div<{ $selected: boolean }>`
	display: flex;
	padding: 8px;
	cursor: pointer;
	background-color: ${(props) =>
		props.$selected ? Color.surface.neutralSoft : "transparent"};
	border-radius: 100px;
	align-items: center;
	justify-content: center;
`;

const SwitchTag = (props: Props) => {
	const [selectedOption, setSelectedOption] = useState(props.options[0]);

	return (
		<Container role="container" style={props.style}>
			{props.options.map((item) => {
				const selected = item.id === selectedOption.id;
				return (
					<Cell
						role={item.id}
						key={"switch" + item.id}
						$selected={selected}
						onClick={() => {
							setSelectedOption(item);
							props.onChange && props.onChange(item);
						}}
					>
						{React.cloneElement(item.icon, {
							color: selected
								? Color.border.primary
								: Color.border.neutralMedium,
							height: 20,
							width: 20,
							...(item.icon.props as any),
						})}
					</Cell>
				);
			})}
		</Container>
	);
};
export default SwitchTag;
/**
 * Icon-based toggle switch for switching between 2+ options.
 * Displays icons in a pill-shaped container with active state highlighting.
 *
 * @example
 * ```tsx
 * <SwitchTag
 *   options={[
 *     { id: "grid", icon: <GridIcon /> },
 *     { id: "list", icon: <ListIcon /> }
 *   ]}
 *   onChange={(option) => setViewMode(option.id)}
 * />
 * ```
 */
export interface Props {
	style?: CSSProperties;
	/** Array of icon options (automatically colors icons based on selection) */
	options: Array<{
		id: string;
		icon: React.ReactElement;
	}>;
	/** Callback fired when option changes, receives selected option */
	onChange?: (option: { id: string; icon: React.ReactElement }) => void;
}
