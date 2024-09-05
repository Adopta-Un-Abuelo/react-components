import {
	useState,
	useEffect,
	ComponentPropsWithoutRef,
	CSSProperties,
} from "react";
import styled from "styled-components";

import Text from "../Text/Text";
import Color from "../../constants/Color";
import { ChevronDown, ChevronUp } from "lucide-react";

const Container = styled.div`
	position: relative;
`;
const SelectStyled = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	border: 1px solid ${Color.line.soft};
	padding: 0px 12px;
	height: 36px;
	border-radius: 4px;
	cursor: pointer;
	background-color: white;
	gap: 8px;
`;
const OptionsView = styled.div`
	position: absolute;
	top: 42px;
	z-index: 1000;
	border: 1px solid rgba(0, 0, 0, 0.04);
	border: 1px solid ${Color.line.soft};
	background-color: white;
	border-radius: 4px;
	box-shadow: 0px 4px 8px 0px #0000001a;
	max-height: 220px;
	overflow: scroll;
	width: 100%;
`;
const Option = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	padding: 8px 16px;
	cursor: pointer;
	gap: 8px;
	&:hover {
		background-color: ${Color.background.soft};
	}
`;

const Select = (props: Props) => {
	const [showMenu, setShowMenu] = useState(false);
	const [selectedItem, setSelectedItem] = useState(
		props.options && props.options[0],
	);

	useEffect(() => {
		window.addEventListener("click", (e) => closeMenu(e));
		return window.removeEventListener("click", () => undefined);
	}, []);

	useEffect(() => {
		if (props.selectedItem) {
			setSelectedItem(props.selectedItem);
		}
	}, [props.selectedItem]);

	const onSelectClick = (e: any) => {
		if (!e) var e: any = window.event;
		e.cancelBubble = true;
		if (e.stopPropagation) e.stopPropagation();
		setShowMenu(!showMenu);
	};

	const closeMenu = (e: any) => {
		const element = document.getElementById(props.id);
		if (element !== null) {
			if (!element.contains(e.target)) {
				setShowMenu(false);
			}
		}
	};

	const onOptionClick = (option: any, e: any) => {
		if (!e) var e: any = window.event;
		e.cancelBubble = true;
		if (e.stopPropagation) e.stopPropagation();
		setSelectedItem(option);
		setShowMenu(false);
		props.onChange && props.onChange(option);
	};

	return (
		<Container>
			<SelectStyled
				role="select"
				id={props.id}
				style={props.style}
				onClick={onSelectClick}
			>
				{selectedItem?.icon}
				{!props.hideTitle && (
					<Text
						type="p"
						style={{
							flex: 1,
							fontSize: 14,
							color: props.style
								? props.style.color
								: Color.text.full,
						}}
					>
						{selectedItem?.label}
					</Text>
				)}
				{showMenu ? (
					<ChevronUp height={20} width={20} />
				) : (
					<ChevronDown height={20} width={20} />
				)}
			</SelectStyled>
			{showMenu && (
				<OptionsView role="menu" style={props.optionStyle}>
					{props.options.map((item, index) => {
						return (
							<Option
								role={"cell-" + index}
								key={props.id + "-cell-" + index}
								onClick={(e: any) => onOptionClick(item, e)}
							>
								{item.icon}
								<Text type="p">{item.label}</Text>
							</Option>
						);
					})}
				</OptionsView>
			)}
		</Container>
	);
};
export default Select;
export interface Props extends ComponentPropsWithoutRef<"div"> {
	id: string;
	optionStyle?: CSSProperties;
	hideTitle?: boolean;
	options: Array<OptionProps>;
	selectedItem?: OptionProps;
	onChange?: (option: any) => void;
}
interface OptionProps {
	icon?: React.ReactElement;
	label: string;
}
