import Tabs from "./Tabs";
import { userEvent, within, expect } from "storybook/test";
import type { Meta, StoryObj } from '@storybook/nextjs';
import { action } from "storybook/actions";

const meta: Meta<typeof Tabs> = {
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
}

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Primary: Story = {
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

export const Secondary: Story = {
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
