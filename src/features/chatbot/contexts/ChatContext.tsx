import { createContext } from "react";
import { ChatMessage } from "@/src/features/chatbot/types/ChatMessage";

interface ChatContextType {
  messages: ChatMessage[];
  addMessage: (message: ChatMessage) => void;
  sendPrompt: (prompt: string) => Promise<void>;
  loading: boolean;
}

export const ChatContext = createContext<ChatContextType | null>(null);
