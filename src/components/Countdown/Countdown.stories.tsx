import Countdown from "./Countdown";
import Color from "../../constants/Color";
import { within } from "@storybook/test";
import { expect } from "@storybook/test";

export default {
  title: "Components/Countdown",
  component: Countdown,
  tags: ["autodocs"],
  args: {
    toDate: new Date("2024-01-01"),
    color: Color.background.primaryLow,
    textColor: Color.background.primary,
  },
};

export const Default = {
  play: async ({ canvasElement, step }: any) => {
    const canvas = within(canvasElement);
    const container = await canvas.getByRole("container");
    await step("render", async () => {
      expect(container).toBeInTheDocument();
    });
  },
};
