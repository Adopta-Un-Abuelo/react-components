import Tabs from "./Tabs";
import { userEvent, within } from "@storybook/test";
import { expect } from "@storybook/test";
import { action } from "@storybook/addon-actions";

export default {
  title: "Components/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  args: {
    options: [
      {
        id: "option1",
        title: "Option 1",
      },
      {
        id: "option2",
        title: "Option 2",
      },
      {
        id: "option3",
        title: "Option 3",
      },
    ],
    onChange: action("onChange"),
  },
};

export const Primary = {
  args: {
    design: "primary",
  },
  play: async ({ canvasElement, step }: any) => {
    const canvas = within(canvasElement);
    const container = await canvas.getByRole("container");
    const tab = await canvas.findByRole("option3");
    await step("render", async () => {
      expect(container).toBeInTheDocument();
      expect(tab).toBeInTheDocument();
    });
    await step("click", async () => {
      userEvent.click(tab);
    });
  },
};

export const Secondary = {
  args: {
    design: "secondary",
  },
  play: async ({ canvasElement, step }: any) => {
    const canvas = within(canvasElement);
    const container = await canvas.getByRole("container");
    const tab = await canvas.findByRole("option3");
    await step("render", async () => {
      expect(container).toBeInTheDocument();
      expect(tab).toBeInTheDocument();
    });
    await step("click", async () => {
      userEvent.click(tab);
    });
  },
};
