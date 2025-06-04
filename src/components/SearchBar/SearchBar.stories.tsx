import SearchBar from "./SearchBar";
import { userEvent, within, expect } from "storybook/test";
import type { Meta, StoryObj } from '@storybook/nextjs';

const meta: Meta<typeof SearchBar> = {
  title: "Components/SearchBar",
  component: SearchBar,
  tags: ["autodocs"],
  argTypes: {
    design: {
      table: {
        defaultValue: { summary: "primary" },
      },
      control: "select",
    },
    type: {
      table: {
        defaultValue: { summary: "small" },
      },
      control: "select",
    },
  },
}

export default meta;
type Story = StoryObj<typeof SearchBar>;

export const Default: Story = {
  play: async ({ canvasElement }: any) => {
    const canvas = within(canvasElement);
    const searchBar = await canvas.getByRole("search-bar");
    expect(searchBar).toBeInTheDocument();

    const input = await canvas.getByRole("input");
    userEvent.type(input, "Search text", { delay: 100 });
  },
};
