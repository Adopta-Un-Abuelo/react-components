import type { Meta, StoryObj } from '@storybook/react';
import Input from "./Input";
import { userEvent, within , expect } from "@storybook/test";
import { action } from "@storybook/addon-actions";

import { Flag, Search, Clock } from "lucide-react";

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  tags: ["autodocs"],
  args: {
    placeholder: "Placeholder",
    defaultValue: "Default value",
    onChange: action("onChange"),
    onOptionClick: action("onOptionClick"),
  },
  argTypes: {
    $design: {
      table: {
        defaultValue: { summary: "primary" },
      },
      control: "select",
      options: ["primary", "secondary"],
    },
    hideCalendar: {
      table: {
        defaultValue: { summary: "false" },
      },
      control: "boolean",
    },
    type: {
      table: {
        defaultValue: { summary: "text" },
      },
      control: "select",
    },
  },
}

export default meta;
type Story = StoryObj<typeof Input>;

export const Primary: Story = {
  args: {
    $design: "primary",
  },
  play: async ({ canvasElement, step }: any) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("input");
    await step("render", async () => {
      expect(input).toBeInTheDocument();
    });
    await step("typing", async () => {
      userEvent.type(input, " example", { delay: 100 });
    });
  },
};

export const PrimaryWithIcon: Story = {
  args: {
    $design: "primary",
    $icon: <Flag role="icon" width={20} height={20} />,
  },
  play: async ({ canvasElement, step }: any) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("input");
    const icon = canvas.getByRole("icon");
    await step("render", async () => {
      expect(input).toBeInTheDocument();
      expect(icon).toBeInTheDocument();
    });
    await step("typing", async () => {
      userEvent.type(input, " example", { delay: 100 });
    });
  },
};

export const PrimaryWithError: Story = {
  args: {
    $design: "primary",
    $error: "Error message",
  },
  play: async ({ canvasElement, step }: any) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("input");
    const error = canvas.getByRole("error");
    await step("render", async () => {
      expect(input).toBeInTheDocument();
      expect(error).toBeInTheDocument();
    });
    await step("typing", async () => {
      userEvent.type(input, " example", { delay: 100 });
    });
  },
};

export const Secondary: Story = {
  args: {
    $design: "secondary",
  },
  play: async ({ canvasElement, step }: any) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("input");
    const placeholder = canvas.getByRole("placeholder");
    await step("render", async () => {
      expect(input).toBeInTheDocument();
      expect(placeholder).toBeInTheDocument();
    });
    await step("typing", async () => {
      userEvent.type(input, " example", { delay: 100 });
    });
  },
};

export const SecondaryWithIcon: Story = {
  args: {
    $design: "secondary",
    
    $icon: <Flag role="icon" width={20} height={20} />,
  },
  play: async ({ canvasElement, step }: any) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("input");
    const placeholder = canvas.getByRole("placeholder");
    const icon = canvas.getByRole("icon");
    await step("render", async () => {
      expect(input).toBeInTheDocument();
      expect(placeholder).toBeInTheDocument();
      expect(icon).toBeInTheDocument();
    });
    await step("typing", async () => {
      userEvent.type(input, " example", { delay: 100 });
    });
  },
};

export const SecondaryWithError: Story = {
  args: {
    $design: "secondary",
    $error: "Error message",
  },
  play: async ({ canvasElement, step }: any) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("input");
    const placeholder = canvas.getByRole("placeholder");
    const error = canvas.getByRole("error");
    await step("render", async () => {
      expect(input).toBeInTheDocument();
      expect(placeholder).toBeInTheDocument();
      expect(error).toBeInTheDocument();
    });
    await step("typing", async () => {
      userEvent.type(input, " example", { delay: 100 });
    });
  },
};

export const InputTime: Story = {
  args: {
    $design: "secondary",
    type: "time",
    defaultValue: "10:00",
  },
  play: async ({ canvasElement, step }: any) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("input");
    const placeholder = canvas.getByRole("placeholder");
    await step("render", async () => {
      expect(input).toBeInTheDocument();
      expect(placeholder).toBeInTheDocument();
    });
    await step("typing", async () => {
      userEvent.type(input, " example", { delay: 100 });
    });
  },
};

export const InputNumber: Story = {
  args: {
    $design: "secondary",
    type: "number",
    defaultValue: 20,
  },
  play: async ({ canvasElement, step }: any) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("input");
    const placeholder = canvas.getByRole("placeholder");
    await step("render", async () => {
      expect(input).toBeInTheDocument();
      expect(placeholder).toBeInTheDocument();
    });
    await step("typing", async () => {
      userEvent.type(input, "23", { delay: 100 });
    });
  },
};

export const InputTelephone: Story = {
  args: {
    $design: "secondary",
    type: "tel",
    defaultValue: undefined,
  },
  play: async ({ canvasElement, step }: any) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("input");
    const placeholder = canvas.getByRole("placeholder");
    await step("render", async () => {
      expect(input).toBeInTheDocument();
      expect(placeholder).toBeInTheDocument();
    });
    await step("country selection", async () => {
      const select = canvas.getByRole("select");
      userEvent.click(select);
      const menu = await canvas.findByRole("menu");
      expect(menu).toBeVisible();
      const option = await canvas.findByRole("country17");
      userEvent.click(option);
    });
    await step("typing", async () => {
      userEvent.type(input, "912345678", { delay: 100 });
    });
  },
};

export const InputEmail: Story = {
  args: {
    $design: "secondary",
    type: "email",
    defaultValue: undefined,
  },
  play: async ({ canvasElement, step }: any) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("input");
    const placeholder = canvas.getByRole("placeholder");
    await step("render", async () => {
      expect(input).toBeInTheDocument();
      expect(placeholder).toBeInTheDocument();
    });
    await step("typing", async () => {
      userEvent.type(input, "test@test.com", { delay: 100 });
    });
  },
};

export const InputDate: Story = {
  args: {
    $design: "secondary",
    type: "date",
    defaultValue: undefined,
  },
  play: async ({ canvasElement, step }: any) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("input");
    const placeholder = canvas.getByRole("placeholder");
    await step("render", async () => {
      expect(input).toBeInTheDocument();
      expect(placeholder).toBeInTheDocument();
    });
    await step("typing", async () => {
      userEvent.type(input, "23052023", { delay: 100 });
    });
  },
};

export const InputDateWithCalendar: Story = {
  args: {
    $design: "secondary",
    type: "date",
    $showCalendar: true,
    defaultValue: undefined,
  },
  play: async ({ canvasElement, step }: any) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("input");
    const placeholder = canvas.getByRole("placeholder");
    await step("render", async () => {
      expect(input).toBeInTheDocument();
      expect(placeholder).toBeInTheDocument();
    });
    await step("typing", async () => {
      userEvent.type(input, "23052023", { delay: 100 });
    });
  },
};

export const InputPassword: Story = {
  args: {
    $design: "secondary",
    type: "password",
    defaultValue: undefined,
  },
  play: async ({ canvasElement, step }: any) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("input");
    const placeholder = canvas.getByRole("placeholder");
    await step("render", async () => {
      expect(input).toBeInTheDocument();
      expect(placeholder).toBeInTheDocument();
    });
    await step("typing", async () => {
      userEvent.type(input, "password", { delay: 100 });
    });
  },
};

export const InputRange: Story = {
  args: {
    $design: "secondary",
    type: "range",
    min: 0,
    max: 100,
    $unit: "€",
    defaultValue: 40,
  },
  play: async ({ canvasElement, step }: any) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("input");
    const range = canvas.getByRole("range");
    await step("render", async () => {
      expect(input).toBeInTheDocument();
      expect(range).toBeInTheDocument();
    });
  },
};
export const InputRangeWithoutRangeView: Story = {
  args: {
    $design: "secondary",
    type: "range",
    min: 0,
    max: 100,
    $unit: "€",
    defaultValue: 40,
    $hideRange: true,
  },
  play: async ({ canvasElement, step }: any) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("input");
    await step("render", async () => {
      expect(input).toBeInTheDocument();
    });
  },
};

export const InputLocation: Story = {
  args: {
    $design: "secondary",
    type: "location",
    $icon: <Search role="icon" />,
    defaultValue: undefined,
  },
  play: async ({ canvasElement, step }: any) => {
    /*const canvas = within(canvasElement);
		const input = await canvas.findByRole('combobox');
        const placeholder = canvas.getByRole('placeholder');
        await step('render', async () =>{
            expect(input).toBeInTheDocument();
            expect(placeholder).toBeInTheDocument();
        });
        await step('typing', async () =>{
            await userEvent.type(input, 'calle Alcalá', { delay: 100 });
        });
        await step('select address option', async () =>{
            await new Promise((resolve) => setTimeout(resolve, 500));
            const menu = await canvas.findByRole('menu');
            expect(menu).toBeVisible();
            await new Promise((resolve) => setTimeout(resolve, 500));
            const cell = await canvas.findByRole('cell2');
            userEvent.click(cell);
        });*/
  },
};

export const InputDateRange: Story = {
  args: {
    $design: "secondary",
    type: "range-date",
  },
};

export const InputImage: Story = {
  args: {
    $design: "secondary",
    type: "image",
    options: ["camera", "library"],
  },
  play: async ({ canvasElement, step }: any) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button");
    await step("render", async () => {
      expect(button).toBeInTheDocument();
    });
  },
};

export const InputChat: Story = {
  args: {
    $design: "secondary",
    type: "chat",
  },
};

export const InputChatWithOptions: Story = {
  args: {
    $design: "secondary",
    type: "chat",
    options: [
      {
        id: "reminder",
        label: "Crear recordatorio",
        icon: <Clock />,
      },
    ],
  },
};

export const InputCode: Story = {
  args: {
    $design: "secondary",
    type: "code",
  },
  play: async ({ canvasElement, step }: any) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("input");
    await step("render", async () => {
      expect(input).toBeInTheDocument();
    });
    await step("typing", async () => {
      userEvent.type(input, "000000", { delay: 200 });
    });
  },
};
