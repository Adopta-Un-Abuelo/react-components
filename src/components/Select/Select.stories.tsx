import Select from "./Select";
import { userEvent, within, expect } from "storybook/test";
import { action } from "storybook/actions";
import type { Meta, StoryObj } from "@storybook/nextjs";

import { Dog, Cat, Cake, Calendar } from "lucide-react";

const meta: Meta<typeof Select> = {
	title: "Components/Select",
	component: Select,
	tags: ["autodocs"],
	args: {
		id: "select",
		options: [
			{
				label: "Option 1",
			},
			{
				label: "Option 2",
			},
			{
				label: "Option 3",
			},
			{
				label: "Option 4",
			},
		],
		onChange: action("onChange"),
	},
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {
	play: async ({ canvasElement, step }: any) => {
		const canvas = within(canvasElement);
		const select = await canvas.getByRole("select");
		await step("render", async () => {
			expect(select).toBeInTheDocument();
		});
		await step("option selection", async () => {
			userEvent.click(select);
			const menu = await canvas.findByRole("menu");
			expect(menu).toBeVisible();
			const option = await canvas.findByRole("cell-2");
			userEvent.click(option);
		});
		await step("menu hide when click outside", async () => {
			userEvent.click(select);
			const menu = await canvas.findByRole("menu");
			expect(menu).toBeVisible();
			userEvent.click(document.body);
		});
	},
};

export const DefaultWithIcons: Story = {
	args: {
		options: [
			{
				label: "Option 1",
				icon: <Dog width={20} height={20} />,
			},
			{
				label: "Option 2",
				icon: <Cat width={20} height={20} />,
			},
			{
				label: "Option 3",
				icon: <Cake width={20} height={20} />,
			},
			{
				label: "Option 4",
				icon: <Calendar width={20} height={20} />,
			},
		],
	},
	play: async ({ canvasElement }: any) => {
		const canvas = within(canvasElement);
		canvas.getByRole("select");
	},
};
