import { useState, useEffect, ComponentPropsWithoutRef, CSSProperties } from "react";
import styled from "styled-components";
import * as Flags from "country-flag-icons/react/3x2";
import Text from "@components/Text/Text";
import Color from "@constants/Color";
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
	margin-left: 2px;
	margin-top: ${(props) => (props.$focus ? "15px" : "0px")};
	transition: margin-top 0.1s ease-out;
	font-size: 14px !important;
`;

type CountryWithFlag = CountryProps & {
	flag: React.ComponentType<React.SVGProps<SVGSVGElement>>
};

const Select = (props: Props) => {
	const Flags2 = Flags as Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>>;
	const [showMenu, setShowMenu] = useState(false);
	const [selectedItem, setSelectedItem] = useState<CountryWithFlag | undefined>(undefined);
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
	}, []);

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

	const onSelectClick = (e: React.MouseEvent) => {
		e.stopPropagation();
		setShowMenu(!showMenu);
	};

	const closeMenu = (e: MouseEvent) => {
		const element = document.getElementById(props.id);
		if (element) {
			if (!element.contains(e.target as Node)) {
				setShowMenu(false);
			}
		}
	};

	const onOptionClick = (option: CountryProps, e: React.MouseEvent) => {
		e.stopPropagation();
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
									onClick={(e) => onOptionClick(item, e)}
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
export interface Props extends Omit<ComponentPropsWithoutRef<"div">, "onChange"> {
	id: string;
	optionStyle?: CSSProperties;
	showMenu?: boolean;
	options: Array<CountryProps>;
	selectedItem?: CountryProps;
	focus: boolean;
	onChange?: (country: CountryProps) => void;
}
export interface CountryProps {
	id?: string;
	countryCode: string;
	prefix: string;
	esCountry: string;
	enCountry: string;
}
