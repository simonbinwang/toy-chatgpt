import React from "react";
import { UserInput } from "./components/UserInput";
import { UserMessage } from "./components/UserMessage";
import { BotMessage } from "./components/BotMessage";
import { observer } from "mobx-react-lite";
import { messageStore } from "./store/MessageStore";
import { chatEngine } from "./store/ChatEngine";
import { useInitConfig } from "./hooks/useInitConfig";
import { ConfigForm } from "./components/ConfigForm";
import { configStore } from "./store/ConfigStore";
import { applySnapshot, getSnapshot } from "mobx-state-tree";
import {
  Box,
  createTheme,
  CssBaseline,
  Grid,
  TextField,
  ThemeProvider,
} from "@mui/material";
import Layout from "./components/Layout";

const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#303030", // Change this value to adjust the background color
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            backgroundColor: "#4a4a4a", // Change this value to adjust the TextField background color
          },
        },
      },
    },
  },
});

function App() {
  const ready = useInitConfig();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout
        leftChildren={
          ready ? (
            <ConfigForm
              defaultValue={getSnapshot(configStore)}
              onChange={(values) => {
                applySnapshot(configStore, values);
              }}
            />
          ) : null
        }
        rightChildren={
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box sx={{ width: "100%", flexGrow: 1 }}>
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
            </Box>
            <UserInput
              textFieldProps={{
                variant: "outlined",
                placeholder: "Type here...",
                sx: {
                  width: "100%",
                },
              }}
              onChange={(message) => {
                chatEngine.addUserMessage(message);
              }}
            />
          </Box>
        }
      />
    </ThemeProvider>
  );
}

export default observer(App);
