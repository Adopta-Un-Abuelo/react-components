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
	play: async ({canvasElement}: any) =>{
		const canvas = within(canvasElement);
		const label = await canvas.getByRole('label');
        expect(label).toBeInTheDocument();
	}
};
