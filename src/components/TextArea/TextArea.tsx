import TextAreaDefault, { TextAreaDefaultProps } from "./TextAreaDefault";
import TextAreaEditor, { TextAreaEditorProps } from "./TextAreaEditor";

const TextArea = (props: TextAreaDefaultProps | TextAreaEditorProps) => {
	if (props.type === "default") {
		return <TextAreaDefault {...props} />;
	} else if (props.type === "edit") {
		return <TextAreaEditor {...props} />;
	} else {
		return null;
	}
};
/**
 * Multi-line text input component with two modes: default (plain textarea) and edit (rich text editor with Tiptap).
 * Use `type="edit"` for formatted text editing with bold, italic, lists, etc.
 *
 * @example
 * ```tsx
 * <TextArea
 *   type="default"
 *   placeholder="Enter your message..."
 *   rows={5}
 * />
 *
 * <TextArea
 *   type="edit"
 *   value={richTextContent}
 *   onChange={(html) => setContent(html)}
 * />
 * ```
 */
export default TextArea;
