import FilterCheckbox, { FilterCheckboxProps } from "./FilterCheckbox";
import FilterDate, { FilterDateProps } from "./FilterDate";
import FilterRatio, { FilterRatioProps } from "./FilterRatio";

const Filter = (
	props: FilterCheckboxProps | FilterDateProps | FilterRatioProps,
) => {
	return props.type === "date" ? (
		<FilterDate {...props} />
	) : props.type === "ratio" ? (
		<FilterRatio {...props} />
	) : (
		<FilterCheckbox {...props} />
	);
};
export default Filter;
