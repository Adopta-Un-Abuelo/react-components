import { ColorV2 } from "../../constants";
import Input from "../Input/Input";
import ChatBubble, { ChatMessageProps } from "./ChatBubble";
import "./ChatBubble.css";
import styled from "styled-components";

const Container = styled.div`
	position: relative;
	height: 100%;
	background-color: ${ColorV2.surface.background};
`;
const List = styled.div`
	height: calc(100% - 3rem);
	overflow-y: scroll;
	padding: 1rem;
	padding-bottom: 0.5rem;
`;
const InputView = styled.div`
	padding: 16px 24px;
`;

const Chat = (props: ChatProps) => {
	return (
		<Container>
			<List>
				{props.messages.map((message, index) => (
					<ChatBubble
						message={{
							...message,
							jump: props.messages[index + 1]
								? message.type ===
								  props.messages[index + 1].type
								: false,
						}}
					/>
				))}
			</List>
			<InputView>
				<Input type="chat" onSend={props.onSend}/>
			</InputView>
		</Container>
	);
};
export default Chat;
export interface ChatProps {
	messages: ChatMessageProps[];
    onSend?: (text: string) => void
}
