import type { Meta, StoryObj } from "@storybook/nextjs";
import InputPrice from "./InputPrice";
import { fn } from "storybook/test";
import Text from "../../Text/Text";

const meta: Meta<typeof InputPrice> = {
	title: "Input/Price",
	component: InputPrice,
	tags: ["autodocs"],
	args: {
		options: [{ price: 9 }, { price: 15 }, { price: 20 }],
		currency: "€",
		defaultOption: 15,
		label: "Nos ayudas a cumplir el sueño de {{value}} abuelos",
		labelValueConversion: 0.2,
		onChange: fn(),
	},
};

export default meta;
type Story = StoryObj<typeof InputPrice>;

export const Default: Story = {};
export const HideCustomAmount: Story = { args: { hideCustomAmount: true } };
export const WithData: Story = {
	args: {
		style: { flexDirection: "row" },
		options: [
			{
				price: 9,
				data: [
					{
						title: "Financias la campaña Una Carta Para Un Abuelo",
						icon: "Mail",
					},
					{
						title: "Nos ayudas a acompañar a 3 personas mayores",
						icon: "Heart",
					},
				],
			},
			{
				price: 15,
				data: [
					{
						title: "Financias la campaña Una Carta Para Un Abuelo",
						icon: "Mail",
					},
					{
						title: "Nos ayudas a acompañar a 3 personas mayores",
						icon: "Heart",
					},
					{
						title: "Podemos celebrar el cumpleaños de 2 personas mayores",
						icon: "Cake",
					},
				],
			},
			{
				price: 20,
				data: [
					{
						title: "Financias la campaña Una Carta Para Un Abuelo",
						icon: "Mail",
					},
					{
						title: "Nos ayudas a acompañar a 3 personas mayores",
						icon: "Heart",
					},
					{
						title: "Podemos celebrar el cumpleaños de 2 personas mayores",
						icon: "Cake",
					},
					{
						title: "Podemos cumplir el sueño de una persona mayor",
						icon: "Rocket",
					},
				],
			},
		],
		customAmountData: (
			<Text type="c1">
				Si quieres, puedes colaborar con una cantidad mayor y que
				podamos hacer muchas más cosas. Añade la cantidad que prefieras.
			</Text>
		),
	},
};
