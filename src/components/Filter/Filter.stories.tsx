import Filter from "./Filter";
import { within, fn } from "storybook/test";
import { expect } from "storybook/test";
import moment from "moment";
import Button from "../Button/Button";
import { useRef } from "react";

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
			{
				id: "option5",
				label: "Option 5",
			},
			{
				id: "option6",
				label: "Option 6",
			},
			{
				id: "option7",
				label: "Option 7",
			},
			{
				id: "option8",
				label: "Option 8 super mega larga para ver qué pasa",
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
			},
			{
				id: "option2",
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
			endDate: moment().add(5, "days"),
		},
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

export const RefExample = (args: any) => {
	const filterSingle = useRef<any>(null);
	const filterMultiple = useRef<any>(null);
	const filterDate = useRef<any>(null);
	const filterRatio = useRef<any>(null);
	return (
		<div style={{ display: "flex", alignItems: "center", gap: 12 }}>
			<Filter
				ref={filterSingle}
				{...args}
				type={"single"}
				selectedOptions={[
					{
						id: "option1",
					},
				]}
			/>
			<Filter
				ref={filterMultiple}
				{...args}
				type={"multiple"}
				selectedOptions={[
					{
						id: "option1",
					},
				]}
			/>
			<Filter
				ref={filterDate}
				{...args}
				type={"date"}
				selectedOptions={{
					startDate: moment(),
					endDate: moment().add(5, "days"),
				}}
			/>
			<Filter
				ref={filterRatio}
				{...args}
				type={"ratio"}
				selectedOptions={10}
			/>
			<Button
				design={"call-to-action"}
				onClick={() => {
					filterSingle.current?.clean();
					filterMultiple.current?.clean();
					filterRatio.current?.clean();
					filterDate.current?.clean();
				}}
			>
				Borrar todo
			</Button>
		</div>
	);
};
