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
/**
 * Stripe payment method setup component supporting card and SEPA direct debit.
 * Handles 3D Secure authentication flow in modal. Requires Stripe publishable key.
 *
 * @example
 * ```tsx
 * const payoutRef = useRef<PayoutRef>(null);
 *
 * <Payout
 *   ref={payoutRef}
 *   stripeKey={process.env.STRIPE_KEY}
 *   paymentOption="card"
 *   design="secondary"
 *   onLoading={(loading) => setIsLoading(loading)}
 *   onSetupConfirmed={() => handleSuccess()}
 * />
 *
 * // Get payment method
 * const method = await payoutRef.current?.getPaymentMethod();
 * ```
 */
export interface PayoutProps {
	style?: CSSProperties;
	/** Stripe publishable API key (starts with pk_) */
	stripeKey: string;
	/** 3D Secure confirmation URL from Stripe setup intent */
	stripeConfirmUrl?: string;
	/** Payment method type: credit/debit card or SEPA direct debit */
	paymentOption: "sepa_debit" | "card";
	/** Custom styles for the card input form */
	cardStyle?: CSSProperties;
	error?: boolean;
	/** Pre-filled user data (email required for SEPA) */
	userData?: {
		email?: string;
	};
	/** Visual design variant */
	design?: "primary" | "secondary";
	/** Custom placeholder for name input */
	placeholderName?: string;
	/** Custom placeholder for email input */
	placeholderEmail?: string;
	/** Callback fired when 3D Secure authentication completes successfully */
	onSetupConfirmed?: () => void;
	/** Callback fired when loading state changes */
	onLoading?: (a: boolean) => void;
}
export interface PayoutRef {
	/** Collects payment method from Stripe and returns payment method object */
	getPaymentMethod: () => Promise<PaymentMethod | undefined>;
}
