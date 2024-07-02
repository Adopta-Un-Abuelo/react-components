import Payout, { PayoutRef } from "./Payout";
import { useRef } from "react";

export default {
  title: "Components/Payout",
  component: Payout,
  tags: ["autodocs"],
};

export const CardPrimary = {
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

export const CardSecondary = {
  args: {
    paymentOption: "card",
    design: "secondary",
  },
};

export const IBANPrimary = (args: any) => {
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

export const IBANSecondary = {
  args: {
    paymentOption: "sepa_debit",
    design: "secondary",
  },
};
