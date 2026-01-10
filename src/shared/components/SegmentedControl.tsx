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
    borderRadius: borderRadius.lg,
    padding: spaces.xs,
    columnGap: spaces.xs,
  },
  selectedOptionContainer: {
    backgroundColor: "white",
    borderRadius: borderRadius.md,
  },
  selectedOptionText: {
    color: colors.primary[500],
  },
  optionContainer: {
    paddingHorizontal: spaces.xs,
    paddingVertical: spaces.xxs,
  },
  optionText: {
    color: colors.gray[500],
  },
});
