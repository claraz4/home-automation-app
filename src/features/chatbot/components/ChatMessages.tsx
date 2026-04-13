import { FlatList, StyleSheet } from "react-native";
import { spaces } from "@/src/theme";
import { useChat } from "@/src/features/chatbot/hooks/useChat";
import ChatBox from "@/src/features/chatbot/components/ChatBox";
import { useRef } from "react";

export default function ChatMessages() {
  const { messages } = useChat();
  const flatListRef = useRef<FlatList>(null);

  return (
    <FlatList
      ref={flatListRef}
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
      onContentSizeChange={() =>
        setTimeout(() => {
          flatListRef.current?.scrollToEnd({ animated: true });
        }, 50)
      }
    />
  );
}

const styles = StyleSheet.create({
  messagesContainer: {
    padding: spaces.lg,
    rowGap: spaces.md,
    paddingTop: 0,
  },
});
