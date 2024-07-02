import RadioButton from "./RadioButtonList";
import { within, userEvent } from "@storybook/test";
import { expect } from "@storybook/test";
import { action } from "@storybook/addon-actions";

export default {
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
};

export const SingleSelection = {
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

export const MultipleSelection = {
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
