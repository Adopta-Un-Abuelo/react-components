import Select from './Select';
import { userEvent, within } from '@storybook/testing-library';
import { action } from '@storybook/addon-actions';
import { expect } from '@storybook/jest';

import { Dog, Cat, Cake, Calendar } from 'lucide-react';

export default {
	title: 'Components/Select',
	component: Select,
	tags: ['autodocs'],
    args: {
        id: 'select',
        options: [
            {
                label: 'Option 1'
            },
            {
                label: 'Option 2'
            },
            {
                label: 'Option 3'
            },
            {
                label: 'Option 4'
            }
        ],
        onChange: action('onChange')
    }
};

export const Default = {
	play: async ({canvasElement, step}: any) =>{
        const canvas = within(canvasElement);
		const select = await canvas.getByRole('select');
        await step('render', async () =>{
            expect(select).toBeInTheDocument();
        });
        await step('option selection', async () =>{
            userEvent.click(select);
            const menu = await canvas.findByRole('menu');
            expect(menu).toBeVisible();
            const option = await canvas.findByRole('cell-2');
            userEvent.click(option);
        });
        await step('menu hide when click outside', async () =>{
            userEvent.click(select);
            const menu = await canvas.findByRole('menu');
            expect(menu).toBeVisible();
            userEvent.click(document.body)
            const menu2 = await canvas.findByRole('menu');
            expect(menu2).not.toBeVisible();
        });
	}
};

export const DefaultWithIcons = {
    args: {
        options: [
            {
                label: 'Option 1',
                icon: <Dog width={20} height={20}/>
            },
            {
                label: 'Option 2',
                icon: <Cat width={20} height={20}/>
            },
            {
                label: 'Option 3',
                icon: <Cake width={20} height={20}/>
            },
            {
                label: 'Option 4',
                icon: <Calendar width={20} height={20}/>
            }
        ],
    },
	play: async ({canvasElement}: any) =>{
		const canvas = within(canvasElement);
		canvas.getByRole('select');
	}
};
