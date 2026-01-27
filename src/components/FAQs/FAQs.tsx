import { CSSProperties, useState } from "react";
import styled from "styled-components";

import { ChevronDown, ChevronUp } from "lucide-react";
import Text from "@components/Text/Text";
import Color from "@constants/Color";
import ColorV2 from "@constants/ColorV2";

const Container = styled.div``;
const Cell = styled.div<{ $selected: boolean }>`
	display: flex;
	flex-direction: row;
	margin-bottom: 24px;
	cursor: pointer;
	&:hover {
		text-decoration: ${(props) => (props.$selected ? "none" : "underline")};
	}
`;
const Column = styled.div`
	display: flex;
	flex-direction: column;
`;

const FAQs = (props: Props) => {
	const [selectedIndex, setSelectedIndex] = useState<number | undefined>(0);

	const onCellClick = (index: number) => {
		const selection = index === selectedIndex ? undefined : index;
		setSelectedIndex(selection);
		props.onClick && props.onClick(index);
	};

	return (
		<Container role="container" style={props.style}>
			{props.options.map((item, index) => {
				const selected = selectedIndex === index;
				return (
					<Cell
						role={item.id}
						key={item.id + index}
						$selected={selected}
						onClick={() => onCellClick(index)}
					>
						<Column>
							{selected ? (
								<ChevronUp
									width={20}
									height={20}
									color={Color.text.high}
									style={{ marginTop: 3 }}
								/>
							) : (
								<ChevronDown
									width={20}
									height={20}
									color={Color.text.high}
									style={{ marginTop: 3 }}
								/>
							)}
						</Column>
						<Column style={{ marginLeft: 12 }}>
							<Text type="p" weight="medium">
								{item.title}
							</Text>
							<Text
								type="p2"
								style={{
									display: selected ? "flex" : "none",
									marginTop: 8,
									color: ColorV2.text.neutralMedium,
								}}
							>
								{item.description}
							</Text>
						</Column>
					</Cell>
				);
			})}
		</Container>
	);
};
export default FAQs;
/**
 * FAQ accordion component with expandable/collapsible question-answer pairs.
 * Only one question can be expanded at a time.
 *
 * @example
 * ```tsx
 * <FAQs
 *   options={[
 *     {
 *       id: "1",
 *       title: "How do I get started?",
 *       description: "To get started, simply..."
 *     }
 *   ]}
 *   onClick={(index) => trackFaqClick(index)}
 * />
 * ```
 */
export interface Props {
	style?: CSSProperties;
	/** Array of FAQ items with question and answer */
	options: Array<{
		id: string;
		/** Question text (always visible) */
		title: string;
		/** Answer text (visible when expanded) */
		description: string;
	}>;
	/** Callback fired when FAQ item is clicked, receives item index */
	onClick?: (index: number) => void;
}
