import React from "react";
import { StyleSheet, View } from "react-native";
import BasicStats from "@/src/features/analytics/components/overview/BasicStats";
import { Heading } from "@/src/shared/ui/Heading";
import ScreenView from "@/src/shared/ui/ScreenView";
import { paddings, spaces } from "@/src/theme";
import PowerSourceDistribution from "@/src/features/analytics/components/overview/PowerSourceDistribution";
import Timeline from "@/src/features/analytics/components/overview/Timeline";
import Button from "@/src/shared/components/Button";
import { router } from "expo-router";

export default function Analytics() {
  return (
    <ScreenView style={styles.container}>
      <Heading variant="h2" hasBackButton={true}>
        Analytics
      </Heading>
      <BasicStats />
      <View style={styles.buttonContainer}>
        <Button
          text="Consumption"
          onPress={() => router.push("/analytics/consumption")}
          style={{ flex: 1 }}
          invertColors={true}
        />
        <Button
          text="Cost Analysis"
          onPress={() => router.push("/analytics/cost")}
          style={{ flex: 1 }}
          invertColors={true}
        />
      </View>
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
  buttonContainer: {
    flexDirection: "row",
    columnGap: spaces.xs,
    marginBottom: spaces.md,
    marginTop: -spaces.xs,
  },
});
