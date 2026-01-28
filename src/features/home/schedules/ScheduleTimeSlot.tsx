import { View, StyleSheet } from "react-native";
import { Heading } from "@/src/shared/ui/Heading";
import React from "react";
import { colors, spaces } from "@/src/theme";

interface ScheduleTimeSlotProps {
  time: string;
  children: React.ReactNode;
}

export function ScheduleTimeSlot({ time, children }: ScheduleTimeSlotProps) {
  return (
    <View style={styles.container}>
      <Heading variant="h4" style={styles.heading}>
        {time}
      </Heading>
      <View style={styles.childrenContainer}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    columnGap: spaces.xs,
  },
  heading: {
    color: colors.primary["500"],
    width: 67,
    borderRightColor: colors.primary["500"],
    borderRightWidth: 2,
    paddingTop: 2 * spaces.xxs,
    marginTop: spaces.xxs,
    height: 45,
    textAlign: "right",
    paddingRight: spaces.xs,
  },
  childrenContainer: {
    flexDirection: "column",
    flexGrow: 1,
    rowGap: spaces.xs,
    marginVertical: spaces.xxs,
  },
});
