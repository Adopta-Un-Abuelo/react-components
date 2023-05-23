import Select from '../components/Select/Select';
import { within } from '@storybook/testing-library';
import { action } from '@storybook/addon-actions';

import { Dog, Cat, Cake, Calendar } from 'lucide-react';

export default {
	title: 'Design System/Select',
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
	play: async ({canvasElement}: any) =>{
		const canvas = within(canvasElement);
		canvas.getByTestId('select');
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
		canvas.getByTestId('select');
	}
};
