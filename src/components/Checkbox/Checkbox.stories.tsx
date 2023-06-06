import CheckboxList from './CheckboxList';
import { userEvent, within } from '@storybook/testing-library';
import { action } from '@storybook/addon-actions';
import { expect } from '@storybook/jest';

export default {
	title: 'Components/Checkbox',
	component: CheckboxList,
	tags: ['autodocs'],
    args: {
        options: [
            {
                id: 'option1',
                label: 'Option 1',
                sublabel: 'This is a sublabel 1'
            },
            {
                id: 'option2',
                label: 'Option 2'
            },
            {
                id: 'option3',
                label: 'Option 3',
                error: 'Error 3'
            }
        ],
        selectedOptions: [
            {
                id: 'option2'
            }
        ],
        onChange: action('onChange')
    },
    argTypes: {
        type: {
            table: {
                defaultValue: { summary: 'multiple' }
            },
            control: 'select', 
            options: ['single', 'multiple']
        },
    }
};

export const SingleSelection = {
    args: {
        type: 'single'
    },
	play: async ({canvasElement, step}: any) =>{
		const canvas = within(canvasElement);
		const input = canvas.getByRole('input');
        await step('render', async () =>{
            expect(input).toBeInTheDocument();
        });
        await step('typing', async () =>{
            userEvent.type(input, ' example', { delay: 100 });
        });
	}
};

export const MultipleSelection = {
    args: {
        type: 'multiple'
    },
	play: async ({canvasElement, step}: any) =>{
		const canvas = within(canvasElement);
		const input = canvas.getByRole('input');
        await step('render', async () =>{
            expect(input).toBeInTheDocument();
        });
        await step('typing', async () =>{
            userEvent.type(input, ' example', { delay: 100 });
        });
	}
};