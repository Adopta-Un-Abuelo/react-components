import type { Meta, StoryObj } from "@storybook/nextjs";
import InputRange from "./InputRange";
import { within, expect, fn } from "storybook/test";
import { Gift } from "lucide-react";

const meta: Meta<typeof InputRange> = {
	title: "Input/Range",
	component: InputRange,
	tags: ["autodocs"],
	args: {
		onChange: fn(),
	},
};

export default meta;
type Story = StoryObj<typeof InputRange>;

export const Default: Story = {
    args: {
		min: 0,
		max: 100,
		unit: "€",
		defaultValue: 40,
	},
	play: async ({ canvasElement, step }: any) => {
		const canvas = within(canvasElement);
		const input = canvas.getByRole("input");
		const range = canvas.getByRole("range");
		await step("render", async () => {
			expect(input).toBeInTheDocument();
			expect(range).toBeInTheDocument();
		});
	},
};

export const WithoutRangeView: Story = {
	args: {
		min: 0,
		max: 100,
		unit: "€",
		defaultValue: 40,
		hideRange: true,
	},
	play: async ({ canvasElement, step }: any) => {
		const canvas = within(canvasElement);
		const input = canvas.getByRole("input");
		await step("render", async () => {
			expect(input).toBeInTheDocument();
		});
	},
};

export const WithPresents: Story = {
	args: {
		min: 50,
		max: 250,
		unit: "€",
		defaultValue: 150,
		hideRange: true,
		hideLabels: true,
		style: { marginTop: 42 },
		presents: [
			{
				value: 200,
				icon: (props: any) => <Gift {...props} />,
				color: "#FFE5E5",
				colorSuccess: "#FF5A5A",
				onClick: fn(),
			},
		],
	},
	play: async ({ canvasElement, step }: any) => {
		const canvas = within(canvasElement);
		const input = canvas.getByRole("input");
		await step("render", async () => {
			expect(input).toBeInTheDocument();
		});
	},
};
