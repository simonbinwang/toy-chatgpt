import type { Meta, StoryObj } from "@storybook/react";

import Layout from "./Layout";

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
const meta = {
  title: "Components/Layout",
  component: Layout,
  tags: ["autodocs"],
  // argTypes: {},
} satisfies Meta<typeof Layout>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/7.0/react/writing-stories/args
export const Demo: Story = {
  args: {},
};
