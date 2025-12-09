import type { Meta, StoryObj } from "@storybook/nextjs";
import Label from "./Dropdown";
import { within, expect } from "storybook/test";
import { action } from "storybook/actions";

import { Goal, Flag, FlagOff, Flame } from "lucide-react";
import Color from "@constants/Color";

const meta: Meta<typeof Label> = {
	title: "Components/Dropdown",
	component: Label,
	tags: ["autodocs"],
	args: {
		id: "dropdown",
		placeholder: "Placeholder",
		options: [
			{
				id: "option1",
				title: "Option 1",
			},
			{
				id: "option2",
				title: "Option 2",
			},
			{
				id: "option3",
				title: "Option 3",
			},
			{
				id: "option4",
				title: "Option 4",
			},
		],
		onChange: action("onChange"),
		onSearchChange: action("onSearchChange"),
	},
};

export default meta;

type Story = StoryObj<typeof Label>;

export const Single: Story = {
	args: {
		type: "single",
	},
	play: async ({ canvasElement }: any) => {
		const canvas = within(canvasElement);
		const label = await canvas.getByRole("dropdown");
		expect(label).toBeInTheDocument();
	},
};

export const SingleWithIcons: Story = {
	args: {
		type: "single",
		options: [
			{
				id: "option1",
				title: "Option 1",
				icon: (
					<Goal height={20} width={20} color={Color.text.primary} />
				),
			},
			{
				id: "option2",
				title: "Option 2",
				icon: (
					<FlagOff
						height={20}
						width={20}
						color={Color.text.primary}
					/>
				),
			},
			{
				id: "option3",
				title: "Option 3",
				icon: (
					<Flag height={20} width={20} color={Color.text.primary} />
				),
			},
			{
				id: "option4",
				title: "Option 4",
				icon: (
					<Flame height={20} width={20} color={Color.text.primary} />
				),
			},
		],
	},
	play: async ({ canvasElement }: any) => {
		const canvas = within(canvasElement);
		const label = await canvas.getByRole("dropdown");
		expect(label).toBeInTheDocument();
	},
};

export const Multiple: Story = {
	args: {
		type: "multiple",
	},
	play: async ({ canvasElement }: any) => {
		const canvas = within(canvasElement);
		const label = await canvas.getByRole("dropdown");
		expect(label).toBeInTheDocument();
	},
};

export const MultipleWithIcons: Story = {
	args: {
		type: "multiple",
		options: [
			{
				id: "option1",
				title: "Option 1",
				icon: (
					<Goal height={20} width={20} color={Color.text.primary} />
				),
			},
			{
				id: "option2",
				title: "Option 2",
				icon: (
					<FlagOff
						height={20}
						width={20}
						color={Color.text.primary}
					/>
				),
			},
			{
				id: "option3",
				title: "Option 3",
				icon: (
					<Flag height={20} width={20} color={Color.text.primary} />
				),
			},
			{
				id: "option4",
				title: "Option 4",
				icon: (
					<Flame height={20} width={20} color={Color.text.primary} />
				),
			},
		],
	},
	play: async ({ canvasElement }: any) => {
		const canvas = within(canvasElement);
		const label = await canvas.getByRole("dropdown");
		expect(label).toBeInTheDocument();
	},
};
