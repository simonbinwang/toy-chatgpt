import React from "react";
import { UserInput } from "./components/UserInput";
import { Container } from "@mui/material";
import { UserMessage } from "./components/UserMessage";
import { BotMessage } from "./components/BotMessage";
import { observer } from "mobx-react-lite";
import { messageStore } from "./store/MessageStore";
import { chatEngine } from "./store/ChatEngine";
import { useInitConfig } from "./hooks/useInitConfig";
import { ConfigForm } from "./components/ConfigForm";
import { configStore } from "./store/ConfigStore";
import { applySnapshot, getSnapshot } from "mobx-state-tree";

function App() {
  const ready = useInitConfig();

  return (
    <Container>
      {ready ? (
        <ConfigForm
          defaultValue={getSnapshot(configStore)}
          onChange={(values) => {
            applySnapshot(configStore, values);
          }}
        />
      ) : null}
      <UserInput
        onChange={(message) => {
          chatEngine.addUserMessage(message);
        }}
      />
      {messageStore.messages.map((message) => {
        return message.role === "user" ? (
          <UserMessage message={message.content} />
        ) : (
          <BotMessage
            message={message.content}
            isCompleted={message.isCompleted}
          />
        );
      })}
    </Container>
  );
}

export default observer(App);
