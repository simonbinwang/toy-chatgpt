import React from "react";

interface BotMessageProps {
  message: string;
}
export const BotMessage = ({ message }: BotMessageProps) => {
  const lines = message.split("\n");

  return (
    <div>
      {lines.map((line, i) => (
        <p key={i}>{line}</p>
      ))}
    </div>
  );
};
