import BreadCrumb from '../components/BreadCrumb/BreadCrumb';
import { within } from '@storybook/testing-library';

export default {
	title: 'Design System/BreadCrumb',
	component: BreadCrumb,
	tags: ['autodocs']
};

export const Default = {
	args: {
		selectedStep: 3,
		steps: 8,
	},
	play: async ({canvasElement}) =>{
		const canvas = within(canvasElement);
		canvas.getByTestId('bread-crumb');
	}
};
