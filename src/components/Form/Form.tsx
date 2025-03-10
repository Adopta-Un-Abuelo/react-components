import LocationForm, { LocationFormProps } from "./LocationForm";

const Form = (props: FormProps & LocationFormProps) => {
	if (props.type === "location") return <LocationForm {...props} />;
	else return null;
};
export default Form;
export interface FormProps {
	type: "location";
}
