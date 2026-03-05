import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { borderRadius, colors, spaces } from "@/src/theme";
import AppModal from "@/src/shared/components/AppModal";
import AppTextInput from "@/src/shared/components/AppTextInput";
import { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import ChatMessages from "@/src/features/chatbot/components/ChatMessages";
import { useChat } from "@/src/features/chatbot/hooks/useChat";

interface ChatbotModalProps {
  isVisible: boolean;
  setIsVisible: (visible: boolean) => void;
}

export default function ChatbotModal({
  isVisible,
  setIsVisible,
}: ChatbotModalProps) {
  const [newPrompt, setNewPrompt] = useState("");
  const { sendPrompt } = useChat();

  const onPress = () => {
    void sendPrompt(newPrompt);
    setNewPrompt("");
  };

  return (
    <AppModal
      visible={isVisible}
      isBottom={true}
      setVisible={setIsVisible}
      headingContainerStyle={styles.title}
      headingStyle={{ color: "white" }}
      containerStyle={{
        padding: 0,
        height: "90%",
        position: "relative",
        rowGap: spaces.xxl,
      }}
      hasCloseButton={true}
      iconColor="white"
      headingText="Smart Home Assistant"
    >
      <ChatMessages />
      <View style={styles.messageBoxContainer}>
        <AppTextInput
          value={newPrompt}
          onChange={(msg) => setNewPrompt(msg)}
          inputContainerStyle={styles.inputContainer}
          containerStyle={{ flex: 1 }}
        />
        <Pressable onPress={onPress}>
          <Ionicons name="send" size={24} color={colors.primary[500]} />
        </Pressable>
      </View>
    </AppModal>
  );
}

const styles = StyleSheet.create({
  title: {
    backgroundColor: colors.primary[500],
    borderTopLeftRadius: borderRadius.md,
    borderTopRightRadius: borderRadius.md,
    paddingHorizontal: spaces.md,
    paddingVertical: spaces.sm,
  },
  messageBoxContainer: {
    position: "absolute",
    bottom: 0,
    borderTopColor: colors.gray[300],
    borderTopWidth: 2,
    width: "100%",
    padding: spaces.md,
    flexDirection: "row",
    columnGap: spaces.md,
    alignItems: "center",
    backgroundColor: "white",
  },
  inputContainer: {
    backgroundColor: colors.gray[100],
    fontSize: 14,
    padding: spaces.xs,
  },
});
