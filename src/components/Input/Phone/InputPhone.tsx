import { useEffect, useState } from "react";
import styled from "styled-components";
import GLPN from "google-libphonenumber";

import Select from "./SelectPhone";
import Input, { InputProps } from "../Basic/Input";

const IconView = styled.div`
	margin-right: 8px;
`;
const InputPhone = (props: InputPhoneProps) => {
	const phoneUtil = GLPN.PhoneNumberUtil.getInstance();

	const [inputValue, setInputValue] = useState<
		string | number | readonly string[] | undefined
	>(undefined);
	const [country, setCountry] = useState<{
		id: string;
		esCountry: string;
		enCountry: string;
		prefix: string;
		countryCode: string;
	}>({
		id: "spain",
		esCountry: "España",
		enCountry: "Spain",
		prefix: "+34",
		countryCode: "ES",
	});
	const [focus, setFocus] = useState(false);

	const { countryOptions, onPhoneChange, ...restProps } = props;

	useEffect(() => {
		if (props.defaultValue) setInputValue(props.defaultValue);
		else if (props.value) setInputValue(props.value);
	}, [props.value, props.defaultValue]);

	useEffect(() => {
		if (props.country && countryOptions) {
			const result = countryOptions.filter(
				(item) => item.countryCode === props.country
			);
			if (result.length > 0) onCountryChange(result[0]);
		}
	}, [props.country, countryOptions]);

	const onInputChange = (e: any) => {
		setInputValue(e.target.value);
		props.onChange && props.onChange(e);

		const value = e.target.value.replaceAll(/\s/g, "");
		const phone = country.prefix + value;
		onPhoneChange &&
			onPhoneChange({
				country: country.prefix,
				value: value,
				isValid:
					phone.length > 8 && phone.length < 18
						? phoneUtil.isValidNumberForRegion(
								phoneUtil.parse(phone, country.countryCode),
								country.countryCode
						  )
						: false,
			});
	};

	const onCountryChange = (country: any) => {
		setCountry(country);
		const temp =
			inputValue && typeof inputValue === "string"
				? inputValue
				: props.defaultValue && typeof props.defaultValue === "string"
				? props.defaultValue
				: "";
		const value = temp.replaceAll(/\s/g, "");
		const phone = country.prefix + value;
		onPhoneChange &&
			onPhoneChange({
				country: country.prefix,
				value: value,
				isValid:
					phone.length >= 6 && phone.length < 18
						? phoneUtil.isValidNumberForRegion(
								phoneUtil.parse(phone, country.countryCode),
								country.countryCode
						  )
						: false,
			});
	};

	const onInputFocus = (e: any) => {
		setFocus(true);
		props.onFocus && props.onFocus(e);
	};

	const onInputBlur = (e: any) => {
		setFocus(false);
		props.onBlur && props.onBlur(e);
	};

	return (
		<Input
			LeftContent={
				props.countryOptions ? (
					<IconView>
						<Select
							selectedItem={country}
							onChange={(item) => onCountryChange(item)}
							id="country"
							options={props.countryOptions}
							focus={(focus || inputValue) && props.design === "secondary" ? true : false}
						/>
					</IconView>
				) : undefined
			}
			{...restProps}
			onChange={onInputChange}
			onFocus={onInputFocus}
			onBlur={onInputBlur}
		/>
	);
};
export default InputPhone;
export type InputPhoneProps = InputProps & {
	country?: string;
	countryOptions?: {
		id: string;
		esCountry: string;
		enCountry: string;
		prefix: string;
		countryCode: string;
		[key: string]: any;
	}[];
	onPhoneChange?: (item: {
		country: string;
		value?: any;
		isValid: boolean;
	}) => void;
};
