import type { Meta, StoryObj } from "@storybook/nextjs";
import Input from "./Input";
import { userEvent, within, expect, fn } from "storybook/test";

import { Flag } from "lucide-react";

const meta: Meta<typeof Input> = {
	title: "Input/Basic",
	component: Input,
	tags: ["autodocs"],
	args: {
		placeholder: "Placeholder",
		defaultValue: "Default value",
		onChange: fn(),
	},
	argTypes: {
		design: {
			control: "select",
			options: ["primary", "secondary", "third"],
		},
		type: {
			control: "select",
			options: ["text", "email", "password", "time", "number"],
		},
		disabled: {
			control: "boolean",
		},
	},
};

export default meta;
type Story = StoryObj<typeof Input>;

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
		await step("typing", async () => {
			userEvent.type(input, " example", { delay: 100 });
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
		await step("render", async () => {
			expect(input).toBeInTheDocument();
		});
		await step("typing", async () => {
			//userEvent.type(input, " example", { delay: 100 });
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
		await step("typing", async () => {
			userEvent.type(input, " example", { delay: 100 });
		});
	},
};

export const WithError: Story = {
	args: {
		design: "secondary",
		error: "Error message",
	},
	play: async ({ canvasElement, step }: any) => {
		const canvas = within(canvasElement);
		const input = canvas.getByRole("input");
		const error = canvas.getByRole("error");
		await step("render", async () => {
			expect(input).toBeInTheDocument();
			expect(error).toBeInTheDocument();
		});
	},
};

export const WithLeftContent: Story = {
	args: {
		design: "secondary",
		LeftContent: (
			<Flag
				role="icon"
				width={20}
				height={20}
				style={{ marginRight: 8 }}
			/>
		),
	},
	play: async ({ canvasElement, step }: any) => {
		const canvas = within(canvasElement);
		const input = canvas.getByRole("input");
		const placeholder = canvas.getByRole("placeholder");
		const icon = canvas.getByRole("icon");
		await step("render", async () => {
			expect(input).toBeInTheDocument();
			expect(placeholder).toBeInTheDocument();
			expect(icon).toBeInTheDocument();
		});
		await step("typing", async () => {
			userEvent.type(input, "example", { delay: 100 });
		});
	},
};


export const Text: Story = {
	args: {
		type: "text",
		design: "secondary",
	},
	play: async ({ canvasElement, step }: any) => {
		const canvas = within(canvasElement);
		const input = canvas.getByRole("input");
		await step("render", async () => {
			expect(input).toBeInTheDocument();
		});
		await step("typing", async () => {
			userEvent.type(input, " example", { delay: 100 });
		});
	},
};

export const Email: Story = {
	args: {
		type: "email",
		design: "secondary",
		defaultValue: undefined,
	},
	play: async ({ canvasElement, step }: any) => {
		const canvas = within(canvasElement);
		const input = canvas.getByRole("input");
		await step("render", async () => {
			expect(input).toBeInTheDocument();
		});
		await step("typing", async () => {
			userEvent.type(input, "prueba@prueba.es", { delay: 100 });
		});
	},
};

export const Password: Story = {
	args: {
		type: "password",
		design: "secondary",
		defaultValue: undefined,
	},
	play: async ({ canvasElement, step }: any) => {
		const canvas = within(canvasElement);
		const input = canvas.getByRole("input");
		await step("render", async () => {
			expect(input).toBeInTheDocument();
		});
		await step("typing", async () => {
			userEvent.type(input, "prueba", { delay: 100 });
		});
	},
};

export const Date: Story = {
	args: {
		type: "date",
		design: "secondary",
		defaultValue: undefined,
	},
	play: async ({ canvasElement, step }: any) => {
		const canvas = within(canvasElement);
		const input = canvas.getByRole("input");
		await step("render", async () => {
			expect(input).toBeInTheDocument();
		});
	},
};


export const Time: Story = {
	args: {
		type: "time",
		design: "secondary",
		defaultValue: undefined,
	},
	play: async ({ canvasElement, step }: any) => {
		const canvas = within(canvasElement);
		const input = canvas.getByRole("input");
		await step("render", async () => {
			expect(input).toBeInTheDocument();
		});
		await step("typing", async () => {
			userEvent.type(input, "10:30", { delay: 100 });
		});
	},
};

export const Number: Story = {
	args: {
		type: "number",
		design: "secondary",
		defaultValue: undefined,
	},
	play: async ({ canvasElement, step }: any) => {
		const canvas = within(canvasElement);
		const input = canvas.getByRole("input");
		await step("render", async () => {
			expect(input).toBeInTheDocument();
		});
		await step("typing", async () => {
			userEvent.type(input, "27", { delay: 100 });
		});
	},
};