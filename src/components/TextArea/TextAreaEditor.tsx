import { ComponentPropsWithoutRef, ReactNode } from "react";
import styled from "styled-components";
import { TextStyleKit } from "@tiptap/extension-text-style";
import type { Editor } from "@tiptap/react";
import { EditorContent, useEditor, useEditorState } from "@tiptap/react";
import TextAlign from "@tiptap/extension-text-align";
import StarterKit from "@tiptap/starter-kit";

import "./editor.css";
import ColorV2 from "@constants/ColorV2";
import {
	AlignCenter,
	AlignLeft,
	AlignRight,
	Bold,
	Heading1,
	Heading2,
	Italic,
	Pilcrow,
	Underline,
} from "lucide-react";
import Select from "@components/Select/Select";

const Container = styled.div`
	position: relative;
	border-radius: 12px;
	overflow: hidden;
`;
const TextAreaDiv = styled.div`
	overflow: scroll;
	height: calc(100% - 63px);
	cursor: text;
`;
const ToolbarDiv = styled.div`
	padding: 16px 18px 8px;
	border-bottom: 1px solid ${ColorV2.border.neutralSoft};
	background-color: white;
`;
const ToolbarButtonDiv = styled.div`
	display: flex;
	flex-direction: row;
	gap: 8px;
`;
const MenuBarDiv = styled.div`
	position: relative;
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
const Button = styled.button`
	cursor: pointer;
	background: none;
	border: none;
	height: 32px;
	width: 32px;
	border-radius: 80px;
	&:hover {
		background-color: ${ColorV2.surface.neutralSoft};
	}
`;

const extensions = [
	TextStyleKit,
	StarterKit,
	TextAlign.configure({
		types: ["heading", "paragraph"],
	}),
];

function MenuBar({ editor }: { editor: Editor }) {
	// Read the current editor's state, and re-render the component when it changes
	const editorState = useEditorState({
		editor,
		selector: (ctx) => {
			return {
				isBold: ctx.editor.isActive("bold") ?? false,
				canBold: ctx.editor.can().chain().toggleBold().run() ?? false,
				isItalic: ctx.editor.isActive("italic") ?? false,
				canItalic:
					ctx.editor.can().chain().toggleItalic().run() ?? false,
				isUnderline: ctx.editor.isActive("underline") ?? false,
				canUnderline:
					ctx.editor.can().chain().toggleUnderline().run() ?? false,
				canClearMarks:
					ctx.editor.can().chain().unsetAllMarks().run() ?? false,
				isParagraph: ctx.editor.isActive("paragraph") ?? false,
				isHeading1:
					ctx.editor.isActive("heading", { level: 1 }) ?? false,
				isHeading2:
					ctx.editor.isActive("heading", { level: 2 }) ?? false,
				isAlignLeft:
					ctx.editor.isActive({ textAlign: "left" }) ?? false,
				isAlignCenter:
					ctx.editor.isActive({ textAlign: "center" }) ?? false,
				isAlignRight:
					ctx.editor.isActive({ textAlign: "right" }) ?? false,
			};
		},
	});

	return (
		<ToolbarDiv>
			<ToolbarButtonDiv className="toolbar">
				<Select
					id="select-text-type"
					selectedItem={{
						icon: editorState.isHeading1 ? (
							<Heading1 />
						) : editorState.isHeading2 ? (
							<Heading2 />
						) : (
							<Pilcrow />
						),
						label: editorState.isHeading1
							? "Título"
							: editorState.isHeading2
							? "Subtítlo"
							: "Párrafo",
					}}
					options={[
						{
							icon: <Heading1 />,
							label: "Título",
						},
						{
							icon: <Heading2 />,
							label: "Subtítlo",
						},
						{
							icon: <Pilcrow />,
							label: "Párrafo",
						},
					]}
					onChange={(o) => {
						if (o.label === "Título") {
							editor
								.chain()
								.focus()
								.toggleHeading({ level: 1 })
								.run();
						} else if (o.label === "Subtítlo") {
							editor
								.chain()
								.focus()
								.toggleHeading({ level: 2 })
								.run();
						} else {
							editor.chain().focus().setParagraph().run();
						}
					}}
				/>
				<Button
					onClick={() => editor.chain().focus().toggleBold().run()}
					disabled={!editorState.canBold}
					className={editorState.isBold ? "is-active" : ""}
				>
					<Bold
						height={20}
						width={20}
						color={ColorV2.text.neutralHard}
					/>
				</Button>
				<Button
					onClick={() => editor.chain().focus().toggleItalic().run()}
					disabled={!editorState.canItalic}
					className={editorState.isItalic ? "is-active" : ""}
				>
					<Italic
						height={20}
						width={20}
						color={ColorV2.text.neutralHard}
					/>
				</Button>
				<Button
					onClick={() =>
						editor.chain().focus().toggleUnderline().run()
					}
					disabled={!editorState.canUnderline}
					className={editorState.isUnderline ? "is-active" : ""}
				>
					<Underline
						height={20}
						width={20}
						color={ColorV2.text.neutralHard}
					/>
				</Button>
				<Button
					onClick={() => editor.chain().setTextAlign("left").run()}
					className={editorState.isAlignLeft ? "is-active" : ""}
				>
					<AlignLeft
						height={20}
						width={20}
						color={ColorV2.text.neutralHard}
					/>
				</Button>
				<Button
					onClick={() => editor.chain().setTextAlign("center").run()}
					className={editorState.isAlignCenter ? "is-active" : ""}
				>
					<AlignCenter
						height={20}
						width={20}
						color={ColorV2.text.neutralHard}
					/>
				</Button>
				<Button
					onClick={() => editor.chain().setTextAlign("right").run()}
					className={editorState.isAlignRight ? "is-active" : ""}
				>
					<AlignRight
						height={20}
						width={20}
						color={ColorV2.text.neutralHard}
					/>
				</Button>
			</ToolbarButtonDiv>
		</ToolbarDiv>
	);
}

const TextAreaEditor = (props: TextAreaEditorProps) => {
	const editor = useEditor({
		extensions: extensions,
		content: props.value || "",
		onUpdate: ({ editor }: { editor: Editor }) => {
			//props.onChange && props.onChange(editor.getHTML());
		},
	});

	return (
		<Container role="text-area" style={props.style}>
			<MenuBarDiv>
				{props.ToolbarButton && (
					<AbsoluteDiv>{props.ToolbarButton}</AbsoluteDiv>
				)}
				<MenuBar editor={editor} />
			</MenuBarDiv>
			<TextAreaDiv onClick={() => editor.commands.focus()}>
				<EditorContent editor={editor} />
			</TextAreaDiv>
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
}
