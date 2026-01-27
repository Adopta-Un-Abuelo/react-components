import LocationForm, { LocationFormProps } from "./LocationForm";

const Form = (props: FormProps & LocationFormProps) => {
	if (props.type === "location") return <LocationForm {...props} />;
	else return null;
};
export default Form;
/**
 * Form router component (currently only supports location type).
 * Delegates to specific form implementations based on type.
 *
 * @example
 * ```tsx
 * <Form
 *   type="location"
 *   isLoaded={isGoogleMapsLoaded}
 *   onChange={(location) => setLocation(location)}
 * />
 * ```
 */
export interface FormProps {
	/** Form type to render */
	type: "location";
	/** Whether Google Maps API is loaded (required for location form) */
	isLoaded: boolean
}
