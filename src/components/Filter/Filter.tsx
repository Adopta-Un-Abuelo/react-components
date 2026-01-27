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
/**
 * Filter component router supporting three types: checkbox (multi-select), ratio (range slider), and date (date picker).
 * Each type has its own variant implementation with specific props.
 *
 * @example
 * ```tsx
 * <Filter
 *   type="checkbox"
 *   options={filterOptions}
 *   onChange={(selected) => applyFilters(selected)}
 * />
 * ```
 */
export default Filter;
