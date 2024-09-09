import Filter from "./Filter";
import { userEvent, within, fn } from "@storybook/test";
import { expect } from "@storybook/test";
import moment from "moment";

export default {
	title: "Components/Filter",
	component: Filter,
	tags: ["autodocs"],
	args: {
		id: "filter",
		placeholder: "Test filter",
		options: [
			{
				id: "option1",
				label: "Option 1",
				sublabel: "This is a sublabel 1",
			},
			{
				id: "option2",
				label: "Option 2",
			},
			{
				id: "option3",
				label: "Option 3",
			},
			{
				id: "option4",
				label: "Option 4",
				error: true,
			},
		],
		onChange: fn(),
	},
};

export const SingleSelection = {
	args: {
		type: "single",
		selectedOptions: [
			{
				id: "option1",
				label: "Option 1",
			},
		],
	},
	play: async ({ canvasElement, step }: any) => {
		const canvas = within(canvasElement);
		const filter = canvas.getByRole("filter");
		const filterButton = canvas.getByRole("filter-button");
		await step("render", async () => {
			expect(filter).toBeInTheDocument();
			expect(filterButton).toBeInTheDocument();
		});
	},
};

export const MultipleSelection = {
	args: {
		type: "multiple",
		selectedOptions: [
			{
				id: "option1",
				label: "Option 1",
			},
			{
				id: "option2",
				label: "Option 2",
			},
		],
	},
	play: async ({ canvasElement, step }: any) => {
		const canvas = within(canvasElement);
		const filter = canvas.getByRole("filter");
		const filterButton = canvas.getByRole("filter-button");
		await step("render", async () => {
			expect(filter).toBeInTheDocument();
			expect(filterButton).toBeInTheDocument();
		});
	},
};

export const FilterDate = {
	args: {
		type: "date",
		selectedOptions: {
			startDate: moment(),
			endDate: moment().add(5, "days")
		}
	},
	play: async ({ canvasElement, step }: any) => {
		const canvas = within(canvasElement);
		const filter = canvas.getByRole("filter");
		await step("render", async () => {
			expect(filter).toBeInTheDocument();
		});
	},
};

export const FilterRatio = {
	args: {
		type: "ratio",
		min: 0,
		max: 100,
		selectedOptions: 40,
		restart: false,
		unit: "€",
	},
	play: async ({ canvasElement, step }: any) => {
		const canvas = within(canvasElement);
		const filter = canvas.getByRole("filter");
		await step("render", async () => {
			expect(filter).toBeInTheDocument();
		});
	},
};
