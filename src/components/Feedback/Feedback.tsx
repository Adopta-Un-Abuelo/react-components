import {
	ComponentPropsWithoutRef,
	ReactNode,
	useEffect,
	useState,
} from "react";
import styled from "styled-components";

import { Check, X } from "lucide-react";
import Text from "../Text/Text";
import { Color } from "../../constants";
import Button from "../Button/Button";

const Container = styled.div<{
	$text?: string;
	$type: "success" | "error" | "custom";
}>`
	position: absolute;
	display: flex;
	flex-direction: row;
	align-items: center;
	min-width: 40%;
	max-width: calc(100% - 24px);
	width: fit-content;
	bottom: 24px;
	left: 24px;
	right: 24px;
	background: ${(props) =>
		props.$type === "success"
			? Color.status.color.success
			: props.$type === "error"
			? Color.status.color.error
			: props.style?.background};
	box-shadow: 2px 0px 20px rgba(0, 0, 0, 0.09), 0px 4px 8px rgba(0, 0, 0, 0.1);
	border-radius: 4px;
	z-index: 100;
`;
const View = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	margin: 16px;
`;

const FeedBack = ({
	type = "success",
	text,
	isVisible = false,
	...props
}: Props) => {
	const [show, setShow] = useState(false);

	useEffect(() => {
		setShow(isVisible);
		setTimeout(
			() => {
				props.onClose && props.onClose();
				setShow(false);
			},
			props.closeAfter ? props.closeAfter : 3000
		);
	}, [isVisible]);

	return show ? (
		<Container $type={type} $text={text} {...props} role="feedback">
			<View>
				{type === "success" ? (
					<Check
						style={{ marginRight: 12 }}
						color={"white"}
						height={24}
						width={24}
					/>
				) : type === "error" ? (
					<X
						style={{ marginRight: 12 }}
						color={"white"}
						height={24}
						width={24}
					/>
				) : (
					props.icon
				)}
				<Text
					type="p"
					style={{ display: "flex", flex: 1, color: "white" }}
				>
					{text}
				</Text>
				{props.showClose && (
					<Button
						style={{ position: "absolute", top: 0, right: 0 }}
						design="image"
						icon={<X height={18} width={18} color="white" />}
						onClick={() => {
							props.onClose && props.onClose();
							setShow(false);
						}}
					/>
				)}
			</View>
		</Container>
	) : null;
};
export default FeedBack;
export interface Props extends ComponentPropsWithoutRef<"div"> {
	isVisible: boolean;
	type: "success" | "error" | "custom";
	icon?: ReactNode;
	text: string;
	closeAfter?: number;
	showClose?: boolean;
	onClose?: () => void;
}
