import {
	useState,
	useEffect,
	useRef,
	forwardRef,
	useImperativeHandle,
	Ref,
	CSSProperties,
} from "react";
import styled from "styled-components";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe, PaymentMethod } from "@stripe/stripe-js";

import PaycardForm, { FormRef } from "./PaycardForm";
import Modal from "@components/Modal/Modal";
import { ModalRef } from "@components/Modal/ModalPrimary";

const Container = styled.div``;

const Payout = forwardRef((props: PayoutProps, ref: Ref<PayoutRef>) => {
	const modal = useRef<ModalRef>(null);
	const form = useRef<FormRef>(null);

	const [stripePromise, setStripePromise] = useState(() =>
		loadStripe(props.stripeKey),
	);
	const [showConfirmModal, setShowConfirmModal] = useState(false);

	useImperativeHandle(ref, () => ({
		async getPaymentMethod() {
			return await form.current?.getPaymentMethod();
		},
	}));

	useEffect(() => {
		if (props.stripeConfirmUrl) setShowConfirmModal(true);
		else handlerShowConfirmUrl();
	}, [props.stripeConfirmUrl]);

	window.addEventListener(
		"message",
		function (ev) {
			if (ev.data === "3DS-authentication-complete" && showConfirmModal) {
				handlerShowConfirmUrl();
			}
		},
		false,
	);

	const handlerShowConfirmUrl = () => {
		modal.current && modal.current.close();
	};

	const onModalClose = () => {
		setShowConfirmModal(false);
		props.onSetupConfirmed && props.onSetupConfirmed();
	};

	const onLoading = (value: boolean) => {
		props.onLoading && props.onLoading(value);
	};

	return (
		<Container style={props.style} role={"container"}>
			<Modal
				ref={modal}
				type="web"
				isVisible={showConfirmModal}
				hideClose={true}
				url={props.stripeConfirmUrl}
				style={{ width: 600, height: 400, padding: 0 }}
				onClose={onModalClose}
			/>
			<Elements
				stripe={stripePromise}
				options={{
					fonts: [
						{
							cssSrc: "https://fonts.googleapis.com/css2?family=Poppins&display=swap",
						},
					],
				}}
			>
				<PaycardForm
					ref={form}
					option={props.paymentOption}
					style={props.cardStyle}
					onLoading={onLoading}
					error={props.error}
					userData={props.userData}
					design={props.design}
					placeholderEmail={props.placeholderEmail}
					placeholderName={props.placeholderName}
				/>
			</Elements>
		</Container>
	);
});
export default Payout;
export interface PayoutProps {
	style?: CSSProperties;
	stripeKey: string;
	stripeConfirmUrl?: string;
	paymentOption: "sepa_debit" | "card";
	cardStyle?: CSSProperties;
	error?: boolean;
	userData?: {
		email?: string;
	};
	design?: "primary" | "secondary";
	placeholderName?: string;
	placeholderEmail?: string;
	onSetupConfirmed?: () => void;
	onLoading?: (a: boolean) => void;
}
export interface PayoutRef {
	getPaymentMethod: () => Promise<PaymentMethod | undefined>;
}
