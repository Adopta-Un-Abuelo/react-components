import Payout, { PayoutRef } from "./Payout";
import type { Meta, StoryObj } from "@storybook/nextjs";
import { useRef } from "react";

const meta: Meta<typeof Payout> = {
	title: "Components/Payout",
	component: Payout,
	tags: ["autodocs"],
	args: {
		stripeKey: process.env.STRIPE_KEY,
	}
};

export default meta;
type Story = StoryObj<typeof Payout>;

export const CardPrimary: Story = {
	args: {
		paymentOption: "card",
		design: "primary",
	},
	/*play: async ({canvasElement, step}: any) =>{
        const canvas = within(canvasElement);
		const container = await canvas.getByRole('container');
        await step('render', async () =>{
            expect(container).toBeInTheDocument();
        });
	}*/
};

export const CardSecondary: Story = {
	args: {
		paymentOption: "card",
		design: "secondary",
	},
};

export const IBANPrimary: Story = (args: any) => {
	const payout = useRef<PayoutRef>(null);
	return (
		<div>
			<Payout {...args} ref={payout} />
			<button
				role="button"
				onClick={async () => {
					const result = await payout.current?.getPaymentMethod();
					console.log(result);
				}}
			>
				Get IBAN
			</button>
		</div>
	);
};
IBANPrimary.args = {
	paymentOption: "sepa_debit",
	design: "primary",
};

export const IBANSecondary: Story = {
	args: {
		paymentOption: "sepa_debit",
		design: "secondary",
	},
};
