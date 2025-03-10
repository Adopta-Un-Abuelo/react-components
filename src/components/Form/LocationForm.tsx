import styled from "styled-components";
import Input from "../Input/Input";
import { useState } from "react";
import axios from "axios";

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
const HiddenView = styled.div<{ visible?: boolean }>`
	display: ${(props) => (props.visible ? "flex" : "none")};
	flex-direction: column;
	gap: 8px;
`;

const LocationForm = (props: LocationFormProps) => {
	const googleAPIKey = "AIzaSyA_H7WVmlnxy8OWrNuIJmGclYWwXFB49Wk";
	const [location, setLocation] = useState<
		| (LocationProps & {
				sortAddress?: string;
				coordinates?: google.maps.LatLngLiteral;
				timeZone?: string;
		  })
		| undefined
	>(props.defaultLocation);
	const [inputError, setInputError] = useState<string | undefined>(undefined);

	const onLocationChange = async (item: {
		address: string;
		geocoder: google.maps.GeocoderResult;
		location: google.maps.LatLngLiteral;
	}) => {
		setInputError(undefined);
		const route = item.geocoder.address_components.filter((it) =>
			it.types.includes("route")
		);
		const streetNumber = item.geocoder.address_components.filter((it) =>
			it.types.includes("street_number")
		);

		if (
			route &&
			route.length > 0 &&
			streetNumber &&
			streetNumber.length > 0
		) {
			const locality = item.geocoder.address_components.filter((it) =>
				it.types.includes("locality")
			);
			const city = item.geocoder.address_components.filter((it) =>
				it.types.includes("administrative_area_level_2")
			);
			const country = item.geocoder.address_components.filter((it) =>
				it.types.includes("country")
			);
			const postal_code = item.geocoder.address_components.filter((it) =>
				it.types.includes("postal_code")
			);
			const sortAddress =
				(locality.length > 0 ? locality[0].long_name + ", " : "") +
				(city.length > 0 ? city[0].long_name + ", " : "") +
				country[0].long_name;
			const tempLocation = {
				...location,
				address: `${route[0].long_name} ${streetNumber[0].long_name}`,
				sortAddress: sortAddress,
				coordinates: item.location,
				country: country[0].short_name,
				city: locality.length > 0 ? locality[0].long_name : undefined,
				province: city.length > 0 ? city[0].long_name : undefined,
				zipCode:
					postal_code.length > 0
						? postal_code[0].long_name
						: undefined,
			};

			//Get the timezone
			const result2 = await axios({
				method: "GET",
				url:
					"https://maps.googleapis.com/maps/api/timezone/json?location=" +
					item.location.lat +
					"%2C" +
					item.location.lng +
					"&timestamp=1331161200&key=" +
					googleAPIKey,
			});
			if (result2.data.status === "OK") {
				setLocation({
					...tempLocation,
					timeZone: result2.data.timeZoneId,
				});
				props.onSubmit({
					data: {
						...tempLocation,
						timeZone: result2.data.timeZoneId,
					},
				});
			} else {
				setLocation(tempLocation);
				props.onSubmit({
					data: tempLocation,
				});
			}
		} else {
			setLocation(undefined);
			const message =
				"Añade la dirección completa, incluyendo el número de la calle";
			setInputError(message);
			props.onSubmit({
				error: message,
			});
		}
	};

	return (
		<Container>
			<Input
				type="location"
				design={props.design}
				placeholder="Nombre y número de la calle"
				value={location?.address}
				isForm={true}
				error={inputError}
				onLocationChange={onLocationChange}
			/>
			<HiddenView visible={location?.address ? true : false}>
				<Input
					containerStyle={{ flex: 1 }}
					type="text"
					placeholder="Apartamento, suite, unidad, edificio o piso"
					design={props.design}
					defaultValue={location?.addressInfo}
					onChange={(e) => {
						setLocation({
							...location,
							addressInfo: e.target.value,
						});
						props.onSubmit({
							data: {
								...location,
								addressInfo: e.target.value,
							},
						});
					}}
				/>
				<Row>
					<Input
						containerStyle={{ flex: 3 }}
						type="text"
						placeholder="Ciudad"
						design={props.design}
						defaultValue={location?.city}
					/>
					<Input
						containerStyle={{ flex: 2 }}
						type="text"
						placeholder="Código postal"
						design={props.design}
						defaultValue={location?.zipCode}
					/>
				</Row>
				<Input
					type="text"
					placeholder="Provincia"
					design={props.design}
					defaultValue={location?.province}
				/>
			</HiddenView>
		</Container>
	);
};
export default LocationForm;
export interface LocationFormProps {
	type: "location";
	design?: "primary" | "secondary" | "third";
	defaultLocation?: LocationProps;
	onSubmit: (result: {
		data?: LocationProps & {
			sortAddress?: string;
			coordinates?: google.maps.LatLngLiteral;
			timeZone?: string;
		};
		error?: string;
	}) => void;
}
interface LocationProps {
	address?: string;
	addressInfo?: string;
	city?: string;
	province?: string;
	zipCode?: string;
	country?: string;
}
