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
                defaultValue: { summary: 'primary' }
            },
            control: 'select', 
            options: ['primary', 'secondary']
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
        design: 'primary'
    },
	play: async ({canvasElement}: any) =>{
		const canvas = within(canvasElement);
		canvas.getByTestId('input');
	}
};

export const DefaultWithIcon = {
    args: {
        design: 'primary',
        icon: <Flag width={20} height={20}/>
    },
	play: async ({canvasElement}: any) =>{
		const canvas = within(canvasElement);
		canvas.getByTestId('input');
	}
};

export const DefaultWithError = {
    args: {
        design: 'primary',
        error: 'Error message'
    },
	play: async ({canvasElement}: any) =>{
		const canvas = within(canvasElement);
		canvas.getByTestId('input');
	}
};

export const Secondary = {
    args: {
        design: 'secondary'
    },
	play: async ({canvasElement}: any) =>{
		const canvas = within(canvasElement);
		canvas.getByTestId('input');
	}
};

export const SecondaryWithIcon = {
    args: {
        design: 'secondary',
        icon: <Flag width={20} height={20}/>
    },
	play: async ({canvasElement}: any) =>{
		const canvas = within(canvasElement);
		canvas.getByTestId('input');
	}
};

export const SecondaryWithError = {
    args: {
        design: 'secondary',
        error:'Error message'
    },
	play: async ({canvasElement}: any) =>{
		const canvas = within(canvasElement);
		canvas.getByTestId('input');
	}
};

export const InputTime = {
    args: {
        design: 'secondary',
        type:'time',
        defaultValue: '10:00'
    },
	play: async ({canvasElement}: any) =>{
		const canvas = within(canvasElement);
		canvas.getByTestId('input');
	}
};

export const InputNumber = {
    args: {
        design: 'secondary',
        type:'number',
        defaultValue: 20
    },
	play: async ({canvasElement}: any) =>{
		const canvas = within(canvasElement);
		canvas.getByTestId('input');
	}
};

export const InputTelephone = {
    args: {
        design: 'secondary',
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
        design: 'secondary',
        type:'email',
        defaultValue: 'test@test.com'
    },
	play: async ({canvasElement}: any) =>{
		const canvas = within(canvasElement);
		canvas.getByTestId('input');
	}
};

export const InputDate = {
    args: {
        design: 'secondary',
        type:'date',
        defaultValue: '2023-05-23'
    },
	play: async ({canvasElement}: any) =>{
		const canvas = within(canvasElement);
		canvas.getByTestId('input');
	}
};

export const InputPassword = {
    args: {
        design: 'secondary',
        type:'password',
        defaultValue: 'password'
    },
	play: async ({canvasElement}: any) =>{
		const canvas = within(canvasElement);
		canvas.getByTestId('input');
	}
};

export const InputRange = {
    args: {
        design: 'secondary',
        type:'range',
        min: 0,
        max: 100,
        unit: '€',
        defaultValue: 40
    },
	play: async ({canvasElement}: any) =>{
		const canvas = within(canvasElement);
		canvas.getByTestId('input');
	}
};
export const InputRangeWithoutRange = {
    args: {
        design: 'secondary',
        type:'range',
        min: 0,
        max: 100,
        unit: '€',
        defaultValue: 40,
        hideRange: true
    },
	play: async ({canvasElement}: any) =>{
		const canvas = within(canvasElement);
		canvas.getByTestId('input');
	}
};
