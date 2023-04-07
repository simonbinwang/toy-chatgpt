import { types } from "mobx-state-tree";
import { getAzureChatTokenGenerator } from "../utils/azureChatTokenGenerator";

const Message = types
  .model("Message", {
    role: types.enumeration("Role", ["user", "assistant"]),
    content: types.string,
    isCompleted: types.optional(types.boolean, false),
  })
  .views((self) => ({
    get item() {
      return { role: self.role, content: self.content };
    },
  }))
  .actions((self) => ({
    updateContent(newContent: string) {
      self.content = newContent;
    },
    updateIsCompleted(newIsCompleted: boolean) {
      self.isCompleted = newIsCompleted;
    },
  }));

const MessageStore = types
  .model("MessageStore", {
    messages: types.array(Message),
  })
  .views((self) => ({
    get items() {
      return self.messages.map((message) => message.item);
    },
  }))
  .actions((self) => ({
    addMessage(message: { role: string; content: string }) {
      self.messages.push(message);
    },
  }));

const ChatEngine = types
  .model("ChatEngine", {
    messageStore: MessageStore,
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
        "https://test-openai-simonbw.openai.azure.com/openai/deployments/gpt35-0301/chat/completions?api-version=2023-03-15-preview",
        "62fe8fa72ae044e0a3803989d06539fe",
        [{ role: "system", content: "" }, ...self.messageStore.items]
      );

      for await (const token of tokenGenerator) {
        botMessage.updateContent(botMessage.content + token);
      }
      botMessage.updateIsCompleted(true);
    },
  }));

export const messageStore = MessageStore.create({
  messages: [],
});

export const chatEngine = ChatEngine.create({
  messageStore,
});
