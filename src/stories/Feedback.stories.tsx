import { useState } from 'react';
import { userEvent, within } from '@storybook/testing-library';
import { action } from '@storybook/addon-actions';

import Feedback from '../components/Feedback/Feedback';

export default {
	title: 'Design System/Feedback',
	component: Feedback,
	tags: ['autodocs'],
    args: {
        isVisible: false,
		type: 'success',
        text: 'Test text',
        onClose: action('onClose')
    },
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

export const Success = (args: any) =>{
    const [ isVisible, setIsVisible ] = useState(false);
    return(
        <div>
            <button
                data-testid="button" 
                onClick={() => setIsVisible(true)}
            >
                Show feedback modal
            </button>
            <Feedback
                {...args}
                isVisible={isVisible}
                onClose={() => {
                    setIsVisible(false);
                    action('onClose');
                }}
            />
        </div>
    )
}
Success.play = async ({canvasElement}: any) =>{
    const canvas = within(canvasElement);
    const button = await canvas.getByTestId('button');
    await userEvent.click(button);
}

export const Error = (args: any) =>{
    const [ isVisible, setIsVisible ] = useState(false);
    return(
        <div>
            <button
                data-testid="button" 
                onClick={() => setIsVisible(true)}
            >
                Show feedback modal
            </button>
            <Feedback
                {...args}
                isVisible={isVisible}
                onClose={() => {
                    setIsVisible(false);
                    action('onClose');
                }}
            />
        </div>
    )
}
Error.args = {
    type: 'error'
}
Error.play = async ({canvasElement}: any) =>{
    const canvas = within(canvasElement);
    const button = await canvas.getByTestId('button');
    await userEvent.click(button);
}
