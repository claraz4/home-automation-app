import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { borderRadius, boxShadow, spaces } from "@/src/theme";
import SupplySourceInfo from "@/src/features/home/statistics/SupplySourceInfo";
import { Heading } from "@/src/shared/ui/Heading";
import ConsumptionGraph from "@/src/features/home/statistics/ConsumptionGraph";

interface StatisticsProps {
  style?: StyleProp<ViewStyle>;
}

export default function Statistics({ style }: StatisticsProps) {
  return (
    <View style={[styles.statisticsContainer, style]}>
      <Heading variant="h2">Statistics</Heading>
      <View style={styles.statisticsSubContainer}>
        <SupplySourceInfo
          style={styles.statisticsSubContainers}
          source="EDL"
          voltage={220}
          isStable={true}
        />
        <ConsumptionGraph style={styles.statisticsSubContainers} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  statisticsContainer: {
    rowGap: spaces.md,
  },
  statisticsSubContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    rowGap: spaces.md,
  },
  statisticsSubContainers: {
    borderRadius: borderRadius.md,
    backgroundColor: "white",
    ...boxShadow.normal,
  },
});
