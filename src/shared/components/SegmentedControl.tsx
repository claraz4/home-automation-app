import {
  Pressable,
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from "react-native";
import { AppText } from "@/src/shared/ui/AppText";
import { borderRadius, boxShadow, colors, spaces } from "@/src/theme";

interface SegmentedControlProps {
  options: string[];
  value: string;
  onPress: (value: string) => void;
  style?: StyleProp<ViewStyle>;
}

export default function SegmentedControl({
  options,
  value,
  onPress,
  style,
}: SegmentedControlProps) {
  return (
    <View style={[styles.container, style]}>
      {options.map((option, idx) => (
        <Pressable
          key={idx}
          onPress={() => onPress(option)}
          style={[
            styles.optionContainer,
            { width: `${100 / options.length}%` },
            value === option && styles.selectedOptionContainer,
          ]}
        >
          <AppText
            variant="body"
            style={
              value === option ? styles.selectedOptionText : styles.optionText
            }
          >
            {option}
          </AppText>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.gray[100],
    alignSelf: "flex-end",
    borderRadius: borderRadius.md,
    width: "100%",
  },
  selectedOptionContainer: {
    backgroundColor: colors.primary[500],
    borderRadius: borderRadius.md,
  },
  selectedOptionText: {
    color: "white",
  },
  optionContainer: {
    paddingHorizontal: spaces.sm,
    paddingVertical: spaces.xxs,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  optionText: {
    color: colors.gray[500],
  },
});
