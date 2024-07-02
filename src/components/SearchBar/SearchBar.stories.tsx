import SearchBar from "./SearchBar";
import { userEvent, within } from "@storybook/test";
import { expect } from "@storybook/test";

export default {
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
};

export const Default = {
  play: async ({ canvasElement }: any) => {
    const canvas = within(canvasElement);
    const searchBar = await canvas.getByRole("search-bar");
    expect(searchBar).toBeInTheDocument();

    const input = await canvas.getByRole("input");
    userEvent.type(input, "Search text", { delay: 100 });
  },
};
