import { Pressable, StyleSheet } from "react-native";
import { colors, spaces } from "@/src/theme";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

interface ChatbotButtonProps {
  onPress: () => void;
}

export default function ChatbotButton({ onPress }: ChatbotButtonProps) {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <FontAwesome6
        name="message"
        size={24}
        color="white"
        style={{ marginBottom: -2 }}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary[500],
    width: 55,
    height: 55,
    borderRadius: "50%",
    position: "absolute",
    right: spaces.md,
    alignItems: "center",
    justifyContent: "center",
    bottom: 60,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});
