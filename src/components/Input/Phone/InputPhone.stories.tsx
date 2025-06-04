import type { Meta, StoryObj } from "@storybook/nextjs";
import InputPhone from "./InputPhone";
import { fn } from "storybook/test";

const meta: Meta<typeof InputPhone> = {
	title: "Input/Phone",
	component: InputPhone,
	tags: ["autodocs"],
	args: {
        placeholder: "Placeholder",
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
	argTypes: {
		design: {
			table: {
				defaultValue: { summary: "primary" },
			},
			control: "select",
			options: ["primary", "secondary", "third"],
		},
	},
};

export default meta;
type Story = StoryObj<typeof InputPhone>;

export const Primary: Story = {
	args: {
		design: "primary",
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

export const Secondary: Story = {
	args: {
		design: "secondary",
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

export const Third: Story = {
	args: {
		design: "third",
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
