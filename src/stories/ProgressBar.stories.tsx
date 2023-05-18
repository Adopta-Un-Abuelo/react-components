import ProgressBar from '../components/ProgressBar/ProgressBar';
import { within } from '@storybook/testing-library';

export default {
	title: 'Design System/ProgressBar',
	component: ProgressBar,
	tags: ['autodocs']
};

export const Default = {
	args: {
		progress: 40,
        minValue: 0,
        maxValue: 100
	},
	play: async ({canvasElement}: any) =>{
		const canvas = within(canvasElement);
		canvas.getByTestId('progress-bar');
	}
};

export const Multiple = {
	args: {
		progress: [ 
            {
                value: 85,
                color: 'linear-gradient(90deg, #006BE5 0%, #004FA8 100%)'
            }, 
            {
                value: 10, 
                color: 'linear-gradient(270deg, #FFAA47 -0.16%, #F9713D 99.84%)'
            },
            {
                value: 5,
                color: '#828282'
            }
        ]
	},
	play: async ({canvasElement}: any) =>{
		const canvas = within(canvasElement);
		canvas.getByTestId('progress-bar');
	}
};
