import { RichUtils, EditorState } from "draft-js";
import { useEffect, useState, CSSProperties } from "react";

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
		let newState: EditorState | null = null;
		setSelected(!selected);
		if (props.type.control === "inline") {
			newState = RichUtils.toggleInlineStyle(
				editorState,
				props.type.value,
			);
		} else if (props.type.control === "blockType")
			newState = RichUtils.toggleBlockType(editorState, props.type.value);
		onChange && newState && onChange(newState);
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
	style?: CSSProperties;
	text: string;
	design?: "primary" | "secondary";
	type: {
		control: string;
		value: string;
	};
	editorState: EditorState;
	onChange?: (editorState: EditorState) => void;
}
