import type { Meta, StoryObj } from "@storybook/react";
import Input from "./Input";
import { userEvent, within, expect, fn } from "@storybook/test";

import { Flag, Search, Clock, icons, Gift } from "lucide-react";

const meta: Meta<typeof Input> = {
	title: "Components/Input",
	component: Input,
	tags: ["autodocs"],
	args: {
		placeholder: "Placeholder",
		defaultValue: "Default value",
		onChange: fn(),
	},
	argTypes: {
		design: {
			table: {
				defaultValue: { summary: "primary" },
			},
			control: "select",
			options: ["primary", "secondary", "third"],
		},
		hideCalendar: {
			table: {
				defaultValue: { summary: "false" },
			},
			control: "boolean",
		},
		type: {
			table: {
				defaultValue: { summary: "text" },
			},
			control: "select",
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

export const PrimaryWithIcon: Story = {
	args: {
		design: "primary",
		icon: <Flag role="icon" width={20} height={20} />,
	},
	play: async ({ canvasElement, step }: any) => {
		const canvas = within(canvasElement);
		const input = canvas.getByRole("input");
		const icon = canvas.getByRole("icon");
		await step("render", async () => {
			expect(input).toBeInTheDocument();
			expect(icon).toBeInTheDocument();
		});
		await step("typing", async () => {
			userEvent.type(input, " example", { delay: 100 });
		});
	},
};

export const PrimaryWithError: Story = {
	args: {
		design: "primary",
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
		const placeholder = canvas.getByRole("placeholder");
		await step("render", async () => {
			expect(input).toBeInTheDocument();
			expect(placeholder).toBeInTheDocument();
		});
		await step("typing", async () => {
			userEvent.type(input, " example", { delay: 100 });
		});
	},
};

export const SecondaryWithIcon: Story = {
	args: {
		design: "secondary",

		icon: <Flag role="icon" width={20} height={20} />,
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
			userEvent.type(input, " example", { delay: 100 });
		});
	},
};

export const SecondaryWithError: Story = {
	args: {
		design: "secondary",
		error: "Error message",
	},
	play: async ({ canvasElement, step }: any) => {
		const canvas = within(canvasElement);
		const input = canvas.getByRole("input");
		const placeholder = canvas.getByRole("placeholder");
		const error = canvas.getByRole("error");
		await step("render", async () => {
			expect(input).toBeInTheDocument();
			expect(placeholder).toBeInTheDocument();
			expect(error).toBeInTheDocument();
		});
		await step("typing", async () => {
			userEvent.type(input, " example", { delay: 100 });
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

export const ThirdWithIcon: Story = {
	args: {
		design: "third",

		icon: <Flag role="icon" width={20} height={20} />,
	},
	play: async ({ canvasElement, step }: any) => {
		const canvas = within(canvasElement);
		const input = canvas.getByRole("input");
		const icon = canvas.getByRole("icon");
		await step("render", async () => {
			expect(input).toBeInTheDocument();
			expect(icon).toBeInTheDocument();
		});
		await step("typing", async () => {
			userEvent.type(input, " example", { delay: 100 });
		});
	},
};

export const ThirdWithError: Story = {
	args: {
		design: "third",
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
		await step("typing", async () => {
			userEvent.type(input, " example", { delay: 100 });
		});
	},
};

export const InputTime: Story = {
	args: {
		design: "secondary",
		type: "time",
		defaultValue: "10:00",
	},
	play: async ({ canvasElement, step }: any) => {
		const canvas = within(canvasElement);
		const input = canvas.getByRole("input");
		const placeholder = canvas.getByRole("placeholder");
		await step("render", async () => {
			expect(input).toBeInTheDocument();
			expect(placeholder).toBeInTheDocument();
		});
		await step("typing", async () => {
			userEvent.type(input, " example", { delay: 100 });
		});
	},
};

export const InputNumber: Story = {
	args: {
		design: "secondary",
		type: "number",
		defaultValue: 20,
	},
	play: async ({ canvasElement, step }: any) => {
		const canvas = within(canvasElement);
		const input = canvas.getByRole("input");
		const placeholder = canvas.getByRole("placeholder");
		await step("render", async () => {
			expect(input).toBeInTheDocument();
			expect(placeholder).toBeInTheDocument();
		});
		await step("typing", async () => {
			userEvent.type(input, "23", { delay: 100 });
		});
	},
};

export const InputTelephone: Story = {
	args: {
		design: "secondary",
		type: "tel",
		defaultValue: "912345678",
		country: "+34",
		countryOptions: [
			{
				id: "spain",
				esCountry: "España",
				enCountry: "Spain",
				prefix: "+34",
				countryCode: "ES",
				sepa: true,
			},
			{
				id: "france",
				esCountry: "Francia",
				enCountry: "France",
				prefix: "+33",
				countryCode: "FR",
				sepa: true,
			},
			{
				id: "eeuu",
				esCountry: "Estados Unidos",
				enCountry: "EEUU",
				prefix: "+1",
				countryCode: "US",
				sepa: false,
			},
			{
				id: "uk",
				esCountry: "Reino Unido",
				enCountry: "United Kingdom",
				prefix: "+44",
				countryCode: "GB",
				sepa: true,
			},
			{
				id: "portugal",
				esCountry: "Portugal",
				enCountry: "Portugal",
				prefix: "+351",
				countryCode: "PT",
				sepa: true,
			},
		],
		onPhoneChange: fn(),
	},
	// play: async ({ canvasElement, step }: any) => {
	// 	const canvas = within(canvasElement);
	// 	const input = canvas.getByRole("input");
	// 	const placeholder = canvas.getByRole("placeholder");
	// 	await step("render", async () => {
	// 		expect(input).toBeInTheDocument();
	// 		expect(placeholder).toBeInTheDocument();
	// 	});
	// 	await step("country selection", async () => {
	// 		const select = canvas.getByRole("select");
	// 		userEvent.click(select);
	// 		const menu = await canvas.findByRole("menu");
	// 		expect(menu).toBeVisible();
	// 		const option = await canvas.findByRole("country17");
	// 		userEvent.click(option);
	// 	});
	// 	await step("typing", async () => {
	// 		userEvent.type(input, "912345678", { delay: 100 });
	// 	});
	// },
};

export const InputEmail: Story = {
	args: {
		design: "secondary",
		type: "email",
		defaultValue: undefined,
	},
	play: async ({ canvasElement, step }: any) => {
		const canvas = within(canvasElement);
		const input = canvas.getByRole("input");
		const placeholder = canvas.getByRole("placeholder");
		await step("render", async () => {
			expect(input).toBeInTheDocument();
			expect(placeholder).toBeInTheDocument();
		});
		await step("typing", async () => {
			userEvent.type(input, "test@test.com", { delay: 100 });
		});
	},
};

export const InputDate: Story = {
	args: {
		design: "secondary",
		type: "date",
		defaultValue: undefined
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

export const InputDateWithCalendar: Story = {
	args: {
		design: "secondary",
		type: "date",
		defaultValue: undefined,
	},
	play: async ({ canvasElement, step }: any) => {
		const canvas = within(canvasElement);
		const input = canvas.getByRole("input");
		const placeholder = canvas.getByRole("placeholder");
		await step("render", async () => {
			expect(input).toBeInTheDocument();
			expect(placeholder).toBeInTheDocument();
		});
		await step("typing", async () => {
			userEvent.type(input, "23052023", { delay: 100 });
		});
	},
};

export const InputPassword: Story = {
	args: {
		design: "secondary",
		type: "password",
		defaultValue: undefined,
	},
	play: async ({ canvasElement, step }: any) => {
		const canvas = within(canvasElement);
		const input = canvas.getByRole("input");
		const placeholder = canvas.getByRole("placeholder");
		await step("render", async () => {
			expect(input).toBeInTheDocument();
			expect(placeholder).toBeInTheDocument();
		});
		await step("typing", async () => {
			userEvent.type(input, "password", { delay: 100 });
		});
	},
};

export const InputRange: Story = {
	args: {
		type: "range",
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
export const InputRangeWithoutRangeView: Story = {
	args: {
		type: "range",
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

export const InputRangeWithPresents: Story = {
	args: {
		type: "range",
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

export const InputLocation: Story = {
	args: {
		design: "secondary",
		type: "location",
		icon: <Search role="icon" />,
		defaultValue: "HoLA",
	},
	play: async ({ canvasElement, step }: any) => {
		/*const canvas = within(canvasElement);
		const input = await canvas.findByRole('combobox');
        const placeholder = canvas.getByRole('placeholder');
        await step('render', async () =>{
            expect(input).toBeInTheDocument();
            expect(placeholder).toBeInTheDocument();
        });
        await step('typing', async () =>{
            await userEvent.type(input, 'calle Alcalá', { delay: 100 });
        });
        await step('select address option', async () =>{
            await new Promise((resolve) => setTimeout(resolve, 500));
            const menu = await canvas.findByRole('menu');
            expect(menu).toBeVisible();
            await new Promise((resolve) => setTimeout(resolve, 500));
            const cell = await canvas.findByRole('cell2');
            userEvent.click(cell);
        });*/
	},
};

export const InputDateRange: Story = {
	args: {
		design: "secondary",
		type: "range-date",
	},
};

export const InputImage: Story = {
	args: {
		design: "secondary",
		type: "image",
		options: ["camera", "library"],
	},
	play: async ({ canvasElement, step }: any) => {
		const canvas = within(canvasElement);
		const button = canvas.getByRole("button");
		await step("render", async () => {
			expect(button).toBeInTheDocument();
		});
	},
};

export const InputChat: Story = {
	args: {
		type: "chat",
	},
};

export const InputChatWithOptions: Story = {
	args: {
		type: "chat",
		options: [
			{
				id: "reminder",
				label: "Crear recordatorio",
				icon: <Clock />,
			},
		],
	},
};

export const InputCode: Story = {
	args: {
		design: "secondary",
		type: "code",
	},
	play: async ({ canvasElement, step }: any) => {
		const canvas = within(canvasElement);
		const input = canvas.getByRole("input");
		await step("render", async () => {
			expect(input).toBeInTheDocument();
		});
		await step("typing", async () => {
			userEvent.type(input, "000000", { delay: 200 });
		});
	},
};
