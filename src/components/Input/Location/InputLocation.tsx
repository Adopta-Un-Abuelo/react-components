import { APIProvider, useMapsLibrary } from "@vis.gl/react-google-maps";
import { FormEvent, useCallback, useEffect, useState } from "react";
import { useAutocompleteSuggestions } from "./use-autocomplete-suggestions";
import Input, { InputProps } from "../Basic/Input";
import styled from "styled-components";
import { ColorV2 } from "../../../constants";
import Text from "../../Text/Text";

const SearchView = styled.div`
	position: relative;
	display: flex;
`;
const DropdownMenu = styled.div`
	position: absolute;
	z-index: 1000;
	background-color: white;
	overflow: hidden;
	border-radius: 12px;
	box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.08);
	top: 64px;
	left: 0px;
	right: 0px;
	padding: 8px;
`;
const SuggestionView = styled.div`
	display: flex;
	flex: 1;
	align-items: center;
	cursor: pointer;
	:hover {
		background-color: ${ColorV2.surface.neutralSoft};
	}
`;
const SuggestionText = styled(Text)`
	display: flex;
	flex: 1;
	text-overflow: ellipsis;
	padding: 8px;
	border-radius: 8px;
`;

const InputLocation = ({
	googleAPIKey,
	isForm,
	onLocationChange,
	error,
	...restProps
}: InputLocationProps) => {
	const [errorString, setErrorString] = useState<string | undefined>(
		undefined
	);
	const [inputValue, setInputValue] = useState<string | undefined>(undefined);

	useEffect(() => {
		setErrorString(error);
	}, [error]);

	const onPlaceSelect = async (place: google.maps.places.Place) => {
		setErrorString(undefined);
		if (place.addressComponents && place.location) {
			const routeObj = place.addressComponents.filter((it) =>
				it.types.includes("route")
			);
			const route =
				routeObj.length > 0 ? routeObj[0].longText : undefined;

			const zipCodeObj = place.addressComponents.filter((it) =>
				it.types.includes("postal_code")
			);
			const zipCode =
				zipCodeObj.length > 0 ? zipCodeObj[0].longText : undefined;

			if (route && zipCode) {
				const routeNumberObj = place.addressComponents.filter((it) =>
					it.types.includes("street_number")
				);
				const routeNumber =
					routeNumberObj.length > 0
						? routeNumberObj[0].longText
						: undefined;

				const cityObj = place.addressComponents.filter((it) =>
					it.types.includes("locality")
				);
				const city =
					cityObj.length > 0 ? cityObj[0].longText : undefined;

				const provinceObj = place.addressComponents.filter((it) =>
					it.types.includes("administrative_area_level_2")
				);
				const province =
					provinceObj.length > 0
						? provinceObj[0].longText
						: undefined;

				const countryObj = place.addressComponents.filter((it) =>
					it.types.includes("country")
				);
				const country =
					countryObj.length > 0 ? countryObj[0].shortText : undefined;

				const addressString = `${route}${
					routeNumber ? " " + routeNumber : ""
				}, ${zipCode ? zipCode : ""}, ${city}, ${province}, ${country}`;
				const sortAddress = `${city ? city + ", " : ""}${
					province ? province + ", " : ""
				}${country}`;
				const tempLocation = {
					address: addressString,
					sortAddress: sortAddress,
					route: route as string,
					routeNumber: routeNumber as string,
					location: {
						lat: place.location.lat(),
						lng: place.location.lng(),
					},
					country: country as string,
					city: city as string,
					province: province as string,
					zipCode: zipCode as string,
				};

				//Get the timezone. Skip if it is a form and there is no route and route number
				if (!isForm || (route && routeNumber)) {
					const response = await fetch(
						`https://maps.googleapis.com/maps/api/timezone/json?location=${tempLocation.location.lat},${tempLocation.location.lng}&timestamp=1331161200&key=${googleAPIKey}`
					);
					const result2 = await response.json();
					if (result2.status === "OK") {
						onLocationChange &&
							onLocationChange({
								...tempLocation,
								timeZone: result2.timeZoneId,
							});
					} else {
						onLocationChange && onLocationChange(tempLocation);
					}
				} else {
					onLocationChange && onLocationChange(tempLocation);
				}
				if (isForm) {
					setInputValue(
						`${route}${routeNumber ? " " + routeNumber : ""}`
					);
				} else {
					setInputValue(addressString);
				}
			} else {
				setErrorString(
					"Parece que la dirección no está completa. Indica el número de la calle si es preciso."
				);
			}
		} else {
			setErrorString(
				"Parece que hubo un error de conexión al obtener la dirección. Prueba de nuevo más tarde."
			);
		}
	};

	return (
		<APIProvider apiKey={googleAPIKey}>
			<PlaceAutocomplete
				onPlaceSelect={onPlaceSelect}
				error={errorString}
				value={inputValue}
				{...restProps}
			/>
		</APIProvider>
	);
};

const PlaceAutocomplete = ({ onPlaceSelect, value, ...restProps }: Props) => {
	const places = useMapsLibrary("places");

	const [searchValue, setSearchValue] = useState<string>("");
	const [inputValue, setInputValue] = useState<
		string | number | readonly string[] | undefined
	>("");
	const { suggestions, resetSession } = useAutocompleteSuggestions(
		searchValue,
		{
			language: "es",
			includedPrimaryTypes: ["route", "street_address"],
		}
	);

	useEffect(() => {
		if (value) setInputValue(value);
		else setInputValue("");
	}, [value]);

	const handleInput = useCallback((event: FormEvent<HTMLInputElement>) => {
		setSearchValue((event.target as HTMLInputElement).value);
		setInputValue((event.target as HTMLInputElement).value);
	}, []);

	const handleSuggestionClick = useCallback(
		async (suggestion: google.maps.places.AutocompleteSuggestion) => {
			if (!places) return;
			if (!suggestion.placePrediction) return;

			const place = suggestion.placePrediction.toPlace();
			await place.fetchFields({
				fields: ["location", "addressComponents"],
			});

			setSearchValue("");
			resetSession();
			onPlaceSelect(place);
		},
		[places, onPlaceSelect]
	);

	return (
		<SearchView className="autocomplete-container">
			<Input
				value={inputValue}
				onInput={(event) => handleInput(event)}
				containerStyle={{
					display: "flex",
					flex: 1,
					flexDirection: "column",
				}}
				{...restProps}
			/>
			{suggestions.length > 0 && (
				<DropdownMenu className="custom-list">
					{suggestions.map((suggestion, index) => {
						return (
							<SuggestionView
								key={index}
								className="custom-list-item"
								onClick={() =>
									handleSuggestionClick(suggestion)
								}
							>
								<SuggestionText type="p2">
									{suggestion.placePrediction?.text.text}
								</SuggestionText>
							</SuggestionView>
						);
					})}
				</DropdownMenu>
			)}
		</SearchView>
	);
};
type Props = {
	error?: string;
	value?: string | number | readonly string[] | undefined;
	onPlaceSelect: (place: google.maps.places.Place) => void;
};
export default InputLocation;
export type InputLocationProps = InputProps & {
	isForm?: boolean;
	googleAPIKey: string;
	onLocationChange?: (result: LocationProps) => void;
};
export interface LocationProps {
	address?: string;
	sortAddress?: string;
	route?: string;
	routeNumber?: string;
	routeInfo?: string;
	city?: string;
	province?: string;
	zipCode?: string;
	country?: string;
	location?: google.maps.LatLngLiteral;
	timeZone?: string;
}
