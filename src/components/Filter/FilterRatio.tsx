import {
	useEffect,
	useState,
	CSSProperties,
	forwardRef,
	Ref,
	useImperativeHandle,
} from "react";

import InputRange from "../Input/Range/InputRange";
import FilterDefault from "./FilterDefault";

const Filter = forwardRef(
	(
		{
			selectedOptions,
			min,
			max,
			unit,
			onChange,
			...restProps
		}: FilterRatioProps,
		ref: Ref<FilterRatioRef>,
	) => {
		const isMobile = window.innerWidth <= 450;
		const [label, setLabel] = useState<string | undefined>(undefined);
		const [selection, setSelection] = useState<number>(0);
		const [inputValue, setInputValue] = useState<undefined | number>(
			undefined,
		);

		useImperativeHandle(ref, () => ({
			clean() {
				onRemove();
			},
		}));

		useEffect(() => {
			if (selectedOptions) {
				setSelection(selectedOptions);
				setLabel(`${selectedOptions.toString()} ${unit ? unit : ""}`);
			} else {
				setSelection(0);
				setLabel(undefined);
			}
		}, [selectedOptions]);

		const onInputChange = (e: any) => {
			setInputValue(e.target.value);
		};

		const onSave = () => {
			if (inputValue) {
				setLabel(`${inputValue.toString()} ${unit ? unit : ""}`);
				setSelection(inputValue);
				onChange && onChange(inputValue);
			}
		};

		const onRemove = () => {
			setSelection(0);
			setInputValue(undefined);
			setLabel(undefined);
			onChange && onChange(undefined);
		};

		return (
			<FilterDefault
				{...restProps}
				label={label}
				hideSearchBar={true}
				onSave={onSave}
				onRemove={onRemove}
			>
				<InputRange
					style={{
						width: "100%",
						margin: isMobile ? "20px 0px" : 20,
						marginTop: 40,
					}}
					min={min}
					max={max}
					unit={unit}
					defaultValue={selection}
					onChange={onInputChange}
				/>
			</FilterDefault>
		);
	},
);
export default Filter;
export interface FilterRatioProps {
	id: string;
	placeholder: string;
	label?: string;
	disabled?: boolean;
	position?: "bottom-right" | "bottom-left";
	hideSearchBar?: boolean;
	style?: CSSProperties;
	type: "ratio";
	min: number;
	max: number;
	selectedOptions?: number;
	unit?: string;
	onChange?: (result: number | undefined) => void;
}
export interface FilterRatioRef {
	clean: () => void;
}
