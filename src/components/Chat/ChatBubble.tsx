import "./ChatBubble.css";
import "./Audio.css";
import styled from "styled-components";
import moment from "moment";
import ColorV2 from "../../constants/ColorV2";
import * as icons from "lucide-react";
import { useEffect, useState } from "react";

const Content = styled.div`
	padding: 6px 8px 2px;
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
const AudioPlayer = styled.audio`
	height: 30px;
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
			role={props.message.role}
			className={`bubble-container ${
				props.message.type === "sender"
					? "bubble-direction-reverse"
					: ""
			} `}
			key={props.message.key}
		>
			<div
				className={`bubble ${
					props.message.type === "sender" ? "you" : "me"
				}`}
			>
				{props.message.media && props.message.media.length > 0 && (
					<ImageView>
						{props.message.media[0].content_type.startsWith(
							"image"
						) && (
							<Image
								src={
									props.message.media[0].base64
										? props.message.media[0].base64
										: props.message.media[0].url
								}
							></Image>
						)}
						{props.message.media[0].content_type.startsWith(
							"audio"
						) && (
							<AudioPlayer
								className={
									props.message.type === "sender"
										? "you--audio"
										: "me--audio"
								}
								controls
								controlsList="nodownload"
							>
								<source
									src={
										props.message.media[0].base64
											? props.message.media[0].base64
											: props.message.media[0].url
									}
									type={props.message.media[0].content_type}
								/>
								Your browser does not support the audio element.
							</AudioPlayer>
						)}
					</ImageView>
				)}
				{props.message.text && <Content>{props.message.text}</Content>}
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
	role?: string;
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
		base64?: string;
	}[];
	text?: string;
	type: "sender" | "recipient";
	state: "sent" | "undelivered" | "delivered" | "failed" | "read";
	createdAt: Date;
}
