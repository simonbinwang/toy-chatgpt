import React from "react";

interface BotMessageProps {
  // generator result
  lines: string[];
  //   lineGenerator: AsyncGenerator<string, void, unknown>;
}
export const BotMessage = ({ lines }: BotMessageProps) => {
  console.log(lines);
  return (
    <div>
      {lines.map((line, i) => (
        <p key={i}>{line}</p>
      ))}
    </div>
  );
};
