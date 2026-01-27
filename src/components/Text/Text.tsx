import Header, { HeaderProps } from "./Header";
import Paragraph, { ParagraphProps } from "./Paragraph";
import Button, { ButtonProps } from "./Button";

const Text = (props: TextProps) => {
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
/**
 * Unified typography component that renders headers (h1-h6, d1), paragraphs (p, p2, c1, c2, o1, o2), or button text (b1, b2, b3).
 * Automatically chooses the correct semantic HTML element based on the `type` prop.
 *
 * @example
 * ```tsx
 * <Text type="h1" weight="bold">Page Title</Text>
 * <Text type="p" color={ColorV2.text.neutralMedium}>Body text</Text>
 * <Text type="b1">Button text</Text>
 * ```
 */
export type TextProps = HeaderProps | ParagraphProps | ButtonProps;