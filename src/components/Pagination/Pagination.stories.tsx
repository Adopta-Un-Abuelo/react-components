import Pagination from './Pagination';
import { within, userEvent } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { action } from '@storybook/addon-actions';

export default {
	title: 'Components/Pagination',
	component: Pagination,
	tags: ['autodocs'],
    args: {
        length: 100,
        rowsPerPage: 20,
        onChange: action('onChange')
    }
};

export const Default = {
	play: async ({canvasElement, step}: any) =>{
		const canvas = within(canvasElement);
		const pagination = await canvas.getByRole('pagination');
        const firstArrow = await canvas.getByRole('first-arrow');
        const leftArrow = await canvas.getByRole('left-arrow');
        const rightArrow = await canvas.getByRole('right-arrow');
        const lastArrow = await canvas.getByRole('last-arrow');
        await step('render', async () =>{
            expect(pagination).toBeInTheDocument();
            expect(firstArrow).toBeInTheDocument();
            expect(leftArrow).toBeInTheDocument();
            expect(rightArrow).toBeInTheDocument();
            expect(lastArrow).toBeInTheDocument();
        })
        await step('click next', async () =>{
            await userEvent.click(rightArrow);
            await userEvent.click(lastArrow);
        })
        await step('click previous', async () =>{
            await userEvent.click(leftArrow);
            await userEvent.click(firstArrow);
        })
	}
};