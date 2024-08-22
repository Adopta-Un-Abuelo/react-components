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
        subtitle: "Default Subtitle", 
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
        subtitle: "Default Subtitle",
      },
      {
        id: "option13",
        title: "lu",
        subtitle: "Default Subtitle",
      },
      {
        id: "option5",
        title: "ma",
        subtitle: "Default Subtitle",
      },
      {
        id: "option6",
        title: "mi",
        subtitle: "Default Subtitle",
      },
      {
        id: "option7",
        title: "ju",
        subtitle: "Default Subtitle",
      },
      {
        id: "option8",
        title: "vi",
        subtitle: "Default Subtitle",
      },
      {
        id: "option9",
        title: "sá",
        subtitle: "Default Subtitle",
      },
      {
        id: "option10",
        title: "do",
        subtitle: "Default Subtitle",
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
      },
      {
        id: 'knitt',
        title: '🧵 costura',
        subtitle: "Default Subtitle",
      },
      {
        id: 'tech',
        title: '📱 tecnología',
        subtitle: "Default Subtitle",
      },
      {
        id: 'theatre',
        title: '🎭 teatro',
        subtitle: "Default Subtitle",
      },
      {
        id: 'movies',
        title: '🎬 cine',
        subtitle: "Default Subtitle",
      },
      {
        id: 'travel',
        title: '🧳 viajar',
        subtitle: "Default Subtitle",
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

export const MultipleWithSubtitleSelection = {
  args: {
    type: "multipleSubtitle",
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