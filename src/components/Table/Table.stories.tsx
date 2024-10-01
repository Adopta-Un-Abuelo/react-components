import type { Meta, StoryObj } from '@storybook/react';
import Table from "./Table";
import { expect, within } from "@storybook/test";

const meta: Meta<typeof Table> = {
  title: "Components/Table",
  component: Table,
  tags: ["autodocs"],
  args: {
    columns: [
      {
        key: "name",
      },
      {
        key: "age",
      },
    ],
    data: [
      { name: "John", age: "1998-04-18T22:00:00.000Z" },
      { name: "Doe", age: "1991-10-30T23:00:00.000Z" },
      { name: "Jane", age: "1992-02-08T23:00:00.000Z" },
      { name: "Mark", age: "2000-07-16T03:00:00.000Z" },
      { name: "John", age: "1998-04-18T22:00:00.000Z" },
      { name: "Doe", age: "1991-10-30T23:00:00.000Z" },
      { name: "Jane", age: "1992-02-08T23:00:00.000Z" },
      { name: "Mark", age: "2000-07-16T03:00:00.000Z" },
      { name: "John", age: "1998-04-18T22:00:00.000Z" },
      { name: "Doe", age: "1991-10-30T23:00:00.000Z" },
      { name: "Jane", age: "1992-02-08T23:00:00.000Z" },
      { name: "Mark", age: "2000-07-16T03:00:00.000Z" },
      { name: "John", age: "1998-04-18T22:00:00.000Z" },
      { name: "Doe", age: "1991-10-30T23:00:00.000Z" },
      { name: "Jane", age: "1992-02-08T23:00:00.000Z" },
      { name: "Mark", age: "2000-07-16T03:00:00.000Z" },
      { name: "John", age: "1998-04-18T22:00:00.000Z" },
      { name: "Doe", age: "1991-10-30T23:00:00.000Z" },
      { name: "Jane", age: "1992-02-08T23:00:00.000Z" },
      { name: "Mark", age: "2000-07-16T03:00:00.000Z" },
      { name: "John", age: "1998-04-18T22:00:00.000Z" },
      { name: "Doe", age: "1991-10-30T23:00:00.000Z" },
      { name: "Jane", age: "1992-02-08T23:00:00.000Z" },
      { name: "Mark", age: "2000-07-16T03:00:00.000Z" },
      { name: "John", age: "1998-04-18T22:00:00.000Z" },
      { name: "Doe", age: "1991-10-30T23:00:00.000Z" },
      { name: "Jane", age: "1992-02-08T23:00:00.000Z" },
      { name: "Mark", age: "2000-07-16T03:00:00.000Z" },
      { name: "John", age: "1998-04-18T22:00:00.000Z" },
      { name: "Doe", age: "1991-10-30T23:00:00.000Z" },
      { name: "Jane", age: "1992-02-08T23:00:00.000Z" },
      { name: "Mark", age: "2000-07-16T03:00:00.000Z" },
      { name: "John", age: "1998-04-18T22:00:00.000Z" },
      { name: "Doe", age: "1991-10-30T23:00:00.000Z" },
      { name: "Jane", age: "1992-02-08T23:00:00.000Z" },
      { name: "Mark", age: "2000-07-16T03:00:00.000Z" },
      { name: "John", age: "1998-04-18T22:00:00.000Z" },
      { name: "Doe", age: "1991-10-30T23:00:00.000Z" },
      { name: "Jane", age: "1992-02-08T23:00:00.000Z" },
      { name: "Mark", age: "2000-07-16T03:00:00.000Z" },
    ],
    onRowClick: (rowData) => console.log(rowData),
    noResultsMessage: "No hay resultados",
  },
}

export default meta;
type Story = StoryObj<typeof Table>;

export const Default: Story = {
  play: async ({ canvasElement, step }: any) => {
    const canvas = within(canvasElement);
    const table = await canvas.getByRole("table");
    await step("render", async () => {
      expect(table).toBeInTheDocument();
    });
  },
};
