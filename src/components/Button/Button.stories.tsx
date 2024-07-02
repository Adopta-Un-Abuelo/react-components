import { userEvent, within } from "@storybook/test";
import { action } from "@storybook/addon-actions";
import { expect } from "@storybook/test";

import Button from "./Button";
import { Flag } from "lucide-react";

export default {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  args: {
    size: "normal",
    loading: false,
    disabled: false,
    textColor: undefined,
    children: <p role="label">Button label</p>,
    onSuccess: action("onSuccess"),
  },
  argTypes: {
    design: {
      table: {
        defaultValue: { summary: "primary" },
      },
      control: "select",
      options: ["primary", "secondary", "text", "image", "call-to-action"],
    },
    size: {
      table: {
        defaultValue: { summary: "normal" },
      },
      control: "select",
      options: ["normal", "small"],
    },
    loading: {
      table: {
        defaultValue: { summary: false },
      },
    },
    success: {
      table: {
        defaultValue: { summary: false },
      },
    },
    disabled: {
      table: {
        defaultValue: { summary: false },
      },
    },
    textColor: {
      control: "color",
      table: {
        defaultValue: { summary: "#000000C7" },
      },
    },
    iconPosition: {
      table: {
        defaultValue: { summary: "left" },
      },
      control: "select",
      options: ["left", "right"],
    },
    animationDelay: {
      table: {
        defaultValue: { summary: 600 },
      },
    },
    animationTime: {
      table: {
        defaultValue: { summary: 0.3 },
      },
    },
  },
};

export const Primary = {
  args: {
    design: "primary",
    success: false,
  },
  play: async ({ canvasElement, step }: any) => {
    const canvas = within(canvasElement);
    const button = await canvas.getByRole("button");
    await step("render", async () => {
      expect(button).toBeInTheDocument();
    });
    await step("hover and click", async () => {
      await userEvent.hover(button);
      await userEvent.click(button);
    });
  },
};

export const PrimaryWithIcon = {
  args: {
    design: "primary",
    success: false,
    icon: <Flag role="icon" height={20} width={20} />,
  },
  play: async ({ canvasElement, step }: any) => {
    const canvas = within(canvasElement);
    const button = await canvas.getByRole("button");
    const icon = await canvas.getByRole("icon");
    await step("render", async () => {
      expect(button).toBeInTheDocument();
      expect(icon).toBeInTheDocument();
    });
    await step("hover and click", async () => {
      await userEvent.hover(button);
      await userEvent.click(button);
    });
  },
};

export const Secondary = {
  args: {
    design: "secondary",
    success: false,
  },
  play: async ({ canvasElement, step }: any) => {
    const canvas = within(canvasElement);
    const button = await canvas.getByRole("button");
    await step("render", async () => {
      expect(button).toBeInTheDocument();
    });
    await step("hover and click", async () => {
      await userEvent.hover(button);
      await userEvent.click(button);
    });
  },
};

export const SecondaryWithIcon = {
  args: {
    design: "secondary",
    success: false,
    icon: <Flag role="icon" height={20} width={20} />,
  },
  play: async ({ canvasElement, step }: any) => {
    const canvas = within(canvasElement);
    const button = await canvas.getByRole("button");
    const icon = await canvas.getByRole("icon");
    await step("render", async () => {
      expect(button).toBeInTheDocument();
      expect(icon).toBeInTheDocument();
    });
    await step("hover and click", async () => {
      await userEvent.hover(button);
      await userEvent.click(button);
    });
  },
};

export const ButtonText = {
  args: {
    design: "text",
  },
  play: async ({ canvasElement, step }: any) => {
    const canvas = within(canvasElement);
    const button = await canvas.getByRole("button");
    await step("render", async () => {
      expect(button).toBeInTheDocument();
    });
    await step("hover and click", async () => {
      await userEvent.hover(button);
      await userEvent.click(button);
    });
  },
};

export const ButtonTextWithIcon = {
  args: {
    design: "text",
    icon: <Flag role="icon" height={20} width={20} />,
  },
  play: async ({ canvasElement, step }: any) => {
    const canvas = within(canvasElement);
    const button = await canvas.getByRole("button");
    const icon = await canvas.getByRole("icon");
    await step("render", async () => {
      expect(button).toBeInTheDocument();
      expect(icon).toBeInTheDocument();
    });
    await step("hover and click", async () => {
      await userEvent.hover(button);
      await userEvent.click(button);
    });
  },
};

export const ButtonImage = {
  args: {
    design: "image",
    icon: <Flag role="icon" height={20} width={20} />,
    children: undefined,
  },
  play: async ({ canvasElement, step }: any) => {
    const canvas = within(canvasElement);
    const button = await canvas.getByRole("button");
    const icon = await canvas.getByRole("icon");
    await step("render", async () => {
      expect(button).toBeInTheDocument();
      expect(icon).toBeInTheDocument();
    });
    await step("hover and click", async () => {
      await userEvent.hover(button);
      await userEvent.click(button);
    });
  },
};

export const ButtonImageWithLabel = {
  args: {
    design: "image",
    icon: <Flag role="icon" height={20} width={20} />,
  },
  play: async ({ canvasElement, step }: any) => {
    const canvas = within(canvasElement);
    const button = await canvas.getByRole("button");
    const icon = await canvas.getByRole("icon");
    await step("render", async () => {
      expect(button).toBeInTheDocument();
      expect(icon).toBeInTheDocument();
    });
    await step("hover and click", async () => {
      await userEvent.hover(button);
      await userEvent.click(button);
    });
  },
};

export const CallToAction = {
  args: {
    design: "call-to-action",
    children: <p role="label">Call To Action</p>,
  },
  play: async ({ canvasElement, step }: any) => {
    const canvas = within(canvasElement);
    const button = await canvas.getByRole("button");
    await step("render", async () => {
      expect(button).toBeInTheDocument();
    });
    await step("hover and click", async () => {
      await userEvent.hover(button);
      await userEvent.click(button);
    });
  },
};

export const CallToActionWithIcon = {
  args: {
    design: "call-to-action",
    children: <p role="label">Call To Action</p>,
    icon: <Flag role="icon" />,
    iconPosition: "left",
  },
  play: async ({ canvasElement, step }: any) => {
    const canvas = within(canvasElement);
    const button = await canvas.getByRole("button");
    const icon = await canvas.getByRole("icon");
    await step("render", async () => {
      expect(button).toBeInTheDocument();
      expect(icon).toBeInTheDocument();
    });
    await step("hover and click", async () => {
      await userEvent.hover(button);
      await userEvent.click(button);
    });
  },
};
