import { useState } from 'react';
import Modal from './Modal';
import Text from '../Text/Text';
import { action } from '@storybook/addon-actions';
import { userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

export default {
	title: 'Components/Modal',
	component: Modal,
	tags: ['autodocs'],
    args: {
        isVisible: false,
        title: 'Title',
        subtitle: 'Subtitle',
        hideHeader: false,
        hideClose: false,
        buttonProps: {
            children: 'Save',
            disabled: false,
            loading: false
        },
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
        onClose: {
            type: {
                required: true,
            },
            description: '() => void'
        },
        title: {
            description: 'string',
            control: 'text',
        },
        subtitle: {
            description: 'string',
            control: 'text',
        },
        error: {
            description: 'string',
            control: 'text',
        },
        design: {
            description: 'default | full-screen',
            control: 'select',
            options: ['default', 'full-screen'],
            table: {
                defaultValue: { summary: 'default' }
            }
        },
        hideHeader: {
            description: 'boolean',
            control: 'boolean',
            table: {
                defaultValue: { summary: false }
            }
        },
        hideClose: {
            description: 'boolean',
            control: 'boolean',
            table: {
                defaultValue: { summary: false }
            }
        },
        buttonProps: {
            description: 'ButtonProps'
        }
    }
};

export const Default = (args: any) =>{
    const [ isVisible, setIsVisible ] = useState(false);
    return(
        <div>
            <button
                role="button" 
                onClick={() => setIsVisible(true)}
            >
                Show modal
            </button>
            <Modal
                {...args}
                isVisible={isVisible}
                onClose={() => {
                    setIsVisible(false);
                    action('onClose');
                }}
            >
                <Text type='p'>
                    Modal children
                </Text>
            </Modal>
        </div>
    )
}
Default.play = async ({canvasElement, step}: any) =>{
    const canvas = within(canvasElement);
    await step('Click button to show modal', async () =>{
        /*const button = await canvas.getByRole('button');
        await userEvent.click(button);
        const modal = await canvas.findByRole('modal');
        expect(modal).toBeInTheDocument();*/
    });
}

export const FullScreen = (args: any) =>{
    const [ isVisible, setIsVisible ] = useState(false);
    return(
        <div>
            <button
                role="button" 
                onClick={() => setIsVisible(true)}
            >
                Show modal
            </button>
            <Modal
                {...args}
                isVisible={isVisible}
                onClose={() => {
                    setIsVisible(false);
                    action('onClose');
                }}
            >
                <Text type='p'>
                    Modal children
                </Text>
            </Modal>
        </div>
    )
}
FullScreen.args = {
    design: 'full-screen'
}
FullScreen.play = async ({canvasElement, step}: any) =>{
    const canvas = within(canvasElement);
    await step('Click button to show modal', async () =>{
        /*const button = await canvas.getByRole('button');
        await userEvent.click(button);
        const modal = await canvas.findByRole('modal');
        expect(modal).toBeInTheDocument();*/
    });
}
