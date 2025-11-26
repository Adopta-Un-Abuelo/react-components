import styled from "styled-components";
import Text from "../../Text/Text";
import { ColorV2 } from "../../../constants";
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
	width: 257px;
	min-width: ${(props) => (props.$data ? "257px" : "unset")};
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 14px 16px;
	height: fit-content;
	border-radius: 16px;
	box-shadow: ${(props) =>
		props.$selected
			? `0 0 0 2px ${ColorV2.border.primary}`
			: `0 0 0 1px ${ColorV2.border.neutralSoft}`};
	cursor: pointer;
	background-color: ${(props) =>
		props.$selected ? ColorV2.border.primarySoft : "transparent"};
	&:hover {
		background-color: ${ColorV2.border.primarySoft};
		box-shadow: 0 0 0 2px ${ColorV2.border.primary};
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
	height: fit-content;
	box-shadow: ${(props) =>
		props.$focus || props.$isSelected
			? `0 0 0 2px ${ColorV2.border.primary}`
			: props.$error
			? `0 0 0 2px ${ColorV2.border.red}`
			: `0 0 0 1px ${ColorV2.border.neutralSoft}`};
	border-radius: 16px;
	padding: 14px 16px;
	background-color: ${(props) =>
		props.$isSelected || props.$focus
			? ColorV2.border.primarySoft
			: "transparent"};
	cursor: pointer;
	&:hover {
		background-color: ${ColorV2.border.primarySoft};
		box-shadow: 0 0 0 2px ${ColorV2.border.primary};
	}
`;
const LabelContainer = styled.div`
	display: flex;
	margin-bottom: 6px;
`;
const Label = styled(Text)`
	position: relative;
	padding: 8px 12px;
	background-color: ${ColorV2.surface.primary};
	border-radius: 8px;
	color: white;
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
		border-top: 11px solid ${ColorV2.surface.primary};
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
	const iconsT: any = icons;
	const cellRefs = useRef<HTMLInputElement[]>([]);
	const input = useRef<HTMLInputElement>(null);
	const [optionSelected, setOptionSelected] = useState<number | undefined>(
		undefined
	);
	const [customPrice, setCustomPrice] = useState<string>("");
	const [inputFocus, setInputFocus] = useState(false);
	const [inputError, setInputError] = useState("");
	const [numberFontSize, setNumberFontSize] = useState(24);

	useEffect(() => {
		setOptionSelected(props.defaultOption);
	}, [props.defaultOption]);

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

		if (index !== -1 && cellRefs?.current && cellRefs?.current[index]) {
			cellRefs.current[index].scrollIntoView({
				behavior: "smooth",
				block: "center", // <-- centra verticalmente
				inline: "center", // <-- centra horizontalmente
			});
		}
	}, [optionSelected]);

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
		const priceInt = parseInt(e.target.value);
		const minPrice = props.options[0].price;
		if (priceInt < minPrice || !priceInt) {
			setInputError(
				`La donación mínima es de ${minPrice}${props.currency}`
			);
		} else {
			setInputError("");
			props.onChange &&
				props.onChange(
					e.target.value.length > 0
						? priceInt
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
		<Container style={props.style}>
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
							ref={(el: any) => (cellRefs.current[index] = el)}
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
								<span style={{ fontSize: numberFontSize - 6 }}>
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
									"1px solid " + ColorV2.border.neutralSoft,
							}}
						>
							{props.customAmountData}
						</div>
					)}
					{inputError && (
						<Text
							type="p2"
							weight="medium"
							style={{
								marginTop: 4,
								color: ColorV2.text.red,
								textAlign: "center",
							}}
						>
							{inputError}
						</Text>
					)}
				</InputContainer>
			)}
		</Container>
	);
};
export default InputPrice;
export type InputPriceProps = {
	style?: CSSProperties;
	containerStyle?: CSSProperties;
	options: {
		price: number;
		data?: {
			title: string;
			icon?: string;
		}[];
	}[];
	label?: string;
	labelValueConversion?: number;
	currency: string;
	defaultOption?: number;
	hideCustomAmount?: boolean;
	customAmountData?: React.ReactElement;
	onChange?: (value: number) => void;
};
