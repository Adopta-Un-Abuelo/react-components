import TextAreaDefault, { TextAreaDefaultProps } from "./TextAreaDefault";
import TextAreaEditor, { TextAreaEditorProps } from "./TextAreaEditor";

const TextArea = (props: TextAreaDefaultProps | TextAreaEditorProps) => {
	if (props.type === "default") {
		return <TextAreaDefault {...props} />;
	} else if (props.type === "edit") {
		return <TextAreaEditor {...props} />;
	}
};
export default TextArea;
