import type { Meta, StoryObj } from "@storybook/react";

import { ConfigForm } from "./ConfigForm";

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
const meta = {
  title: "Components/ConfigForm",
  component: ConfigForm,
  tags: ["autodocs"],
  argTypes: {
    // backgroundColor: { control: "color" },
    onChange: { action: "click" },
  },
} satisfies Meta<typeof ConfigForm>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/7.0/react/writing-stories/args
export const Demo: Story = {
  args: {
    defaultValue: { azure: { endpoint: "test", apikey: "test" } },
    // onChange: (value) => console.log(value),
  },
};
