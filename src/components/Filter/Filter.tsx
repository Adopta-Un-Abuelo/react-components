import { forwardRef, Ref } from "react";
import FilterCheckbox, {
	FilterCheckboxProps,
	FilterCheckboxRef,
} from "./FilterCheckbox";
import FilterDate, { FilterDateProps, FilterDateRef } from "./FilterDate";
import FilterRatio, { FilterRatioProps, FilterRatioRef } from "./FilterRatio";

const Filter = forwardRef(
	(
		props: FilterCheckboxProps | FilterDateProps | FilterRatioProps,
		ref: Ref<FilterCheckboxRef | FilterRatioRef | FilterDateRef>,
	) => {
		return props.type === "date" ? (
			<FilterDate ref={ref} {...props} />
		) : props.type === "ratio" ? (
			<FilterRatio ref={ref} {...props} />
		) : (
			<FilterCheckbox ref={ref} {...props} />
		);
	},
);
export default Filter;
