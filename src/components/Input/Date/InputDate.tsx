import { useRef, useState } from "react";
import moment from "moment";

import Input, { InputProps } from "../Basic/Input";
import DatePickerModal from "@components/DatePicker/DatePickerModal";

const InputDate = (props: InputDateProps) => {
	const isMobile = window.innerWidth <= 450;
	const input = useRef<HTMLInputElement>(null);
	const [showDateModal, setShowDateModal] = useState(false);
	const [text, setText] = useState<string | undefined>(undefined);

	const onChange = (e: any) => {
		const value = e.target.value;

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
	};

	const onInputFocus = (e: any) => {
		if (isMobile) {
			input.current?.blur();
			setShowDateModal(true);
		} else {
			props.onFocus && props.onFocus(e);
		}
		
	};

	return (
		<>
			<DatePickerModal
				isVisible={showDateModal}
				onSave={(date) => {
					onChange({
						target: { value: moment(date).format("DD/MM/YYYY") },
					});
					setShowDateModal(false);
				}}
				onClose={() => setShowDateModal(false)}
			/>
			<Input
				ref={input}
				value={text}
				containerStyle={{ flex: 1, ...props.containerStyle }}
				{...props}
				type="text"
				maxLength={10}
				onChange={onChange}
				onFocus={onInputFocus}
			/>
		</>
	);
};
export default InputDate;
export type InputDateProps = InputProps & {};
