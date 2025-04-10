import type { Meta, StoryObj } from "@storybook/react";
import InputBirthday from "./InputBirthday";
import { fn } from "@storybook/test";

const meta: Meta<typeof InputBirthday> = {
	title: "Input/Birthday",
	component: InputBirthday,
	tags: ["autodocs"],
	args: {
		placeholder: "Placeholder",
		onChange: fn(),
	},
};

export default meta;
type Story = StoryObj<typeof InputBirthday>;

export const Default: Story = {
    args: {
       
    },
};