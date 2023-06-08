import Label from './Label';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

export default {
	title: 'Components/Label',
	component: Label,
	tags: ['autodocs'],
    args: {
        text: 'done'
    }
};

export const Default = {
	args: {
		type: 'label'
	},
	play: async ({canvasElement}: any) =>{
		const canvas = within(canvasElement);
		const label = await canvas.getByRole('label');
        expect(label).toBeInTheDocument();
	}
};

export const Chip = {
	args: {
		type: 'chip'
	},
	play: async ({canvasElement}: any) =>{
		const canvas = within(canvasElement);
		const label = await canvas.getByRole('label');
        expect(label).toBeInTheDocument();
	}
};
