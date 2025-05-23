import styled from "styled-components";
import Text from "../../Text/Text";
import { ColorV2 } from "../../../constants";
import { CSSProperties, useEffect, useRef, useState } from "react";
import media from "styled-media-query";

const Container = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	gap: 8px;
`;
const Row = styled.div`
	display: flex;
	flex-direction: row;
	gap: 8px;
`;
const Cell = styled.div<{ $selected: boolean }>`
	display: flex;
	flex: 1;
	align-items: center;
	justify-content: center;
	height: 64px;
	padding: 0px 16px;
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
	align-items: center;
	justify-content: center;
	min-height: 64px;
	max-height: 64px;
	box-shadow: ${(props) =>
		props.$focus || props.$isSelected
			? `0 0 0 2px ${ColorV2.border.primary}`
			: props.$error
			? `0 0 0 2px ${ColorV2.border.red}`
			: `0 0 0 1px ${ColorV2.border.neutralSoft}`};
	border-radius: 16px;
	padding-right: 24px;
	background-color: ${(props) =>
		props.$isSelected || props.$focus
			? ColorV2.border.primarySoft
			: "transparent"};
	cursor: text;
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
	const input = useRef<HTMLInputElement>(null);
	const [optionSelected, setOptionSelected] = useState<number | undefined>(
		undefined
	);
	const [customPrice, setCustomPrice] = useState<string>("");
	const [inputFocus, setInputFocus] = useState(false);
	const [inputError, setInputError] = useState("");

	useEffect(() => {
		setOptionSelected(props.defaultOption);
	}, [props.defaultOption]);

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
		const minPrice = props.options[0];
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
			{props.label && props.labelValueConversion && (
				<LabelContainer
					style={{
						justifyContent: optionSelected
							? props.options.indexOf(optionSelected) === 0
								? "flex-start"
								: props.options.indexOf(optionSelected) === 1
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
									? props.options.indexOf(optionSelected) ===
									  0
										? "left"
										: props.options.indexOf(
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
			<Row>
				{props.options.map((option, index) => {
					const isSelected =
						optionSelected === option && customPrice.length === 0;
					return (
						<Cell
							key={"price-option-" + index}
							$selected={isSelected}
							onClick={() => onCellClick(option)}
						>
							<Text type="h3" weight="medium">
								{option}
								<span style={{ fontSize: 18 }}>
									{props.currency}
								</span>
							</Text>
						</Cell>
					);
				})}
			</Row>
			{!props.hideCustomAmount && (
				<InputContainer
					$focus={inputFocus}
					$isSelected={customPrice.length > 0}
					$error={inputError.length > 0 ? true : false}
					onClick={() => input.current?.focus()}
				>
					<Input
						ref={input}
						style={{
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
				</InputContainer>
			)}
			{inputError && (
				<Text
					type="p2"
					weight="medium"
					style={{ color: ColorV2.text.red, textAlign: "center" }}
				>
					{inputError}
				</Text>
			)}
		</Container>
	);
};
export default InputPrice;
export type InputPriceProps = {
	style?: CSSProperties;
	options: number[];
	label?: string;
	labelValueConversion?: number;
	currency: string;
	defaultOption?: number;
	hideCustomAmount?: boolean;
	onChange?: (value: number) => void;
};
