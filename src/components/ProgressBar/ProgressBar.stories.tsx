import ProgressBar from "./ProgressBar";
import { within, expect } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/nextjs";

const meta: Meta<typeof ProgressBar> = {
	title: "Components/ProgressBar",
	component: ProgressBar,
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ProgressBar>;

export const Default: Story = {
	args: {
		progress: 40,
		minValue: 0,
		maxValue: 100,
		style: { height: 6 },
	},
	render: (args) => {
		return (
			<div style={{ marginTop: 24 }}>
				<ProgressBar {...args} />
			</div>
		);
	},
	play: async ({ canvasElement }: any) => {
		const canvas = within(canvasElement);
		const progressBar = await canvas.getByRole("progress-bar");
		expect(progressBar).toBeInTheDocument();
	},
};

export const Multiple: Story = {
	args: {
		progress: [
			{
				value: 85,
				color: "linear-gradient(90deg, #006BE5 0%, #004FA8 100%)",
			},
			{
				value: 10,
				color: "linear-gradient(270deg, #FFAA47 -0.16%, #F9713D 99.84%)",
			},
			{
				value: 5,
				color: "#828282",
			},
		],
	},
	render: (args) => {
		return (
			<div style={{ marginTop: 24 }}>
				<ProgressBar {...args} />
			</div>
		);
	},
	play: async ({ canvasElement }: any) => {
		const canvas = within(canvasElement);
		canvas.getByRole("progress-bar");
		const progressBar = await canvas.getByRole("progress-bar");
		expect(progressBar).toBeInTheDocument();
	},
};
