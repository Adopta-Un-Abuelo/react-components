import { CSSProperties, forwardRef, Ref, useEffect, useImperativeHandle, useState } from "react";
import Fuse from "fuse.js";

import FilterDefault from "./FilterDefault";
import Checkbox from "../Checkbox/CheckboxList";
import Button from "../Button/Button";

const FilterCheckbox = forwardRef(
	({
		type,
		options,
		selectedOptions,
		hideSearchBar,
		onChange,
		...restProps
	}: FilterCheckboxProps, ref: Ref<FilterCheckboxRef>) => {
		const isMobile = window.innerWidth <= 450;
		const [checkboxSelection, setCheckboxSelection] = useState<
			Array<{ id: string; [key: string]: any }>
		>([]);
		const [optionsState, setOptionsState] = useState(options);
		const [fuse, setFuse] = useState<any>(undefined);
		const [label, setLabel] = useState<string | undefined>(undefined);

		useImperativeHandle(ref, () => ({
			clean() {
				onRemove();
			},
		}));

		useEffect(() => {
			setFuse(
				new Fuse(options, {
					keys: ["label", "id"],
				}),
			);
			setOptionsState(options);
		}, [options]);

		useEffect(() => {
			setCheckboxSelection(selectedOptions ? selectedOptions : []);
			changeLabel(selectedOptions ? selectedOptions : []);
		}, [selectedOptions]);

		const onOptionChange = (
			options: Array<{ id: string; [key: string]: any }>,
		) => {
			setCheckboxSelection(options);
		};

		const onSearchChange = (searchText: string) => {
			if (searchText) {
				const result = fuse.search(searchText);
				const temp = result.map((obj: any) => obj.item);
				setOptionsState(temp);
			} else {
				setOptionsState(options);
			}
		};

		const changeLabel = (selection: any[]) => {
			if (type === "single" && selection.length > 0) {
				const item = selection[0];
				if (item.label) setLabel(item.label);
				else {
					const item2 = options.find((i) => i.id === item.id);
					if (item2) setLabel(item2.label);
					else setLabel("1 seleccionado");
				}
			} else if (type === "multiple" && selection.length > 0) {
				setLabel(`${selection.length} seleccionados`);
			}
		};

		const onSave = () => {
			changeLabel(checkboxSelection);
			onChange && onChange(checkboxSelection);
		};

		const onRemove = () => {
			setLabel(undefined);
			setCheckboxSelection([]);
			onChange && onChange([]);
		};

		const onClose = () => {
			setOptionsState(options);
		};

		const onSelectAll = () => {
			setCheckboxSelection(options);
		};

		return (
			<FilterDefault
				{...restProps}
				label={label}
				childrenBottomBar={
					type === "multiple" &&
					!isMobile && (
						<Button
							design={"call-to-action"}
							size={isMobile ? "normal" : "small"}
							onClick={onSelectAll}
						>
							Seleccionar todo
						</Button>
					)
				}
				onSave={onSave}
				onRemove={onRemove}
				onSearchChange={onSearchChange}
				onClose={onClose}
			>
				<Checkbox
					style={{ width: "100%" }}
					options={optionsState}
					selectedOptions={checkboxSelection}
					type={type}
					roundedBox={type !== "multiple"}
					height={isMobile ? 22 : 18}
					width={isMobile ? 22 : 18}
					position={isMobile ? "right" : "left"}
					onChange={onOptionChange}
				/>
			</FilterDefault>
		);
	},
);
export default FilterCheckbox;
export interface FilterCheckboxProps {
	id: string;
	placeholder: string;
	disabled?: boolean;
	position?: "bottom-right" | "bottom-left";
	hideSearchBar?: boolean;
	style?: CSSProperties;
	type: "single" | "multiple";
	options: Array<{
		id: string;
		label: string;
		sublabel?: string;
	}>;
	selectedOptions?: Array<{
		id: string;
		[key: string]: any;
	}>;
	onChange?: (r: Array<{ id: string; [key: string]: any }>) => void;
}
export interface FilterCheckboxRef {
	clean: () => void;
}