import RadioButton from "./RadioButtonList";
import { within, userEvent, expect } from "storybook/test";
import type { Meta, StoryObj } from '@storybook/nextjs';

import { action } from "storybook/actions";

const meta: Meta<typeof RadioButton> = {
  title: "Components/RadioButton",
  component: RadioButton,
  tags: ["autodocs"],
  args: {
    options: [
      {
        id: "option1",
        children: "Option 1",
        selected: true,
      },
      {
        id: "option2",
        children: "Option 2",
      },
      {
        id: "option3",
        children: "Option 3",
      },
      {
        id: "option4",
        children: "Option 4",
      },
    ],
    onChange: action("onChange"),
  },
}


export default meta;
type Story = StoryObj<typeof RadioButton>;

export const SingleSelection: Story = {
  args: {
    type: "single",
  },
  play: async ({ canvasElement, step }: any) => {
    const canvas = within(canvasElement);
    const radiobuttonlist = await canvas.getByRole("radiobuttonlist");
    await step("render list", async () => {
      expect(radiobuttonlist).toBeInTheDocument();
    });
    await step("render cell", async () => {
      const radiobutton = await canvas.findByRole("option2");
      expect(radiobutton).toBeInTheDocument();
    });
    await step("click cell", async () => {
      const radiobutton = await canvas.findByRole("option2");
      await userEvent.click(radiobutton);
    });
  },
};

export const MultipleSelection: Story = {
  args: {
    type: "multiple",
  },
  play: async ({ canvasElement, step }: any) => {
    const canvas = within(canvasElement);
    const radiobuttonlist = await canvas.getByRole("radiobuttonlist");
    await step("render list", async () => {
      expect(radiobuttonlist).toBeInTheDocument();
    });
    await step("render cell", async () => {
      const radiobutton = await canvas.findByRole("option2");
      expect(radiobutton).toBeInTheDocument();
    });
    await step("click cell", async () => {
      const radiobutton = await canvas.findByRole("option2");
      await userEvent.click(radiobutton);
    });
  },
};
