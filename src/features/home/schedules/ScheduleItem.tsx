import { View, StyleSheet } from "react-native";
import { AppText } from "@/src/shared/ui/AppText";
import { colors, borderRadius, spaces } from "@/src/theme";

interface ScheduleItemProps {
  name: string;
  deviceCount: number;
}

export function ScheduleItem({ name, deviceCount }: ScheduleItemProps) {
  return (
    <View style={styles.container}>
      <AppText variant="bodyWhite">{name}</AppText>
      <AppText variant="bodySmallWhite">{deviceCount} devices</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.primary["300"],
    borderRadius: borderRadius.sm,
    paddingVertical: spaces.sm - spaces.xxxs,
    paddingHorizontal: spaces.xs,
  },
});
