import "./ChatBubble.css";
import Avatar from "../Avatar/Avatar";
import styled from "styled-components";
import moment from "moment";
import { ColorV2 } from "../../constants";
import * as icons from "lucide-react";
import { useEffect, useState } from "react";

const Content = styled.div``;
const FooterView = styled.div`
	display: flex;
	justify-content: flex-end;
	align-items: center;
	gap: 4px;
	font-size: 10px;
	color: ${ColorV2.text.neutralMedium};
	margin-top: 4px;
`;

const ChatBubble = (props: ChatProps) => {
	const [Icon, setIcon] = useState<any>(undefined);

	useEffect(() => {
		setIcon(
			icons[
				props.message.state === "delivered"
					? "CheckCheck"
					: props.message.state === "failed"
					? "X"
					: props.message.state === "read"
					? "CheckCheck"
					: props.message.state === "sent"
					? "Check"
					: "Clock"
			]
		);
	}, []);

	return (
		<div
			className={`bubble-container ${
				props.message.type === "sender"
					? "bubble-direction-reverse"
					: ""
			} ${
				props.message.jump
					? props.message.type === "sender"
						? "bubble-jump-reverse"
						: "bubble-jump"
					: ""
			}`}
			key={props.message.key}
		>
			{!props.message.jump && (
				<Avatar
					style={{ height: 42, width: 42 }}
					name={props.message.User.name}
					icon={props.message.User.imageUrl}
				/>
			)}
			<div
				className={`bubble ${
					props.message.type === "sender" ? "you" : "me"
				}`}
			>
				<Content>{props.message.text}</Content>
				<FooterView>
					{moment(props.message.createdAt).format("HH:mm")}
					{Icon && (
						<Icon
							height={14}
							width={14}
							color={
								props.message.state === "read"
									? ColorV2.text.primary
									: ColorV2.text.neutralMedium
							}
						/>
					)}
				</FooterView>
			</div>
		</div>
	);
};
export default ChatBubble;
export interface ChatProps {
	message: ChatMessageProps;
}
export interface ChatMessageProps {
	key: string;
	User: {
		imageUrl?: string;
		name?: string;
	};
	text: string;
	type: "sender" | "recipient";
	state: "sent" | "undelivered" | "delivered" | "failed" | "read";
	createdAt: Date;
	jump?: boolean;
}
