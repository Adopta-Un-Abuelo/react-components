import { useState } from "react";
import moment from "moment";

import InputPrimary, { InputPrimaryProps } from "./InputPrimary";
import InputSecondary, { InputSecondaryProps } from "./InputSecondary";
import InputThird from "./InputThird";

const InputDate = (
	props:
		| InputDatePrimaryProps
		| InputDateSecondaryProps
		| InputDateThirdProps,
) => {
	const { showCalendar, ...restProps } = props;
	const [text, setText] = useState<string | undefined>(undefined);

	const onChange = (e: any) => {
		const value = e.target.value;
		if (showCalendar) {
			const date: any = moment(value, "YYYY-MM-DD").toDate();
			props.onChange && props.onChange(date);
		} else {
			if (value.length === 2 || value.length === 5) {
				if (text && value.length < text.length) {
					//Remove
					setText(value.slice(0, -1));
				} else setText(value + "/");
			} else if (value.length === 10) {
				setText(value);
				const date: any = moment(value, "DD/MM/YYYY").toDate();
				props.onChange && props.onChange(date);
			} else setText(value);
		}
	};

	return props.design === "primary" ? (
		<InputPrimary
			value={text}
			containerStyle={{ flex: 1, ...props.containerStyle }}
			{...restProps}
			type={showCalendar ? "date" : "text"}
			maxLength={10}
			onChange={onChange}
		/>
	) : props.design === "third" ? (
		<InputThird
			value={text}
			containerStyle={{ flex: 1, ...props.containerStyle }}
			{...restProps}
			type={showCalendar ? "date" : "text"}
			maxLength={10}
			onChange={onChange}
		/>
	) :(
		<InputSecondary
			value={text}
			containerStyle={{ flex: 1, ...props.containerStyle }}
			{...restProps}
			type={showCalendar ? "date" : "text"}
			maxLength={10}
			onChange={onChange}
		/>
	);
};
export default InputDate;
export interface InputDatePrimaryProps extends InputPrimaryProps {
	design?: "primary";
	showCalendar?: boolean;
}
export interface InputDateSecondaryProps extends InputSecondaryProps {
	design?: "secondary";
	showCalendar?: boolean;
}

export interface InputDateThirdProps extends InputSecondaryProps {
	design?: "third";
	showCalendar?: boolean;
}
