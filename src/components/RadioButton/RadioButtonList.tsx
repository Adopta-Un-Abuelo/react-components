import { CSSProperties, useState } from "react";
import styled from "styled-components";
import RadioButton from "./RadioButton";

const Container = styled.div``;

const RadioButtonList = (props: Props) => {
	const [selection, setSelection] = useState(
		props.options.filter((e) => e.selected),
	);
	const [update, setUpdate] = useState(false);

	const onClick = (item: OptionProps) => {
		const result = selection.findIndex((obj) => item.id === obj.id);
		let tempArray = selection;
		if (props.type === "single") tempArray = [item];
		else if (result === -1) tempArray.push(item);
		else tempArray.splice(result, 1);
		setSelection(tempArray);
		setUpdate(!update);
		props.onChange && props.onChange(tempArray);
	};

	return (
		<Container style={props.style} role="radiobuttonlist">
			{props.options.map((item, index) => {
				const active = selection.some((e) => e.id === item.id);
				return (
					<RadioButton
						id={item.id}
						key={item.id + "-" + index}
						style={props.cellStyle}
						children={item.children}
						selected={active}
						onClick={() => onClick(item)}
					/>
				);
			})}
		</Container>
	);
};
export default RadioButtonList;
/**
 * Radio button list supporting single or multiple selection.
 * Each option can contain any React content (text, images, custom components).
 *
 * @example
 * ```tsx
 * <RadioButtonList
 *   type="single"
 *   options={[
 *     { id: "1", children: <div>Option 1</div>, selected: true },
 *     { id: "2", children: <div>Option 2</div> }
 *   ]}
 *   onChange={(selected) => console.log(selected)}
 * />
 * ```
 */
export interface Props {
	/** Array of radio button options with custom content */
	options: Array<OptionProps>;
	/** Selection mode: `single` for radio behavior, `multiple` for checkboxes */
	type: "single" | "multiple";
	style?: CSSProperties;
	/** Custom styles applied to each radio button cell */
	cellStyle?: CSSProperties;
	/** Callback fired when selection changes, receives array of selected options */
	onChange?: (data: Array<OptionProps>) => void;
}
interface OptionProps {
	id: string;
	/** Custom React content to display in the radio button */
	children: React.ReactNode;
	/** Initial selected state */
	selected?: boolean;
}
