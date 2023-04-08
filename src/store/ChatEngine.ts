import { types } from "mobx-state-tree";
import { getAzureChatTokenGenerator } from "../utils/azureChatTokenGenerator";
import { configStore, ConfigStore } from "./ConfigStore";
import { messageStore, MessageStore, Message } from "./MessageStore";

const ChatEngine = types
  .model("ChatEngine", {
    messageStore: MessageStore,
    configStore: ConfigStore,
    systemMessage: "",
  })
  .actions((self) => ({
    async addUserMessage(content: string) {
      self.messageStore.addMessage({ role: "user", content });

      const botMessage = Message.create({
        role: "assistant",
        content: "",
        isCompleted: false,
      });
      self.messageStore.addMessage(botMessage);

      const tokenGenerator = getAzureChatTokenGenerator(
        // "https://test-openai-simonbw.openai.azure.com/openai/deployments/gpt35-0301/chat/completions?api-version=2023-03-15-preview",
        self.configStore.azure.endpoint,
        // "62fe8fa72ae044e0a3803989d06539fe",
        self.configStore.azure.apikey,
        [
          { role: "system", content: self.systemMessage },
          ...self.messageStore.items,
        ]
      );

      try {
        for await (const token of tokenGenerator) {
          botMessage.updateContent(botMessage.content + token);
        }
      } catch (e) {
        botMessage.updateContent(String(e));
      } finally {
        botMessage.updateIsCompleted(true);
      }
    },
    setSystemMessage(message: string) {
      self.systemMessage = message;
    },
  }));

export const chatEngine = ChatEngine.create({
  messageStore,
  configStore,
});
