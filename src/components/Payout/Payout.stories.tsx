import Payout from './Payout';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

export default {
	title: 'Components/Payout',
	component: Payout,
	tags: ['autodocs']
};

export const CardPrimary = {
    args: {
        paymentOption: 'card',
        design: 'primary'
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
        paymentOption: 'card',
        design: 'secondary'
    }
};

export const IBANPrimary = {
    args: {
        paymentOption: 'sepa_debit',
        design: 'primary'
    }
};

export const IBANSecondary = {
    args: {
        paymentOption: 'sepa_debit',
        design: 'secondary'
    }
};
