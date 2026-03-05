import { useContext } from "react";
import { ChatContext } from "@/src/features/chatbot/contexts/ChatContext";

export function useChat() {
  const context = useContext(ChatContext);

  if (!context) {
    throw new Error("useChat must be used inside ChatProvider");
  }

  return context;
}
