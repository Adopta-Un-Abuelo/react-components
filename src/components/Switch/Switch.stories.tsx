import Switch from "./Switch";
import { within, userEvent, expect, fn } from "storybook/test";

import type { Meta, StoryObj } from "@storybook/nextjs";

const meta: Meta<typeof Switch> = {
	title: "Components/Switch",
	component: Switch,
	tags: ["autodocs"],
	args: {
        active: true,
		onChange: fn(),
	},
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = {
	play: async ({ canvasElement, step }: any) => {
		const canvas = within(canvasElement);
		const container = await canvas.getByRole("container");
		await step("render", async () => {
			expect(container).toBeInTheDocument();
		});
		await step("click cell", async () => {
			const radiobutton = await canvas.findByRole("tag");
			await userEvent.click(radiobutton);
		});
	},
};
