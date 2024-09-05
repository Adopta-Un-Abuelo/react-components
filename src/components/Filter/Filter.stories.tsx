import Filter from "./Filter";
import { userEvent, within } from "@storybook/test";
import { action } from "@storybook/addon-actions";
import { expect } from "@storybook/test";

export default {
  title: "Components/Filter",
  component: Filter,
  tags: ["autodocs"],
  args: {
    id: "filter",
    label: "Test filter",
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
    onChange: action("onChange"),
  },
};

export const SingleSelection = {
  args: {
    type: "single",
  },
  play: async ({ canvasElement, step }: any) => {
    const canvas = within(canvasElement);
    const filter = canvas.getByRole("filter");
    const filterButton = canvas.getByRole("filter-button");
    await step("render", async () => {
      expect(filter).toBeInTheDocument();
      expect(filterButton).toBeInTheDocument();
    });
    await step("on filter click", async () => {
      userEvent.click(filterButton);
      const filterMenu = await canvas.findByRole("filter-menu"); 
      expect(filterMenu).toBeInTheDocument();
    });
    await step("on cell click", async () => {
      const filterCell = await canvas.findByRole("checkbox-1");
      userEvent.click(filterCell);
    });
  },
};

export const MultipleSelection = {
  args: {
    type: "multiple",
  },
  play: async ({ canvasElement, step }: any) => {
    const canvas = within(canvasElement);
    const filter = canvas.getByRole("filter");
    const filterButton = canvas.getByRole("filter-button");
    await step("render", async () => {
      expect(filter).toBeInTheDocument();
      expect(filterButton).toBeInTheDocument();
    });
    await step("on filter click", async () => {
      userEvent.click(filterButton);
      const filterMenu = await canvas.findByRole("filter-menu"); 
      expect(filterMenu).toBeInTheDocument();
    });
    await step("on cell click", async () => {
      const filterCell0 = await canvas.findByRole("checkbox-1");
      userEvent.click(filterCell0);
      
    });
  },
};

export const FilterDate = {
  args: {
    type: "date",
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
  },
  play: async ({ canvasElement, step }: any) => {
    const canvas = within(canvasElement);
    const filter = canvas.getByRole("filter");
    await step("render", async () => {
      expect(filter).toBeInTheDocument();
    });
  },
};
