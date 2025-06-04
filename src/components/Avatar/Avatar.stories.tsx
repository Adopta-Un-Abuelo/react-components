import Avatar from "./Avatar";
import type { Meta, StoryObj } from '@storybook/nextjs';
import { within, expect } from "storybook/test";

const meta: Meta<typeof Avatar> = {
	title: "Components/Avatar",
	component: Avatar,
	tags: ["autodocs"],
	args: {
		editable: false,
		clickable: false,
	}
};
export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
	args: {
		name: "Test"
	},
	play: async ({ canvasElement }: any) => {
		const canvas = within(canvasElement);
		const component = await canvas.getByRole("avatar");
		await expect(component).toBeInTheDocument();
	},
};

export const WithIcon: Story = {
	args: {
		icon: "https://storybook.js.org/images/placeholders/350x150.png",
	},
	play: async ({ canvasElement }: any) => {
		const canvas = within(canvasElement);
		const component = await canvas.getByRole("avatar");
		await expect(component).toBeInTheDocument();
	},
};

export const Clickable: Story = {
	args: {
		icon: "https://storybook.js.org/images/placeholders/350x150.png",
		clickable: true,
	},
	play: async ({ canvasElement }: any) => {
		const canvas = within(canvasElement);
		const component = await canvas.getByRole("avatar");
		await expect(component).toBeInTheDocument();
	},
};

export const Editable: Story = {
	args: {
		name: "Test",
		editable: true,
	},
	play: async ({ canvasElement }: any) => {
		const canvas = within(canvasElement);
		const component = await canvas.getByRole("avatar");
		await expect(component).toBeInTheDocument();
	},
};
