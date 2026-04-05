import { Heading } from "@/src/shared/ui/Heading";
import ScreenView from "@/src/shared/ui/ScreenView";
import React from "react";
import { StyleSheet } from "react-native";
import { paddings, spaces } from "@/src/theme";
import CostOverview from "@/src/features/analytics/components/cost/CostOverview";
import AllCosts from "@/src/features/analytics/components/cost/AllCosts";
import WeeklyCostChart from "@/src/features/analytics/components/cost/WeeklyCostChart";

export default function Cost() {
  return (
    <ScreenView style={styles.container}>
      <Heading variant="h2" hasBackButton={true}>
        Cost Analysis
      </Heading>
      <CostOverview />
      <WeeklyCostChart />
      <AllCosts />
    </ScreenView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: paddings.page,
    rowGap: spaces.md,
  },
});
