import type { Meta, StoryObj } from "@storybook/react";
import InputPrice from "./InputPrice";
import { within, expect, fn } from "@storybook/test";

const meta: Meta<typeof InputPrice> = {
	title: "Input/Price",
	component: InputPrice,
	tags: ["autodocs"],
	args: {
		options: [5, 15, 21],
		currency: "€",
		defaultOption: 15,
		onChange: fn(),
	},
};

export default meta;
type Story = StoryObj<typeof InputPrice>;

export const Default: Story = {};
