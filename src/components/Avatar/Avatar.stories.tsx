import Avatar from "./Avatar";
import { within, expect } from "@storybook/test";

export default {
	title: "Components/Avatar",
	component: Avatar,
	tags: ["autodocs"],
	args: {
		editable: false,
		clickable: false,
	},
	argsTypes: {
		editable: {
			table: {
				defaultValue: { summary: false },
			},
		},
		clickable: {
			table: {
				defaultValue: { summary: false },
			},
		},
	},
};

export const Default = {
	args: {
		name: "Test",
		style: {},
	},
	play: async ({ canvasElement }: any) => {
		const canvas = within(canvasElement);
		const component = await canvas.getByRole("avatar");
		await expect(component).toBeInTheDocument();
	},
};

export const WithIcon = {
	args: {
		icon: "https://storybook.js.org/images/placeholders/350x150.png",
	},
	play: async ({ canvasElement }: any) => {
		const canvas = within(canvasElement);
		const component = await canvas.getByRole("avatar");
		await expect(component).toBeInTheDocument();
	},
};

export const Clickable = {
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

export const Editable = {
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
