import { useState, useEffect, CSSProperties } from "react";
import moment from "moment";
import styled from "styled-components";

import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import "./react_dates_overrides.css";
import { DateRangePicker, FocusedInputShape } from "react-dates";
import Color from "@constants/ColorV2";

const YEAR_OPTIONS = Array.from({ length: 201 }, (_, index) =>
	String(1900 + index),
);
const MONTH_OPTIONS = moment.months().map((month, index) => ({
	label: month,
	value: String(index),
}));

const InputContainer = styled.div<{ $focus: boolean }>`
	display: flex;
	align-items: center;
	width: fit-content;
	border-radius: 12px;
	padding: 0px;
	height: 56px;
	outline: none;
	box-shadow: 0 0 0
		${(props) =>
			props.$focus
				? "2px " + Color.border.neutralMedium
				: "1px " + Color.border.neutralSoft};
	padding: 0px 6px;
`;

const InputDateRange = (props: InputDateRangeProps) => {
	const [startDate, setStartDate] = useState<moment.Moment | null>(
		props.startDate,
	);
	const [endDate, setEndDate] = useState<moment.Moment | null>(props.endDate);
	const [focusedInput, setFocusedInput] = useState<FocusedInputShape | null>(
		null,
	);

	useEffect(() => {
		setStartDate(props.startDate);
	}, [props.startDate]);

	useEffect(() => {
		setEndDate(props.endDate);
	}, [props.endDate]);

	return (
		<div className="input-date-range">
			<InputContainer
				style={props.style}
				$focus={focusedInput ? true : false}
			>
				<DateRangePicker
					startDateId="startDate"
					endDateId="endDate"
					startDate={startDate}
					endDate={endDate}
					noBorder={true}
					showClearDates={true}
					isOutsideRange={
						props.isOutsideRange ? props.isOutsideRange : () => false
					}
					startDatePlaceholderText={"Fecha inicio"}
					endDatePlaceholderText={"Fecha final"}
					hideKeyboardShortcutsPanel={true}
					numberOfMonths={1}
					onDatesChange={({ startDate, endDate }) => {
						setStartDate(startDate);
						setEndDate(endDate);
						if (startDate && !endDate) {
							setFocusedInput("endDate");
						} else if (!startDate) {
							setFocusedInput("startDate");
						}
						console.log("InputDateRange onChange", {
							startDate,
							endDate,
						});
						props.onChange({ startDate, endDate });
					}}
				focusedInput={focusedInput}
				onFocusChange={(focusedInput) =>
					setFocusedInput(focusedInput)
				}
				renderCalendarInfo={() => (
					<div className="input-date-range__calendar-footer">
						<button
							type="button"
							className="input-date-range__clear-button"
							onClick={() => {
								setStartDate(null);
								setEndDate(null);
								setFocusedInput("startDate");
								console.log("InputDateRange onChange", {
									startDate: null,
									endDate: null,
								});
								props.onChange({
									startDate: null,
									endDate: null,
								});
							}}
						>
							Borrar
						</button>
					</div>
				)}
				renderMonthElement={({
					month,
					onMonthSelect,
						onYearSelect,
					}) => (
						<div className="input-date-range__month-selector">
							<select
								aria-label="Seleccionar mes"
								className="input-date-range__select input-date-range__select--month"
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
								className="input-date-range__select"
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
			</InputContainer>
		</div>
	);
};
export default InputDateRange;
/**
 * Date range picker powered by react-dates (Airbnb).
 * Uses moment.js for date handling with Spanish localization.
 *
 * @example
 * ```tsx
 * <InputDateRange
 *   startDate={startDate}
 *   endDate={endDate}
 *   onChange={({ startDate, endDate }) => {
 *     setStartDate(startDate);
 *     setEndDate(endDate);
 *   }}
 *   isOutsideRange={(date) => date.isBefore(moment())}
 * />
 * ```
 */
export interface InputDateRangeProps {
	style?: CSSProperties;
	startDate: moment.Moment | null;
	endDate: moment.Moment | null;
	focus?: boolean;
	/** Callback fired when either date changes */
	onChange: (data: {
		startDate: moment.Moment | null;
		endDate: moment.Moment | null;
	}) => void;
	/** Optional function to disable specific dates (return true to disable) */
	isOutsideRange?: (date: moment.Moment) => boolean;
}
