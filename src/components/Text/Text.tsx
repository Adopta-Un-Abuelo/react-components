import Header, { HeaderProps } from "./Header";
import Paragraph, { ParagraphProps } from "./Paragraph";
import Button, { ButtonProps } from "./Button";

const Text = (props: HeaderProps | ParagraphProps | ButtonProps) => {
	return props.type === "d1" ||
		props.type === "h1" ||
		props.type === "h2" ||
		props.type === "h3" ||
		props.type === "h4" ||
		props.type === "h5" ||
		props.type === "h6" ? (
		<Header role="header" {...props}>
			{props.children}
		</Header>
	) : props.type === "p" ||
	  props.type === "p2" ||
	  props.type === "c1" ||
	  props.type === "c2" ||
	  props.type === "o1" ||
	  props.type === "o2" ? (
		<Paragraph role="paragraph" {...props}>
			{props.children}
		</Paragraph>
	) : props.type === "b1" || props.type === "b2" || props.type === "b3" ? (
		<Button role="button" {...props}>
			{props.children}
		</Button>
	) : null;
};
export default Text;
