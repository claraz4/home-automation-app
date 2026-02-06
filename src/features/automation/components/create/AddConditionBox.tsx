import { Pressable, StyleSheet, View } from "react-native";
import { borderRadius, colors, spaces } from "@/src/theme";
import { AppText } from "@/src/shared/ui/AppText";
import { ReactElement } from "react";

interface AddConditionBoxProps {
  condition: string;
  icon: ReactElement;
  onClick: () => void;
}

export default function AddConditionBox({
  condition,
  icon,
  onClick,
}: AddConditionBoxProps) {
  return (
    <Pressable style={styles.container} onPress={onClick}>
      <View style={styles.iconContainer}>{icon}</View>
      <AppText>{condition}</AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    backgroundColor: colors.primary[500],
    width: 35,
    height: 35,
    borderRadius: borderRadius.sm,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    paddingHorizontal: spaces.sm - spaces.xxxs,
    paddingVertical: spaces.xs,
    flexDirection: "row",
    alignItems: "center",
    columnGap: spaces.sm,
  },
});
