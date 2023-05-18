import Text from '../components/Text/Text';
import { within } from '@storybook/testing-library';

export default {
	title: 'Design System/Text',
	component: Text,
	tags: ['autodocs']
};

export const Default = {
	args: {
		children: 'Text'
	},
	play: async ({canvasElement}) =>{
		const canvas = within(canvasElement);
		canvas.getByTestId('bread-crumb');
	}
};
