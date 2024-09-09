import { CSSProperties, useEffect, useState } from "react";
import moment from "moment";
import "react-dates/initialize";
import "./filter-date.css";
import "react-dates/lib/css/_datepicker.css";

import { DayPickerRangeController, FocusedInputShape } from "react-dates";
import FilterDefault from "./FilterDefault";

const Filter = ({
	position,
	selectedOptions,
	onChange,
	...restProps
}: FilterDateProps) => {
	const isMobile = window.innerWidth <= 450;
	const isSmallMobile = window.innerWidth <= 400;
	const [label, setLabel] = useState<string | undefined>(undefined);
	const [startDate, setStartDate] = useState<moment.Moment | null>(null);
	const [endDate, setEndDate] = useState<moment.Moment | null>(null);
	const [focusedInput, setFocusedInput] = useState<FocusedInputShape | null>(
		"startDate",
	);

	useEffect(() => {
		if (selectedOptions) {
			setStartDate(selectedOptions.startDate);
			setEndDate(selectedOptions.endDate);
			changeLabel(
				selectedOptions.startDate
					? selectedOptions.startDate
					: undefined,
				selectedOptions.endDate ? selectedOptions.endDate : undefined,
			);
		} else {
			setStartDate(null);
			setEndDate(null);
			setLabel("");
		}
	}, [selectedOptions]);

	const onSave = () => {
		changeLabel(startDate ? startDate : undefined, endDate ? endDate : undefined);
		onChange &&
			onChange({
				startDate: startDate ? startDate.startOf("date") : null,
				endDate: endDate ? endDate.endOf("date") : null,
			});
	};

	const changeLabel = (
		startDate?: moment.Moment,
		endDate?: moment.Moment,
	) => {
		let tempLabel = "";
		if (startDate) tempLabel = startDate.format("D MMM");
		if (endDate) tempLabel = tempLabel + ` - ${endDate.format("D MMM")}`;
		setLabel(tempLabel);
	};

	const onRemove = () => {
		setEndDate(null);
		setStartDate(null);
		setFocusedInput("startDate");
		setLabel(undefined);
		onChange &&
			onChange({
				startDate: null,
				endDate: null,
			});
	};

	return (
		<FilterDefault
			{...restProps}
			label={label}
			hideSearchBar={true}
			onSave={onSave}
			onRemove={onRemove}
		>
			<DayPickerRangeController
				startDate={startDate}
				endDate={endDate}
				onDatesChange={({ startDate, endDate }) => {
					setStartDate(startDate);
					setEndDate(endDate);
				}}
				daySize={isSmallMobile ? 35 : isMobile ? 48: undefined}
				focusedInput={focusedInput}
				noBorder={true}
				onFocusChange={(focusedInput) => setFocusedInput(focusedInput)}
				initialVisibleMonth={() => moment()}
			/>
		</FilterDefault>
	);
};
export default Filter;
export interface FilterDateProps {
	id: string;
	placeholder: string;
	disabled?: boolean;
	position?: "bottom-right" | "bottom-left";
	style?: CSSProperties;
	type: "date";
	selectedOptions?: {
		startDate: moment.Moment | null;
		endDate: moment.Moment | null;
	};
	onChange?: (r: {
		startDate: moment.Moment | null;
		endDate: moment.Moment | null;
	}) => void;
}
