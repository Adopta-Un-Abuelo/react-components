import { within } from '@storybook/testing-library';
import { action } from '@storybook/addon-actions';

import Button from '../components/Button/Button';
import { Flag } from 'lucide-react';

export default {
	title: 'Design System/Button',
	component: Button,
	tags: ['autodocs'],
    args: {
        size: 'normal',
        loading: false,
        disabled: false,
        textColor: undefined,
        children: 'Button text',
        onClick: action('onClick')
    },
    argTypes: {
        design: {
            description: 'string',
            table: {
                defaultValue: { summary: 'primary' }
            },
            control: 'select', 
            options: ['primary', 'secondary', 'text', 'image', 'call-to-action']
        },
        children: {
            description: 'React.Element'
        },
        size: {
            description: 'string',
            table: {
                defaultValue: { summary: 'normal' }
            },
            control: 'select', 
            options: ['normal', 'small']
        },
        loading: {
            description: 'boolean',
            table: {
                defaultValue: { summary: false }
            }
        },
        disabled: {
            description: 'boolean',
            table: {
                defaultValue: { summary: false }
            }
        },
        textColor: {
            description: 'string',
            control: 'color'
        },
        iconPosition: {
            description: 'string',
            table: {
                defaultValue: { summary: 'left' }
            },
            control: 'select', 
            options: ['left', 'right']
        }
    }
};

export const Default = {
	play: async ({canvasElement}: any) =>{
		const canvas = within(canvasElement);
		canvas.getByTestId('button');
	}
};

export const ButtonText = {
    args:{
        design: 'text',
        icon: <Flag height={20} width={20}/>,
    },
	play: async ({canvasElement}: any) =>{
		const canvas = within(canvasElement);
		canvas.getByTestId('button');
	}
};

export const ButtonImage = {
    args:{
        design: 'image',
        icon: <Flag height={20} width={20}/>,
        children: undefined
    },
	play: async ({canvasElement}: any) =>{
		const canvas = within(canvasElement);
		canvas.getByTestId('button');
	}
};

export const ButtonImageWithLabel = {
    args:{
        design: 'image',
        icon: <Flag height={20} width={20}/>
    },
	play: async ({canvasElement}: any) =>{
		const canvas = within(canvasElement);
		canvas.getByTestId('button');
	}
};

export const CallToAction = {
    args:{
        design: 'call-to-action',
        children: 'Call To Action'
    },
	play: async ({canvasElement}: any) =>{
		const canvas = within(canvasElement);
		canvas.getByTestId('button');
	}
};

export const CallToActionWithIcon = {
    args:{
        design: 'call-to-action',
        children: 'Call To Action',
        icon: <Flag/>,
        iconPosition: 'left'
    },
	play: async ({canvasElement}: any) =>{
		const canvas = within(canvasElement);
		canvas.getByTestId('button');
	}
};
