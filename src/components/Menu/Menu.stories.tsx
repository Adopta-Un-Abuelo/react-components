import Menu from "./Menu";
import { userEvent, within, expect } from "@storybook/test";
import { action } from "@storybook/addon-actions";
import type { Meta, StoryObj } from '@storybook/react';
import { Package, Palette, Option } from "lucide-react";

const meta: Meta<typeof Menu> ={
  title: "Components/Menu",
  component: Menu,
  tags: ["autodocs"],
  args: {
    id: "select",
    position: "bottom-right",
    children: "Select children",
    onChange: action("onChange"),
    onClick: action("onClick"),
  },

}

export default meta;
type Story = StoryObj<typeof Menu>;

export const Default: Story = {
  play: async ({ canvasElement, step }: any) => {
    const canvas = within(canvasElement);
    const select = await canvas.getByRole("menu");
    await step("render", async () => {
      expect(select).toBeInTheDocument();
    });
    await step("on menu click", async () => {
      userEvent.click(select);
    });
  },
};

export const MenuList: Story = {
  args: {
    children: undefined,
    options: [
      {
        id: "option1",
        label: "Option 1",
        icon: <Option height={20} width={20} />,
      },
      {
        id: "option2",
        label: "Option 2",
        icon: <Palette height={20} width={20} />,
      },
      {
        id: "option3",
        label: "Option 3",
        icon: <Package height={20} width={20} />,
      },
    ],
  },
  play: async ({ canvasElement, step }: any) => {
    const canvas = within(canvasElement);
    const select = await canvas.getByRole("menu");
    await step("render", async () => {
      expect(select).toBeInTheDocument();
    });
    await step("on menu click", async () => {
      userEvent.click(select);
    });
  },
};
