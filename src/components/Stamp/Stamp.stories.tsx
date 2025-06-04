import Stamp from "./Stamp";
import { userEvent, within, expect } from "storybook/test";
import { action } from "storybook/actions";
import type { Meta, StoryObj } from "@storybook/nextjs";

const meta: Meta<typeof Stamp> = {
	title: "Components/Stamp",
	component: Stamp,
	tags: ["autodocs"],
	args: {
		icon: "⚽️",
        title: "Deporte",
        backgroundColor: "#ECF4FB",
	},
};

export default meta;
type Story = StoryObj<typeof Stamp>;

export const Default: Story = {
	play: async ({ canvasElement, step }: any) => {
		const canvas = within(canvasElement);
		const stamp = await canvas.getByRole("stamp");
		await step("render", async () => {
			expect(stamp).toBeInTheDocument();
		});
	},
};