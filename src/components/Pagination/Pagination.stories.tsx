import Pagination from "./Pagination";
import { within, userEvent, expect } from "storybook/test";
import type { Meta, StoryObj } from '@storybook/nextjs';
import { action } from "storybook/actions";


const meta: Meta<typeof Pagination> = {
  title: "Components/Pagination",
  component: Pagination,
  tags: ["autodocs"],
  args: {
    length: 100,
    rowsPerPage: 20,
    onChange: action("onChange"),
  },
}

export default meta;
type Story = StoryObj<typeof Pagination>;

export const Default: Story = {
  play: async ({ canvasElement, step }: any) => {
    const canvas = within(canvasElement);
    const pagination = await canvas.getByRole("pagination");
    const firstArrow = await canvas.getByRole("first-arrow");
    const leftArrow = await canvas.getByRole("left-arrow");
    const rightArrow = await canvas.getByRole("right-arrow");
    const lastArrow = await canvas.getByRole("last-arrow");
    await step("render", async () => {
      expect(pagination).toBeInTheDocument();
      expect(firstArrow).toBeInTheDocument();
      expect(leftArrow).toBeInTheDocument();
      expect(rightArrow).toBeInTheDocument();
      expect(lastArrow).toBeInTheDocument();
    });
    await step("click next", async () => {
      await userEvent.click(rightArrow);
      await userEvent.click(lastArrow);
    });
    await step("click previous", async () => {
      await userEvent.click(leftArrow);
      await userEvent.click(firstArrow);
    });
  },
};
