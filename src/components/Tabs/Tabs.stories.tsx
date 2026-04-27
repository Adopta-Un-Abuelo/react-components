import Tabs from "./Tabs";
import { userEvent, within, expect } from "storybook/test";
import type { Meta, StoryObj } from '@storybook/nextjs';
import type { PlayFunctionContext } from "storybook/internal/csf";
import { action } from "storybook/actions";

const meta: Meta<typeof Tabs> = {
  title: "Components/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  args: {
    options: [
      {
        id: "monthly",
        title: "Mensual",
      },
     
      {
        id: "yearly",
        title: "Anual",
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
  play: async ({ canvasElement, step }: PlayFunctionContext<typeof Tabs>) => {
    const canvas = within(canvasElement);
    const container = await canvas.getByRole("container");
    const tab = await canvas.findByRole("yearly");
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
  play: async ({ canvasElement, step }: PlayFunctionContext<typeof Tabs>) => {
    const canvas = within(canvasElement);
    const container = await canvas.getByRole("container");
    const tab = await canvas.findByRole("yearly");
    await step("render", async () => {
      expect(container).toBeInTheDocument();
      expect(tab).toBeInTheDocument();
    });
    await step("click", async () => {
      userEvent.click(tab);
    });
  },
};

export const Third: Story = {
  args: {
    design: "third",
  },
  play: async ({ canvasElement, step }: PlayFunctionContext<typeof Tabs>) => {
    const canvas = within(canvasElement);
    const container = await canvas.getByRole("container");
    const tab = await canvas.findByRole("yearly");
    await step("render", async () => {
      expect(container).toBeInTheDocument();
      expect(tab).toBeInTheDocument();
    });
    await step("click", async () => {
      userEvent.click(tab);
    });
  },
};
