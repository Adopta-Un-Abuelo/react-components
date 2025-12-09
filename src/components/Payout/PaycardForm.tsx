import {
	useState,
	useEffect,
	forwardRef,
	useImperativeHandle,
	Ref,
	CSSProperties,
} from "react";
import styled from "styled-components";
import {
	CardElement,
	useElements,
	useStripe,
	IbanElement,
} from "@stripe/react-stripe-js";
import { StripeElementChangeEvent, PaymentMethod } from "@stripe/stripe-js";

import Color from "@constants/ColorV2";
import Input from "../Input/Basic/Input";
import Text from "../Text/Text";

const InputContainer = styled.div<{
	$error?: boolean;
	$focus: boolean;
	$design?: string;
}>`
	box-shadow: 0 0 0
		${(props) =>
			props.$focus
				? props.$design === "secondary"
					? "2px " + Color.border.neutralMedium
					: "1px " + Color.border.neutralHard
				: props.$design === "secondary"
				? "1px " + Color.border.neutralSoft
				: "none"};
	background-color: ${(props) =>
		props.$focus
			? "white"
			: props.$design === "secondary"
			? "white"
			: props.$error
			? Color.surface.redSoft
			: Color.surface.neutralSoft};
	border-radius: ${(props) =>
		props.$design === "secondary" ? "12px" : "6px"};
	padding: ${(props) =>
		props.$design === "secondary" ? "19px 16px" : "10px 16px"};
`;
const ErrorDiv = styled.div`
	margin: 0px 8px;
	font-style: normal;
	font-weight: 500;
	font-size: 14px;
	line-height: 12px;
	display: flex;
	color: ${Color.text.red};
`;

const PayoutForm = forwardRef((props: FormProps, ref: Ref<FormRef>) => {
	const [name, setName] = useState<string | undefined>(undefined);
	const [email, setEmail] = useState<string | undefined>(undefined);
	const [inputNameError, setInputNameError] = useState<string | undefined>(
		undefined
	);
	const [inputEmailError, setInputEmailError] = useState<string | undefined>(
		undefined
	);
	const [inputPaymentError, setInputPaymentError] = useState<
		string | undefined
	>(undefined);
	const [inputFocus, setInputFocus] = useState(false);
	const [paymentMethod, setPaymentMethod] = useState<
		StripeElementChangeEvent | undefined
	>(undefined);

	const stripe = useStripe();
	const elements = useElements();

	useEffect(() => {
		if (props.userData && props.userData.email)
			setEmail(props.userData.email);
		else setEmail(undefined);
	}, [props.userData]);

	useImperativeHandle(ref, () => ({
		async getPaymentMethod() {
			return await createPaymentMethod();
		},
	}));

	const onPaymentChange = async (payment: StripeElementChangeEvent) => {
		setInputPaymentError(undefined);
		if (payment.complete) {
			setPaymentMethod(payment);
		} else {
			setPaymentMethod(undefined);
		}
	};

	const createPaymentMethod = async (): Promise<
		PaymentMethod | undefined
	> => {
		if (elements && stripe && paymentMethod && name) {
			if (paymentMethod.elementType === "iban") {
				props.onLoading && props.onLoading(true);
				const ibanElement = elements.getElement(IbanElement);
				if (ibanElement && email) {
					const { error, paymentMethod } =
						await stripe.createPaymentMethod({
							type: "sepa_debit",
							sepa_debit: ibanElement,
							billing_details: {
								name: name,
								email: email,
							},
						});
					if (error) {
						console.error(error);
						props.onLoading && props.onLoading(false);
						return undefined;
					} else {
						props.onLoading && props.onLoading(false);
						return paymentMethod;
					}
				} else {
					if (!email)
						setInputEmailError("Debes añadir un email válido");
					return undefined;
				}
			} else {
				props.onLoading && props.onLoading(true);
				const cardElement = elements.getElement(CardElement);
				if (cardElement) {
					const { error, paymentMethod } =
						await stripe.createPaymentMethod({
							type: "card",
							card: cardElement,
							billing_details: {
								name: name,
							},
						});
					if (error) {
						console.error(error);
						props.onLoading && props.onLoading(false);
						return undefined;
					} else {
						props.onLoading && props.onLoading(false);
						return paymentMethod;
					}
				}
			}
		} else {
			if (!name) setInputNameError("Debes añadir el nombre del titular");
			if (!paymentMethod)
				setInputPaymentError("Debes añadir un método de pago válido");
			if (!email) setInputEmailError("Debes añadir un email válido");
			return undefined;
		}
	};

	const onInputChange = (value: string) => {
		setInputNameError(undefined);
		setName(value);
	};

	const onEmailInputChange = (value: string) => {
		setInputEmailError(undefined);
		setEmail(value);
	};

	const onInputFocus = () => {
		setInputFocus(true);
	};

	const onInputBlur = () => {
		setInputFocus(false);
	};

	return (
		<div style={props.style}>
			<Input
				type="text"
				title={
					props.placeholderName
						? props.placeholderName
						: "Nombre del titular"
				}
				placeholder={
					props.placeholderName
						? props.placeholderName
						: "Nombre del titular"
				}
				containerStyle={{ marginBottom: 8 }}
				design={props.design}
				onChange={(e: any) => e && onInputChange(e.target.value)}
				error={inputNameError}
			/>
			{props.option === "sepa_debit" && !props.userData?.email && (
				<Input
					title={
						props.placeholderEmail
							? props.placeholderEmail
							: "Email"
					}
					placeholder={
						props.placeholderEmail
							? props.placeholderEmail
							: "Email"
					}
					containerStyle={{ marginBottom: 8 }}
					type={"email"}
					design={props.design}
					onChange={(e) => e && onEmailInputChange(e.target.value)}
					error={inputEmailError}
				/>
			)}
			<InputContainer
				$error={inputPaymentError ? true : false}
				$focus={inputFocus}
				$design={props.design}
			>
				{props.option === "card" ? (
					<CardElement
						options={{
							style: {
								base: {
									fontFamily: "Poppins",
									fontSize:
										props.design === "secondary"
											? "15px"
											: "14px",
									"::placeholder": {
										color: Color.text.neutralMedium,
									},
								},
							},
							hidePostalCode: true,
						}}
						onChange={onPaymentChange}
						onFocus={onInputFocus}
						onBlur={onInputBlur}
					/>
				) : (
					<IbanElement
						options={{
							supportedCountries: ["SEPA"],
							style: {
								base: {
									fontFamily: "Poppins",
									fontSize:
										props.design === "secondary"
											? "15px"
											: "14px",
									"::placeholder": {
										color: Color.text.neutralMedium,
									},
								},
							},
						}}
						onChange={onPaymentChange}
						onFocus={onInputFocus}
						onBlur={onInputBlur}
					/>
				)}
			</InputContainer>
			{inputPaymentError && (
				<ErrorDiv>
					<Text
						type="p"
						weight="medium"
						style={{
							color: Color.text.red,
							marginTop: 4,
							fontSize: 14,
						}}
					>
						{inputPaymentError}
					</Text>
				</ErrorDiv>
			)}
		</div>
	);
});
export default PayoutForm;
export interface FormProps {
	style?: CSSProperties;
	option: "card" | "sepa_debit";
	error?: boolean;
	placeholderName?: string;
	placeholderEmail?: string;
	userData?: {
		email?: string;
	};
	design?: "primary" | "secondary";
	onLoading?: (a: boolean) => void;
}
export interface FormRef {
	getPaymentMethod: () => Promise<PaymentMethod | undefined>;
}
