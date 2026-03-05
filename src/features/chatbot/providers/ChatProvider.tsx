import React, { createContext, useState, ReactNode } from "react";
import { ChatMessage } from "@/src/features/chatbot/types/ChatMessage";
import { ChatContext } from "@/src/features/chatbot/contexts/ChatContext";
import { api } from "@/src/api/api";

export function ChatProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);

  function addMessage(message: ChatMessage) {
    setMessages((prev) => [...prev, message]);
  }

  async function sendPrompt(prompt: string) {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      text: prompt,
      createdAt: new Date(),
    };
    addMessage(userMessage);

    try {
      setLoading(true);

      const { data } = await api.post("/llm/chat", {
        prompt,
      });

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        text: data.answer,
        createdAt: new Date(),
      };

      addMessage(assistantMessage);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <ChatContext.Provider
      value={{
        messages,
        addMessage,
        sendPrompt,
        loading,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}
