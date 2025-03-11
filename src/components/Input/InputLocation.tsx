import { useState } from "react";
import styled from "styled-components";
import PlacesAutocomplete, {
	Suggestion,
	geocodeByAddress,
	getLatLng,
} from "react-places-autocomplete";

import InputPrimary, { InputPrimaryProps } from "./InputPrimary";
import InputSecondary, { InputSecondaryProps } from "./InputSecondary";
import InputThird, { InputThirdProps } from "./InputThird";
import Color from "../../constants/ColorV2";
import Text from "../Text/Text";

const SearchView = styled.div`
	position: relative;
	display: flex;
	flex: 1;
`;
const DropdownMenu = styled.div`
	position: absolute;
	z-index: 1000;
	width: 100%;
	background-color: white;
	overflow: hidden;
	border-radius: 12px;
	box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.08);
	top: 64px;
	border: 1px solid ${Color.border.neutralSoft};
`;
const SuggestionView = styled.div<{ $selected: boolean }>`
	display: flex;
	flex: 1;
	align-items: center;
	padding: 12px 16px;
	cursor: pointer;
	background-color: ${(props) =>
		props.$selected ? Color.surface.neutralSoft : "white"};
	&:hover {
		background-color: ${Color.surface.neutralSoft};
	}
`;

const InputLocation = (
	props:
		| InputLocationPrimaryProps
		| InputLocationSecondaryProps
		| InputLocationThirdProps
) => {
	const [searchText, setSearchText] = useState<string | undefined>(undefined);
	const [pointerPosition, setPointerPosition] = useState<number | undefined>(
		undefined
	);

	const onLocationChange = (address: string) => {
		setSearchText(address);
	};

	const handleSelect = async (address: string) => {
		const result = await geocodeByAddress(address);
		const geocoder = result[0];
		const latLng = await getLatLng(result[0]);

		const routeObj = geocoder.address_components.filter((it) =>
			it.types.includes("route")
		);
		const route = routeObj.length > 0 ? routeObj[0].long_name : undefined;

		const routeNumberObj = geocoder.address_components.filter((it) =>
			it.types.includes("street_number")
		);
		const routeNumber =
			routeNumberObj.length > 0 ? routeNumberObj[0].long_name : undefined;

		const cityObj = geocoder.address_components.filter((it) =>
			it.types.includes("locality")
		);
		const city = cityObj.length > 0 ? cityObj[0].long_name : undefined;

		const provinceObj = geocoder.address_components.filter((it) =>
			it.types.includes("administrative_area_level_2")
		);
		const province =
			provinceObj.length > 0 ? provinceObj[0].long_name : undefined;

		const countryObj = geocoder.address_components.filter((it) =>
			it.types.includes("country")
		);
		const country =
			countryObj.length > 0 ? countryObj[0].short_name : undefined;

		const zipCodeObj = geocoder.address_components.filter((it) =>
			it.types.includes("postal_code")
		);
		const zipCode =
			zipCodeObj.length > 0 ? zipCodeObj[0].long_name : undefined;

		const addressString = `${route}${
			routeNumber ? " " + routeNumber : ""
		}, ${zipCode}, ${city}, ${province}, ${country}`;
		const sortAddress = `${city ? city + ", " : ""}${
			province ? province + ", " : ""
		}${country}`;
		const tempLocation = {
			address: addressString,
			sortAddress: sortAddress,
			route: route,
			routeNumber: routeNumber,
			coordinates: latLng,
			country: country,
			city: city,
			province: province,
			zipCode: zipCode,
		};

		//Get the timezone. Skip if it is a form and there is no route and route number
		if (!props.isForm || (route && routeNumber)) {
			const response = await fetch(
				`https://maps.googleapis.com/maps/api/timezone/json?location=${latLng.lat},${latLng.lng}&timestamp=1331161200&key=${props.googleAPIKey}`
			);
			const result2 = await response.json();
			if (result2.status === "OK") {
				props.onLocationChange &&
					props.onLocationChange({
						...tempLocation,
						timeZone: result2.timeZoneId,
					});
			} else {
				props.onLocationChange && props.onLocationChange(tempLocation);
			}
		}
		else{
			props.onLocationChange && props.onLocationChange(tempLocation);
		}

		if (props.isForm) {
			setSearchText(`${route}${routeNumber ? " " + routeNumber : ""}`);
		} else {
			setSearchText(addressString);
		}
	};

	const onKeyDown = (e: any, suggestions: Readonly<Array<Suggestion>>) => {
		if (suggestions && suggestions.length > 0) {
			if (e.key === "Enter") {
				const index = pointerPosition ? pointerPosition : 0;
				handleSelect(suggestions[index].description);
			} else if (e.key === "ArrowDown") {
				if (pointerPosition === undefined) {
					setPointerPosition(0);
				} else if (pointerPosition < suggestions.length - 1) {
					setPointerPosition(pointerPosition + 1);
				}
			} else if (e.key === "ArrowUp") {
				if (pointerPosition === undefined) {
					setPointerPosition(0);
				} else if (pointerPosition > 0) {
					setPointerPosition(pointerPosition - 1);
				}
			}
		}
	};

	return (
		<PlacesAutocomplete
			value={searchText}
			onChange={onLocationChange}
			onSelect={handleSelect}
			searchOptions={{
				types: ["address"],
			}}
		>
			{({ getInputProps, suggestions, getSuggestionItemProps }) => (
				<SearchView>
					{props.design === "primary" ? (
						<InputPrimary
							{...getInputProps({
								className: "location-search-input",
								placeholder: props.placeholder,
							})}
							defaultValue={props.defaultValue}
							value={searchText}
							onKeyDown={(e: any) => onKeyDown(e, suggestions)}
							containerStyle={{
								flex: 1,
								...props.containerStyle,
							}}
							icon={props.icon}
							error={props.error}
							disabled={props.disabled}
						/>
					) : props.design === "third" ? (
						<InputThird
							{...getInputProps({
								className: "location-search-input",
								placeholder: props.placeholder,
							})}
							defaultValue={props.defaultValue}
							value={searchText}
							onKeyDown={(e: any) => onKeyDown(e, suggestions)}
							containerStyle={{
								flex: 1,
								...props.containerStyle,
							}}
							error={props.error}
							disabled={props.disabled}
						/>
					) : (
						<InputSecondary
							{...getInputProps({
								className: "location-search-input",
								placeholder: props.placeholder,
							})}
							defaultValue={props.defaultValue}
							value={searchText}
							onKeyDown={(e: any) => onKeyDown(e, suggestions)}
							containerStyle={{
								flex: 1,
								...props.containerStyle,
							}}
							icon={props.icon}
							error={props.error}
							disabled={props.disabled}
						/>
					)}
					{suggestions.length > 0 && (
						<DropdownMenu
							role="menu"
							style={{
								top:
									props.design === "primary"
										? 48
										: props.design === "secondary"
										? 64
										: 42,
							}}
						>
							{suggestions.map((suggestion, index) => {
								return (
									<SuggestionView
										{...getSuggestionItemProps(suggestion)}
										role={"cell" + index}
										$selected={pointerPosition === index}
										style={props.suggestionViewStyle}
									>
										<Text
											type="p2"
											style={{ textOverflow: "ellipsis" }}
										>
											{suggestion.description}
										</Text>
									</SuggestionView>
								);
							})}
						</DropdownMenu>
					)}
				</SearchView>
			)}
		</PlacesAutocomplete>
	);
};
export default InputLocation;
export interface InputLocationPrimaryProps extends InputPrimaryProps {
	design?: "primary";
	googleAPIKey: string;
	error?: string;
	isForm?: boolean;
	suggestionViewStyle?: React.CSSProperties;
	onLocationChange?: (result: LocationProps) => void;
}
export interface InputLocationSecondaryProps extends InputSecondaryProps {
	design?: "secondary";
	googleAPIKey: string;
	error?: string;
	isForm?: boolean;
	suggestionViewStyle?: React.CSSProperties;
	onLocationChange?: (result: LocationProps) => void;
}

export interface InputLocationThirdProps extends InputThirdProps {
	design?: "third";
	googleAPIKey: string;
	error?: string;
	isForm?: boolean;
	suggestionViewStyle?: React.CSSProperties;
	onLocationChange?: (result: LocationProps) => void;
}

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
	coordinates?: google.maps.LatLngLiteral;
	timeZone?: string;
}
