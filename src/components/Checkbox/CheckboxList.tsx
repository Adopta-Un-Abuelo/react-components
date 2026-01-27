import { useState, useEffect, CSSProperties } from "react";
import styled from "styled-components";
import Checkbox from "./Checkbox";

const Container = styled.div``;

const CheckboxList = (props: Props) => {
	const [selection, setSelection] = useState<Array<{ id: string }>>([]);
	const [update, setUpdate] = useState(false);
	const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);

	useEffect(() => {
		if (props.selectedOptions) setSelection(props.selectedOptions);

		const handleResize = () => {
			setIsSmallScreen(window.innerWidth < 768);
		};

		window.addEventListener("resize", handleResize);
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, [props.selectedOptions]);

	const onClick = (item: CheckboxOption) => {
		const result = selection.findIndex((obj) => item.id === obj.id);
		const tempArray = props.type === "single"
			? [item]
			: result === -1
				? [...selection, item]
				: selection.filter((_, i) => i !== result);
		setSelection(tempArray);
		setUpdate(!update);
		props.onChange && props.onChange(tempArray);
	};

	return (
		<Container role="checkboxlist" style={props.style}>
			<div style={{ paddingBottom: "2px" }}>
				{props.options.map((item, index) => {
					const active = selection.some((e) => e.id === item.id);
					return (
						<Checkbox
							role={"checkbox-" + index}
							key={item.id}
							style={{
								marginRight: "16px",
								marginBottom: "16px",
								padding: isSmallScreen ? "4px 1px" : "0px",
								...props.elementStyle,
							}}
							label={item.label}
							sublabel={item.sublabel}
							error={item.error}
							selected={active}
							height={props.height}
							shape={props.shape}
							width={props.width}
							position={props.position}
							avatarEnabled={props.avatarEnabled}
							onClick={() => onClick(item)}
						>
							{item.Element}
						</Checkbox>
					);
				})}
			</div>
		</Container>
	);
};

export default CheckboxList;

export type CheckboxOption = {
	id: string;
	label?: string;
	sublabel?: string;
	Element?: React.ReactElement;
	error?: boolean;
	[key: string]: string | React.ReactElement | boolean | undefined;
};

/**
 * Checkbox list component supporting single or multiple selection modes.
 * Renders a collection of checkboxes with optional labels, icons, and custom elements.
 *
 * @example
 * ```tsx
 * <CheckboxList
 *   type="multiple"
 *   options={[
 *     { id: "1", label: "Option 1" },
 *     { id: "2", label: "Option 2", sublabel: "Description" }
 *   ]}
 *   onChange={(selected) => console.log(selected)}
 * />
 * ```
 */
export interface Props {
	style?: CSSProperties;
	/** Custom styles applied to each individual checkbox element */
	elementStyle?: CSSProperties;
	options: Array<CheckboxOption>;
	/** Pre-selected options (controlled component pattern) */
	selectedOptions?: Array<{
		id: string;
	}>;
	/** Height in pixels for each checkbox */
	height?: number;
	/** Width in pixels for each checkbox */
	width?: number;
	/** Selection mode: `single` for radio-like behavior, `multiple` for checkboxes */
	type: "single" | "multiple";
	/** Callback fired when selection changes, receives array of selected options */
	onChange?: (result: Array<CheckboxOption>) => void;
	/** Position of the checkbox indicator relative to content */
	position?: "left" | "right";
	/** Show avatar-style circular checkboxes */
	avatarEnabled?: boolean;
	/** Visual shape of the checkbox indicator */
	shape?: "circle" | "square";
}
