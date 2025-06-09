import type { Meta, StoryObj } from "@storybook/nextjs";
import CurrencySelector from "./CurrencySelector";
import { fn } from "storybook/test";

const meta: Meta<typeof CurrencySelector> = {
	title: "Components/CurrencySelector",
	component: CurrencySelector,
	tags: ["autodocs"],
	args: {
		options: [
			{ currency: "USD", name: "Dolar americano", symbol: "$" },
			{ currency: "EUR", name: "Euro", symbol: "€" },
			{ currency: "GBP", name: "Libra esterlina", symbol: "£" },
			{ currency: "JPY", name: "Yen japonés", symbol: "¥" },
			{ currency: "AUD", name: "Dólar australiano", symbol: "A$" },
		],
		onChange: fn(),
	},
};

export default meta;

type Story = StoryObj<typeof CurrencySelector>;

export const Default: Story = {
	args: {},
	play: async ({ canvasElement }: any) => {
		/*const canvas = within(canvasElement);
		const label = await canvas.getByRole('dropdown');
        expect(label).toBeInTheDocument();*/
	},
};
