import React, { useState, useRef, useCallback, useEffect } from "react";
import debounce from "lodash.debounce";
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
	isLoaded,
	isForm,
	searchTypes,
	searchFields,
	onLocationChange,
	...restProps
}: InputLocationProps) => {
	const {
		defaultValue,
		value: _ignoredValue,
		onChange: _ignoredOnChange,
		...passthrough
	} = restProps as any;

	const autocompleteService =
		useRef<google.maps.places.AutocompleteService | null>(null);
	const placesService = useRef<google.maps.places.PlacesService | null>(null);

	const [input, setInput] = useState<string>(() =>
		defaultValue !== undefined ? String(defaultValue) : ""
	);
	const [predictions, setPredictions] = useState<
		google.maps.places.AutocompletePrediction[]
	>([]);
	const [errorString, setErrorString] = useState<string | undefined>(
		undefined
	);

	const userTypedRef = useRef(false);

	useEffect(() => {
		if (defaultValue !== undefined) {
			setInput(String(defaultValue));
		}
	}, [defaultValue]);

	useEffect(() => {
		if (isLoaded) {
			if (typeof google === "undefined") return;

			const mapDiv = document.createElement("div");
			const dummyMap = new google.maps.Map(mapDiv);

			autocompleteService.current =
				new google.maps.places.AutocompleteService();
			placesService.current = new google.maps.places.PlacesService(
				dummyMap
			);
		}
	}, [isLoaded]);

	useEffect(() => {
		if (isLoaded && !userTypedRef.current && defaultValue !== undefined) {
			setInput(String(defaultValue));
		}
	}, [isLoaded, defaultValue]);

	const fetchPredictions = useCallback(
		debounce((value: string) => {
			if (!autocompleteService.current || !value) return;
			autocompleteService.current.getPlacePredictions(
				{
					input: value,
					types: searchTypes ? searchTypes : ["address"],
				},
				(results) => {
					setPredictions(results || []);
				}
			);
		}, 500),
		[]
	);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setInput(value);
		fetchPredictions(value);
	};

	const handleSelect = (
		suggestion: google.maps.places.AutocompletePrediction
	) => {
		if (!placesService.current) return;

		placesService.current.getDetails(
			{
				placeId: suggestion.place_id,
				fields: searchFields
					? searchFields
					: ["geometry", "address_components"],
			},
			(place) => {
				if (
					place &&
					place.geometry &&
					place.geometry.location &&
					place.address_components
				) {
					setPredictions([]);
					setErrorString(undefined);

					const routeObj = place.address_components.filter((it) =>
						it.types.includes("route")
					);
					const route =
						routeObj.length > 0 ? routeObj[0].long_name : undefined;

					const zipCodeObj = place.address_components.filter((it) =>
						it.types.includes("postal_code")
					);
					const zipCode =
						zipCodeObj.length > 0
							? zipCodeObj[0].long_name
							: undefined;

					if (route && zipCode) {
						const routeNumberObj = place.address_components.filter(
							(it) => it.types.includes("street_number")
						);
						const routeNumber =
							routeNumberObj.length > 0
								? routeNumberObj[0].long_name
								: undefined;

						const cityObj = place.address_components.filter((it) =>
							it.types.includes("locality")
						);
						const city =
							cityObj.length > 0
								? cityObj[0].long_name
								: undefined;

						const provinceObj = place.address_components.filter(
							(it) =>
								it.types.includes("administrative_area_level_2")
						);
						const province =
							provinceObj.length > 0
								? provinceObj[0].long_name
								: undefined;

						const countryObj = place.address_components.filter(
							(it) => it.types.includes("country")
						);
						const country =
							countryObj.length > 0
								? countryObj[0].long_name
								: undefined;

						const addressString = `${route}${
							routeNumber ? " " + routeNumber : ""
						}, ${
							zipCode ? zipCode : ""
						}, ${city}, ${province}, ${country}`;
						const sortAddress = `${city ? city + ", " : ""}${
							province ? province + ", " : ""
						}${country}`;
						const tempLocation = {
							address: addressString,
							sortAddress: sortAddress,
							route: route as string,
							routeNumber: routeNumber as string,
							location: {
								lat: place.geometry.location.lat(),
								lng: place.geometry.location.lng(),
							},
							country: country as string,
							city: city as string,
							province: province as string,
							zipCode: zipCode as string,
						};
						onLocationChange && onLocationChange(tempLocation);
						if (isForm) {
							setInput(
								`${route}${
									routeNumber ? " " + routeNumber : ""
								}`
							);
						} else {
							setInput(addressString);
						}
					} else {
						setErrorString(
							"Necesitamos una dirección más precisa para encontrar tu código postal. Por favor, indica el número de la calle."
						);
					}
				} else if (place && place.geometry && place.geometry.location) {
					setPredictions([]);
					setErrorString(undefined);
					setInput(suggestion.description);
					onLocationChange &&
						onLocationChange({
							location: {
								lat: place.geometry.location.lat(),
								lng: place.geometry.location.lng(),
							},
						});
				} else {
					setErrorString(
						"Parece que hubo un error de conexión al obtener la dirección. Prueba de nuevo más tarde."
					);
				}
			}
		);
	};
	return (
		<>
			<SearchView className="autocomplete-container">
				<Input
					{...passthrough}
					value={input}
					onChange={handleInputChange}
					containerStyle={{
						display: "flex",
						flex: 1,
						flexDirection: "column",
					}}
					disabled={isLoaded ? passthrough.disabled : true}
					placeholder={
						isLoaded ? passthrough.placeholder : "Cargando..."
					}
				/>
				{predictions.length > 0 && (
					<DropdownMenu className="custom-list">
						{predictions.map((suggestion, index) => {
							return (
								<SuggestionView
									key={index}
									className="custom-list-item"
									onClick={() => handleSelect(suggestion)}
								>
									<SuggestionText type="p2">
										{suggestion.description}
									</SuggestionText>
								</SuggestionView>
							);
						})}
					</DropdownMenu>
				)}
			</SearchView>
			{errorString && (
				<Text
					type="c1"
					style={{ color: ColorV2.text.red, padding: "0px 4px" }}
				>
					{errorString}
				</Text>
			)}
		</>
	);
};
export default InputLocation;
export type InputLocationProps = InputProps & {
	isForm?: boolean;
	isLoaded: boolean;
	searchTypes?: string[];
	searchFields?: string[];
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
