import Label from "./Label";
import { expect, within } from "storybook/test";
import type { Meta, StoryObj } from '@storybook/nextjs';
import { Monitor } from "lucide-react";


const meta: Meta<typeof Label> = {
  title: "Components/Label",
  component: Label,
  tags: ["autodocs"],
  args: {
    text: "done",
  },
}
export default meta;
type Story = StoryObj<typeof Label>;

export const Default: Story = {
  args: {
    type: "label",
  },
  play: async ({ canvasElement }: any) => {
    const canvas = within(canvasElement);
    const label = await canvas.getByRole("label");
    expect(label).toBeInTheDocument();
  },
};

export const DefaultIcon: Story = {
  args: {
    icon: <Monitor size={16} color= "#448B6D" />,
    type: "label",
  },
  play: async ({ canvasElement }: any) => {
    const canvas = within(canvasElement);
    const label = await canvas.getByRole("label");
    expect(label).toBeInTheDocument();
  },
};

export const Chip: Story = {
  args: {
    type: "chip",
  },
  play: async ({ canvasElement }: any) => {
    const canvas = within(canvasElement);
    const label = await canvas.getByRole("chip");
    expect(label).toBeInTheDocument();
  },
};
