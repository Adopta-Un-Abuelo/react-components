import type { Meta, StoryObj } from '@storybook/react';
import DatePickerComponent from "./DatePickerModal";

const meta: Meta<typeof DatePickerComponent> = {
    title: "Components/DatePicker",
    component: DatePickerComponent,
    tags: ["autodocs"],
    args: {
      isVisible: true,
      defaultValue: new Date("2024-01-01"),
      onSave: (date) => alert(`Selected date: ${date}`),
      onClose: () => alert("Close"),
    },
  };

export default meta;
type Story = StoryObj<typeof DatePickerComponent>;


export const Default: Story = {};

  
