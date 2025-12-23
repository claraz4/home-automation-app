import {
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
  ScrollView,
  Text,
} from "react-native";
import { borderRadius, boxShadow, spaces } from "@/src/theme";
import SupplySourceInfo from "@/src/features/home/statistics/SupplySourceInfo";
import { Heading } from "@/src/shared/ui/Heading";
import ConsumptionGraph from "@/src/features/home/statistics/ConsumptionGraph";
import TotalConsumptionInfo from "@/src/features/home/statistics/TotalConsumptionInfo";

interface StatisticsProps {
  style?: StyleProp<ViewStyle>;
}

export default function Statistics({ style }: StatisticsProps) {
  return (
    <View style={[styles.statisticsContainer, style]}>
      <Heading variant="h2">Statistics</Heading>
      <View style={styles.statisticsSubContainer}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollableStatisticsContainer}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          <SupplySourceInfo
            style={styles.statisticsSubContainers}
            source="EDL"
            voltage={220}
            isStable
          />
          <TotalConsumptionInfo
            style={styles.statisticsSubContainers}
            consumption={10}
          />
        </ScrollView>
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
  scrollableStatisticsContainer: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: spaces.md,
  },
  scrollView: {
    height: 110,
    width: "100%",
    margin: 0.01, // removing this hides the scroll view content
    alignSelf: "center",
    paddingLeft: 1.5,
    paddingRight: 1.5,
  },
});
