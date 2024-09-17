import React, { ComponentPropsWithoutRef, useEffect, useState } from "react";
import styled from "styled-components";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./editor.css";
import ButtonEditor from "../Button/ButtonEditor";
import {
	convertToRaw,
	EditorState,
	ContentState,
	convertFromHTML,
} from "draft-js";
import draftToHtml from "draftjs-to-html";

const Container = styled.div``;

const TextAreaEditor = (props: TextAreaEditorProps) => {
	const [editorState, setEditorState] = useState<any>(undefined);

	useEffect(() => {
		if (props.value && props.type === "edit") {
			let convert = convertFromHTML(props.value);
			setEditorState(
				EditorState.createWithContent(
					ContentState.createFromBlockArray(
						convert.contentBlocks,
						convert.entityMap
					)
				)
			);
		}
	}, [props.value]);

	const onTextAreChange = (
		value?: React.ChangeEvent<HTMLTextAreaElement>,
		data?: any
	) => {
		let result: any = undefined;
		if (value) result = value;
		else {
			const convert = draftToHtml(convertToRaw(data.getCurrentContent()));
			result = {
				target: {
					name: props.name,
					value: convert,
				},
			};
		}

		if (props.maxLength && result.target.value.length > props.maxLength) {
			// Si la longitud del texto ingresado es mayor que maxLength, no hagas nada
			return;
		}

		if (data) setEditorState(data);
		props.onChange && props.onChange(result);
	};
	return (
		<Container role="text-area" style={props.style}>
			<Editor
				wrapperStyle={{ width: "100%", height: "calc(100% - 50px)" }}
				editorState={editorState}
				onEditorStateChange={(data: any) => {
					onTextAreChange(undefined, data);
				}}
				placeholder={props.placeholder}
				toolbar={{ options: ["blockType"] }}
				toolbarCustomButtons={[
					<ButtonEditor
						design={props.design}
						text="B"
						type={{ control: "inline", value: "BOLD" }}
					/>,
					<ButtonEditor
						design={props.design}
						style={{ "font-style": "italic" }}
						text="I"
						type={{ control: "inline", value: "ITALIC" }}
					/>,
					<ButtonEditor
						design={props.design}
						style={{ "text-decoration": "underline" }}
						text="U"
						type={{ control: "inline", value: "UNDERLINE" }}
					/>,
					<ButtonEditor
						design={props.design}
						style={{ "text-decoration": "line-through" }}
						text="S"
						type={{ control: "inline", value: "STRIKETHROUGH" }}
					/>,
				]}
				wrapperClassName={
					props.design === "primary" ? "wrapper" : "wrapper"
				}
				editorClassName={
					props.design === "primary" ? "editor" : "editorV2"
				}
				toolbarClassName={
					props.design === "primary" ? "toolbar" : "toolbarV2"
				}
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
	type?: "edit";
	maxLength?: number;
	design?: "primary" | "secondary";
}
