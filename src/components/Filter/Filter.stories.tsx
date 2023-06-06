import Filter from './Filter';
import { userEvent, within } from '@storybook/testing-library';
import { action } from '@storybook/addon-actions';
import { expect } from '@storybook/jest';

import { Flag } from 'lucide-react';

export default {
	title: 'Components/Filter',
	component: Filter,
	tags: ['autodocs'],
    args: {
        defaultValue: 'Default value',
        onChange: action('onChange')
    }
};

export const Single = {
    args: {
        design: 'single'
    },
	play: async ({canvasElement, step}: any) =>{
		const canvas = within(canvasElement);
		const input = canvas.getByRole('input');
        await step('render', async () =>{
            expect(input).toBeInTheDocument();
        });
        await step('typing', async () =>{
            userEvent.type(input, ' example', { delay: 100 });
        });
	}
};