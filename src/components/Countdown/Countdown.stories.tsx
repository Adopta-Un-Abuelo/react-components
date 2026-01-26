import type { Meta, StoryObj } from '@storybook/nextjs';
import Countdown from "./Countdown";
import Color from "@constants/Color";
import { expect,within } from "storybook/test";

const meta: Meta<typeof Countdown> = {
  title: "Components/Countdown",
  component: Countdown,
  tags: ["autodocs"],
  args: {
    toDate: new Date("2024-01-01"),
    color: Color.background.primaryLow,
    textColor: Color.background.primary,
  },
}

export default meta;
type Story = StoryObj<typeof Countdown>;

export const Default: Story = {
  play: async ({ canvasElement, step }: any) => {
    const canvas = within(canvasElement);
    const container = await canvas.getByRole("container");
    await step("render", async () => {
      expect(container).toBeInTheDocument();
    });
  },
};
