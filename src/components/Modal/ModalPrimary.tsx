import {
	forwardRef,
	Ref,
	useEffect,
	useImperativeHandle,
	useState,
	ComponentPropsWithoutRef,
	CSSProperties,
	ReactElement,
} from "react";
import styled from "styled-components";
import Button, { ButtonProps } from "@components/Button/Button";
import Text from "@components/Text/Text";
import { X } from "lucide-react";
import media from "styled-media-query";
import Color from "@constants/ColorV2";
import Modal from "react-modal";

const TitleView = styled.div`
	position: sticky;
	display: flex;
	flex-direction: column;
	padding: 10px 24px 16px;
	top: 0px;
	z-index: 100;
`;
const ChildrenView = styled.div`
	padding: 0px 24px;
	position: relative;
`;
const Buttons = styled.div`
	position: sticky;
	display: flex;
	flex: 1;
	bottom: 0;
	align-items: center;
	justify-content: flex-end;
	padding: 16px 24px;
	background-color: white;
	${media.lessThan("small")`
        padding: 8px 16px;
    `}
`;
const ErrorView = styled.div`
	background-color: ${Color.surface.redSoft};
	padding: 12px 24px;
	margin-top: 24px;
`;
const CloseView = styled.div`
	display: flex;
	justify-content: flex-end;
	padding: 10px 10px 0px 24px;
`;

const ModalComponent = forwardRef(
	(props: ModalPrimaryProps, ref: Ref<ModalRef>) => {
		const [isVisible, setIsVisible] = useState(props.isVisible);
		const [show, setShow] = useState(false);
		const [isLargeScreen, setIsLargeScreen] = useState(false);

		useImperativeHandle(ref, () => ({
			close() {
				onClose();
			},
		}));

		useEffect(() => {
			const mediaQuery = window.matchMedia("(min-width: 768px)");
			setIsLargeScreen(mediaQuery.matches);

			const handleResize = (e: MediaQueryListEvent) => {
				setIsLargeScreen(e.matches);
			};

			mediaQuery.addListener(handleResize);
			return () => mediaQuery.removeListener(handleResize);
		}, []);

		useEffect(() => {
			//Open
			if (props.isVisible) {
				setIsVisible(true);
				delay(100).then(() => {
					setShow(true);
				});
			}
			//Close
			else {
				setShow(false);
				delay(500).then(() => {
					setIsVisible(false);
				});
			}
		}, [props.isVisible]);

		const delay = (ms: number) =>
			new Promise((resolve) => setTimeout(resolve, ms));

		const onClose = () => {
			setShow(false);
			delay(300).then(() => {
				setIsVisible(false);
				props.onClose && props.onClose();
			});
		};

		return (
			<Modal
				role="modal"
				isOpen={isVisible}
				onRequestClose={onClose}
				shouldCloseOnOverlayClick={
					props.shouldCloseOnOverlayClick ?? false
				}
				ariaHideApp={false}
				style={{
					content: {
						position: "absolute",
						width:
							props.type === "full-screen"
								? "100%"
								: props.type === "lateral"
								? isLargeScreen
									? "400px"
									: "100%"
								: 486,
						maxWidth:
							props.type === "full-screen"
								? "100%"
								: props.type === "lateral"
								? isLargeScreen
									? "400px"
									: "100%"
								: `calc(100% - ${isLargeScreen ? 96 : 48}px)`,
						height: props.type === "lateral" ? "100%" : undefined,
						maxHeight:
							props.type === "lateral"
								? "100%"
								: `calc(100% - ${isLargeScreen ? 96 : 48}px)`,
						background: "#FFFFFF",
						boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
						borderRadius:
							props.type === "full-screen"
								? "12px 12px 0px 0px"
								: props.type === "lateral"
								? 0
								: 12,
						top:
							props.type === "lateral"
								? "0"
								: props.type !== "full-screen"
								? show
									? "50%"
									: "150%"
								: "unset",
						bottom:
							props.type === "full-screen"
								? show
									? "0px"
									: "-100vh"
								: "unset",
						right:
							props.type === "lateral"
								? show
									? "0"
									: "-100vw"
								: "unset",
						transition:
							props.type === "lateral"
								? "right 0.3s ease-out, transform 0.3s ease-in-out"
								: "top 0.3s ease-out, bottom 0.3s ease-out, transform 0.3s ease-in-out",
						left:
							props.type === "lateral"
								? "unset"
								: props.type === "full-screen"
								? "50%"
								: "50%",
						transform:
							props.type === "full-screen"
								? "translate(-50%, 0%)"
								: props.type === "lateral"
								? "translate(0, 0)"
								: "translate(-50%, -50%) scale(" +
								  (show ? 1 : 0.2) +
								  ")",
						overflow: "hidden",
						overflowY: "auto",
						border: "none",
						padding: 0,
						...props.style,
					},
					overlay: {
						backgroundColor:
							"rgba(0, 0, 0, " +
							(show
								? props.overlayBackgroundOpacity
									? props.overlayBackgroundOpacity
									: 0.6
								: 0) +
							")",
						transition: " background-color 0.3s ease-out",
						zIndex: 1000,
					},
				}}
			>
				{!props.hideClose && (
					<CloseView>
						<Button
							style={{
								backgroundColor: "white",
								borderRadius: 50,
							}}
							icon={
								<X
									height={20}
									width={20}
									color={Color.text.neutralHard}
								/>
							}
							design="image"
							onClick={onClose}
						/>
					</CloseView>
				)}
				{!props.hideHeader && (props.title || props.subtitle) && (
					<TitleView
						style={{
							paddingTop: props.hideClose ? 16 : 4,
							...props.titleStyle,
						}}
					>
						{props.title && (
							<Text type="h3" weight="semibold">
								{props.title}
							</Text>
						)}
						{props.subtitle && (
							<Text type="p2" style={{ marginTop: 8 }}>
								{props.subtitle}
							</Text>
						)}
						{props.Header}
					</TitleView>
				)}
				<ChildrenView style={props.contentStyle}>
					{props.children}
				</ChildrenView>
				{props.error && (
					<ErrorView>
						<Text
							type="p"
							style={{ color: Color.text.red, fontSize: 12 }}
						>
							{props.error}
						</Text>
					</ErrorView>
				)}
				{props.buttonProps && (
					<Buttons style={props.footerStyle}>
						{props.Bottom}
						{props.buttonProps && (
							<Button size="small" {...props.buttonProps}>
								{props.buttonProps.children
									? props.buttonProps.children
									: "Guardar"}
							</Button>
						)}
					</Buttons>
				)}
			</Modal>
		);
	}
);
export default ModalComponent;

export interface ModalPrimaryProps extends ComponentPropsWithoutRef<"div"> {
	isVisible: boolean;
	type?: "default" | "full-screen" | "form" | "web" | "lateral";
	title?: string;
	subtitle?: string;
	error?: string;
	hideClose?: boolean;
	hideHeader?: boolean;
	titleStyle?: CSSProperties;
	contentStyle?: CSSProperties;
	Header?: ReactElement;
	Bottom?: ReactElement;
	buttonProps?: ButtonProps;
	footerStyle?: CSSProperties;
	onClose: () => void;
	shouldCloseOnOverlayClick?: boolean;
	overlayBackgroundOpacity?: number;
}
export interface ModalRef {
	close: () => void;
}
