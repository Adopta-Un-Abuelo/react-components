import styled from "styled-components";
import { CSSProperties, useEffect, useState } from "react";
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
	const [, setErrorToggle] = useState(false);

	useEffect(() => {
		setLocation(props.defaultLocation);
	}, [props.defaultLocation]);

	let addressTemp = "";

	const onLocationChange = async (item: LocationProps) => {
		setInputError(undefined);
		if (item.route && item.routeNumber) {
			const address = `${item.route} ${item.routeNumber}, ${item.zipCode}, ${item.city}, ${item.province}, ${item.country}`;

			const { routeInfo, ...restLocation } = location ?? {};
			const updatedLocation = {
				...restLocation,
				...item,
				address,
			};

			setLocation(updatedLocation);
			props.onSubmit({ data: updatedLocation });
		} else {
			addressTemp =
				item.route && item.routeNumber
					? `${item.route} ${item.routeNumber}, ${
							location?.routeInfo ? location.routeInfo + ", " : ""
					  }${item.zipCode ?? ""}, ${item.city ?? ""}, ${
							item.province ?? ""
					  }, ${item.country ?? ""}`
					: "";

			setLocation({
				...location,
				route: item.route,
				routeNumber: item.routeNumber ? item.routeNumber : "",
				address: addressTemp,
				routeInfo: location?.routeInfo,
			});

			const baseMessage =
				"Añade la dirección completa, incluyendo el número de la calle";
			const altMessage = baseMessage + ".";

			setErrorToggle((prev) => {
				const nextToggle = !prev;
				const nextMessage = nextToggle ? baseMessage : altMessage;

				setInputError(nextMessage);
				props.onSubmit({ error: nextMessage });

				return nextToggle;
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
		<Container style={props.style}>
			<InputLocation
				design={props.design}
				isLoaded={props.isLoaded}
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
					value={location?.routeInfo ?? ""}
					onChange={onRouteInfoChange}
				/>
				<Row>
					<Input
						containerStyle={{ flex: 3 }}
						type="text"
						placeholder="Ciudad"
						design={props.design}
						value={location?.city}
						disabled={true}
					/>
					<Input
						containerStyle={{ flex: 2 }}
						type="text"
						placeholder="Código postal"
						design={props.design}
						value={location?.zipCode}
						disabled={true}
					/>
				</Row>
				<Input
					type="text"
					placeholder="Provincia"
					design={props.design}
					value={location?.province}
					disabled={true}
				/>
			</HiddenView>
		</Container>
	);
};
export default LocationForm;
export interface LocationFormProps {
	style?: CSSProperties;
	type: "location";
	design?: "primary" | "secondary" | "third";
	placeholder?: string;
	defaultLocation?: LocationProps;
	isLoaded: boolean;
	onSubmit: (result: { data?: LocationProps; error?: string }) => void;
}
