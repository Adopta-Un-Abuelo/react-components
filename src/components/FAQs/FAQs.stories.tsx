import type { Meta, StoryObj } from '@storybook/react';
import FAQs from "./FAQs";
import { userEvent, within } from "@storybook/test";
import { action } from "@storybook/addon-actions";
import { expect } from "@storybook/test";

const meta: Meta<typeof FAQs> ={
  title: "Components/FAQs",
  component: FAQs,
  tags: ["autodocs"],
  args: {
    options: [
      {
        id: "option1",
        title: "Option 1",
        description: "This is a sublabel 1",
      },
      {
        id: "option2",
        title: "Option 2",
        description: "This is a sublabel 2",
      },
      {
        id: "option3",
        title: "Option 3",
        description: "This is a sublabel 3",
      },
      {
        id: "option4",
        title: "Option 4",
        description: "This is a sublabel 4",
      },
    ],
    onClick: action("onChange"),
  },
}

export default meta;

type Story = StoryObj<typeof FAQs>;

export const Default: Story = {
  play: async ({ canvasElement, step }: any) => {
    const canvas = within(canvasElement);
    const container = canvas.getByRole("container");
    const cell = canvas.getByRole("option3");
    await step("render list", async () => {
      expect(container).toBeInTheDocument();
    });
    await step("render checkboxs", async () => {
      expect(cell).toBeInTheDocument();
    });
    await step("select", async () => {
      userEvent.click(cell);
    });
  },
};
