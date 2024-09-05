import { CSSProperties, useState } from "react";
import styled from "styled-components";

import { ChevronDown, ChevronUp } from "lucide-react";
import Text from "../Text/Text";
import { Color } from "../../constants";

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
	const [selectedIndex, setSelectedIndex] = useState<number | undefined>(
		undefined,
	);

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
							<Text type="h6">{item.title}</Text>
							<Text
								type="p"
								style={{
									display: selected ? "flex" : "none",
									marginTop: 8,
									color: Color.text.high,
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
export interface Props {
	style?: CSSProperties;
	options: Array<{
		id: string;
		title: string;
		description: string;
	}>;
	onClick?: (index: number) => void;
}
