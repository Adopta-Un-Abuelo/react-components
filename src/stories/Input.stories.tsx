import Input from '../components/Input/Input';
import { within } from '@storybook/testing-library';
import { action } from '@storybook/addon-actions';

import { Flag } from 'lucide-react';

export default {
	title: 'Design System/Input',
	component: Input,
	tags: ['autodocs'],
    args: {
        placeholder: 'Placeholder',
        defaultValue: 'Default value',
        onChange: action('onChange')
    },
    argTypes:{
        design: {
            table: {
                defaultValue: { summary: 'design-1' }
            },
            control: 'select', 
            options: ['design-1', 'design-2']
        },
        hideCalendar: {
            table: {
                defaultValue: { summary: false }
            },
            control: 'boolean'
        },
        type: {
            table: {
                defaultValue: { summary: 'text' }
            },
            control: 'select'
        },
    }
};

export const Default = {
    args: {
        design: 'design-1'
    },
	play: async ({canvasElement}: any) =>{
		const canvas = within(canvasElement);
		canvas.getByTestId('input');
	}
};

export const DefaultWithIcon = {
    args: {
        design: 'design-1',
        icon: <Flag width={20} height={20}/>
    },
	play: async ({canvasElement}: any) =>{
		const canvas = within(canvasElement);
		canvas.getByTestId('input');
	}
};

export const DefaultWithError = {
    args: {
        design: 'design-1',
        error: 'Error message'
    },
	play: async ({canvasElement}: any) =>{
		const canvas = within(canvasElement);
		canvas.getByTestId('input');
	}
};

export const Secondary = {
    args: {
        design: 'design-2'
    },
	play: async ({canvasElement}: any) =>{
		const canvas = within(canvasElement);
		canvas.getByTestId('input');
	}
};

export const SecondaryWithIcon = {
    args: {
        design: 'design-2',
        icon: <Flag width={20} height={20}/>
    },
	play: async ({canvasElement}: any) =>{
		const canvas = within(canvasElement);
		canvas.getByTestId('input');
	}
};

export const SecondaryWithError = {
    args: {
        design: 'design-2',
        error:'Error message'
    },
	play: async ({canvasElement}: any) =>{
		const canvas = within(canvasElement);
		canvas.getByTestId('input');
	}
};

export const InputTime = {
    args: {
        design: 'design-2',
        type:'time',
        defaultValue: undefined
    },
	play: async ({canvasElement}: any) =>{
		const canvas = within(canvasElement);
		canvas.getByTestId('input');
	}
};

export const InputNumber = {
    args: {
        design: 'design-2',
        type:'number',
        defaultValue: undefined
    },
	play: async ({canvasElement}: any) =>{
		const canvas = within(canvasElement);
		canvas.getByTestId('input');
	}
};

export const InputTelephone = {
    args: {
        design: 'design-2',
        type:'tel',
        defaultValue: undefined
    },
	play: async ({canvasElement}: any) =>{
		const canvas = within(canvasElement);
		canvas.getByTestId('input');
	}
};

export const InputEmail = {
    args: {
        design: 'design-2',
        type:'email',
        defaultValue: undefined
    },
	play: async ({canvasElement}: any) =>{
		const canvas = within(canvasElement);
		canvas.getByTestId('input');
	}
};

export const InputDate = {
    args: {
        design: 'design-2',
        type:'date',
        defaultValue: undefined
    },
	play: async ({canvasElement}: any) =>{
		const canvas = within(canvasElement);
		canvas.getByTestId('input');
	}
};

export const InputPassword = {
    args: {
        design: 'design-2',
        type:'password',
        defaultValue: undefined
    },
	play: async ({canvasElement}: any) =>{
		const canvas = within(canvasElement);
		canvas.getByTestId('input');
	}
};

export const InputRange = {
    args: {
        design: 'design-2',
        type:'range',
        defaultValue: undefined
    },
	play: async ({canvasElement}: any) =>{
		const canvas = within(canvasElement);
		canvas.getByTestId('input');
	}
};
