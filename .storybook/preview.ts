import type { Preview } from "@storybook/nextjs";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  tags: ["autodocs", "autodocs"]
};

export default preview;
