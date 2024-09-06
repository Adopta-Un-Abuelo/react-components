import { useEffect, useState, ChangeEvent, CSSProperties, useRef } from "react";
import styled from "styled-components";
import Fuse from "fuse.js";
import Modal from "../Modal/Modal";
import Color from "../../constants/Color";
import Text from "../Text/Text";
import Checkbox from "../Checkbox/CheckboxList";
import Button from "../Button/Button";
import SearchBar from "../SearchBar/SearchBar";
import media from "styled-media-query";

import { ChevronDown } from "lucide-react";
import { X } from "lucide-react";
import { ColorV2 } from "../../constants";

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
	padding: 0px 12px;
	border-radius: 20px;
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

const ContentView = styled.div`
	display: flex;
	flex: 1;
	padding-right: 2px;

	overflow-y: auto;
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

const HeaderContainer = styled.div`
	position: sticky;
	top: 0;
	display: flex;
	flex: 1;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 8px;
	padding: 16px 0px;
	z-index: 5;
	gap: 8px;
`;

const Filter = (props: FilterDefaultProps) => {
	const isMobile = window.innerWidth <= 450;
	const [showFilterView, setShowFilterView] = useState(false);
	const [selectedOptions, setSelectedOptions] = useState<
		Array<{ id: string; [key: string]: any }>
	>([]);
	const [checkboxSelection, setCheckboxSelection] = useState<
		Array<{ id: string; [key: string]: any }>
	>([]);
	const [options, setOptions] = useState(props.options);
	const [fuse, setFuse] = useState<any>(undefined);
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
		setFuse(
			new Fuse(props.options, {
				keys: ["label", "id"],
			}),
		);
		setOptions(props.options);
	}, [props.options]);

	useEffect(() => {
		setCheckboxSelection(
			props.selectedOptions ? props.selectedOptions : [],
		);
	}, [props.selectedOptions]);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				showFilterView &&
				filterViewRef.current &&
				!modalRef.current &&
				!filterViewRef.current.contains(event.target as Node)
			) {
				setShowFilterView(false);
			}
			else if (
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

	const onOptionChange = (
		options: Array<{ id: string; [key: string]: any }>,
	) => {
		setCheckboxSelection(options);
	};

	const onSave = () => {
		setSelectedOptions(checkboxSelection);
		setShowFilterView(false);
		props.onChange && props.onChange(checkboxSelection);
	};

	const onRemove = () => {
		setCheckboxSelection([]);
		setSelectedOptions([]);
		props.onChange && props.onChange([]);
	};

	const onSelectAll = () => {
		setCheckboxSelection(options);
	};

	const onFilterClick = () => {
		setShowFilterView(true);
	};

	const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
		const searchText = e.target.value;
		setSearchText(searchText);
		if (searchText) {
			const result = fuse.search(searchText);
			const temp = result.map((obj: any) => obj.item);
			setOptions(temp);
		} else {
			setOptions(props.options);
		}
	};

	const getFilterLabel = () => {
		if (props.type === "single" && selectedOptions.length > 0) {
			return selectedOptions[0].label;
		}
		if (props.type === "multiple" && selectedOptions.length > 0) {
			return `${selectedOptions.length} seleccionados`;
		}
		return props.label;
	};

	const renderBottomBar = () => (
		<>
			<BottomContainer>
				<StyledDivider />
				<BottomBar>
					{props.type === "multiple" && !isMobile && (
						<Button
							design={"call-to-action"}
							size={isMobile ? "normal" : "small"}
							onClick={onSelectAll}
						>
							Seleccionar todo
						</Button>
					)}

					<Button
						design={"call-to-action"}
						size={isMobile ? "normal" : "small"}
						onClick={onRemove}
					>
						Borrar
					</Button>
					<Button
						design={"primary"}
						size={isMobile ? "normal" : "small"}
						onClick={onSave}
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
				$selected={selectedOptions.length > 0}
				disabled={props.disabled}
				onClick={onFilterClick}
			>
				<Text
					type="b2"
					weight="medium"
					style={{
						fontSize: 14,
						fontStyle: "normal",
						fontWeight: 500,
						marginRight: 6,
					}}
				>
					{getFilterLabel()}
				</Text>

				{selectedOptions.length > 0 ? (
					<X
						height={18}
						width={18}
						color={props.disabled ? Color.text.low : "black"}
						onClick={(e) => {
							e.stopPropagation();
							onRemove();
						}}
					/>
				) : (
					<ChevronDown
						height={18}
						width={18}
						color={
							props.disabled ? Color.text.low : Color.text.high
						}
					/>
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
					<HeaderContainer>
						<SearchBar
							defaultValue={searchText}
							style={{ flex: 1 }}
							placeholder={"Buscar"}
							design={"primary"}
							onChange={onSearchChange}
						/>
						<Button
							design="call-to-action"
							size="small"
							style={{ color: ColorV2.text.neutralHard }}
							onClick={() => {
								setShowFilterView(false);
								setCheckboxSelection(selectedOptions);
							}}
						>
							Cancelar
						</Button>
					</HeaderContainer>
					<ContentView style={{ flex: 1, overflowY: "auto" }}>
						<Checkbox
							style={{ width: "100%" }}
							options={options}
							selectedOptions={checkboxSelection}
							type={props.type}
							height={22}
							position="right"
							avatarEnabled={true}
							width={22}
							onChange={onOptionChange}
						/>
					</ContentView>
					{renderBottomBar()}
				</div>
			</Modal>
			{showFilterView && (
				<FilterView
					ref={filterViewRef}
					role="filter-menu"
					$position={props.position}
				>
					{!props.hideSearchBar && (
						<SearchBar
							defaultValue={searchText}
							style={{
								borderBottom: "1px solid " + Color.line.soft,
								marginBottom: 8,
							}}
							placeholder={"Buscar"}
							design={"secondary"}
							onChange={onSearchChange}
						/>
					)}
					<ContentView>
						<Checkbox
							style={{ paddingTop: 16 }}
							options={options}
							selectedOptions={checkboxSelection}
							type={
								props.type === "multiple"
									? "multiple"
									: "single"
							}
							height={18}
							width={18}
							onChange={onOptionChange}
						/>
					</ContentView>
					{renderBottomBar()}
				</FilterView>
			)}
		</Container>
	);
};

export default Filter;

export interface FilterDefaultProps {
	id: string;
	label: string;
	disabled?: boolean;
	type: "single" | "multiple";
	position?: "bottom-right" | "bottom-left";
	options: Array<{
		id: string;
		label: string;
		sublabel?: string;
	}>;
	selectedOptions?: Array<{
		id: string;
		[key: string]: any;
	}>;
	hideSearchBar?: boolean;
	style?: CSSProperties;
	onChange?: (r: Array<{ id: string; [key: string]: any }>) => void;
}
