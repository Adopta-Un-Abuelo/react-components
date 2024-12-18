import "./ChatBubble.css";
import Avatar from "../Avatar/Avatar";
import styled from "styled-components";
import moment from "moment";
import { ColorV2 } from "../../constants";

const Content = styled.div``;
const FooterView = styled.div`
	display: flex;
	justify-content: flex-end;
	font-size: 10px;
    color: ${ColorV2.text.neutralMedium};
    margin-top: 4px;
`;

const ChatBubble = (props: ChatProps) => {
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
	createdAt: Date;
	jump?: boolean;
}
