import { ComponentPropsWithoutRef, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import styled from "styled-components";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./editor.css";
import { Lightbulb } from "lucide-react";

const Container = styled.div`
	position: relative;
	border-radius: 12px;
	overflow: hidden;
`;

const AbsoluteDiv = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	position: absolute;
	top: 15px;
	right: 16px;
	color: white;
	z-index: 10;
	background: linear-gradient(72deg, #5963f6 0%, #cd59f6 100%);
	background-clip: text;
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	font-family: "Poppins";
	font-size: 14px;
	cursor: pointer;
	gap: 4px;
	:hover {
		text-decoration: underline;
	}
`;

const TextAreaEditor = (props: TextAreaEditorProps) => {
	const [value, setValue] = useState(props.value);

	//Add tip button if needed
	useEffect(() => {
		const toolbar: any = document.querySelector(".ql-toolbar");
		const button = document.querySelector(".ql-toolbar-tips-button");
		if (props.onTipClick) {
			if (toolbar && !button) {
				// Create the tips button
				const absoluteDiv = document.createElement("div");
				absoluteDiv.className = "ql-toolbar-tips-button";
				toolbar.appendChild(absoluteDiv);

				const root = createRoot(absoluteDiv);
				root.render(renderTipButton());
			}
		} else if (button) {
			toolbar.removeChild(button);
		}
	}, [props.onTipClick]);

	const renderTipButton = () => (
		<AbsoluteDiv onClick={props.onTipClick}>
			<Lightbulb color={"#6C62F6"} height={20} width={20} />
			Inpírate
		</AbsoluteDiv>
	);

	const onTextAreChange = (value: string) => {
		setValue(value);
		props.onChange && props.onChange(value);
	};

	return (
		<Container role="text-area" style={props.style}>
			<ReactQuill
				theme="snow"
				style={{ height: "100%" }}
				value={value}
				defaultValue={props.defaultValue}
				placeholder={props.placeholder}
				modules={{
					toolbar: [
						[{ header: [1, 2, false] }],
						["bold", "italic", "underline"],
						[
							{ align: "" },
							{ align: "center" },
							{ align: "right" },
						],
					],
				}}
				onChange={onTextAreChange}
			/>
		</Container>
	);
};
export default TextAreaEditor;
export interface TextAreaEditorProps
	extends ComponentPropsWithoutRef<"textarea"> {
	value?: string;
	defaultValue?: string;
	placeholder?: string;
	type: "edit";
	maxLength?: number;
	design?: "primary" | "secondary";
	onChange?: (value: any) => void;
	onTipClick?: () => void;
}
