import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within, fn } from "@storybook/test";

import Button from "./Button";
import { Flag } from "lucide-react";

const meta: Meta<typeof Button> = {
	title: "Components/Button",
	component: Button,
	tags: ["autodocs"],
	args: {
		size: "normal",
		loading: false,
		disabled: false,
		children: <p role="label">Button label</p>,
		onSuccess: fn(),
		onClick: fn(),
	},
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
	args: {
		design: "primary",
		success: false,
	},
	play: async ({ canvasElement, step }: any) => {
		const canvas = within(canvasElement);
		const button = await canvas.getByRole("button");
		await step("render", async () => {
			expect(button).toBeInTheDocument();
		});
		await step("hover and click", async () => {
			await userEvent.hover(button);
			await userEvent.click(button);
		});
	},
};

export const PrimaryWithIcon: Story = {
	args: {
		design: "primary",
		success: false,
		icon: <Flag role="icon" height={20} width={20} />,
	},
	play: async ({ canvasElement, step }: any) => {
		const canvas = within(canvasElement);
		const button = await canvas.getByRole("button");
		const icon = await canvas.getByRole("icon");
		await step("render", async () => {
			expect(button).toBeInTheDocument();
			expect(icon).toBeInTheDocument();
		});
		await step("hover and click", async () => {
			await userEvent.hover(button);
			await userEvent.click(button);
		});
	},
};

export const PrimaryWithCountdown: Story = {
	args: {
		design: "primary",
		success: false,
		countdown: 30,
		onCountdownEnd: fn(),
	},
	play: async ({ canvasElement, step }: any) => {
		const canvas = within(canvasElement);
		const button = await canvas.getByRole("button");
		await step("render", async () => {
			expect(button).toBeInTheDocument();
		});
		await step("hover and click", async () => {
			await userEvent.hover(button);
			await userEvent.click(button);
		});
	},
};

export const Secondary: Story = {
	args: {
		design: "secondary",
		success: false,
	},
	play: async ({ canvasElement, step }: any) => {
		const canvas = within(canvasElement);
		const button = await canvas.getByRole("button");
		await step("render", async () => {
			expect(button).toBeInTheDocument();
		});
		await step("hover and click", async () => {
			await userEvent.hover(button);
			await userEvent.click(button);
		});
	},
};

export const SecondaryWithIcon: Story = {
	args: {
		design: "secondary",
		success: false,
		icon: <Flag role="icon" height={20} width={20} />,
	},
	play: async ({ canvasElement, step }: any) => {
		const canvas = within(canvasElement);
		const button = await canvas.getByRole("button");
		const icon = await canvas.getByRole("icon");
		await step("render", async () => {
			expect(button).toBeInTheDocument();
			expect(icon).toBeInTheDocument();
		});
		await step("hover and click", async () => {
			await userEvent.hover(button);
			await userEvent.click(button);
		});
	},
};

export const ButtonText: Story = {
	args: {
		design: "text",
	},
	play: async ({ canvasElement, step }: any) => {
		const canvas = within(canvasElement);
		const button = await canvas.getByRole("button");
		await step("render", async () => {
			expect(button).toBeInTheDocument();
		});
		await step("hover and click", async () => {
			await userEvent.hover(button);
			await userEvent.click(button);
		});
	},
};

export const ButtonTextWithIcon: Story = {
	args: {
		design: "text",
		icon: <Flag role="icon" height={20} width={20} />,
	},
	play: async ({ canvasElement, step }: any) => {
		const canvas = within(canvasElement);
		const button = await canvas.getByRole("button");
		const icon = await canvas.getByRole("icon");
		await step("render", async () => {
			expect(button).toBeInTheDocument();
			expect(icon).toBeInTheDocument();
		});
		await step("hover and click", async () => {
			await userEvent.hover(button);
			await userEvent.click(button);
		});
	},
};

export const ButtonImage: Story = {
	args: {
		design: "image",
		icon: <Flag role="icon" height={20} width={20} />,
		children: undefined,
	},
	play: async ({ canvasElement, step }: any) => {
		const canvas = within(canvasElement);
		const button = await canvas.getByRole("button");
		const icon = await canvas.getByRole("icon");
		await step("render", async () => {
			expect(button).toBeInTheDocument();
			expect(icon).toBeInTheDocument();
		});
		await step("hover and click", async () => {
			await userEvent.hover(button);
			await userEvent.click(button);
		});
	},
};

export const ButtonImageWithLabel: Story = {
	args: {
		design: "image",
		icon: <Flag role="icon" height={20} width={20} />,
	},
	play: async ({ canvasElement, step }: any) => {
		const canvas = within(canvasElement);
		const button = await canvas.getByRole("button");
		const icon = await canvas.getByRole("icon");
		await step("render", async () => {
			expect(button).toBeInTheDocument();
			expect(icon).toBeInTheDocument();
		});
		await step("hover and click", async () => {
			await userEvent.hover(button);
			await userEvent.click(button);
		});
	},
};

export const CallToAction: Story = {
	args: {
		design: "call-to-action",
		children: <p role="label">Call To Action</p>,
	},
	play: async ({ canvasElement, step }: any) => {
		const canvas = within(canvasElement);
		const button = await canvas.getByRole("button");
		await step("render", async () => {
			expect(button).toBeInTheDocument();
		});
		await step("hover and click", async () => {
			await userEvent.hover(button);
			await userEvent.click(button);
		});
	},
};

export const CallToActionWithIcon: Story = {
	args: {
		design: "call-to-action",
		children: <p role="label">Call To Action</p>,
		icon: <Flag role="icon" />,
		iconPosition: "left",
	},
	play: async ({ canvasElement, step }: any) => {
		const canvas = within(canvasElement);
		const button = await canvas.getByRole("button");
		const icon = await canvas.getByRole("icon");
		await step("render", async () => {
			expect(button).toBeInTheDocument();
			expect(icon).toBeInTheDocument();
		});
		await step("hover and click", async () => {
			await userEvent.hover(button);
			await userEvent.click(button);
		});
	},
};
