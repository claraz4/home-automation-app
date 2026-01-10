import {
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
  ScrollView,
} from "react-native";
import { spaces } from "@/src/theme";
import { Heading } from "@/src/shared/ui/Heading";
import ConsumptionGraph from "@/src/features/home/statistics/ConsumptionGraph";
import StatisticsBox from "@/src/features/home/statistics/StatisticsBox";

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
          <StatisticsBox
            title="Supply Source"
            number={220}
            unit={"V"}
            isSupplySource
            source="EDL"
            isStable
          />
          <StatisticsBox
            title="Daily Consumption"
            number={10}
            unit={"kWh"}
            isStable
          />
        </ScrollView>
        <ConsumptionGraph />
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
  scrollableStatisticsContainer: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: spaces.md,
  },
  scrollView: {
    width: "100%",
    margin: 0.01, // removing this hides the scroll view content
    alignSelf: "center",
    paddingLeft: 1.5,
    paddingRight: 1.5,
  },
});
