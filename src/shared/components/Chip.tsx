import { Pressable, StyleSheet } from "react-native";
import { borderRadius, colors, fontWeight, spaces } from "@/src/theme";
import { Heading } from "@/src/shared/ui/Heading";

interface ChipProps {
  text: string;
  isSelected: boolean;
  onPress: () => void;
}

export default function Chip({ text, isSelected, onPress }: ChipProps) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.container, isSelected && styles.selectedContainer]}
    >
      <Heading
        variant="h5"
        style={isSelected ? styles.selectedText : styles.text}
      >
        {text}
      </Heading>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: borderRadius.sm,
    paddingVertical: spaces.sm,
    paddingHorizontal: spaces.sm,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontFamily: fontWeight[500],
    color: colors.primary[500],
  },
  selectedContainer: {
    backgroundColor: colors.primary[500],
  },
  selectedText: {
    color: "white",
  },
});
