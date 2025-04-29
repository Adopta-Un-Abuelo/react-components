import styled from "styled-components";
import { useEffect, useState } from "react";
import InputLocation, { LocationProps } from "../Input/Location/InputLocation";
import Input from "../Input/Basic/Input";

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
	const [location, setLocation] = useState<LocationProps | undefined>(
		props.defaultLocation
	);
	const [inputError, setInputError] = useState<string | undefined>(undefined);

	useEffect(() => {
		setLocation(props.defaultLocation);
	}, [props.defaultLocation]);

	const onLocationChange = async (item: LocationProps) => {
		setInputError(undefined);
		if (item.route && item.routeNumber) {
			const address = `${item.route} ${item.routeNumber}, ${
				location?.routeInfo ? location.routeInfo + ", " : ""
			}${item.zipCode}, ${item.city}, ${item.province}, ${item.country}`;
			setLocation({ ...location, ...item, address: address });
			props.onSubmit({
				data: { ...location, ...item, address: address },
			});
		} else {
			setLocation({ routeInfo: location?.routeInfo });
			const message =
				"Añade la dirección completa, incluyendo el número de la calle";
			setInputError(message);
			props.onSubmit({
				error: message,
			});
		}
	};

	const onRouteInfoChange = (e: any) => {
		if (location) {
			const address = `${location.route} ${location.routeNumber}, ${e.target.value}, ${location.zipCode}, ${location.city}, ${location.province}, ${location.country}`;
			const tempLocation = {
				...location,
				address: address,
				routeInfo: e.target.value,
			};
			setLocation(tempLocation);
			props.onSubmit({
				data: tempLocation,
			});
		}
	};

	return (
		<Container>
			<InputLocation
				design={props.design}
				googleAPIKey={props.googleAPIKey}
				placeholder={
					props.placeholder
						? props.placeholder
						: "Nombre y número de la calle"
				}
				defaultValue={
					location && location.route
						? `${location.route} ${location.routeNumber}`
						: undefined
				}
				isForm={true}
				error={inputError}
				onLocationChange={onLocationChange}
			/>
			<HiddenView visible={location?.route ? true : false}>
				<Input
					containerStyle={{ flex: 1 }}
					type="text"
					placeholder="Apartamento, suite, unidad, edificio o piso"
					design={props.design}
					defaultValue={location?.routeInfo}
					onChange={onRouteInfoChange}
				/>
				<Row>
					<Input
						containerStyle={{ flex: 3 }}
						type="text"
						placeholder="Ciudad"
						design={props.design}
						defaultValue={location?.city}
						disabled={true}
					/>
					<Input
						containerStyle={{ flex: 2 }}
						type="text"
						placeholder="Código postal"
						design={props.design}
						defaultValue={location?.zipCode}
						disabled={true}
					/>
				</Row>
				<Input
					type="text"
					placeholder="Provincia"
					design={props.design}
					defaultValue={location?.province}
					disabled={true}
				/>
			</HiddenView>
		</Container>
	);
};
export default LocationForm;
export interface LocationFormProps {
	type: "location";
	design?: "primary" | "secondary" | "third";
	placeholder?: string;
	googleAPIKey: string;
	defaultLocation?: LocationProps;
	onSubmit: (result: { data?: LocationProps; error?: string }) => void;
}
