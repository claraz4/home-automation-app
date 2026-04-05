import { View, StyleSheet } from "react-native";
import { borderRadius, colors, spaces } from "@/src/theme";
import BasicStatComponent from "@/src/features/analytics/components/overview/BasicStatComponent";
import useMainsSummary from "@/src/features/analytics/hooks/useMainsSummary";

export default function BasicStats() {
  const {
    totalConsumptionThisMonth: totalConsumption,
    differenceFromLastMonth: consumptionDiff,
    totalCostThisMonth: totalCost,
    costDifferenceFromLastMonth: costDiff,
  } = useMainsSummary();

  return (
    <View style={styles.container}>
      <BasicStatComponent
        title="Total Consumption"
        subtitle={totalConsumption.toFixed(2)}
        subtitleSecondary="kWh"
        isIncreasing={
          consumptionDiff !== null ? consumptionDiff > 0 : undefined
        }
        percent={
          consumptionDiff !== null ? Math.round(Math.abs(consumptionDiff)) : 0
        }
      />

      <View style={styles.hr} />

      <BasicStatComponent
        title="Current Cost"
        subtitle={`$${totalCost.toFixed(2)}`}
        isIncreasing={costDiff !== null ? costDiff > 0 : undefined}
        percent={costDiff !== null ? Math.round(Math.abs(costDiff)) : 0}
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
