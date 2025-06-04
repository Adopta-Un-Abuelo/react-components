import type { Meta, StoryObj } from "@storybook/nextjs";
import InputChat from "./InputChat";
import { within, expect, fn, userEvent } from "storybook/test";
import { Clock } from "lucide-react";

const meta: Meta<typeof InputChat> = {
	title: "Input/Chat",
	component: InputChat,
	tags: ["autodocs"],
	args: {
		onChange: fn(),
	},
};

export default meta;
type Story = StoryObj<typeof InputChat>;

export const Default: Story = {
	args: {
		
	},
	
};

export const WithOptions: Story = {
	args: {
		options: [
			{
				id: "reminder",
				label: "Crear recordatorio",
				icon: <Clock/>,
			},
		],
	},
}
