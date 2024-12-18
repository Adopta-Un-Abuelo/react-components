import { CSSProperties } from "react";
import { ColorV2 } from "../../constants";
import Input from "../Input/Input";
import ChatBubble, { ChatMessageProps } from "./ChatBubble";
import "./ChatBubble.css";
import styled from "styled-components";

const Container = styled.div`
	position: relative;
	height: 100%;
	background-color: ${ColorV2.surface.background};
    overflow: hidden;
`;
const List = styled.div`
	height: calc(100% - 110px);
	overflow-y: scroll;
    padding: 24px 24px 86px;
`;
const InputView = styled.div`
    position: sticky;
    bottom: 0px;
	padding: 8px 24px 24px;
    background-color: ${ColorV2.surface.background};
`;

const Chat = (props: ChatProps) => {
	return (
		<Container
            style={props.style}
        >
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
    style?: CSSProperties
	messages: ChatMessageProps[];
    onSend?: (text: string) => void
}
