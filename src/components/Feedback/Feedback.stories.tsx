import { useState } from "react";
import { userEvent, within } from "@storybook/test";
import { action } from "@storybook/addon-actions";
import { expect } from "@storybook/test";

import Feedback from "./Feedback";

export default {
  title: "Components/Feedback",
  component: Feedback,
  tags: ["autodocs"],
  args: {
    isVisible: false,
    type: "success",
    text: "Test text",
    onClose: action("onClose"),
  },
  argTypes: {
    isVisible: {
      type: {
        required: true,
      },
      description: "boolean",
      table: {
        defaultValue: { summary: false },
      },
    },
    type: {
      type: {
        required: true,
      },
      description: "string",
      table: {
        defaultValue: { summary: "success" },
      },
      control: "select",
      options: ["success", "error"],
    },
    text: {
      type: {
        required: true,
      },
      description: "string",
    },
    onClose: {
      type: {
        required: true,
      },
      description: "() => void",
    },
  },
};

export const Success = (args: any) => {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <div>
      <button role="button" onClick={() => setIsVisible(true)}>
        Show feedback modal
      </button>
      <Feedback
        {...args}
        isVisible={isVisible}
        onClose={() => {
          setIsVisible(false);
          action("onClose");
        }}
      />
    </div>
  );
};
Success.play = async ({ canvasElement, step }: any) => {
  const canvas = within(canvasElement);
  await step("Click button to show Feedback modal", async () => {
    const button = await canvas.getByRole("button");
    await userEvent.click(button);
    const feedback = await canvas.findByRole("feedback");
    expect(feedback).toBeInTheDocument();
  });
};

export const Error = (args: any) => {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <div>
      <button role="button" onClick={() => setIsVisible(true)}>
        Show feedback modal
      </button>
      <Feedback
        {...args}
        isVisible={isVisible}
        onClose={() => {
          setIsVisible(false);
          action("onClose");
        }}
      />
    </div>
  );
};
Error.args = {
  type: "error",
};
Error.play = async ({ canvasElement, step }: any) => {
  const canvas = within(canvasElement);
  await step("Click button to show Feedback modal", async () => {
    const button = await canvas.getByRole("button");
    await userEvent.click(button);
    const feedback = await canvas.findByRole("feedback");
    expect(feedback).toBeInTheDocument();
  });
};
