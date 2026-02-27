import { forwardRef, Ref } from "react";
import styled from "styled-components";
import Text from "@components/Text/Text";
import ModalPrimary, { ModalPrimaryProps, ModalRef } from "./ModalPrimary";

const Row = styled.div`
	display: flex;
	flex-direction: row;
	margin-bottom: 8px;
`;
const LabelColumn = styled.div`
	display: flex;
	width: 112px;
	align-items: center;
`;
const DataColumn = styled.div`
	display: flex;
	flex: 1;
	flex-direction: column;
`;
const Separator = styled.div`
	content: none;
	margin-bottom: 24px;
`;
const WebView = styled.iframe``;

const ModalComponent = forwardRef((props: ModalProps, ref: Ref<ModalRef>) => {
	return props.type === "form" ? (
		<ModalPrimary
			ref={ref}
			{...props}
			style={{ width: "80%", maxWidth: 600, ...props.style }}
		>
			{props.options &&
				props.options.map((item, index) => {
					if (item.hidden) {
						return null;
					} else if (item.id === "separator")
						return <Separator key={"separator-" + index} />;
					else
						return (
							<Row key={"option-" + item.id}>
								<LabelColumn>
									<Text type="c1" weight="medium">
										{item.title}
									</Text>
								</LabelColumn>
								<DataColumn>{item.Data}</DataColumn>
							</Row>
						);
				})}
		</ModalPrimary>
	) : props.type === "web" ? (
		<ModalPrimary
			ref={ref}
			{...props}
			style={{ ...props.style, height: "100%" }}
			contentStyle={{ ...props.contentStyle, height: "100%", padding: 0 }}
		>
			<WebView
				id={"web-iframe"}
				src={props.url}
				width="100%"
				height="100%"
				style={{ border: "none" }}
			/>
		</ModalPrimary>
	) : (
		<ModalPrimary ref={ref} {...props} />
	);
});
export default ModalComponent;
/**
 * Modal dialog component with three display modes: default, form, and web.
 * Use `type="form"` with `options` for structured form layouts, or `type="web"` with `url` to embed external content.
 *
 * @example
 * ```tsx
 * <Modal
 *   type="form"
 *   isVisible={isOpen}
 *   options={[
 *     { id: "name", title: "Name", Data: <Input /> },
 *     { id: "separator" }
 *   ]}
 * />
 * ```
 */
export interface ModalProps extends ModalPrimaryProps {
	/** Array of form field configurations for `type="form"`. Each item creates a labeled row or separator. */
	options?: Array<{
		id: string;
		title?: string;
		Data?: React.ReactElement;
		hidden?: boolean;
	}>;
	/** External URL to display in an iframe when `type="web"` */
	url?: string;
}
