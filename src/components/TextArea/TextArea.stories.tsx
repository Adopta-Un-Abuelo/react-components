import TextArea from "./TextArea";
import { within, expect } from "@storybook/test";

import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";

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
		tips: [
			"Que tal si le cuentas una anécdota divertida para que te conozca un poco mejor y le saques una sonrisa.",
			"Pregúntale por sus aficiones y si compartís alguna céntrate en ella.",
		],
	},
	play: async ({ canvasElement }: any) => {
		const canvas = within(canvasElement);
		const searchBar = await canvas.getByRole("text-area");
		expect(searchBar).toBeInTheDocument();
	},
};
