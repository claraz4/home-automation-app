import React from "react";
import { StyleSheet } from "react-native";
import BasicStats from "@/src/features/analytics/components/overview/BasicStats";
import { Heading } from "@/src/shared/ui/Heading";
import ScreenView from "@/src/shared/ui/ScreenView";
import { paddings, spaces } from "@/src/theme";
import PowerSourceDistribution from "@/src/features/analytics/components/overview/PowerSourceDistribution";
import Timeline from "@/src/features/analytics/components/overview/Timeline";

export default function Analytics() {
  return (
    <ScreenView style={styles.container}>
      <Heading variant="h2" hasBackButton={true}>
        Analytics
      </Heading>
      <BasicStats />
      <PowerSourceDistribution />
      <Timeline />
    </ScreenView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: paddings.page,
    rowGap: spaces.md,
  },
});
