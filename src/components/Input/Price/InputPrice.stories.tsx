import type { Meta, StoryObj } from "@storybook/react";
import InputPrice from "./InputPrice";
import { fn } from "@storybook/test";

const meta: Meta<typeof InputPrice> = {
	title: "Input/Price",
	component: InputPrice,
	tags: ["autodocs"],
	args: {
		options: [120, 225, 300],
		currency: "ARS",
		defaultOption: 15,
		label: "Nos ayudas a cumplir el sueño de {{value}} abuelos",
		labelValueConversion: 0.2,
		onChange: fn(),
	},
};

export default meta;
type Story = StoryObj<typeof InputPrice>;

export const Default: Story = {};
export const HideCustomAmount: Story = { args: { hideCustomAmount: true } };
