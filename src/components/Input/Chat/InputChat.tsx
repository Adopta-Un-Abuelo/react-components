import {
	ComponentPropsWithoutRef,
	useState,
	useRef,
	ReactElement,
} from "react";
import styled from "styled-components";
import { Player } from "@lottiefiles/react-lottie-player";

import AnimationLoading from "../../../assets/animations/loading-small.json";

import { Send, Plus, Mic, Trash2 } from "lucide-react";
import Color from "@constants/ColorV2";
import Button from "../../Button/ButtonImage";
import Menu from "../../Menu/Menu";

const Container = styled.div<{
	$loading?: boolean;
	$focus?: boolean;
	$options?: Array<optionType>;
}>`
	display: flex;
	align-items: center;
	height: 48px;
	border-radius: 100px;
	outline: none;
	box-shadow: 0 0 0
		${(props) =>
			props.$focus
				? "2px " + Color.border.neutralMedium
				: "1px " + Color.border.neutralSoft};
	padding: 0px 20px 0px ${(props) => (props.$options ? "10px" : "20px")};
	background-color: ${(props) =>
		props.$loading ? Color.surface.neutralSoft : "white"};
`;
const Input = styled.input<{ $loading?: boolean }>`
	display: flex;
	flex: 1;
	font-family: "Poppins";
	font-size: 14px;
	border: none;
	color: ${Color.text.neutralHard};
	background-color: transparent;
	&::placeholder {
		color: ${(props) =>
			props.$loading ? Color.text.neutralHard : Color.text.neutralHard};
	}
	&:focus {
		outline: none;
	}
`;
const RecordingView = styled.canvas<{ $isRecording: boolean }>`
	border: 1px solid #ddd;
	display: ${(props) => (props.$isRecording ? "block" : "none")};
	height: 100%;
	width: 100%;
`;
const InputChat = (props: InputChatProps) => {
	const input = useRef<HTMLInputElement>(null);
	const [text, setText] = useState("");
	const [focus, setFocus] = useState(false);

	const analyserRef = useRef<AnalyserNode | null>(null);
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const animationIdRef = useRef<number | null>(null);
	const [isRecording, setIsRecording] = useState(false);
	const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
		null
	);
	const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);

	const { style, value, defaultValue, onOptionClick, options, ...rest } =
		props;

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setText(e.target.value);
		props.onChange && props.onChange(e);
	};

	const onSend = () => {
		if (text) {
			props.onSend && props.onSend({ text: text });
			setText("");
		}
	};

	const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			onSend();
		}
		props.onKeyDown && props.onKeyDown(e);
	};

	const onInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
		setFocus(true);
		props.onFocus && props.onFocus(e);
	};

	const onInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
		setFocus(false);
		props.onBlur && props.onBlur(e);
	};

	const onMenuClick = (op: optionType) => {
		onOptionClick && onOptionClick(op.id);
	};

	const startRecording = async () => {
		if (isRecording) return;

		try {
			const stream = await navigator.mediaDevices.getUserMedia({
				audio: true,
			});
			const recorder = new MediaRecorder(stream);

			recorder.onstop = () => {
				setIsRecording(false);
			};

			recorder.start();
			setMediaRecorder(recorder);
			setMediaStream(stream);
			setIsRecording(true);

			// Iniciar visualización
			const context = new AudioContext();
			const source = context.createMediaStreamSource(stream);
			const analyser = context.createAnalyser();
			analyser.fftSize = 512;
			source.connect(analyser);
			analyserRef.current = analyser;
			visualize();
		} catch (error) {
			console.error("Error al iniciar la grabación:", error);
		}
	};

	const cancelRecording = (option: string) => {
		if (mediaRecorder) {
			mediaRecorder.ondataavailable = (event) => {
				if (event.data.size > 0 && option === "send") {
					sendRecording([event.data])
				}
			};

			mediaRecorder.stop();
			setMediaRecorder(null);
		}

		if (mediaStream) {
			mediaStream.getTracks().forEach((track) => track.stop());
			setMediaStream(null);
		}

		setIsRecording(false);
		console.log("Grabación cancelada.");
	};

	const sendRecording = (audioChunks: Blob[]) => {
		console.log("Iniciar envio grabación");
		if (audioChunks.length === 0) {
			console.error("No hay datos de audio para enviar.");
			return;
		}
		const audioBlob = new Blob(audioChunks, { type: "audio/wav" });

		// Convertir Blob a base64
		const reader = new FileReader();
		reader.onloadend = () => {
			const base64 = reader.result?.toString().split(",")[1];
			if (base64) {
				props.onSend &&
					props.onSend({
						media: {
							base64: base64,
							contentType: "audio/wav",
						},
					});
			}
		};

		reader.readAsDataURL(audioBlob);
	};

	const visualize = () => {
		if (!canvasRef.current || !analyserRef.current) return;

		const canvas = canvasRef.current;
		const ctx = canvas.getContext("2d");
		const analyser = analyserRef.current;

		if (!ctx) return;

		const bufferLength = analyser.frequencyBinCount;
		const dataArray = new Uint8Array(bufferLength);

		const draw = () => {
			analyser.getByteTimeDomainData(dataArray);

			ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
			ctx.fillRect(0, 0, canvas.width, canvas.height);

			ctx.lineWidth = 2;
			ctx.strokeStyle = "#00ff00";

			ctx.beginPath();

			const sliceWidth = (canvas.width * 1.0) / bufferLength;
			let x = 0;

			for (let i = 0; i < bufferLength; i++) {
				const v = dataArray[i] / 128.0;
				const y = (v * canvas.height) / 2;

				if (i === 0) {
					ctx.moveTo(x, y);
				} else {
					ctx.lineTo(x, y);
				}

				x += sliceWidth;
			}

			ctx.lineTo(canvas.width, canvas.height / 2);
			ctx.stroke();

			// Solicitar la próxima animación
			animationIdRef.current = requestAnimationFrame(draw);
		};

		draw();
	};

	return (
		<Container
			style={style}
			$loading={props.loading || props.disabled}
			$focus={focus}
			$options={options}
		>
			{isRecording ? (
				<Button
					icon={
						<Trash2
							height={20}
							width={20}
							onClick={() => {
								cancelRecording("delete");
							}}
						/>
					}
				/>
			) : (
				props.options && (
					<Menu
						id={"add-menu"}
						position={"top-right"}
						options={options}
						icon={<Plus color={Color.text.primary} />}
						onClick={onMenuClick}
					/>
				)
			)}
			<RecordingView ref={canvasRef} $isRecording={isRecording} />
			{!isRecording && (
				<Input
					{...rest}
					value={text}
					ref={input}
					disabled={props.loading || props.disabled}
					$loading={props.loading || props.disabled}
					onChange={onChange}
					onKeyDown={onKeyDown}
					onFocus={onInputFocus}
					onBlur={onInputBlur}
				/>
			)}
			{props.loading ? (
				<Player
					style={{ height: 48, width: 48 }}
					src={AnimationLoading}
					loop={true}
					autoplay={true}
				/>
			) : (
				<>
					<Button
						disabled={props.disabled}
						icon={
							text || isRecording ? (
								<Send
									height={20}
									width={20}
									color={Color.text.primary}
								/>
							) : (
								<Mic
									height={20}
									width={20}
									color={Color.text.primary}
								/>
							)
						}
						onClick={() => {
							if (text) onSend();
							else {
								if (isRecording) {
									cancelRecording("send");
								} else {
									startRecording();
								}
							}
						}}
					/>
				</>
			)}
		</Container>
	);
};
export default InputChat;
export interface InputChatProps extends ComponentPropsWithoutRef<"input"> {
	loading?: boolean;
	options?: Array<optionType>;
	onOptionClick?: (id: string) => void;
	onSend?: (data: {
		text?: string;
		media?: { base64: string; contentType: string };
	}) => void;
}
type optionType = {
	id: string;
	label: string;
	icon?: ReactElement;
};
