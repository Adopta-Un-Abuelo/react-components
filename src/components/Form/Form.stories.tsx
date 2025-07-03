import type { Meta, StoryObj } from "@storybook/nextjs";
import Form from "./Form";
import { fn } from "storybook/test";
import { useJsApiLoader } from "@react-google-maps/api";

const meta: Meta<typeof Form> = {
	title: "Components/Form",
	component: Form,
	tags: ["autodocs"],
	args: {
		onSubmit: fn(),
	},
	argTypes: {
		design: {
			table: {
				defaultValue: { summary: "secondary" },
			},
			control: "select",
			options: ["primary", "secondary", "third"],
		},
		type: {
			table: {
				defaultValue: { summary: "location" },
			},
			control: "select",
			options: ["location"],
		},
	},
	render: (args) => {
		const { isLoaded } = useJsApiLoader({
			googleMapsApiKey: process.env.GOOGLE_MAPS_API as string,
			libraries: ["places"],
		});
		return <Form {...args} isLoaded={isLoaded} />;
	},
};

export default meta;
type Story = StoryObj<typeof Form>;

export const Location: Story = {
	args: {
		type: "location",
		design: "secondary",
	},
};

export const LocationWithDefaultValues: Story = {
	args: {
		type: "location",
		design: "secondary",
		defaultLocation: {
			address: "Calle Orense, 12, 2, 5, 28020 Madrid, España",
			sortAddress: "Madrid, Madrid, España",
			route: "Calle Orense",
			routeNumber: "12",
			routeInfo: "Planta 2, Oficina 5",
			city: "Madrid",
			province: "Madrid",
			zipCode: "28020",
		},
	},
};
