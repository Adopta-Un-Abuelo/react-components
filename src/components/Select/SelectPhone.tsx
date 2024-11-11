import { useState, useEffect, ComponentPropsWithoutRef } from "react";
import styled from "styled-components";
import Flags from "country-flag-icons/react/3x2";
import Fuse from "fuse.js";

import Text from "../Text/Text";
import Color from "../../constants/Color";
import SearchBar from "../SearchBar/SearchBar";
import { ChevronDown, ChevronUp } from "lucide-react";

const Container = styled.div``;
const SelectStyled = styled.div<{ $showMenu: boolean }>`
	display: flex;
	flex-direction: row;
	align-items: center;
	height: 36px;
	border-radius: 4px;
	cursor: pointer;
`;
const OptionsView = styled.div`
	position: absolute;
	top: 64px;
	left: -2px;
	right: -2px;
	z-index: 1000;
	border: 1px solid ${Color.line.soft};
	background-color: white;
	border-radius: 12px;
	box-shadow: 0px 4px 8px 0px #0000001a;
	max-height: 300px;
	overflow: scroll;
`;
const Option = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	padding: 8px 16px;
	cursor: pointer;
	&:hover {
		background-color: ${Color.background.soft};
	}
`;
const Icon = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	height: 24px;
	width: 24px;
	margin-right: 8px;
`;
const Title = styled(Text)<{ $focus: boolean; color?: string }>`
	flex: 1;
	color: ${(props) => (props.color ? props.color : Color.text.full)};
	margin-left: 6px;
	margin-top: ${(props) => (props.$focus ? "15px" : "0px")};
	transition: margin-top 0.1s ease-out;
`;

const Select = (props: Props) => {
	const Flags2: any = Flags;
	const [showMenu, setShowMenu] = useState(false);
	const [selectedItem, setSelectedItem] = useState<any>(undefined);
	const [options, setOptions] = useState(props.options);

	useEffect(() => {
		//Init fuse.js search
		if (props.options) {
			setSelectedItem({
				...props.options[0],
				flag: Flags2[props.options[0].countryCode],
			});
			setOptions(props.options);
		}
	}, [props.options]);

	useEffect(() => {
		//Init on click listener
		window.addEventListener("mousedown", (e) => closeMenu(e));
		return window.removeEventListener("mousedown", () => undefined);
	}, []);

	useEffect(() => {
		if (props.selectedItem) {
			setSelectedItem({
				...props.selectedItem,
				flag: Flags2[props.selectedItem.countryCode],
			});
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
		if (element) {
			if (!element.contains(e.target)) {
				setShowMenu(false);
			}
		}
	};

	const onOptionClick = (option: any, e: any) => {
		if (!e) var e: any = window.event;
		e.cancelBubble = true;
		if (e.stopPropagation) e.stopPropagation();
		setSelectedItem({
			...option,
			flag: Flags2[option.countryCode],
		});
		setShowMenu(false);
		setOptions(props.options);
		props.onChange && props.onChange(option);
	};

	return (
		<Container>
			<SelectStyled
				role="select"
				style={props.style}
				$showMenu={showMenu}
				onClick={onSelectClick}
			>
				{selectedItem && (
					<>
						<Icon>
							<selectedItem.flag height={24} width={24} />
						</Icon>
						{showMenu ? (
							<ChevronUp
								height={20}
								width={20}
								color={Color.text.high}
							/>
						) : (
							<ChevronDown
								height={20}
								width={20}
								color={Color.text.high}
							/>
						)}
						<Title
							type="p"
							$focus={props.focus}
							color={props.style?.color}
						>
							{selectedItem.prefix}
						</Title>
					</>
				)}
			</SelectStyled>
			{showMenu && (
				<OptionsView
					role="menu"
					id={props.id}
					style={props.optionStyle}
				>
					{options &&
						options.map((item, index) => {
							const Flag = Flags2[item.countryCode];
							return (
								<Option
									role={"country" + index}
									key={"country" + index}
									onClick={(e: any) => onOptionClick(item, e)}
								>
									<Icon>
										<Flag height={24} width={24} />
									</Icon>
									<Text
										type="p"
										style={{
											fontSize: 14,
											display: "flex",
											alignItems: "center",
										}}
									>
										{item.esCountry}
										<span style={{ marginLeft: 4 }}>
											({item.prefix})
										</span>
									</Text>
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
	optionStyle?: any;
	showMenu?: boolean;
	options: Array<CountryProps>;
	selectedItem?: CountryProps;
	focus: boolean;
	onChange?: (a: any) => void;
}
export interface CountryProps {
	countryCode: string;
	prefix: string;
	esCountry: string;
	enCountry: string;
}
