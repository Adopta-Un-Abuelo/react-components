import TextArea from "./TextArea";
import { within, expect } from "@storybook/test";

import type { Meta, StoryObj } from '@storybook/react';
import { action } from "@storybook/addon-actions";

const meta: Meta<typeof TextArea> = {
  title: "Components/TextArea",
  component: TextArea,
  tags: ["autodocs"],
  args: {
    placeholder: "Placeholder",
    onChange: action("onChange"),
  },
}

export default meta;
type Story = StoryObj<typeof TextArea>;

export const Default: Story = {
  args: {
    type: "default",
  },
  play: async ({ canvasElement }: any) => {
    const canvas = within(canvasElement);
    const searchBar = await canvas.getByRole("text-area");
    expect(searchBar).toBeInTheDocument();
  },
};

export const Editor: Story = {
  args: {
    type: "edit",
    style: {
      height: 300,
    },
  },
  play: async ({ canvasElement }: any) => {
    const canvas = within(canvasElement);
    const searchBar = await canvas.getByRole("text-area");
    expect(searchBar).toBeInTheDocument();
  },
};
