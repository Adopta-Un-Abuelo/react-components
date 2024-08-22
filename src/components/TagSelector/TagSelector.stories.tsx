import TagSelector from "./TagSelector";
import { within, userEvent } from "@storybook/test";
import { expect } from "@storybook/test";
import { action } from "@storybook/addon-actions";

export default {
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
        subtitle: "Subtitle 2",
      },
      {
        id: "option3",
        title: "Option 3",
        subtitle: "Subtitle 3",
      },
      {
        id: "option4",
        title: "Option 4",
      },
      {
        id: "option9",
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
        id: "option8",
        title: "sá",
      },
      {
        id: "option8",
        title: "do",
      },
      {
        id: "option8",
        title: "Mañana",
        subtitle: "10: 00 - 12: 00 h",

      },
      {
        id: "option8",
        title: "Tardes",
        subtitle: "10: 00 - 12: 00 h",

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
        id: 'theatre',
        title: '🎭 teatro',
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
    onChange: action("onChange"),
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

export const SingleSelection = {
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

export const MultipleSelection = {
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