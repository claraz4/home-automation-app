import { View, StyleSheet } from "react-native";
import { Heading } from "@/src/shared/ui/Heading";
import React from "react";
import { spaces } from "@/src/theme";

interface Props {
  title: string;
  children: React.ReactNode;
}

export function ScheduleDay({ title, children }: Props) {
  return (
    <View>
      <Heading variant="h3" style={styles.heading}>
        {title}
      </Heading>
      <View style={styles.subContainer}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    marginBottom: spaces.xs,
  },
  subContainer: {
    flexDirection: "column",
    rowGap: spaces.md,
  },
});
