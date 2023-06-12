import InputImage from './InputImage';
import { within } from '@storybook/testing-library';
import { action } from '@storybook/addon-actions';
import { expect } from '@storybook/jest';

export default {
	title: 'Components/InputImage',
	component: InputImage,
	tags: ['autodocs'],
    args: {
        label: 'Label',
        onChange: action('onChange')
    }
};

export const Default = {
	play: async ({canvasElement, step}: any) =>{
		const canvas = within(canvasElement);
		const button = canvas.getByRole('button');
        await step('render', async () =>{
            expect(button).toBeInTheDocument();
        });
	}
};
