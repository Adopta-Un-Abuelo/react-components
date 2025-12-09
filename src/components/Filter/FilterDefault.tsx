import { useEffect, useState, CSSProperties, useRef, ChangeEvent } from "react";
import styled from "styled-components";
import media from "styled-media-query";

import { ChevronDown } from "lucide-react";
import { X } from "lucide-react";
import ColorV2 from "@constants/ColorV2";
import Modal from "@components/Modal/Modal";
import Color from "@constants/Color";
import Text from "@components/Text/Text";
import Button from "@components/Button/Button";
import SearchBar from "@components/SearchBar/SearchBar";

const Container = styled.div`
	position: relative;
	width: fit-content;
`;

const ButtonFilter = styled.button<{ $selected: boolean }>`
	position: relative;
	display: flex;
	flex-direction: row;
	align-items: center;
	height: 32px;
	max-width: 180px;
	padding: 0px 12px;
	border-radius: 20px;
	gap: 6px;
	border: ${(props) =>
		props.disabled
			? "0px solid " + ColorV2.border.neutralSoft
			: props.$selected
			? "2px solid " + ColorV2.border.primary
			: "1px solid " + ColorV2.border.neutralSoft};
	background-color: transparent;
	cursor: ${(props) => (props.disabled ? "default" : "pointer")};
	&:hover {
		background-color: ${ColorV2.surface.neutralSoft};
	}
`;

const FilterView = styled.div<{
	$position?: "bottom-right" | "bottom-left";
}>`
	position: absolute;
	display: flex;
	flex-direction: column;
	top: 36px;
	right: ${(props) => (props.$position === "bottom-right" ? undefined : 0)};
	left: ${(props) => (props.$position === "bottom-left" ? undefined : 0)};
	padding: 8px 16px;
	border-radius: 6px;
	height: auto;
	max-height: 400px;
	position: absolute;
	display: flex;
	flex-direction: column;
	top: 36px;
	right: ${(props) => (props.$position === "bottom-right" ? undefined : 0)};
	left: ${(props) => (props.$position === "bottom-left" ? undefined : 0)};
	padding: 8px 16px;
	border-radius: 6px;
	height: auto;
	max-height: 400px;
	width: 320px;
	background-color: white;
	box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
	z-index: 10;
	overflow: hidden;

	${media.lessThan("small")`
		display: none;
	`}
`;

const BottomContainer = styled.div`
	position: sticky;
	bottom: 0;
	z-index: 5;
`;

const BottomBar = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	padding-top: 8px;
	background-color: white;
	gap: 8px;

	${media.lessThan("small")`
		padding: 16px 0px;
	`}
`;

const StyledDivider = styled.hr`
	margin-top: 8px;
	margin-bottom: 0px;
	width: calc(100% + 2 * 24px);
	margin-left: -25px;
	margin-right: -16px;
	border-top: 0px solid var(--border-clear-neutral-soft, rgba(0, 29, 61, 0.1));
`;
const ContentView = styled.div`
	display: flex;
	flex: 1;
	padding-right: 2px;

	overflow-y: auto;
`;

const HeaderContainer = styled.div<{ $hideSearchBar: boolean }>`
	position: sticky;
	top: 0;
	display: flex;
	flex: 1;
	justify-content: ${(props) =>
		props.$hideSearchBar ? "end" : "space-between"};
	align-items: center;
	margin-bottom: 8px;
	padding: 16px 0px 8px;
	z-index: 5;
	gap: 8px;
	background-color: white;
`;
const CloseView = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	height: 18px;
	width: 18px;
`;

const Filter = (props: FilterDefaultProps) => {
	const isMobile = window.innerWidth <= 450;
	const [showFilterView, setShowFilterView] = useState(false);
	const [searchText, setSearchText] = useState<string | undefined>(undefined);

	const filterViewRef = useRef<HTMLDivElement>(null);
	const modalRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleResize = () => {
			setShowFilterView(false);
		};
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				showFilterView &&
				filterViewRef.current &&
				!modalRef.current &&
				!filterViewRef.current.contains(event.target as Node)
			) {
				setShowFilterView(false);
			} else if (
				showFilterView &&
				modalRef.current &&
				!modalRef.current.contains(event.target as Node)
			) {
				setShowFilterView(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [showFilterView]);

	useEffect(() => {
		if (!showFilterView) props.onClose && props.onClose();
	}, [showFilterView]);

	const onFilterClick = () => {
		setShowFilterView(true);
	};

	const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
		const searchText = e.target.value;
		setSearchText(searchText);
		props.onSearchChange && props.onSearchChange(searchText);
	};

	const renderBottomBar = () => (
		<>
			<BottomContainer>
				<StyledDivider />
				<BottomBar>
					{props.childrenBottomBar}
					<Button
						design={"call-to-action"}
						size={isMobile ? "normal" : "small"}
						onClick={() => {
							setShowFilterView(false);
							props.onRemove && props.onRemove();
						}}
					>
						Borrar
					</Button>
					<Button
						design={"primary"}
						size={isMobile ? "normal" : "small"}
						onClick={() => {
							setShowFilterView(false);
							props.onSave && props.onSave();
						}}
					>
						Aplicar
					</Button>
				</BottomBar>
			</BottomContainer>
		</>
	);

	return (
		<Container id={props.id} role="filter" style={props.style}>
			<ButtonFilter
				role="filter-button"
				$selected={props.label ? true : false}
				disabled={props.disabled}
				onClick={onFilterClick}
			>
				<Text
					type="b2"
					weight="medium"
					style={{
						fontWeight: 500,
						whiteSpace: "nowrap",
						overflow: "hidden",
						overflowWrap: "break-word",
						textOverflow: "ellipsis",
					}}
				>
					{props.label ? props.label : props.placeholder}
				</Text>

				{props.label ? (
					<CloseView
						onClick={(e) => {
							e.stopPropagation();
							props.onRemove && props.onRemove();
						}}
					>
						<X
							height={18}
							width={18}
							color={props.disabled ? Color.text.low : "black"}
						/>
					</CloseView>
				) : (
					<CloseView>
						<ChevronDown
							height={18}
							width={18}
							color={
								props.disabled
									? Color.text.low
									: Color.text.high
							}
						/>
					</CloseView>
				)}
			</ButtonFilter>
			<Modal
				type="full-screen"
				isVisible={showFilterView && isMobile}
				onClose={() => {
					setShowFilterView(false);
				}}
				hideClose={true}
			>
				<div ref={modalRef}>
					<HeaderContainer
						$hideSearchBar={
							props.hideSearchBar ? props.hideSearchBar : false
						}
					>
						{!props.hideSearchBar && (
							<SearchBar
								defaultValue={searchText}
								style={{ flex: 1 }}
								placeholder={"Buscar"}
								design={"primary"}
								onChange={onSearchChange}
							/>
						)}
						<Button
							design="call-to-action"
							size="small"
							style={{ color: ColorV2.text.neutralHard }}
							onClick={() => {
								setShowFilterView(false);
							}}
						>
							Cancelar
						</Button>
					</HeaderContainer>
					<ContentView style={{ flex: 1, overflowY: "auto" }}>
						{props.children}
					</ContentView>
					{renderBottomBar()}
				</div>
			</Modal>
			{!isMobile && showFilterView && (
				<FilterView
					style={props.menuStyle}
					ref={filterViewRef}
					$position={props.position}
				>
					{!props.hideSearchBar && (
						<SearchBar
							defaultValue={searchText}
							style={{
								borderBottom:
									"1px solid " + ColorV2.border.neutralSoft,
								marginBottom: 8,
							}}
							placeholder={"Buscar"}
							design={"secondary"}
							onChange={onSearchChange}
						/>
					)}
					<ContentView>{props.children}</ContentView>
					{renderBottomBar()}
				</FilterView>
			)}
		</Container>
	);
};

export default Filter;

export interface FilterDefaultProps {
	id: string;
	placeholder: string;
	label?: string;
	disabled?: boolean;
	position?: "bottom-right" | "bottom-left";
	hideSearchBar?: boolean;
	style?: CSSProperties;
	menuStyle?: CSSProperties;
	children?: React.ReactNode;
	childrenBottomBar?: React.ReactNode;
	onClose?: () => void;
	onSearchChange?: (searchText: string) => void;
	onRemove?: () => void;
	onSave?: () => void;
}
