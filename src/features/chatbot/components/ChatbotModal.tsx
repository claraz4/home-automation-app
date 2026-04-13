import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import { borderRadius, colors, spaces } from "@/src/theme";
import AppModal from "@/src/shared/components/AppModal";
import AppTextInput from "@/src/shared/components/AppTextInput";
import { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import ChatMessages from "@/src/features/chatbot/components/ChatMessages";
import { useChat } from "@/src/features/chatbot/hooks/useChat";
import { useSafeAreaInsets } from "react-native-safe-area-context";

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
  const insets = useSafeAreaInsets();

  const onPress = () => {
    void sendPrompt(newPrompt);
    setNewPrompt("");
    Keyboard.dismiss();
  };

  return (
    <AppModal
      visible={isVisible}
      isBottom={true}
      setVisible={setIsVisible}
      headingContainerStyle={styles.title}
      headingStyle={{ color: "white" }}
      containerStyle={{
        paddingHorizontal: 0,
        paddingVertical: 0,
        height: "90%",
        rowGap: spaces.xxl,
      }}
      hasCloseButton={true}
      iconColor="white"
      headingText="Smart Home Assistant"
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={100}
      >
        <View style={{ flex: 1, marginBottom: spaces.md }}>
          <ChatMessages />
        </View>
        <View
          style={[
            styles.messageBoxContainer,
            { paddingBottom: insets.bottom || spaces.md },
          ]}
        >
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
      </KeyboardAvoidingView>
    </AppModal>
  );
}

const styles = StyleSheet.create({
  title: {
    backgroundColor: colors.primary[500],
    borderTopLeftRadius: borderRadius.lg,
    borderTopRightRadius: borderRadius.lg,
    paddingHorizontal: spaces.md,
    paddingVertical: spaces.lg * 0.8,
  },
  messageBoxContainer: {
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
    fontSize: 16,
    padding: spaces.xs,
    color: colors.text,
  },
});
