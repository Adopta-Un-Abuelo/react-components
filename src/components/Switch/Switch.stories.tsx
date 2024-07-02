import Switch from "./Switch";
import { within, userEvent } from "@storybook/test";
import { expect } from "@storybook/test";
import { action } from "@storybook/addon-actions";

import { Flag, FlagOff } from "lucide-react";

export default {
  title: "Components/Switch",
  component: Switch,
  tags: ["autodocs"],
  args: {
    options: [
      {
        id: "option1",
        icon: <Flag height={20} width={20} />,
      },
      {
        id: "option2",
        icon: <FlagOff />,
      },
    ],
    onChange: action("onChange"),
  },
};

export const Default = {
  args: {
    type: "single",
  },
  play: async ({ canvasElement, step }: any) => {
    const canvas = within(canvasElement);
    const container = await canvas.getByRole("container");
    await step("render", async () => {
      expect(container).toBeInTheDocument();
    });
    await step("click cell", async () => {
      const radiobutton = await canvas.findByRole("option2");
      await userEvent.click(radiobutton);
    });
  },
};
