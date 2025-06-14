import type { Meta, StoryObj } from "@storybook/nextjs";
import { useState } from "react";
import { userEvent, within, expect } from "storybook/test";
import { action } from "storybook/actions";

import Feedback from "./Feedback";
import { Building, X } from "lucide-react";

const meta: Meta<typeof Feedback> = {
	title: "Components/Feedback",
	component: Feedback,
	tags: ["autodocs"],
	args: {
		isVisible: false,
		type: "success",
		text: "Test text",
		onClose: action("onClose"),
	},
	argTypes: {
		isVisible: {
			control: "boolean",
			description: "Visibility of the feedback component",
			table: {
				defaultValue: { summary: "false" },
			},
		},
		type: {
			control: "select",
			description: "Type of feedback",
			options: ["success", "error", "custom"],
			table: {
				defaultValue: { summary: "success" },
			},
		},
		text: {
			control: "text",
			description: "Text to display in the feedback component",
		},
		onClose: {
			action: "onClose",
			description: "Callback when the feedback component is closed",
		},
	},
};

export default meta;
type Story = StoryObj<typeof Feedback>;

export const Success: Story = (args: any) => {
	const [isVisible, setIsVisible] = useState(false);
	return (
		<div>
			<button role="button" onClick={() => setIsVisible(true)}>
				Show feedback modal
			</button>
			<Feedback
				{...args}
				isVisible={isVisible}
				onClose={() => {
					setIsVisible(false);
					action("onClose")();
				}}
			/>
		</div>
	);
};
Success.play = async ({ canvasElement, step }: any) => {
	const canvas = within(canvasElement);
	await step("Click button to show Feedback modal", async () => {
		const button = await canvas.getByRole("button");
		await userEvent.click(button);
		const feedback = await canvas.findByRole("feedback");
		expect(feedback).toBeInTheDocument();
	});
};

export const Error: Story = (args: any) => {
	const [isVisible, setIsVisible] = useState(false);
	return (
		<div>
			<button role="button" onClick={() => setIsVisible(true)}>
				Show feedback modal
			</button>
			<Feedback
				{...args}
				isVisible={isVisible}
				onClose={() => {
					setIsVisible(false);
					action("onClose")();
				}}
			/>
		</div>
	);
};
Error.args = {
	type: "error",
};
Error.play = async ({ canvasElement, step }: any) => {
	const canvas = within(canvasElement);
	await step("Click button to show Feedback modal", async () => {
		const button = await canvas.getByRole("button");
		await userEvent.click(button);
		const feedback = await canvas.findByRole("feedback");
		expect(feedback).toBeInTheDocument();
	});
};

export const Custom: Story = (args: any) => {
	const [isVisible, setIsVisible] = useState(false);
	return (
		<div>
			<button role="button" onClick={() => setIsVisible(true)}>
				Show feedback modal
			</button>
			<Feedback
				{...args}
				isVisible={isVisible}
				showClose={true}
				onClose={() => {
					setIsVisible(false);
					action("onClose")();
				}}
			/>
		</div>
	);
};
Custom.args = {
	type: "custom",
	closeAfter: 20000,
	icon: <Building color={"rgba(255, 255, 255, 0.56)"}/>,
	style: {
		borderRadius: 12,
		background: "linear-gradient(72deg, #5963F6 0%, #CD59F6 100%)"
	}
}
