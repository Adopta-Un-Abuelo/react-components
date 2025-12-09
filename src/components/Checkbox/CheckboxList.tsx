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

	const onClick = (item: any) => {
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

export interface Props {
	style?: CSSProperties;
	elementStyle?: CSSProperties;
	options: Array<{
		id: string;
		label?: string;
		sublabel?: string;
		Element?: React.ReactElement;
		error?: boolean;
	}>;
	selectedOptions?: Array<{
		id: string;
	}>;
	height?: number;
	width?: number;
	type: "single" | "multiple";
	onChange?: (result: Array<{ id: string; [key: string]: any }>) => void;
	position?: "left" | "right";
	avatarEnabled?: boolean;
	shape?: "circle" | "square";
}
