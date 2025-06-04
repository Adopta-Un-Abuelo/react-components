import type { Meta, StoryObj } from "@storybook/nextjs";
import InputImage from "./InputImage";
import { userEvent, within, expect, fn } from "storybook/test";

import { Flag, Search, Clock, icons, Gift } from "lucide-react";

const meta: Meta<typeof InputImage> = {
	title: "Input/Image",
	component: InputImage,
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof InputImage>;

export const Default: Story = {
	args: {
		options: ["camera", "library"],
	},
	play: async ({ canvasElement, step }: any) => {
		const canvas = within(canvasElement);
		const button = canvas.getByRole("button");
		await step("render", async () => {
			expect(button).toBeInTheDocument();
		});
	},
};