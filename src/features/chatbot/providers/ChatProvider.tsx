import React, { useState, ReactNode } from "react";
import { ChatMessage } from "@/src/features/chatbot/types/ChatMessage";
import { ChatContext } from "@/src/features/chatbot/contexts/ChatContext";
import { api } from "@/src/api/api";
import * as Crypto from "expo-crypto";

export function ChatProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [sessionId] = useState(Crypto.randomUUID());

  function addMessage(message: ChatMessage) {
    setMessages((prev) => [...prev, message]);
  }

  async function sendPrompt(prompt: string) {
    const userMessage: ChatMessage = {
      id: Crypto.randomUUID(),
      role: "user",
      text: prompt,
      createdAt: new Date(),
    };
    addMessage(userMessage);

    try {
      setLoading(true);

      const { data } = await api.post("/llm/chat", {
        prompt,
        sessionId,
      });

      let { answer } = data;
      if (!answer) {
        answer = "No data was found yet.";
      }

      const assistantMessage: ChatMessage = {
        id: Crypto.randomUUID(),
        role: "assistant",
        text: answer,
        createdAt: new Date(),
      };

      addMessage(assistantMessage);
    } catch (err) {
      addMessage({
        id: Crypto.randomUUID(),
        role: "assistant",
        text: "Something went wrong. Please try again.",
        createdAt: new Date(),
      });
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
