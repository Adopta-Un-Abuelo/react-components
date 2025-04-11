import styled from "styled-components";
import Text from "../../Text/Text";
import { ColorV2 } from "../../../constants";
import { CSSProperties, useEffect, useRef, useState } from "react";

const Container = styled.div`
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
		console.log(priceInt);
		if (priceInt < 5) {
			setInputError("La donación mínima es de 5€");
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
		setOptionSelected(option);
		props.onChange && props.onChange(option);
	};

	return (
		<Container
            style={props.style}
        >
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
	currency: string;
	defaultOption?: number;
	onChange?: (value: number) => void;
};
