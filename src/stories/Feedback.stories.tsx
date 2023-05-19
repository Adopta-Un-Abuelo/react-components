import Feedback from '../components/Feedback/Feedback';
import { within } from '@storybook/testing-library';
import { action } from '@storybook/addon-actions';

export default {
	title: 'Design System/Feedback',
	component: Feedback,
	tags: ['autodocs'],
    argTypes: {
        isVisible: {
            type: {
                required: true,
            },
            description: 'boolean',
            table: {
                defaultValue: { summary: false }
            }
        },
        type: {
            type: {
                required: true,
            },
            description: 'string',
            table: {
                defaultValue: { summary: 'success' }
            },
            control: 'select', 
            options: ['success', 'error']
        },
        text: {
            type: {
                required: true,
            },
            description: 'string'
        },
        onClose: {
            type: {
                required: true,
            },
            description: '() => void'
        }
    }
};

export const Default = {
	args: {
		isVisible: false,
		type: 'success',
        text: 'Test text',
        onClose: action('onClose')
	},
	play: async ({canvasElement}: any) =>{
		const canvas = within(canvasElement);
		canvas.getByTestId('feedback');
	}
};
