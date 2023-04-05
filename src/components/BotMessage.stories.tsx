import type { Meta, StoryObj } from "@storybook/react";

import { BotMessage } from "./BotMessage";
import { getAzureChatTokenGenerator } from "../utils/azureChatTokenGenerator";
import { useEffect, useState } from "react";

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

export const Test = () => {
  const [lines, setLines] = useState<string[]>([]);
  useEffect(() => {
    const tokenGenerator = getAzureChatTokenGenerator(
      "https://test-openai-simonbw.openai.azure.com/openai/deployments/gpt35-0301/chat/completions?api-version=2023-03-15-preview",
      "62fe8fa72ae044e0a3803989d06539fe",
      [
        { role: "system", content: "" },
        {
          role: "user",
          content: "hello, give me a example of python code",
        },
      ]
    );
    foo();

    async function foo() {
      let str = "";
      for await (const token of tokenGenerator) {
        console.log(token);
        str = str.concat(token);
        const lines = str.split("\n");
        setLines((oldLines) =>
          lines.length > oldLines.length ? lines : oldLines
        );
      }
    }
  }, []);

  return <BotMessage lines={lines} />;
};
