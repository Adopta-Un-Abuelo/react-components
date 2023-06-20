import Input from './Input';
import { userEvent, within } from '@storybook/testing-library';
import { action } from '@storybook/addon-actions';
import { expect } from '@storybook/jest';

import { Flag } from 'lucide-react';

export default {
	title: 'Components/Input',
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

export const Primary = {
    args: {
        design: 'primary'
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

export const PrimaryWithIcon = {
    args: {
        design: 'primary',
        icon: <Flag role='icon' width={20} height={20}/>
    },
	play: async ({canvasElement, step}: any) =>{
		const canvas = within(canvasElement);
		const input = canvas.getByRole('input');
        const icon = canvas.getByRole('icon');
        await step('render', async () =>{
            expect(input).toBeInTheDocument();
            expect(icon).toBeInTheDocument();
        });
        await step('typing', async () =>{
            userEvent.type(input, ' example', { delay: 100 });
        });
	}
};

export const PrimaryWithError = {
    args: {
        design: 'primary',
        error: 'Error message'
    },
	play: async ({canvasElement, step}: any) =>{
		const canvas = within(canvasElement);
		const input = canvas.getByRole('input');
        const error = canvas.getByRole('error');
        await step('render', async () =>{
            expect(input).toBeInTheDocument();
            expect(error).toBeInTheDocument();
        });
        await step('typing', async () =>{
            userEvent.type(input, ' example', { delay: 100 });
        });
	}
};

export const Secondary = {
    args: {
        design: 'secondary'
    },
	play: async ({canvasElement, step}: any) =>{
		const canvas = within(canvasElement);
		const input = canvas.getByRole('input');
        const placeholder = canvas.getByRole('placeholder');
        await step('render', async () =>{
            expect(input).toBeInTheDocument();
            expect(placeholder).toBeInTheDocument();
        });
        await step('typing', async () =>{
            userEvent.type(input, ' example', { delay: 100 });
        });
	}
};

export const SecondaryWithIcon = {
    args: {
        design: 'secondary',
        icon: <Flag role="icon" width={20} height={20}/>
    },
	play: async ({canvasElement, step}: any) =>{
		const canvas = within(canvasElement);
		const input = canvas.getByRole('input');
        const placeholder = canvas.getByRole('placeholder');
        const icon = canvas.getByRole('icon');
        await step('render', async () =>{
            expect(input).toBeInTheDocument();
            expect(placeholder).toBeInTheDocument();
            expect(icon).toBeInTheDocument();
        });
        await step('typing', async () =>{
            userEvent.type(input, ' example', { delay: 100 });
        });
	}
};

export const SecondaryWithError = {
    args: {
        design: 'secondary',
        error:'Error message'
    },
	play: async ({canvasElement, step}: any) =>{
		const canvas = within(canvasElement);
		const input = canvas.getByRole('input');
        const placeholder = canvas.getByRole('placeholder');
        const error = canvas.getByRole('error');
        await step('render', async () =>{
            expect(input).toBeInTheDocument();
            expect(placeholder).toBeInTheDocument();
            expect(error).toBeInTheDocument();
        });
        await step('typing', async () =>{
            userEvent.type(input, ' example', { delay: 100 });
        });
	}
};

export const InputTime = {
    args: {
        design: 'secondary',
        type:'time',
        defaultValue: '10:00'
    },
	play: async ({canvasElement, step}: any) =>{
		const canvas = within(canvasElement);
		const input = canvas.getByRole('input');
        const placeholder = canvas.getByRole('placeholder');
        await step('render', async () =>{
            expect(input).toBeInTheDocument();
            expect(placeholder).toBeInTheDocument();
        });
        await step('typing', async () =>{
            userEvent.type(input, ' example', { delay: 100 });
        });
	}
};

export const InputNumber = {
    args: {
        design: 'secondary',
        type:'number',
        defaultValue: 20
    },
	play: async ({canvasElement, step}: any) =>{
		const canvas = within(canvasElement);
		const input = canvas.getByRole('input');
        const placeholder = canvas.getByRole('placeholder');
        await step('render', async () =>{
            expect(input).toBeInTheDocument();
            expect(placeholder).toBeInTheDocument();
        });
        await step('typing', async () =>{
            userEvent.type(input, '23', { delay: 100 });
        });
	}
};

export const InputTelephone = {
    args: {
        design: 'secondary',
        type:'tel',
        defaultValue: undefined
    },
	play: async ({canvasElement, step}: any) =>{
		const canvas = within(canvasElement);
		const input = canvas.getByRole('input');
        const placeholder = canvas.getByRole('placeholder');
        await step('render', async () =>{
            expect(input).toBeInTheDocument();
            expect(placeholder).toBeInTheDocument();
        });
        await step('country selection', async () =>{
            const select = canvas.getByRole('select');
            userEvent.click(select);
            const menu = await canvas.findByRole('menu');
            expect(menu).toBeVisible();
            const option = await canvas.findByRole('country17');
            userEvent.click(option);
        });
        await step('typing', async () =>{
            userEvent.type(input, '912345678', { delay: 100 });
        });
	}
};

export const InputEmail = {
    args: {
        design: 'secondary',
        type:'email',
        defaultValue: undefined
    },
	play: async ({canvasElement, step}: any) =>{
		const canvas = within(canvasElement);
		const input = canvas.getByRole('input');
        const placeholder = canvas.getByRole('placeholder');
        await step('render', async () =>{
            expect(input).toBeInTheDocument();
            expect(placeholder).toBeInTheDocument();
        });
        await step('typing', async () =>{
            userEvent.type(input, 'test@test.com', { delay: 100 });
        });
	}
};

export const InputDate = {
    args: {
        design: 'secondary',
        type:'date',
        defaultValue: undefined
    },
	play: async ({canvasElement, step}: any) =>{
		const canvas = within(canvasElement);
		const input = canvas.getByRole('input');
        const placeholder = canvas.getByRole('placeholder');
        await step('render', async () =>{
            expect(input).toBeInTheDocument();
            expect(placeholder).toBeInTheDocument();
        });
        await step('typing', async () =>{
            userEvent.type(input, '2023-05-23', { delay: 100 });
        });
	}
};

export const InputPassword = {
    args: {
        design: 'secondary',
        type:'password',
        defaultValue: undefined
    },
	play: async ({canvasElement, step}: any) =>{
		const canvas = within(canvasElement);
		const input = canvas.getByRole('input');
        const placeholder = canvas.getByRole('placeholder');
        await step('render', async () =>{
            expect(input).toBeInTheDocument();
            expect(placeholder).toBeInTheDocument();
        });
        await step('typing', async () =>{
            userEvent.type(input, 'password', { delay: 100 });
        });
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
	play: async ({canvasElement, step}: any) =>{
		const canvas = within(canvasElement);
		const input = canvas.getByRole('input');
        const range = canvas.getByRole('range');
        await step('render', async () =>{
            expect(input).toBeInTheDocument();
            expect(range).toBeInTheDocument();
        });
	}
};
export const InputRangeWithoutRangeView = {
    args: {
        design: 'secondary',
        type:'range',
        min: 0,
        max: 100,
        unit: '€',
        defaultValue: 40,
        hideRange: true
    },
	play: async ({canvasElement, step}: any) =>{
		const canvas = within(canvasElement);
		const input = canvas.getByRole('input');
        await step('render', async () =>{
            expect(input).toBeInTheDocument();
        });
	}
};

export const InputLocation = {
    args: {
        design: 'secondary',
        type:'location'
    },
	play: async ({canvasElement, step}: any) =>{
		/*const canvas = within(canvasElement);
		const input = await canvas.findByRole('combobox');
        const placeholder = canvas.getByRole('placeholder');
        await step('render', async () =>{
            expect(input).toBeInTheDocument();
            expect(placeholder).toBeInTheDocument();
        });
        await step('typing', async () =>{
            await userEvent.type(input, 'calle Alcalá', { delay: 100 });
        });
        await step('select address option', async () =>{
            await new Promise((resolve) => setTimeout(resolve, 500));
            const menu = await canvas.findByRole('menu');
            expect(menu).toBeVisible();
            await new Promise((resolve) => setTimeout(resolve, 500));
            const cell = await canvas.findByRole('cell2');
            userEvent.click(cell);
        });*/
	}
};

export const InputDateRange = {
    args: {
        design: 'secondary',
        type:'range-date'
    }
};

export const InputImage = {
    args: {
        design: 'secondary',
        type:'image'
    },
	play: async ({canvasElement, step}: any) =>{
		const canvas = within(canvasElement);
		const button = canvas.getByRole('button');
        await step('render', async () =>{
            expect(button).toBeInTheDocument();
        });
	}
};

export const InputChat = {
    args: {
        design: 'secondary',
        type:'chat'
    }
};

export const InputCode = {
    args: {
        design: 'secondary',
        type:'code'
    },
    play: async ({canvasElement, step}: any) =>{
		const canvas = within(canvasElement);
		const input = canvas.getByRole('input');
        await step('render', async () =>{
            expect(input).toBeInTheDocument();
        });
        await step('typing', async () =>{
            userEvent.type(input, '000000', { delay: 200 });
        });
	}
};
