import CheckboxList from "./CheckboxList";
import { userEvent, within, expect } from "storybook/test";
import { action } from "storybook/actions";
import type { Meta, StoryObj } from '@storybook/nextjs';

const meta: Meta<typeof CheckboxList> = {
  title: "Components/Checkbox",
  component: CheckboxList,
  tags: ["autodocs"],
  args: {
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
  argTypes: {
    type: {
      table: {
        defaultValue: { summary: "multiple" },
      },
      control: "select",
      options: ["single", "multiple"],
    },
  },

}
export default meta;
type Story = StoryObj<typeof CheckboxList>;

export const SingleSelection: Story = {
  args: {
    type: "single",
  },
  play: async ({ canvasElement, step }: any) => {
    const canvas = within(canvasElement);
    const checkboxList = canvas.getByRole("checkboxlist");
    const checkbox0 = await canvas.findByRole("checkbox-0");
    const checkbox1 = await canvas.findByRole("checkbox-1");
    const checkbox2 = await canvas.findByRole("checkbox-2");
    const checkbox3 = await canvas.findByRole("checkbox-3");
    await step("render list", async () => {
      expect(checkboxList).toBeInTheDocument();
    });
    await step("render checkboxs", async () => {
      expect(checkbox0).toBeInTheDocument();
      expect(checkbox1).toBeInTheDocument();
      expect(checkbox2).toBeInTheDocument();
      expect(checkbox3).toBeInTheDocument();
    });
    await step("select", async () => {
      userEvent.click(checkbox0);
    });
  },
};

export const MultipleSelection: Story = {
  args: {
    type: "multiple",
  },
  play: async ({ canvasElement, step }: any) => {
    const canvas = within(canvasElement);
    const checkboxList = canvas.getByRole("checkboxlist");
    const checkbox0 = await canvas.findByRole("checkbox-0");
    const checkbox1 = await canvas.findByRole("checkbox-1");
    const checkbox2 = await canvas.findByRole("checkbox-2");
    const checkbox3 = await canvas.findByRole("checkbox-3");
    await step("render list", async () => {
      expect(checkboxList).toBeInTheDocument();
    });
    await step("render checkboxs", async () => {
      expect(checkbox0).toBeInTheDocument();
      expect(checkbox1).toBeInTheDocument();
      expect(checkbox2).toBeInTheDocument();
      expect(checkbox3).toBeInTheDocument();
    });
    await step("select", async () => {
      userEvent.click(checkbox0);
      userEvent.click(checkbox1);
    });
  },
};
