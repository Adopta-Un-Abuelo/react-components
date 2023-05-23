import SearchBar from '../components/SearchBar/SearchBar';
import { within } from '@storybook/testing-library';

export default {
	title: 'Design System/SearchBar',
	component: SearchBar,
	tags: ['autodocs'],
	argTypes:{
		design: {
            table: {
                defaultValue: { summary: 'primary' }
            },
            control: 'select'
        },
        type: {
            table: {
                defaultValue: { summary: 'small' }
            },
            control: 'select'
        }
	}
};

export const Default = {
	play: async ({canvasElement}: any) =>{
		const canvas = within(canvasElement);
		canvas.getByTestId('search-bar');
	}
};
