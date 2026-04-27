import { CSSProperties, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import media from "styled-media-query";

import Color from "@constants/Color";
import Text from "@components/Text/Text";

const Container = styled.div`
	display: flex;
	flex-direction: row;
	height: 36px;
	width: fit-content;
	gap: 16px;
`;
const Cell = styled.div<{ $selected: boolean; color?: string }>`
	display: flex;
	flex: 1;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	border-bottom: ${(props) =>
		props.$selected
			? "2px solid " + (props.color ? props.color : Color.line.primary)
			: "0px"};
`;
const Container2 = styled.div`
	display: flex;
	flex-direction: row;
	width: fit-content;
	gap: 4px;
`;
const Container3 = styled.div`
	position: relative;
	display: flex;
	flex-direction: row;
	width: fit-content;
	height: 40px;
	gap: 0;
	padding: 3px;
	box-sizing: border-box;
	border-radius: 999px;
	box-shadow: inset 0 0 0 1px ${Color.line.soft};
	background-color: ${Color.background.neutral};
`;
const ActiveIndicator = styled.div`
	position: absolute;
	top: 3px;
	bottom: 3px;
	border-radius: 999px;
	background-color: ${Color.background.soft};
	box-shadow: 0 1px 2px ${Color.line.softTransparent};
	transition:
		transform 0.28s ease,
		width 0.28s ease;
	pointer-events: none;
`;
const Cell2 = styled.div<{ $selected: boolean; color?: string }>`
	display: flex;
	flex: 1;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	padding: 7px 16px;
	border-radius: 32px;
	background-color: ${(props) =>
		props.$selected
			? props.color
				? props.color
				: Color.background.primaryLow
			: "transparent"};
	transition: background-color 0.15s ease-in;
	&:hover {
		background-color: ${(props) =>
			props.$selected
				? props.color
					? props.color
					: Color.background.primaryLow
				: Color.status.neutral.hover};
	}
	${(props) => media.lessThan("medium")`
        &:hover{
            background-color: ${props.color ? props.color : Color.status.neutral.hover};
        }
    `}
`;
const Cell3 = styled.div`
	display: flex;
	flex: 1;
	align-items: center;
	justify-content: center;
	position: relative;
	z-index: 1;
	cursor: pointer;
	height: 34px;
	box-sizing: border-box;
	padding: 2px 16px;
	border-radius: 32px;
	white-space: nowrap;
	text-align: center;
`;
const ThirdLabel = styled(Text)<{ $selected: boolean; textColor?: string }>`
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100%;
	line-height: 1;
	color: ${(props) =>
		props.$selected
			? props.textColor
				? props.textColor
				: Color.text.deepBlue
			: Color.text.high};
	transition: color 0.2s ease;
`;
const Label2 = styled(Text)<{ $selected: boolean; textColor?: string }>`
	font-size: 14px;
	color: ${(props) =>
		props.$selected
			? props.textColor
				? props.textColor
				: Color.text.primary
			: Color.text.high};
	width: max-content;
	transition: color 0.15s ease-in;
`;

const Tabs = (props: Props) => {
	const [selection, setSelection] = useState(
		props.selectedOption ? props.selectedOption : props.options[0],
	);
	const cell3Refs = useRef<Record<string, HTMLDivElement | null>>({});
	const [indicatorStyle, setIndicatorStyle] = useState({ width: 0, left: 0 });
	const [segmentWidth, setSegmentWidth] = useState<number | undefined>(
		undefined,
	);

	useEffect(() => {
		if (props.selectedOption) {
			setSelection(props.selectedOption);
		}
	}, [props.selectedOption]);

	useEffect(() => {
		if (props.design !== "third" || !selection) {
			return;
		}

		const updateIndicator = () => {
			const cells = props.options
				.map((option) => cell3Refs.current[option.id])
				.filter((cell): cell is HTMLDivElement => Boolean(cell));
			const selectedIndex = props.options.findIndex(
				(option) => option.id === selection.id,
			);
			if (cells.length === 0 || selectedIndex === -1) {
				return;
			}

			const nextSegmentWidth = Math.max(
				...cells.map((cell) => cell.getBoundingClientRect().width),
			);

			setSegmentWidth(nextSegmentWidth);
			setIndicatorStyle({
				width: nextSegmentWidth,
				left: selectedIndex * nextSegmentWidth,
			});
		};

		updateIndicator();
		window.addEventListener("resize", updateIndicator);

		return () => {
			window.removeEventListener("resize", updateIndicator);
		};
	}, [props.design, props.options, selection]);

	const onClick = (option: OptionProps) => {
		setSelection(option);
		props.onChange && props.onChange(option);
	};

	return props.design === "secondary" ? (
		<Container2
			role={"container"}
			style={{ backgroundColor: props.backgroundColor, ...props.style }}
		>
			{props.options.map((item) => {
				const selected = selection.id === item.id ? true : false;
				return (
					<Cell2
						role={item.id}
						key={item.id}
						$selected={selected}
						onClick={() => onClick(item)}
						style={props.cellStyle}
						color={props.cellColor}
					>
						<Text
							type="p"
							weight="medium"
							style={{
								fontSize: 14,
								color: selected
									? props.textColor
										? props.textColor
										: Color.text.primary
									: Color.text.high,
								width: "max-content",
								...props.textStyle,
							}}
						>
							{item.title}
						</Text>
					</Cell2>
				);
			})}
		</Container2>
	) : props.design === "third" ? (
		<Container3
			role={"container"}
			style={{ backgroundColor: props.backgroundColor, ...props.style }}
		>
			<ActiveIndicator
				style={{
					width: indicatorStyle.width,
					transform: `translateX(${indicatorStyle.left}px)`,
					backgroundColor: props.cellColor ?? Color.background.soft,
				}}
			/>
			{props.options.map((item) => {
				const selected = selection.id === item.id ? true : false;
				return (
					<Cell3
						role={item.id}
						key={item.id}
						ref={(element) => {
							cell3Refs.current[item.id] = element;
						}}
						onClick={() => onClick(item)}
						style={{
							width: segmentWidth,
							minWidth: segmentWidth,
							boxSizing: "border-box",
							...props.cellStyle,
						}}
					>
						<ThirdLabel
							type="p"
							weight="medium"
							$selected={selected}
							textColor={props.textColor}
							style={{ fontSize: 14, width: "100%", ...props.textStyle }}
						>
							{item.title}
						</ThirdLabel>
					</Cell3>
				);
			})}
		</Container3>
	) : (
		<Container
			role={"container"}
			style={{ backgroundColor: props.backgroundColor, ...props.style }}
		>
			{props.options.map((item) => {
				const selected = selection.id === item.id ? true : false;
				return (
					<Cell
						role={item.id}
						key={item.id}
						$selected={selected}
						onClick={() => onClick(item)}
						style={props.cellStyle}
						color={props.cellColor}
					>
						<Label2
							type="p"
							weight="medium"
							textColor={props.textColor}
							$selected={selected}
							style={props.textStyle}
						>
							{item.title}
						</Label2>
					</Cell>
				);
			})}
		</Container>
	);
};
export default Tabs;
/**
 * Tab navigation component with two visual designs.
 * Primary design shows underline indicator, secondary design shows rounded background.
 *
 * @example
 * ```tsx
 * <Tabs
 *   design="secondary"
 *   options={[
 *     { id: "1", title: "Overview" },
 *     { id: "2", title: "Details" }
 *   ]}
 *   selectedOption={currentTab}
 *   onChange={(tab) => setCurrentTab(tab)}
 * />
 * ```
 */
export interface Props {
	style?: CSSProperties;
	/** Custom styles for individual tab cells */
	cellStyle?: CSSProperties;
	/** Custom styles for tab text labels */
	textStyle?: CSSProperties;
	/** Background color for selected tab (secondary design) */
	cellColor?: string;
	/** Text color for selected tab */
	textColor?: string;
	/** Background color for the entire tabs container */
	backgroundColor?: string;
	/** Array of tab options */
	options: Array<OptionProps>;
	/** Currently selected tab (controlled component) */
	selectedOption?: OptionProps;
	/** Visual design: `primary` (underline), `secondary` (rounded background) or `third` (segmented control) */
	design?: "primary" | "secondary" | "third";
	/** Callback fired when tab selection changes */
	onChange?: (option: OptionProps) => void;
}
export interface OptionProps {
	id: string;
	/** Display text for the tab */
	title: string;
}
