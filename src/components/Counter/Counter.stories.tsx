import Counter from './Counter';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { action } from '@storybook/addon-actions';

import { Goal, Flag, FlagOff, Flame } from 'lucide-react';
import Color from '../../constants/Color';

export default {
	title: 'Components/Counter',
	component: Counter,
	tags: ['autodocs'],
    args: {
        amount: 217
    }
};

export const Default = {
    args: {
        
    },
	play: async ({canvasElement}: any) =>{
		/*const canvas = within(canvasElement);
		const label = await canvas.getByRole('dropdown');
        expect(label).toBeInTheDocument();*/
	}
};
