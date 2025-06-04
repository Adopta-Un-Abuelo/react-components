import type { Meta, StoryObj } from "@storybook/nextjs";
import InputCode from "./InputCode";
import { within, expect, fn, userEvent } from "storybook/test";

const meta: Meta<typeof InputCode> = {
	title: "Input/Code",
	component: InputCode,
	tags: ["autodocs"],
	args: {
		onChange: fn(),
	},
};

export default meta;
type Story = StoryObj<typeof InputCode>;

export const Default: Story = {
	args: {
		
	},
	play: async ({ canvasElement, step }: any) => {
		const canvas = within(canvasElement);
		const input = canvas.getByRole("input");
		await step("render", async () => {
			expect(input).toBeInTheDocument();
		});
		await step("typing", async () => {
			userEvent.type(input, "000000", { delay: 200 });
		});
	},
};
