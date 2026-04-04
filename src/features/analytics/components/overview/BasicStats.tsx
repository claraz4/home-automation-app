import { View, StyleSheet } from "react-native";
import { borderRadius, colors, spaces } from "@/src/theme";
import BasicStatComponent from "@/src/features/analytics/components/overview/BasicStatComponent";
import { useCallback, useState } from "react";
import { MainsMonthlySummaryDTO } from "@/src/features/analytics/types/MainsMonthlySummaryDTO";
import { api } from "@/src/api/api";
import { useFocusEffect } from "expo-router";

export default function BasicStats() {
  const [mainsSummary, setMainsSummary] =
    useState<MainsMonthlySummaryDTO | null>(null);

  const getMainsSummary = useCallback(async () => {
    try {
      const { data } = await api.get<MainsMonthlySummaryDTO>(
        "/analytics/mains/monthly",
      );
      setMainsSummary(data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      void getMainsSummary();
    }, []),
  );

  const totalConsumption = mainsSummary?.totalConsumptionThisMonth ?? 0;
  const consumptionDiff = mainsSummary?.differenceFromLastMonth ?? null;

  const totalCost = mainsSummary?.totalCostThisMonth ?? 0;
  const costDiff = mainsSummary?.costDifferenceFromLastMonth ?? null;

  return (
    <View style={styles.container}>
      <BasicStatComponent
        title="Total Consumption"
        subtitle={totalConsumption.toFixed(2)}
        subtitleSecondary="kWh"
        isIncreasing={
          consumptionDiff !== null ? consumptionDiff > 0 : undefined
        }
        percent={consumptionDiff !== null ? Math.abs(consumptionDiff) : 0}
      />

      <View style={styles.hr} />

      <BasicStatComponent
        title="Current Cost"
        subtitle={`$${totalCost.toFixed(2)}`}
        isIncreasing={costDiff !== null ? costDiff > 0 : undefined}
        percent={costDiff !== null ? Math.abs(costDiff) : 0}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary[500],
    borderRadius: borderRadius.md,
    paddingHorizontal: spaces.xl,
    paddingVertical: spaces.lg,
    flexDirection: "column",
    rowGap: spaces.md,
  },
  hr: {
    backgroundColor: "rgba(255,255,255,0.6)",
    width: "100%",
    height: 2,
    alignSelf: "center",
  },
});
