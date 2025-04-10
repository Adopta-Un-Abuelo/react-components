import moment from "moment";
import { useEffect, useRef, useState } from "react";
import InputSecondary, { InputSecondaryProps } from "../Basic/InputSecondary";
import styled from "styled-components";
import Text from "../../Text/Text";
import { ColorV2 } from "../../../constants";

const Container = styled.div`
	display: flex;
	flex-direction: column;
	gap: 8px;
`;
const Row = styled.div`
	display: flex;
	flex-direction: row;
	gap: 8px;
`;

const InputBirthday = (
	props: InputBirthdayProps &
		( | InputSecondaryProps )
) => {
	const dayInput = useRef<HTMLInputElement>(null);
	const monthInput = useRef<HTMLInputElement>(null);
	const yearInput = useRef<HTMLInputElement>(null);

	const [date, setDate] = useState<{
		day: string | undefined;
		month: string | undefined;
		year: string | undefined;
	}>({
		day: undefined,
		month: undefined,
		year: undefined,
	});
	const [error, setError] = useState<string | undefined>(undefined);

	useEffect(() => {
		setError(props.error);
	}, [props.error]);

	const onDayChange = (e: any) => {
		const day = e.target.value;
		setDate({
			...date,
			day: day,
		});
		if (day.length === 2) {
			monthInput.current?.focus();
		}
		checkDate();
	};

	const onMonthChange = (e: any) => {
		const month = e.target.value;
		setDate({
			...date,
			month: month,
		});
		if (month.length === 2) {
			yearInput.current?.focus();
		}
		checkDate();
	};

	const onYearChange = (e: any) => {
		const year = e.target.value;
		setDate({
			...date,
			year: year,
		});
		checkDate();
	};

	const checkDate = () => {
		setError(undefined);
        console.log(date);
		if (
			date.day &&
			date.day.length === 2 &&
			date.month &&
			date.month.length === 2 &&
			date.year &&
			date.year.length === 4
		) {
			//check if date is valid
			const dateString = `${date.year}-${date.month}-${date.day}`;
			const momentDate = moment(dateString, "YYYY-MM-DD", true);
			const isValidDate = momentDate.isValid();
			if (!isValidDate) {
				setError("Fecha no válida");
			} else {
				const temp: any = momentDate.toDate();
				props.onChange && props.onChange(temp);
			}
		}
	};

	return (
		<Container>
			<Row>
				<InputSecondary
					ref={dayInput}
					value={date.day}
					containerStyle={{ flex: 1, ...props.containerStyle }}
					{...props}
					error={undefined}
					placeholder="Día"
					maxLength={2}
					onChange={onDayChange}
				/>
				<InputSecondary
					ref={monthInput}
					value={date.month}
					containerStyle={{ flex: 1, ...props.containerStyle }}
					{...props}
					error={undefined}
					placeholder="Mes"
					maxLength={2}
					onChange={onMonthChange}
				/>
				<InputSecondary
					ref={yearInput}
					value={date.year}
					containerStyle={{ flex: 1, ...props.containerStyle }}
					{...props}
					error={undefined}
					placeholder="Año"
					maxLength={4}
					onChange={onYearChange}
				/>
			</Row>
			{error && (
				<Text type="c1" style={{ color: ColorV2.text.red }}>
					{error}
				</Text>
			)}
		</Container>
	);
};
export default InputBirthday;
export interface InputBirthdayProps {}
