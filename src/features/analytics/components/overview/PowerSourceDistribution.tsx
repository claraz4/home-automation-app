import AppPieChart from "@/src/shared/components/AppPieChart";
import { StyleSheet } from "react-native";
import { Heading } from "@/src/shared/ui/Heading";

export default function PowerSourceDistribution() {
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
      data={[
        { value: 40, label: "Generator" },
        { value: 40, label: "Private" },
        { value: 20, label: "Solar" },
      ]}
      showLegend={false}
    />
  );
}

const styles = StyleSheet.create({
  heading: {
    alignSelf: "flex-start",
  },
});
