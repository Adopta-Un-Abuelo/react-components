import TagSelector from './TagSelector';
import { within, userEvent } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { action } from '@storybook/addon-actions';

export default {
	title: 'Components/TagSelector',
	component: TagSelector,
	tags: ['autodocs'],
    args: {
        options: [
            {
                id: 'option1',
                title: 'Option 1'
            },
            {
                id: 'option2',
                title: 'Option 2'
            },
            {
                id: 'option3',
                title: 'Option 3'
            },
            {
                id: 'option4',
                title: 'Option 4'
            }
        ],
        onChange: action('onChange')
    }
};

export const SingleSelection = {
    args: {
        type: 'single'
    },
	play: async ({canvasElement, step}: any) =>{
		const canvas = within(canvasElement);
		const container = await canvas.getByRole('container');
        await step('render', async () =>{
            expect(container).toBeInTheDocument();
        })
        await step('click cell', async () =>{
            const cell2 = await canvas.findByRole('option2');
            await userEvent.click(cell2);
        })
	}
};

export const MultipleSelection = {
    args: {
        type: 'multiple'
    },
	play: async ({canvasElement, step}: any) =>{
		const canvas = within(canvasElement);
		const container = await canvas.getByRole('container');
        await step('render', async () =>{
            expect(container).toBeInTheDocument();
        })
        await step('click cell', async () =>{
            const cell2 = await canvas.findByRole('option2');
            const cell3 = await canvas.findByRole('option3');
            await userEvent.click(cell2);
            await userEvent.click(cell3);
        })
	}
};