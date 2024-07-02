import TextArea from "./TextArea";
import { within } from "@storybook/test";
import { expect } from "@storybook/test";
import { action } from "@storybook/addon-actions";

export default {
  title: "Components/TextArea",
  component: TextArea,
  tags: ["autodocs"],
  args: {
    placeholder: "Placeholder",
    onChange: action("onChange"),
  },
};

export const Default = {
  args: {
    type: "default",
  },
  play: async ({ canvasElement }: any) => {
    const canvas = within(canvasElement);
    const searchBar = await canvas.getByRole("text-area");
    expect(searchBar).toBeInTheDocument();
  },
};

export const Editor = {
  args: {
    type: "edit",
    style: {
      height: 300,
    },
  },
  play: async ({ canvasElement }: any) => {
    const canvas = within(canvasElement);
    const searchBar = await canvas.getByRole("text-area");
    expect(searchBar).toBeInTheDocument();
  },
};
