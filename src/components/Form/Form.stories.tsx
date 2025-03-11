import type { Meta, StoryObj } from "@storybook/react";
import Form from "./Form";
import { fn } from "@storybook/test";

const meta: Meta<typeof Form> = {
	title: "Components/Form",
	component: Form,
	tags: ["autodocs"],
	args: {
		onSubmit: fn(),
		googleAPIKey: process.env.GOOGLE_MAPS_API,
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
