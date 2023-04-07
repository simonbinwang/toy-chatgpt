import { UserInput } from "./components/UserInput";
import { Box, Container } from "@mui/material";
import { UserMessage } from "./components/UserMessage";
import { BotMessage } from "./components/BotMessage";
import { onSnapshot } from "mobx-state-tree";
import { observer } from "mobx-react-lite";
import { chatEngine, messageStore } from "./store/MessageStore";

// onSnapshot(messageStore, (snapshot) => {
//   console.log("snapshot", snapshot);
// });

function App() {
  return (
    <Container>
      <UserInput
        onChange={(message) => {
          chatEngine.addUserMessage(message);
        }}
      />
      {messageStore.messages.map((message) => {
        return message.role === "user" ? (
          <UserMessage message={message.content} />
        ) : (
          <BotMessage message={message.content} />
        );
      })}
    </Container>
  );
}

export default observer(App);
