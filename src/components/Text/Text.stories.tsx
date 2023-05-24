import Text from './Text';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

export default {
	title: 'Design System/Text',
	component: Text,
	tags: ['autodocs'],
	argTypes: {
		weight:{
			control: 'select'
		}
	}
};

export const Paragraph = {
	args: {
		children: 'Text',
        type: 'p'
	},
	play: async ({canvasElement}: any) =>{
		const canvas = within(canvasElement);
		const text = await canvas.getByRole('paragraph');
		expect(text).toBeInTheDocument();
	}
};

export const Header = {
	args: {
		children: 'Header',
        type: 'h1'
	},
	play: async ({canvasElement}: any) =>{
		const canvas = within(canvasElement);
		const header = canvas.getByRole('header');
		expect(header).toBeInTheDocument();
	}
};
