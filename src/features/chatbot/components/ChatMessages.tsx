import { FlatList, StyleSheet } from "react-native";
import { spaces } from "@/src/theme";
import { useChat } from "@/src/features/chatbot/hooks/useChat";
import ChatBox from "@/src/features/chatbot/components/ChatBox";

export default function ChatMessages() {
  const { messages } = useChat();

  return (
    <FlatList
      data={messages}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.messagesContainer}
      renderItem={({ item }) => (
        <ChatBox
          role={item.role}
          message={item.text}
          time={new Date(item.createdAt)}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  messagesContainer: {
    padding: spaces.lg,
    marginBottom: "22%",
    rowGap: spaces.md,
    paddingTop: 0,
  },
});
