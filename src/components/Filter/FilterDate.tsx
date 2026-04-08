import {
	CSSProperties,
	forwardRef,
	Ref,
	useEffect,
	useImperativeHandle,
	useRef,
	useState,
} from "react";
import moment from "moment";
import "react-dates/initialize";
import "./filter-date.css";
import "react-dates/lib/css/_datepicker.css";

import { DayPickerRangeController, FocusedInputShape } from "react-dates";
import FilterDefault from "./FilterDefault";

const YEAR_OPTIONS = Array.from({ length: 201 }, (_, index) =>
	String(1900 + index),
);
const MONTH_OPTIONS = moment.months().map((month, index) => ({
	label: month,
	value: String(index),
}));

const Filter = forwardRef(
	(
		{ position, selectedOptions, onChange, ...restProps }: FilterDateProps,
		ref: Ref<FilterDateRef>,
	) => {
		const isMobile = window.innerWidth <= 450;
		const isSmallMobile = window.innerWidth <= 400;
		const [label, setLabel] = useState<string | undefined>(undefined);
		const [startDate, setStartDate] = useState<moment.Moment | null>(null);
		const [endDate, setEndDate] = useState<moment.Moment | null>(null);
		const [focusedInput, setFocusedInput] =
			useState<FocusedInputShape | null>("startDate");
		const shouldRestoreOnCloseRef = useRef(true);

		const syncFromSelectedOptions = (
			nextSelectedOptions?: FilterDateProps["selectedOptions"],
		) => {
			if (nextSelectedOptions) {
				setStartDate(nextSelectedOptions.startDate);
				setEndDate(nextSelectedOptions.endDate);
				changeLabel(
					nextSelectedOptions.startDate || undefined,
					nextSelectedOptions.endDate || undefined,
				);
				return;
			}

			setStartDate(null);
			setEndDate(null);
			setLabel("");
		};

		useImperativeHandle(ref, () => ({
			clean() {
				onRemove();
			},
		}));

		useEffect(() => {
			syncFromSelectedOptions(selectedOptions);
			shouldRestoreOnCloseRef.current = true;
		}, [selectedOptions]);

		const onSave = () => {
			shouldRestoreOnCloseRef.current = false;
			const nextValue = {
				startDate: startDate ? startDate.startOf("date") : null,
				endDate: endDate ? endDate.endOf("date") : null,
			};

			console.log("FilterDate onChange", nextValue);
			changeLabel(
				startDate ? startDate : undefined,
				endDate ? endDate : undefined,
			);
			onChange && onChange(nextValue);
		};

		const changeLabel = (
			startDate?: moment.Moment,
			endDate?: moment.Moment,
		) => {
			let tempLabel = "";
			if (startDate) tempLabel = startDate.format("D MMM YY");
			if (endDate)
				tempLabel =
					tempLabel + ` - ${endDate.format("D MMM YY")}`;
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
				buttonStyle={{
					maxWidth: 280,
				}}
				menuStyle={{
					width: "fit-content",
					maxHeight: "unset",
				}}
				position={position}
				onClose={() => {
					if (!shouldRestoreOnCloseRef.current) return;
					syncFromSelectedOptions(selectedOptions);
				}}
				onSave={onSave}
				onRemove={onRemove}
			>
				<DayPickerRangeController
					startDate={startDate}
					endDate={endDate}
					onDatesChange={({ startDate, endDate }) => {
						setStartDate(startDate);
						setEndDate(endDate);
						changeLabel(
							startDate || undefined,
							endDate || undefined,
						);
						if (startDate && !endDate) {
							setFocusedInput("endDate");
							return;
						}
						if (!startDate) {
							setFocusedInput("startDate");
						}
					}}
					daySize={isSmallMobile ? 35 : isMobile ? 48 : undefined}
					focusedInput={focusedInput}
					numberOfMonths={1}
					noBorder={true}
					onFocusChange={(focusedInput) =>
						setFocusedInput(focusedInput)
					}
					initialVisibleMonth={() =>
						startDate?.clone() ?? endDate?.clone() ?? moment()
					}
					renderMonthElement={({
						month,
						onMonthSelect,
						onYearSelect,
					}) => (
						<div className="filter-date__month-selector">
							<select
								aria-label="Seleccionar mes"
								className="filter-date__select filter-date__select--month"
								value={String(month.month())}
								onChange={(event) =>
									onMonthSelect(month, event.target.value)
								}
							>
								{MONTH_OPTIONS.map((option) => (
									<option
										key={option.value}
										value={option.value}
									>
										{option.label}
									</option>
								))}
							</select>
							<select
								aria-label="Seleccionar año"
								className="filter-date__select"
								value={String(month.year())}
								onChange={(event) =>
									onYearSelect(month, event.target.value)
								}
							>
								{YEAR_OPTIONS.map((year) => (
									<option key={year} value={year}>
										{year}
									</option>
								))}
							</select>
						</div>
					)}
				/>
			</FilterDefault>
		);
	},
);
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
export interface FilterDateRef {
	clean: () => void;
}
