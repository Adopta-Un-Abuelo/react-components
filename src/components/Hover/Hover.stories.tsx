import Hover from "./Hover";
import type { Meta, StoryObj } from "@storybook/nextjs";
import { Info } from "lucide-react";
import Text from "../Text/Text";

const meta: Meta<typeof Hover> = {
	title: "Components/Hover",
	component: Hover,
	tags: ["autodocs"],
	args: {
		children: <Info style={{ cursor: "pointer" }} />,
		modalProps: {
			children: <Text type="p">Hover Modal</Text>,
		},
	},
};
export default meta;
type Story = StoryObj<typeof Hover>;

export const Default: Story = {};
