import SwitchTag from "./SwitchTag";
import { within, userEvent, expect } from "storybook/test";

import { action } from "storybook/actions";
import type { Meta, StoryObj } from "@storybook/nextjs";

import { Flag, FlagOff } from "lucide-react";

const meta: Meta<typeof SwitchTag> = {
	title: "Components/SwitchTag",
	component: SwitchTag,
	tags: ["autodocs"],
	args: {
		options: [
			{
				id: "option1",
				icon: <Flag height={20} width={20} />,
			},
			{
				id: "option2",
				icon: <FlagOff />,
			},
		],
		onChange: action("onChange"),
	},
};

export default meta;
type Story = StoryObj<typeof SwitchTag>;

export const Default: Story = {
	play: async ({ canvasElement, step }: any) => {
		const canvas = within(canvasElement);
		const container = await canvas.getByRole("container");
		await step("render", async () => {
			expect(container).toBeInTheDocument();
		});
		await step("click cell", async () => {
			const radiobutton = await canvas.findByRole("option2");
			await userEvent.click(radiobutton);
		});
	},
};
