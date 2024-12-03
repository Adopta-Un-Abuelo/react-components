import { useState, useEffect, CSSProperties } from "react";
import styled from "styled-components";

import Text from "../Text/Text";
import Color from "../../constants/Color";
import ColorV2 from "../../constants/ColorV2";
import SearchBar from "../SearchBar/SearchBar";
import { Check, ChevronDown, ChevronUp } from "lucide-react";

const DropdownContainer = styled.div`
	display: flex;
	flex: 1;
	flex-direction: row;
	align-items: center;
	max-height: 40px;
	min-height: 40px;
	padding: 0px 12px;
	background: ${Color.background.soft};
	border-radius: 6px;
	position: relative;
`;
const DropView = styled.div`
	display: flex;
	flex: 1;
	justify-content: space-between;
	cursor: pointer;
`;
const Menu = styled.div<{ $position?: "bottom" | "top" }>`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	padding: 8px;
	position: absolute;
	left: 0px;
	top: ${(props) => (props.$position === "top" ? "unset" : "40px")};
	bottom: ${(props) => (props.$position === "top" ? "40px" : "unset")};
	max-height: 250px;
	max-width: 94%;
	background: #ffffff;
	box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.08);
	border: 1px solid rgba(0, 0, 0, 0.04);
	border-radius: 4px;
	overflow: hidden;
	overflow-y: auto;
	z-index: 2;
`;
const Option = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	padding: 0px 6px;
	gap: 8px;
	position: static;
	height: 36px;
	min-height: 36px;
	width: -webkit-fill-available;
	width: -moz-available;
	background: #ffffff;
	border-radius: 6px;
	cursor: pointer;
	&:hover {
		background-color: ${Color.status.neutral.hover};
	}
`;
const IconView = styled.div`
	height: 16px;
	width: 16px;
`;
const Box = styled.div<{ $selected: boolean }>`
	display: flex;
	align-items: center;
	justify-content: center;
	height: 16px;
	width: 16px;
	min-height: 16px;
	min-width: 16px;
	background-color: ${(props) =>
		props.$selected
			? Color.background.primary
			: Color.background.primaryLow};
	border: ${(props) =>
		props.$selected
			? "1px solid " + Color.background.primary
			: "1px solid " + Color.line.primarySoft};
	border-radius: 4px;
`;
const Dropdown = (props: Props) => {
	const [open, setOpen] = useState(false);
	const [selected, setSelected] = useState<Array<OptionProps>>(
		props.selectedOptions || []
	);
	const [update, setUpdate] = useState(false);

	useEffect(() => {
		if (Array.isArray(props.selectedOptions) && props.selectedOptions.length > 0) {
			const temp: any = [];
			props.options.forEach((item) => {
				if (props.selectedOptions && props.selectedOptions.some((temp) => temp.id === item.id)) {
					temp.push(item);
				}
			});
			setSelected(temp);
		} else {
			setSelected([]);
		}
	}, [props.selectedOptions, props.options]);

	useEffect(() => {
		// On click outside the filter view
		const handleClickOutside = (e: any) => {
			const element = document.getElementById(props.id);
			if (element !== null && !element.contains(e.target) && open) {
				onFilterClick(e);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [open, props.id]);

	const onFilterClick = (e: any) => {
		e.stopPropagation();
		setOpen(false);
	};

	const onClickOption = (item: OptionProps) => {
		if (props.type === "single") {
			setSelected([item]);
			setOpen(!open);
			props.onChange && props.onChange([item]);
		} else {
			const result = selected.findIndex((obj) => item.id === obj.id);
			let tempArray = [...selected];
			if (result === -1) tempArray.push(item);
			else tempArray.splice(result, 1);
			setSelected(tempArray);
			setUpdate(!update);
			props.onChange && props.onChange(tempArray);
		}
	};

	const onSearchChange = (e: any) => {
		props.onSearchChange && props.onSearchChange(e.target.value);
	};

	return (
		<DropdownContainer role="dropdown" style={props.style} id={props.id}>
			<DropView onClick={() => setOpen(!open)}>
				<Text
					type="p"
					style={{
						overflow: "hidden",
						textOverflow: "ellipsis",
						display: "-webkit-box",
						WebkitLineClamp: 1,
						WebkitBoxOrient: "vertical",
						color:
							selected.length > 0
								? ColorV2.text.neutralHard
								: ColorV2.text.neutralMedium,
					}}
				>
					{selected.length > 0
						? selected.map((item, index) =>
								index === 0 ? item.title : ", " + item.title
						  )
						: props.placeholder}
				</Text>
				{open ? (
					<ChevronUp style={{ stroke: Color.text.high }} />
				) : (
					<ChevronDown style={{ stroke: Color.text.high }} />
				)}
			</DropView>
			{open && (
				<Menu
					data-testid="menu"
					$position={props.menuPosition}
					style={props.menuStyle}
				>
					{props.onSearchChange && (
						<SearchBar
							style={{ marginBottom: 8 }}
							type="small"
							placeholder="Buscar"
							onChange={onSearchChange}
						/>
					)}
					{props.options.map((item) => {
						const isSelected = selected.some(
							(selectedItem) => selectedItem.id === item.id
						);
						return (
							<Option
								key={item.id}
								style={props.optionStyle}
								onClick={() => onClickOption(item)}
							>
								<IconView>
									{props.type === "single" ? (
										isSelected && (
											<Check height={16} width={16} />
										)
									) : (
										<Box $selected={isSelected}>
											{isSelected && (
												<Check
													height={16}
													width={16}
													color={"white"}
												/>
											)}
										</Box>
									)}
								</IconView>
								{item.icon}
								<Text
									type="p"
									style={{ color: `${Color.text.full}` }}
								>
									{item.title}
								</Text>
							</Option>
						);
					})}
				</Menu>
			)}
		</DropdownContainer>
	);
};
export default Dropdown;
export interface Props {
	id: string;
	style?: CSSProperties;
	menuStyle?: CSSProperties;
	optionStyle?: CSSProperties;
	options: Array<OptionProps>;
	placeholder: string;
	selectedOptions?: Array<OptionProps>;
	type?: "single" | "multiple";
	menuPosition?: "bottom" | "top";
	onChange?: (a: Array<OptionProps>) => void;
	onSearchChange?: (text: string) => void;
}
export interface OptionProps {
	id: string;
	title?: string;
	icon?: JSX.Element;
}
