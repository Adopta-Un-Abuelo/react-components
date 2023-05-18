import Text from '../components/Text/Text';
import { within } from '@storybook/testing-library';

export default {
	title: 'Design System/Text',
	component: Text,
	tags: ['autodocs']
};

export const Paragraph = {
	args: {
		children: 'Text',
        type: 'p'
	},
	play: async ({canvasElement}) =>{
		const canvas = within(canvasElement);
		canvas.getByTestId('paragraph');
	}
};

export const Header = {
	args: {
		children: 'Header',
        type: 'h1'
	},
	play: async ({canvasElement}) =>{
		const canvas = within(canvasElement);
		canvas.getByTestId('header');
	}
};
