import {
	ComponentPropsWithoutRef,
	ReactNode,
	useEffect,
	useRef,
	useState,
} from "react";
import { createRoot } from "react-dom/client";
import styled from "styled-components";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./editor.css";

const Container = styled.div`
	position: relative;
	border-radius: 12px;
	overflow: hidden;
`;

const AbsoluteDiv = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	position: absolute;
	top: 0px;
	right: 16px;
	z-index: 10;
	height: 100%;
`;

const TextAreaEditor = (props: TextAreaEditorProps) => {
	const quill = useRef<any>(null);
	const [value, setValue] = useState(props.value);

	useEffect(() => {
		//Hide toolbar on mobile
		const toolbar = document.querySelector(".ql-toolbar");
		toolbar?.classList.add("hidden");
	}, []);

	const renderAbsoluteView = () => (
		<AbsoluteDiv>{props.ToolbarButton}</AbsoluteDiv>
	);

	//Add tip button if needed
	useEffect(() => {
		const toolbar: any = document.querySelector(".ql-toolbar");
		const button = document.querySelector(".ql-toolbar-tips-button");
		if (props.ToolbarButton) {
			if (toolbar && !button) {
				// Create the tips button
				const absoluteDiv = document.createElement("div");
				absoluteDiv.className = "ql-toolbar-tips-button";
				toolbar.appendChild(absoluteDiv);

				const root = createRoot(absoluteDiv);
				root.render(renderAbsoluteView());
			}
		} else if (button) {
			toolbar.removeChild(button);
		}
	}, [props.ToolbarButton]);

	const onTextAreChange = (value: string) => {
		setValue(value);
		props.onChange && props.onChange(value);
	};

	return (
		<Container role="text-area" style={props.style}>
			<ReactQuill
				ref={quill}
				theme="snow"
				style={{ height: "100%" }}
				value={value}
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
				onFocus={() => {
					const toolbar = document.querySelector(".ql-toolbar");
					toolbar?.classList.remove("hidden");
				}}
				onBlur={() => {
					const toolbar = document.querySelector(".ql-toolbar");
					toolbar?.classList.add("hidden");
				}}
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
	ToolbarButton?: ReactNode;
	onChange?: (value: any) => void;
}
