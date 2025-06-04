import type { Meta, StoryObj } from "@storybook/nextjs";
import InputLocation from "./InputLocation";
import { fn } from "storybook/test";

const meta: Meta<typeof InputLocation> = {
	title: "Input/Location",
	component: InputLocation,
	tags: ["autodocs"],
	args: {
		googleAPIKey: process.env.GOOGLE_MAPS_API,
        placeholder: "Buscar dirección",
		isForm: false,
		onLocationChange: fn(),
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
