import type { Meta, StoryObj } from "@storybook/react";

import { BotMessage } from "./BotMessage";

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
const meta = {
  title: "Components/BotMessage",
  component: BotMessage,
  tags: ["autodocs"],
  argTypes: {
    // backgroundColor: { control: 'color' },
  },
} satisfies Meta<typeof BotMessage>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/7.0/react/writing-stories/args
export const Demo: Story = {
  args: {
    message: `
    Hello,
    # title
    - item
    **important**
    \`\`\`js
    const x = 1;
    \`\`\`
    `,
  },
};
