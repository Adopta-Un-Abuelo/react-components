import type { Meta, StoryObj } from "@storybook/react";
import InputDate from "./InputDate";
import { within, expect, fn } from "@storybook/test";

const meta: Meta<typeof InputDate> = {
	title: "Input/Date",
	component: InputDate,
	tags: ["autodocs"],
	args: {
		type: "date",
		placeholder: "Placeholder",
		onChange: fn(),
	},
	argTypes: {
		design: {
			control: "select",
			options: ["primary", "secondary", "third"],
		},
		disabled: {
			control: "boolean",
		},
	},
};

export default meta;
type Story = StoryObj<typeof InputDate>;

export const Primary: Story = {
	args: {
		design: "primary",
	},
	play: async ({ canvasElement, step }: any) => {
		const canvas = within(canvasElement);
		const input = canvas.getByRole("input");
		await step("render", async () => {
			expect(input).toBeInTheDocument();
		});
	},
};

export const Secondary: Story = {
	args: {
		design: "secondary",
	},
	play: async ({ canvasElement, step }: any) => {
		const canvas = within(canvasElement);
		const input = canvas.getByRole("input");
		const placeholder = canvas.getByRole("placeholder");
		await step("render", async () => {
			expect(input).toBeInTheDocument();
			expect(placeholder).toBeInTheDocument();
		});
	},
};

export const Third: Story = {
	args: {
		design: "third",
	},
	play: async ({ canvasElement, step }: any) => {
		const canvas = within(canvasElement);
		const input = canvas.getByRole("input");
		await step("render", async () => {
			expect(input).toBeInTheDocument();
		});
	},
};