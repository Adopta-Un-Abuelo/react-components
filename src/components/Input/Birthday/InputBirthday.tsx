import moment from "moment";
import { useEffect, useRef, useState } from "react";
import Input, { InputProps } from "../Basic/Input";
import styled, { keyframes } from "styled-components";
import Text from "../../Text/Text";
import { ColorV2 } from "../../../constants";

const fadeInAnimation = keyframes`
	from {
		opacity: 0;
		height: 0;
		transform: translateY(-10px);
	}
	to {
		opacity: 1;
		height: 20px;
		transform: translateY(0);
	}
`;
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
const ErrorDiv = styled.div<{ $error: boolean }>`
	margin: 0px 8px;
	font-style: normal;
	font-weight: 500;
	font-size: 14px;
	line-height: 12px;
	display: flex;
	color: ${ColorV2.text.red};
	animation-name: ${(props) => (props.$error ? fadeInAnimation : "none")};
	animation-duration: 0.25s;
`;

const InputBirthday = ({
	error,
	onChange,
	containerStyle,
	...restProps
}: InputBirthdayProps) => {
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
	const [errorString, setErrorString] = useState<string | undefined>(
		undefined
	);

	useEffect(() => {
		setErrorString(error);
	}, [error]);

	const onDayChange = (e: any) => {
		const day = e.target.value;
		if (day.length === 2) {
			monthInput.current?.focus();
		}
		checkDate({
			...date,
			day: day,
		});
	};

	const onMonthChange = (e: any) => {
		const month = e.target.value;
		if (month.length === 0) {
			dayInput.current?.focus();
		} else if (month.length === 2) {
			yearInput.current?.focus();
		}
		checkDate({
			...date,
			month: month,
		});
	};

	const onYearChange = (e: any) => {
		const year = e.target.value;
		if (year.length === 0) {
			monthInput.current?.focus();
		}
		checkDate({
			...date,
			year: year,
		});
	};

	const checkDate = (date: {
		day: string | undefined;
		month: string | undefined;
		year: string | undefined;
	}) => {
		setErrorString(undefined);
		setDate(date);
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
				setErrorString("Fecha no válida");
			} else {
				const temp: any = momentDate.toDate();
				onChange && onChange(temp);
			}
		}
	};

	return (
		<Container>
			<Row>
				<Input
					ref={dayInput}
					value={date.day}
					containerStyle={{ flex: 1, ...containerStyle }}
					{...restProps}
					placeholder="Día"
					maxLength={2}
					onChange={onDayChange}
				/>
				<Input
					ref={monthInput}
					value={date.month}
					containerStyle={{ flex: 1, ...containerStyle }}
					{...restProps}
					placeholder="Mes"
					maxLength={2}
					onChange={onMonthChange}
				/>
				<Input
					ref={yearInput}
					value={date.year}
					containerStyle={{ flex: 1, ...containerStyle }}
					{...restProps}
					placeholder="Año"
					maxLength={4}
					onChange={onYearChange}
				/>
			</Row>
			{errorString && (
				<ErrorDiv role="error" $error={errorString ? true : false}>
					<Text
						type="c1"
						weight="medium"
						style={{ color: ColorV2.text.red }}
					>
						{errorString}
					</Text>
				</ErrorDiv>
			)}
		</Container>
	);
};
export default InputBirthday;
export type InputBirthdayProps = {} & InputProps;
