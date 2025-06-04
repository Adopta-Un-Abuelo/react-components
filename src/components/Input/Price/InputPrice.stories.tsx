import type { Meta, StoryObj } from "@storybook/nextjs";
import InputPrice from "./InputPrice";
import { fn } from "storybook/test";

const meta: Meta<typeof InputPrice> = {
	title: "Input/Price",
	component: InputPrice,
	tags: ["autodocs"],
	args: {
		options: [9, 15, 20],
		currency: "€",
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
