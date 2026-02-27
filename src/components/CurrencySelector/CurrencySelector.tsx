import styled from "styled-components";
import Text from "@components/Text/Text";
import { useEffect, useState } from "react";
import ColorV2 from "@constants/ColorV2";
import ModalComponent from "@components/Modal/Modal";
import { Check } from "lucide-react";
import media from "styled-media-query";

const Container = styled.div`
	display: flex;
	width: fit-content;
	box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.24);
	background-color: white;
	border-radius: 100px;
	padding: 10px;
	cursor: pointer;
	&:hover {
		background-color: ${ColorV2.surface.neutralSoft};
	}
`;
const Cell = styled.div<{ $isSelected?: boolean }>`
	display: flex;
	align-items: center;
	padding: 8px;
	padding-left: ${(props) => (props.$isSelected ? "4px" : "24px")};
	border-radius: 8px;
	cursor: pointer;
	gap: 4px;
	margin: 0px -4px;
	&:hover {
		background-color: ${ColorV2.surface.neutralSoft};
	}
	${media.lessThan("medium")`
        padding: 12px 0px;
        border-bottom: 1px solid ${ColorV2.border.neutralSoft};
        border-radius: 0px;
    `}
`;
const CheckIcon = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	height: 24px;
	width: 24px;
	border-radius: 24px;
	background-color: ${ColorV2.surface.primary};
`;

const CurrencySelector = (props: CurrencySelectorProps) => {
	const isMobile = window.innerWidth <= 450;
	const [selectedOption, setSelectedOption] = useState(
		props.selectedOption || props.options[0]
	);
	const [showModal, setShowModal] = useState(false);

	useEffect(() => {
		if (props.selectedOption) {
			setSelectedOption(props.selectedOption);
		} else if (props.options.length > 0) {
			setSelectedOption(props.options[0]);
		}
	}, [props.selectedOption, props.options]);

	const onCurrencyChange = (option: CurrencySelectorOption) => {
		setSelectedOption(option);
		setShowModal(false);
		props.onChange?.(option);
	};

	return (
		<>
			<ModalComponent
				isVisible={showModal}
				type={isMobile ? "full-screen" : "default"}
				hideHeader={true}
				contentStyle={{ paddingBottom: 12 }}
				onClose={() => setShowModal(false)}
			>
				<Text type="p" weight="medium" style={{ marginBottom: 8 }}>
					Selecciona una divisa
				</Text>
				{props.options.map((option, index) => {
					const isSelected =
						selectedOption.currency === option.currency;
					return (
						<Cell
							key={index}
							$isSelected={isSelected}
							onClick={() => onCurrencyChange(option)}
						>
							{!isMobile && isSelected && (
								<Check
									height={16}
									width={16}
									color={ColorV2.text.primary}
								/>
							)}
							<Text type="p2" style={{ flex: 1 }}>
								{option.name} ({option.symbol})
							</Text>
							{isMobile && isSelected && (
								<CheckIcon>
									<Check
										height={16}
										width={16}
										color={"white"}
									/>
								</CheckIcon>
							)}
						</Cell>
					);
				})}
			</ModalComponent>
			<Container style={props.style} onClick={() => setShowModal(true)}>
				<Text type="b2">
					{selectedOption.symbol} {selectedOption.currency}
				</Text>
			</Container>
		</>
	);
};
export default CurrencySelector;
/**
 * Currency selector dropdown with modal for choosing from available currencies.
 * Displays symbol and currency code (e.g., "€ EUR"). Responsive with full-screen modal on mobile.
 *
 * @example
 * ```tsx
 * <CurrencySelector
 *   options={[
 *     { currency: "EUR", name: "Euro", symbol: "€" },
 *     { currency: "USD", name: "US Dollar", symbol: "$" },
 *     { currency: "GBP", name: "British Pound", symbol: "£" }
 *   ]}
 *   selectedOption={{ currency: "EUR", name: "Euro", symbol: "€" }}
 *   onChange={(option) => setCurrency(option.currency)}
 * />
 * ```
 */
export interface CurrencySelectorProps {
	style?: React.CSSProperties;
	/** Available currency options */
	options: CurrencySelectorOption[];
	/** Currently selected currency (defaults to first option) */
	selectedOption?: CurrencySelectorOption;
	/** Callback when currency is selected */
	onChange?: (option: CurrencySelectorOption) => void;
}
interface CurrencySelectorOption {
	/** ISO currency code (e.g., "EUR", "USD") */
	currency: string;
	/** Full currency name (e.g., "Euro") */
	name: string;
	/** Currency symbol (e.g., "€", "$") */
	symbol: string;
}
