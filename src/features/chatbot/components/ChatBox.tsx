import { StyleSheet, View } from "react-native";
import { ChatRole } from "@/src/features/chatbot/types/ChatMessage";
import { borderRadius, colors, spaces } from "@/src/theme";
import { AppText } from "@/src/shared/ui/AppText";
import dayjs from "dayjs";
import ThinkingBox from "@/src/features/chatbot/components/ThinkingBox";

interface ChatBoxProps {
  role: ChatRole;
  message: string;
  time: Date;
  isThinking: boolean;
}

export default function ChatBox({
  role,
  message,
  time,
  isThinking,
}: ChatBoxProps) {
  const timeJs = dayjs(time);

  return isThinking ? (
    <ThinkingBox />
  ) : (
    <View
      style={[
        styles.container,
        role === "user" ? styles.userContainer : styles.assistantContainer,
      ]}
    >
      <AppText style={role === "user" && styles.userText}>{message}</AppText>
      <AppText
        style={[styles.timeText, role === "user" && styles.userText]}
      >{`${timeJs.format("HH:mm")}`}</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: borderRadius.sm,
    width: "75%",
    padding: spaces.sm,
    rowGap: spaces.xxxs,
  },
  assistantContainer: {
    backgroundColor: colors.gray[200],
  },
  userContainer: {
    backgroundColor: colors.primary[500],
    alignSelf: "flex-end",
  },
  userText: {
    color: "white",
  },
  timeText: {
    opacity: 0.7,
  },
});
