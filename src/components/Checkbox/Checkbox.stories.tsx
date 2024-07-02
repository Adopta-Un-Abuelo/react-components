import CheckboxList from "./CheckboxList";
import { userEvent, within } from "@storybook/test";
import { action } from "@storybook/addon-actions";
import { expect } from "@storybook/test";

export default {
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
        error: "Error 4",
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
};

export const SingleSelection = {
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

export const MultipleSelection = {
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
