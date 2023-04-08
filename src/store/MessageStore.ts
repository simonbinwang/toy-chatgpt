import { types } from "mobx-state-tree";

export const Message = types
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

export const MessageStore = types
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

export const messageStore = MessageStore.create({
  messages: [],
});
