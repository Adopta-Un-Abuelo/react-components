import BreadCrumb from '../components/BreadCrumb/BreadCrumb';
import { within } from '@storybook/testing-library';

export default {
	title: 'Design System/BreadCrumb',
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
		canvas.getByTestId('bread-crumb');
	}
};
