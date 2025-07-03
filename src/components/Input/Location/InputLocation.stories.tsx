import type { Meta, StoryObj } from "@storybook/nextjs";
import InputLocation from "./InputLocation";
import { fn } from "storybook/test";
import { useJsApiLoader } from "@react-google-maps/api";

const meta: Meta<typeof InputLocation> = {
	title: "Input/Location",
	component: InputLocation,
	tags: ["autodocs"],
	args: {
		placeholder: "Buscar dirección",
		isForm: false,
		searchTypes: ["address"],
		searchFields: ["geometry", "address_components"],
		onLocationChange: fn(),
	},
	render: (args) => {
		const { isLoaded } = useJsApiLoader({
			googleMapsApiKey: process.env.GOOGLE_MAPS_API as string,
			libraries: ["places"],
		});
		return <InputLocation {...args} isLoaded={isLoaded} />;
	},
};

export default meta;
type Story = StoryObj<typeof InputLocation>;

export const Primary: Story = {
	args: {
		design: "primary",
	},
};

export const Secondary: Story = {
	args: {
		design: "secondary",
	},
};

export const Third: Story = {
	args: {
		design: "third",
	},
};
