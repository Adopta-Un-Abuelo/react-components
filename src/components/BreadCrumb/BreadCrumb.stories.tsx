import BreadCrumb from './BreadCrumb';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

export default {
	title: 'Components/BreadCrumb',
	component: BreadCrumb,
	tags: ['autodocs'],
	argTypes:{
		steps: {
            type: {
                required: true,
            },
            table: {
                defaultValue: { summary: 1 }
            },
            control: 'number'
        },
	}
};

export const Default = {
	args: {
		selectedStep: 3,
		steps: 8,
	},
	play: async ({canvasElement}: any) =>{
		const canvas = within(canvasElement);
		const component = await canvas.getByRole('bread-crumb');
		await expect(component).toBeInTheDocument();
	}
};
