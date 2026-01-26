import { forwardRef, Ref, useEffect, useImperativeHandle, useState } from "react";
import Fuse from "fuse.js";

import FilterDefault, { FilterDefaultProps } from "./FilterDefault";
import Checkbox from "@components/Checkbox/CheckboxList";
import Button from "@components/Button/Button";

type OptionWithDynamicProps = {
	id: string;
	label?: string;
	sublabel?: string;
	[key: string]: string | number | boolean | undefined;
};

const FilterCheckbox = forwardRef(
	({
		type,
		options,
		selectedOptions,
		onChange,
		...restProps
	}: FilterCheckboxProps, ref: Ref<FilterCheckboxRef>) => {
		const isMobile = window.innerWidth <= 450;
		const [checkboxSelection, setCheckboxSelection] = useState<OptionWithDynamicProps[]>([]);
		const [optionsState, setOptionsState] = useState(options);
		const [fuse, setFuse] = useState<Fuse<{ id: string; label: string; sublabel?: string }> | undefined>(undefined);
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
			options: OptionWithDynamicProps[],
		) => {
			setCheckboxSelection(options);
		};

		const onSearchChange = (searchText: string) => {
			if (searchText && fuse) {
				const result = fuse.search(searchText);
				const temp = result.map((obj) => obj.item);
				setOptionsState(temp);
			} else {
				setOptionsState(options);
			}
		};

		const changeLabel = (selection: OptionWithDynamicProps[]) => {
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
					shape={restProps.shape}
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
export interface FilterCheckboxProps extends FilterDefaultProps{
	type: "single" | "multiple";
	shape?: "circle" | "square";
	options: Array<{
		id: string;
		label: string;
		sublabel?: string;
	}>;
	selectedOptions?: OptionWithDynamicProps[];
	onChange?: (r: OptionWithDynamicProps[]) => void;
}
export interface FilterCheckboxRef {
	clean: () => void;
}