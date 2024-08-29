import BreadCrumb from "./BreadCrumb";
import type { Meta, StoryObj } from '@storybook/react';
import { within, expect } from "@storybook/test";

const meta: Meta<typeof BreadCrumb> = {
	title: "Components/BreadCrumb",
	component: BreadCrumb,
	tags: ["autodocs"]
};
export default meta;
type Story = StoryObj<typeof BreadCrumb>;

export const Default: Story = {
	args: {
		selectedStep: 3,
		steps: 8,
	},
	play: async ({ canvasElement }: any) => {
		const canvas = within(canvasElement);
		const component = await canvas.getByRole("bread-crumb");
		await expect(component).toBeInTheDocument();
	},
};
