import "./ChatBubble.css";
import Avatar from "../Avatar/Avatar";
import styled from "styled-components";
import moment from "moment";
import { ColorV2 } from "../../constants";
import * as icons from "lucide-react";
import { useEffect, useState } from "react";

const Content = styled.div`
	padding: 4px 6px;
`;
const FooterView = styled.div`
	display: flex;
	justify-content: flex-end;
	align-items: center;
	gap: 4px;
	font-size: 10px;
	color: ${ColorV2.text.neutralMedium};
	padding: 0px 6px;
`;
const ImageView = styled.div``;
const Image = styled.img`
	max-width: 100%;
	width: auto;
	height: auto;
	border-radius: 6px;
	object-fit: cover;
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
					style={{
						height: 42,
						width: 42,
						minWidth: 42,
						minHeight: 42,
					}}
					name={props.message.User.name}
					icon={props.message.User.imageUrl}
				/>
			)}
			<div
				className={`bubble ${
					props.message.type === "sender" ? "you" : "me"
				}`}
			>
				{props.message.media && props.message.media.length > 0 && (
					<ImageView>
						<Image src={props.message.media[0].url}></Image>
					</ImageView>
				)}
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
	media?: {
		category: string;
		filename: string | null;
		size: number;
		content_type: string;
		sid: string;
		url: string;
	}[];
	text: string;
	type: "sender" | "recipient";
	state: "sent" | "undelivered" | "delivered" | "failed" | "read";
	createdAt: Date;
	jump?: boolean;
}
