import CellSelector from "./CellSelector";
import { userEvent, within } from "@storybook/test";
import { expect } from "@storybook/test";
import { action } from "@storybook/addon-actions";

import { Goal, Flag, FlagOff, Flame } from "lucide-react";
import Color from "../../constants/Color";

export default {
  title: "Components/CellSelector",
  component: CellSelector,
  tags: ["autodocs"],
  args: {
    id: "dropdown",
    placeholder: "Placeholder",
    options: [
      {
        id: "option1",
        title: "Option 1",
        subtitle: "Option 1 subtitle",
        icon: <Goal height={30} width={30} color={Color.text.high} />,
      },
      {
        id: "option2",
        title: "Option 2",
        icon: <Flag height={30} width={30} color={Color.text.high} />,
      },
      {
        id: "option3",
        title: "Option 3",
        subtitle: "Option 3 subtitle",
        icon: <FlagOff height={30} width={30} color={Color.text.high} />,
      },
      {
        id: "option4",
        title: "Option 4",
        icon: <Flame height={30} width={30} color={Color.text.high} />,
        disabled: true,
      },
    ],
    onChange: action("onChange"),
    onClick: action("onClick"),
  },
};

export const Single = {
  args: {
    type: "single",
  },
  play: async ({ canvasElement, step }: any) => {
    const canvas = within(canvasElement);
    const container = await canvas.getByRole("container");
    const cell = await canvas.getByRole("cell2");
    await step("render", async () => {
      expect(container).toBeInTheDocument();
      expect(cell).toBeInTheDocument();
    });
    await step("click", async () => {
      userEvent.click(cell);
    });
  },
};

export const Multiple = {
  args: {
    type: "multiple",
  },
  play: async ({ canvasElement, step }: any) => {
    const canvas = within(canvasElement);
    const container = await canvas.getByRole("container");
    const cell2 = await canvas.getByRole("cell2");
    const cell1 = await canvas.getByRole("cell1");
    await step("render", async () => {
      expect(container).toBeInTheDocument();
      expect(cell2).toBeInTheDocument();
      expect(cell1).toBeInTheDocument();
    });
    await step("click", async () => {
      userEvent.click(cell1);
      userEvent.click(cell2);
    });
  },
};
