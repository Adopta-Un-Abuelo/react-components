import TextArea from "./TextArea";
import { within, expect, fn } from "@storybook/test";

import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { Building } from "lucide-react";

const meta: Meta<typeof TextArea> = {
	title: "Components/TextArea",
	component: TextArea,
	tags: ["autodocs"],
	args: {
		placeholder: "Placeholder",
		maxLength: 100,
		onChange: action("onChange"),
	},
};

export default meta;
type Story = StoryObj<typeof TextArea>;

export const Default: Story = {
	args: {
		type: "default",
	},
	play: async ({ canvasElement }: any) => {
		const canvas = within(canvasElement);
		const searchBar = await canvas.getByRole("text-area");
		expect(searchBar).toBeInTheDocument();
	},
};

export const Editor: Story = {
	args: {
		type: "edit",
		style: {
			height: 300,
			boxShadow: "0px 3px 6px 0px rgba(0, 0, 0, 0.06)",
		},
		value: "Test value",
		ToolbarButton: <Building />,
	},
	play: async ({ canvasElement }: any) => {
		const canvas = within(canvasElement);
		const searchBar = await canvas.getByRole("text-area");
		expect(searchBar).toBeInTheDocument();
	},
};
