import type { Meta, StoryObj } from "@storybook/nextjs";
import InputDateRange from "./InputDateRange";
import { userEvent, within, expect, fn } from "storybook/test";

import { Flag, Search, Clock, icons, Gift } from "lucide-react";

const meta: Meta<typeof InputDateRange> = {
	title: "Input/DateRange",
	component: InputDateRange,
	tags: ["autodocs"],
	args: {
		onChange: fn(),
	},
};

export default meta;
type Story = StoryObj<typeof InputDateRange>;

export const Default: Story = {
    args: {
        
    },
};