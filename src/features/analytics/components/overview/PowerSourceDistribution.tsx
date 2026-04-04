import AppPieChart from "@/src/shared/components/AppPieChart";
import { StyleSheet } from "react-native";
import { Heading } from "@/src/shared/ui/Heading";
import usePowerSourceDistribution from "@/src/features/analytics/hooks/usePowerDistribution";

export default function PowerSourceDistribution() {
  const { cleanedPowerSourceDistribution } = usePowerSourceDistribution();

  if (!cleanedPowerSourceDistribution) {
    return;
  }

  return (
    <AppPieChart
      title={
        <Heading
          variant="h3"
          href="/analytics/consumption"
          hasLink={true}
          linkPlaceholder="Show More"
          containerStyles={styles.heading}
        >
          Sources
        </Heading>
      }
      data={cleanedPowerSourceDistribution}
      showLegend={false}
    />
  );
}

const styles = StyleSheet.create({
  heading: {
    alignSelf: "flex-start",
  },
});
