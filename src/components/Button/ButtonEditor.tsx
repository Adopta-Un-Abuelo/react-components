import { RichUtils } from "draft-js";
import { useEffect, useState } from "react";

//Button para el editir de texto
export const ButtonEditor = (props: Props) => {
	const { editorState, onChange } = props;
	const [selected, setSelected] = useState(false);

	useEffect(() => {
		const inlineStyle = editorState.getCurrentInlineStyle();
		if (props.type.control === "inline")
			setSelected(inlineStyle.has(props.type.value));
		if (props.type.control === "blockType")
			setSelected(
				RichUtils.getCurrentBlockType(editorState) === props.type.value,
			);
	}, [editorState]);

	const controlClicked = () => {
		let newState = null;
		setSelected(!selected);
		if (props.type.control === "inline") {
			newState = RichUtils.toggleInlineStyle(
				editorState,
				props.type.value,
			);
		} else if (props.type.control === "blockType")
			newState = RichUtils.toggleBlockType(editorState, props.type.value);
		onChange && onChange(newState);
	};
	return (
		<div
			className={props.design === "primary" ? "bold" : "boldV2"}
			style={{
				...props.style,
				backgroundColor: selected
					? props.design === "primary"
						? "#EBECFF"
						: "white"
					: props.design === "primary"
						? "white"
						: "transparent",
			}}
			onClick={controlClicked}
		>
			{props.text}
		</div>
	);
};

export default ButtonEditor;
export interface Props {
	style?: any;
	text: string;
	design?: "primary" | "secondary";
	type: {
		control: string;
		value: any;
	};
	editorState?: any;
	onChange?: Function;
}
