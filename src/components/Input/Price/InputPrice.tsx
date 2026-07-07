import styled from "styled-components";
import Text from "@components/Text/Text";
import ColorV2 from "@constants/ColorV2";
import { CSSProperties, useEffect, useRef, useState } from "react";
import media from "styled-media-query";
import * as icons from "lucide-react";

const Container = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	gap: 8px;
	overflow-y: scroll;
	padding: 2px;
	-ms-overflow-style: none;
	scrollbar-width: none;
	::-webkit-scrollbar {
		display: none;
	}
`;
const Row = styled.div<{ $data: boolean }>`
	display: flex;
	flex-direction: row;
`;
const CellContainer = styled.div`
	display: flex;
	flex-direction: row;
	gap: 8px;
	flex: 1;
	${media.lessThan("small")`
        flex-direction: row;
    `}
`;
const Cell = styled.div<{ $selected: boolean; $data: boolean }>`
	display: flex;
	flex: 1;
	width: 247px;
	min-width: ${(props) => (props.$data ? "247px" : "unset")};
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 14px 16px;
	height: 64px;
	box-sizing: border-box;
	border-radius: 16px;
	box-shadow: ${(props) =>
		props.$selected
			? `inset 0 0 0 2px ${ColorV2.border.primary}`
			: `inset 0 0 0 1px ${ColorV2.border.neutralSoft}`};
	background-color: ${(props) =>
		props.$selected ? ColorV2.surface.primarySoft : "transparent"};
	cursor: pointer;

	&:hover {
		background-color: ${(props) =>
		props.$selected
			? ColorV2.surface.primarySoft
			: ColorV2.surface.neutralSoft};
	}
`;
const Input = styled.input`
	font-family: Poppins;
	font-size: 24px;
	font-weight: 500;
	color: ${ColorV2.text.neutralHard};
	display: flex;
	border: none;
	outline: none;
	text-align: center;
	appearance: textfield;
	-moz-appearance: textfield;
	background-color: transparent;
	&::placeholder {
		font-size: 18px;
	}
	&::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
`;
const InputContainer = styled.div<{
	$focus: boolean;
	$isSelected: boolean;
	$error: boolean;
}>`
	display: flex;
	flex: 1;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 64px;
	box-sizing: border-box;
	box-shadow: ${(props) =>
		props.$error
			? `inset 0 0 0 2px ${ColorV2.border.red}`
			: props.$focus || props.$isSelected
				? `inset 0 0 0 2px ${ColorV2.border.primary}`
				: `inset 0 0 0 1px ${ColorV2.border.neutralSoft}`};
	border-radius: 16px;
	padding: 14px 16px;
	background-color: ${(props) =>
		!props.$error && (props.$isSelected || props.$focus)
			? ColorV2.surface.primarySoft
			: "transparent"};
	cursor: pointer;
	&:hover {
		background-color: ${ColorV2.border.neutralSoft};
	}
`;
const ErrorMessage = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	min-height: 20px;
`;
const LabelContainer = styled.div`
	display: flex;
	margin-bottom: 6px;
`;
const Label = styled(Text)`
	position: relative;
	padding: 8px 12px;
	background-color: ${ColorV2.surface.neutralSoft};
	border-radius: 8px;
	color: ${ColorV2.text.neutralHard};
	max-width: 50%;
	text-align: center;
	${media.lessThan("small")`
        max-width: 100%;
    `}
`;
const LabelContainerSpan = styled.span<{
	$position: "left" | "center" | "right";
}>`
	&::before {
		content: "";
		position: absolute;
		width: 0;
		height: 0;
		border-top: 11px solid ${ColorV2.surface.neutralSoft};
		border-left: 8px solid transparent;
		border-right: 8px solid transparent;
		top: 100%;
		left: ${(props) =>
			props.$position === "left"
				? "20%"
				: props.$position === "right"
				? "80%"
				: "50%"};
		margin-left: -8px;
		margin-top: -1px;
	}
`;

const InputPrice = (props: InputPriceProps) => {
	const iconsT = icons as unknown as Record<string, React.ComponentType<{ height?: number; width?: number; color?: string }>>;
	const containerRef = useRef<HTMLDivElement>(null);
	const cellRefs = useRef<(HTMLDivElement | null)[]>([]);
	const input = useRef<HTMLInputElement>(null);
	const [optionSelected, setOptionSelected] = useState<number | undefined>(
		undefined
	);
	const [customPrice, setCustomPrice] = useState<string>("");
	const [inputFocus, setInputFocus] = useState(false);
	const [inputError, setInputError] = useState("");
	const [numberFontSize, setNumberFontSize] = useState(24);

	const minPrice = props.options[0].price;
	//A custom-amount string is invalid when it is not a number or is below the
	//minimum. Shared by the blur visual error and the onErrorChange signal.
	const isCustomAmountInvalid = (value: string) => {
		const priceInt = parseInt(value);
		return isNaN(priceInt) || priceInt < minPrice;
	};

	useEffect(() => {
		setOptionSelected(props.defaultOption);
	}, [props.defaultOption]);

	//Report the custom-amount validity to the parent. Derived from customPrice
	//(which changes as the user types, a gesture that precedes any submit tap),
	//so a parent gating a button on this signal is always up to date in time —
	//unlike a blur-based signal, which fires in the same tap as the click.
	//The visual error (setInputError) still appears on blur; this only notifies.
	useEffect(() => {
		if (!props.onErrorChange) return;
		const hasError =
			customPrice.length > 0 && isCustomAmountInvalid(customPrice);
		props.onErrorChange(hasError);
	}, [customPrice, props.options]);

	useEffect(() => {
		if (props.options.length > 0) {
			const lastOption = props.options[props.options.length - 1];
			const lastOptionLength = lastOption.price.toString().length;
			if (lastOptionLength > 5) {
				setNumberFontSize(16);
			} else if (lastOptionLength > 4) {
				setNumberFontSize(18);
			} else if (lastOptionLength > 3) {
				setNumberFontSize(21);
			}
		}
	}, [props.options]);

	//Center the cell
	useEffect(() => {
		const index = props.options.findIndex(
			(o) => o.price === optionSelected
		);

		if (index !== -1 && cellRefs.current[index] && containerRef.current) {
			const container = containerRef.current;
			const cell = cellRefs.current[index];

			const containerWidth = container.offsetWidth;
			const cellWidth = cell.offsetWidth;
			const cellLeft = cell.offsetLeft;

			// Calculamos scrollLeft para centrar el elemento horizontalmente
			const scrollLeft = cellLeft - (containerWidth / 2 - cellWidth / 2);

			container.scrollTo({
				left: scrollLeft,
				behavior: "smooth", // animación opcional
			});
		}
	}, [optionSelected]);

	//Only whole numbers are allowed, so block decimal separators, sign and
	//scientific notation. This also prevents the browser's "value cannot be
	//parsed" warning that a type="number" input logs for values like "9,3".
	const onInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if ([".", ",", "e", "E", "+", "-"].includes(e.key)) {
			e.preventDefault();
		}
	};

	const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setCustomPrice(e.target.value);
	};

	const onInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
		setInputFocus(true);
		setInputError("");
		setOptionSelected(undefined);
	};

	const onInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
		setInputFocus(false);
		if (isCustomAmountInvalid(e.target.value)) {
			setInputError(
				`La donación mínima es de ${minPrice}${props.currency}`
			);
		} else {
			setInputError("");
			props.onChange &&
				props.onChange(
					e.target.value.length > 0
						? parseInt(e.target.value)
						: optionSelected
						? optionSelected
						: 0
				);
		}
	};

	const onCellClick = (option: number) => {
		setCustomPrice("");
		setInputError("");
		setOptionSelected(option);
		props.onChange && props.onChange(option);
	};

	return (
		<Container style={props.style} ref={containerRef}>
			{props.label &&
				props.labelValueConversion &&
				!props.options[0].data && (
					<LabelContainer
						style={{
							justifyContent: optionSelected
								? props.options.findIndex(
										(i) => i.price === optionSelected
								  ) === 0
									? "flex-start"
									: props.options.findIndex(
											(i) => i.price === optionSelected
									  ) === 1
									? "center"
									: "flex-end"
								: "center",
						}}
					>
						<Label type="c1">
							{props.label.replace(
								"{{value}}",
								(
									props.labelValueConversion *
									(optionSelected
										? optionSelected
										: customPrice
										? parseInt(customPrice)
										: 0)
								).toFixed(0)
							)}
							<LabelContainerSpan
								$position={
									optionSelected
										? props.options.findIndex(
												(i) =>
													i.price === optionSelected
										  ) === 0
											? "left"
											: props.options.findIndex(
													(i) =>
														i.price ===
														optionSelected
											  ) === 1
											? "center"
											: "right"
										: "center"
								}
							/>
						</Label>
					</LabelContainer>
				)}
			<CellContainer style={props.containerStyle}>
				{props.options.map((option, index) => {
					const isSelected =
						optionSelected === option.price &&
						customPrice.length === 0;
					return (
						<Cell
							key={"price-option-" + index}
							ref={(el: HTMLDivElement | null) => { cellRefs.current[index] = el; }}
							$selected={isSelected}
							$data={option.data ? true : false}
							onClick={() => onCellClick(option.price)}
						>
							<Text
								type="h3"
								weight="medium"
								style={{ fontSize: numberFontSize }}
							>
								{option.price.toLocaleString("es-ES", {
									useGrouping: true,
								})}
								<span
									style={{
										fontSize: numberFontSize - 6,
										marginLeft: 2,
									}}
								>
									{props.currency}
								</span>
							</Text>
							{option.data && option.data.length > 0 && (
								<div
									style={{
										display: "flex",
										flexDirection: "column",
										gap: 3,
										marginTop: 12,
										paddingTop: 12,
										borderTop:
											"1px solid " +
											ColorV2.border.neutralSoft,
									}}
								>
									{option.data.map((item, index2) => {
										const Icon = item.icon
											? iconsT[item.icon]
											: iconsT["Check"];
										return (
											<div
												style={{
													display: "flex",
													gap: 8,
												}}
												key={`column-${index}-data-${index2}`}
											>
												<Icon
													height={16}
													width={16}
													color={ColorV2.text.primary}
												/>
												<Text
													type="c1"
													style={{ flex: 1 }}
												>
													{item.title}
												</Text>
											</div>
										);
									})}
								</div>
							)}
						</Cell>
					);
				})}
			</CellContainer>
			{!props.hideCustomAmount && (
				<>
					<InputContainer
						$focus={inputFocus}
						$isSelected={customPrice.length > 0}
						$error={inputError.length > 0 ? true : false}
						onClick={() => input.current?.focus()}
					>
						<Row $data={props.options[0].data ? true : false}>
							<Input
								ref={input}
								style={{
									fontSize: numberFontSize,
									width:
										customPrice.length > 0
											? customPrice.length + "ch"
											: "unset",
								}}
								type="number"
								value={customPrice}
								placeholder="Otra cantidad"
								onKeyDown={onInputKeyDown}
								onChange={onInputChange}
								onFocus={onInputFocus}
								onBlur={onInputBlur}
							/>
							{customPrice.length > 0 && (
								<Text
									type="h6"
									weight="medium"
									style={{ fontSize: 18, marginTop: 6 }}
								>
									{props.currency}
								</Text>
							)}
						</Row>
						{props.customAmountData && (
							<div
								style={{
									marginTop: 12,
									paddingTop: 12,
									borderTop:
										"1px solid " +
										ColorV2.border.neutralSoft,
								}}
							>
								{props.customAmountData}
							</div>
						)}
					</InputContainer>
					<ErrorMessage>
						{inputError && (
							<Text
								type="p2"
								weight="medium"
								style={{
									color: ColorV2.text.red,
									textAlign: "center",
								}}
							>
								{inputError}
							</Text>
						)}
					</ErrorMessage>
				</>
			)}
		</Container>
	);
};
export default InputPrice;
/**
 * Price selector with predefined options in horizontal scroll and optional custom input.
 * Auto-centers selected option, validates minimum price. Spanish number formatting.
 *
 * @example
 * ```tsx
 * <InputPrice
 *   options={[
 *     { price: 10, data: [{ title: "1 coffee", icon: "Coffee" }] },
 *     { price: 25, data: [{ title: "3 coffees", icon: "Coffee" }] },
 *     { price: 50 }
 *   ]}
 *   currency="€"
 *   label="Equivale a {{value}} cafés"
 *   labelValueConversion={0.1}
 *   defaultOption={25}
 *   onChange={(price) => setDonationAmount(price)}
 * />
 * ```
 */
export type InputPriceProps = {
	style?: CSSProperties;
	containerStyle?: CSSProperties;
	/** Predefined price options (scrollable horizontally) */
	options: {
		price: number;
		/** Optional feature list shown below price with icons */
		data?: {
			title: string;
			/** Lucide icon name (e.g., "Check", "Coffee") */
			icon?: string;
		}[];
	}[];
	/** Floating label above options. Use {{value}} for dynamic calculation */
	label?: string;
	/** Multiplier for {{value}} in label (e.g., 0.1 converts 100€ to "10 coffees") */
	labelValueConversion?: number;
	/** Currency symbol (e.g., "€", "$") */
	currency: string;
	/** Pre-select an option by price */
	defaultOption?: number;
	/** Hide custom amount input field */
	hideCustomAmount?: boolean;
	/** Custom element shown below custom amount input */
	customAmountData?: React.ReactElement;
	/** Callback with selected/entered price. Validates minimum from first option */
	onChange?: (value: number) => void;
	/** Fires when the custom-amount min-validation error appears (true) or clears (false) */
	onErrorChange?: (hasError: boolean) => void;
};
