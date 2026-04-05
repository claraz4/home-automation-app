import { StyleSheet } from "react-native";
import { Heading } from "@/src/shared/ui/Heading";
import ScreenView from "@/src/shared/ui/ScreenView";
import React from "react";
import { paddings, spaces } from "@/src/theme";
import ProgressList from "@/src/shared/components/ProgressList";
import SourceBarChart from "@/src/features/analytics/components/consumption/WeeklyHourChart";
import AllConsumption from "@/src/features/analytics/components/consumption/AllConsumption";
import usePowerSourceDistribution from "@/src/features/analytics/hooks/usePowerDistribution";

export default function Consumption() {
  const { cleanedPowerSourceDistribution } = usePowerSourceDistribution();

  return (
    <ScreenView style={styles.container}>
      <Heading variant="h2" hasBackButton={true}>
        Consumption
      </Heading>
      <ProgressList data={cleanedPowerSourceDistribution} />
      <SourceBarChart />
      <AllConsumption />
    </ScreenView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: paddings.page,
    rowGap: spaces.md,
  },
});
