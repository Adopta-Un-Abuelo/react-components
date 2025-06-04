import TagSelector from "./TagSelector";
import { within, userEvent, expect, fn } from "storybook/test";

import type { Meta, StoryObj } from '@storybook/nextjs';

const meta: Meta<typeof TagSelector> = {
  title: "Components/TagSelector",
  component: TagSelector,
  tags: ["autodocs"],
  args: {
    options: [
      {
        id: "option1",
        title: "Option 1", 
      },
      {
        id: "option2",
        title: "Option 2",
      
      },
      {
        id: "option3",
        title: "Option 3",
      
      },
      {
        id: "option4",
        title: "Option 4",
      },
      {
        id: "option13",
        title: "lu",
      },
      {
        id: "option5",
        title: "ma",
      },
      {
        id: "option6",
        title: "mi",
      },
      {
        id: "option7",
        title: "ju",
      },
      {
        id: "option8",
        title: "vi",
      },
      {
        id: "option9",
        title: "sá",
      },
      {
        id: "option10",
        title: "do",
      },
      {
        id: 'knitt',
        title: '🧵 costura',
      },
      {
        id: 'tech',
        title: '📱 tecnología',
      },
      {
        id: 'theatre',
        title: '🎭 teatro',
      },
      {
        id: 'movies',
        title: '🎬 cine',
      },
      {
        id: 'travel',
        title: '🧳 viajar',
      },
      
    ],
    onChange: fn(),
  },
  parameters: {
    backgrounds: {
      default: 'custom',
      values: [
        { 
          name: 'custom', 
          value: 'var(--surface-background, #f9f6f3)' // Change to FFF to background-color  
        },
      ],
    },
  },
};

export default meta;
type Story = StoryObj<typeof TagSelector>;

export const SingleSelection: Story = {
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
      const cell2 = await canvas.findByRole("option2");
      await userEvent.click(cell2);
    });
  },
};

export const MultipleSelection: Story = {
  args: {
    type: "multiple",
  },
  play: async ({ canvasElement, step }: any) => {
    const canvas = within(canvasElement);
    const container = await canvas.getByRole("container");
    await step("render", async () => {
      expect(container).toBeInTheDocument();
    });
    await step("click cell", async () => {
      const cell2 = await canvas.findByRole("option2");
      const cell3 = await canvas.findByRole("option3");
      await userEvent.click(cell2);
      await userEvent.click(cell3);
    });
  },
};

export const MultipleWithSubtitleSelection = {
  args: {
    type: "multiple",
    options: [
      {
        id: "option2",
        title: "Option 2",
        subtitle: "Subtitle 2",
      },
      {
        id: "option3",
        title: "Option 3",
        subtitle: "Subtitle 3",
      },
      {
        id: "option11",
        title: "Mañana",
        subtitle: "10:00 - 12:00 h",
      },
      {
        id: "option12",
        title: "Tardes",
        subtitle: "10:00 - 12:00 h",
      }
    ],
  },
  play: async ({ canvasElement, step }: any) => {
    const canvas = within(canvasElement);
    const container = await canvas.getByRole("container");
    await step("render", async () => {
      expect(container).toBeInTheDocument();
    });
    await step("click cell", async () => {
      const cell2 = await canvas.findByRole("option2");
      const cell3 = await canvas.findByRole("option3");
      await userEvent.click(cell2);
      await userEvent.click(cell3);
    });
  },
};
