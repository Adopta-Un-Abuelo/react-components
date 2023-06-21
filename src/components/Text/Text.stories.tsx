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

export const All = (args: any) =>{
    return(
        <div>
            <Text 
				type='d1'
				weight='semibold'
			>
				Display d1 semibold
			</Text>
			<Text 
				type='d1'
				weight='medium'
			>
				Display d1 medium
			</Text>
			<Text 
				type='d1'
				weight='regular'
			>
				Display d1 regular
			</Text>
			<Text 
				type='h1'
				weight='semibold'
			>
				Header h1 semibold
			</Text>
			<Text 
				type='h1'
				weight='medium'
			>
				Header h1 medium
			</Text>
			<Text 
				type='h1'
				weight='regular'
			>
				Header h1 regular
			</Text>
			<Text 
				type='h2'
				weight='semibold'
			>
				Header h2 semibold
			</Text>
			<Text 
				type='h2'
				weight='medium'
			>
				Header h2 medium
			</Text>
			<Text 
				type='h2'
				weight='regular'
			>
				Header h2 regular
			</Text>
			<Text 
				type='h3'
				weight='semibold'
			>
				Header h3 semibold
			</Text>
			<Text 
				type='h3'
				weight='medium'
			>
				Header h3 medium
			</Text>
			<Text 
				type='h3'
				weight='regular'
			>
				Header h3 regular
			</Text>
			<Text 
				type='h4'
				weight='semibold'
			>
				Header h4 semibold
			</Text>
			<Text 
				type='h4'
				weight='medium'
			>
				Header h4 medium
			</Text>
			<Text 
				type='h4'
				weight='regular'
			>
				Header h4 regular
			</Text>
			<Text 
				type='h5'
				weight='semibold'
			>
				Header h5 semibold
			</Text>
			<Text 
				type='h5'
				weight='medium'
			>
				Header h5 medium
			</Text>
			<Text 
				type='h5'
				weight='regular'
			>
				Header h5 regular
			</Text>
			<Text 
				type='h6'
				weight='semibold'
			>
				Header h6 semibold
			</Text>
			<Text 
				type='h6'
				weight='medium'
			>
				Header h6 medium
			</Text>
			<Text 
				type='h6'
				weight='regular'
			>
				Header h6 regular
			</Text>
			<Text 
				type='p'
				weight='semibold'
			>
				Paragraph p semibold
			</Text>
			<Text 
				type='p'
				weight='medium'
			>
				Paragraph p medium
			</Text>
			<Text 
				type='p'
				weight='regular'
			>
				Paragraph p regular
			</Text>
			<Text 
				type='p2'
				weight='semibold'
			>
				Paragraph p2 semibold
			</Text>
			<Text 
				type='p2'
				weight='medium'
			>
				Paragraph p2 medium
			</Text>
			<Text 
				type='p2'
				weight='regular'
			>
				Paragraph p2 regular
			</Text>
			<Text 
				type='c1'
				weight='semibold'
			>
				Caption c1 semibold
			</Text>
			<Text 
				type='c1'
				weight='medium'
			>
				Caption c1 medium
			</Text>
			<Text 
				type='c1'
				weight='regular'
			>
				Caption c1 regular
			</Text>
			<Text 
				type='c2'
				weight='semibold'
			>
				Caption c2 semibold
			</Text>
			<Text 
				type='c2'
				weight='medium'
			>
				Caption c2 medium
			</Text>
			<Text 
				type='c2'
				weight='regular'
			>
				Caption c2 regular
			</Text>
			<Text 
				type='o1'
				weight='semibold'
			>
				Caption o1 semibold
			</Text>
			<Text 
				type='o1'
				weight='medium'
			>
				Caption o1 medium
			</Text>
			<Text 
				type='o1'
				weight='regular'
			>
				Caption o1 regular
			</Text>
			<Text 
				type='o2'
				weight='semibold'
			>
				Caption o2 semibold
			</Text>
			<Text 
				type='o2'
				weight='medium'
			>
				Caption o2 medium
			</Text>
			<Text 
				type='o2'
				weight='regular'
			>
				Caption o2 regular
			</Text>
			<Text 
				type='b1'
				weight='semibold'
			>
				Button b1 semibold
			</Text>
			<Text 
				type='b1'
				weight='medium'
			>
				Button b1 medium
			</Text>
			<Text 
				type='b1'
				weight='regular'
			>
				Button b1 regular
			</Text>
			<Text 
				type='b2'
				weight='semibold'
			>
				Button b2 semibold
			</Text>
			<Text 
				type='b2'
				weight='medium'
			>
				Button b2 medium
			</Text>
			<Text 
				type='b2'
				weight='regular'
			>
				Button b2 regular
			</Text>
			<Text 
				type='b3'
				weight='semibold'
			>
				Button b3 semibold
			</Text>
			<Text 
				type='b3'
				weight='medium'
			>
				Button b3 medium
			</Text>
			<Text 
				type='b3'
				weight='regular'
			>
				Button b3 regular
			</Text>
        </div>
    )
}

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
