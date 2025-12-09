import { CSSProperties, Fragment, useEffect, useRef, useState } from "react";
import ColorV2 from "@constants/ColorV2";
import ChatBubble, { ChatMessageProps } from "./ChatBubble";
import "./ChatBubble.css";
import styled from "styled-components";
import { format } from "date-fns";
import moment from "moment";
import Text from "@components/Text/Text";
import media from "styled-media-query";
import { Image, NotebookText } from "lucide-react";
import TemplateModal from "./TemplateModal";
import InputChat from "@components/Input/Chat/InputChat";

const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
	position: relative;
	max-height: 100vh;
	height: 100vh;
	background-color: "white";
	overflow: hidden;
`;
const List = styled.div`
	overflow: scroll;
	padding: 24px 16px 32px;
	${media.lessThan("small")`
        padding: 16px 16px 32px;
    `}
`;
const InputView = styled.div`
	position: sticky;
	bottom: 0px;
	padding: 8px 24px 24px;
	${media.lessThan("small")`
        padding: 8px 16px 24px;
    `}
`;
const DateDivider = styled.div`
	display: flex;
	flex: 1;
	justify-content: center;
	align-items: center;
	padding: 16px 8px;
`;
const DateDividerText = styled(Text)`
	padding: 0px 8px;
`;
const DateDividerLine = styled.div`
	display: flex;
	flex: 1;
	border-top: 1px solid ${ColorV2.border.neutralSoft};
	height: 1px;
`;
const ShowTemplatesView = styled.div`
	display: flex;
	background-color: ${ColorV2.surface.secondary};
	margin: 0 18px;
	padding: 2px 8px;
	border-radius: 6px 6px 0px 0px;
`;

const Chat = (props: ChatProps) => {
	const scrollRef = useRef<HTMLDivElement>(null);
	const [groupedMessages, setGroupedMessages] = useState<
		Record<string, ChatMessageProps[]>
	>({});
	const [showTemplates, setShowTemplates] = useState(false);
	const [showTemplatesModal, setShowTemplatesModal] = useState(false);

	useEffect(() => {
		groupMessagesByDate(props.messages);
		const lastRecipientMessage = props.messages
			.slice()
			.reverse()
			.find((message) => message.type === "recipient");
			console.log(lastRecipientMessage)
		if (lastRecipientMessage) {
			const hoursDifference = moment().diff(
				moment(lastRecipientMessage.createdAt),
				"hours"
			);
			if (hoursDifference >= 24) {
				setShowTemplates(true);
			}
		}
		else setShowTemplates(true);

		//Scroll to bottom
		if (scrollRef.current) {
			scrollRef.current.scrollTo({
				top: scrollRef.current.scrollHeight,
				behavior: "smooth",
			});
		}
	}, [props.messages]);

	const groupMessagesByDate = (messages: ChatMessageProps[]) => {
		const result = messages.reduce((acc, message) => {
			const date = format(new Date(message.createdAt), "yyyy-MM-dd");
			if (!acc[date]) {
				acc[date] = [];
			}
			acc[date].push(message);
			return acc;
		}, {} as Record<string, ChatMessageProps[]>);
		setGroupedMessages(result);
	};

	const onOptionClick = (id: string) => {
		if (id === "template") {
			setShowTemplatesModal(true);
		} else if (id === "image") {
			const input = document.createElement("input");
			input.type = "file";
			input.accept = "image/*";
			input.onchange = (event) => {
				const file = (event.target as HTMLInputElement).files?.[0];
				if (file) {
					const reader = new FileReader();
					reader.onloadend = () => {
						const base64String = reader.result as string;
						props.onSend({
							media: {
								base64: base64String,
								contentType: "image/*",
							},
						});
					};
					reader.readAsDataURL(file);
				}
			};
			input.click();
		}
	};

	return (
		<Container role="container" style={props.style}>
			<TemplateModal
				isVisible={showTemplatesModal}
				templates={props.templates}
				onSend={props.onSend}
				onClose={() => setShowTemplatesModal(false)}
			/>
			<List ref={scrollRef}>
				{Object.keys(groupedMessages).map((date) => (
					<Fragment key={date}>
						<DateDivider>
							<DateDividerLine/>
							<DateDividerText type="c1">
								{moment(date).format("ddd DD MMM")}
							</DateDividerText>
							<DateDividerLine/>
						</DateDivider>
						{groupedMessages[date].map((message, index) => (
							<ChatBubble
								key={message.key}
								message={message}
							/>
						))}
					</Fragment>
				))}
			</List>
			<InputView>
				{showTemplates && (
					<ShowTemplatesView>
						<Text type="c2">
							El último mensaje es de hace más de 24 horas.
							Continuar la conversación usando plantillas.
						</Text>
					</ShowTemplatesView>
				)}
				<InputChat
					loading={props.loading}
					disabled={showTemplates}
					placeholder={props.placeholder}
					options={[
						{
							id: "template",
							label: "Plantillas",
							icon: <NotebookText />,
						},
						{ id: "image", label: "Fotos", icon: <Image /> },
					]}
					onOptionClick={onOptionClick}
					onSend={(data) => props.onSend(data)}
				/>
			</InputView>
		</Container>
	);
};
export default Chat;
export interface ChatProps {
	style?: CSSProperties;
	messages: ChatMessageProps[];
	loading?: boolean;
	placeholder?: string;
	templates: {
		id: string;
		title: string;
		subtitle: string;
		description: string;
	}[];
	onSend: (data: {
		text?: string;
		template?: string;
		media?: {
			base64: string;
			contentType: string;
		};
	}) => void;
}
