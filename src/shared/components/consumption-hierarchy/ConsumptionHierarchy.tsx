import { StyleSheet, View } from "react-native";
import ConsumptionHierarchyBox from "@/src/shared/components/consumption-hierarchy/ConsumptionHierarchyBox";
import { IconType } from "@/src/shared/types/IconType";
import { spaces } from "@/src/theme";

export type ConsumptionHierarchyItem = {
  title: string;
  icon: IconType;
  percent: number;
  consumption: number;
  unit: string;
};

interface ConsumptionHierarchyProps {
  items: ConsumptionHierarchyItem[];
}

export default function ConsumptionHierarchy({
  items,
}: ConsumptionHierarchyProps) {
  const sortedItems = items.sort((a, b) => b.percent - a.percent);
  const highest = sortedItems[0];
  const secondHighest = sortedItems[1];
  const thirdHighest = sortedItems[2];

  return (
    <View style={styles.container}>
      {highest && (
        <ConsumptionHierarchyBox item={highest} isHighest={true} idx={0} />
      )}
      <View style={styles.row}>
        {secondHighest && (
          <ConsumptionHierarchyBox item={secondHighest} idx={1} />
        )}
        {thirdHighest && (
          <ConsumptionHierarchyBox item={thirdHighest} idx={2} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    rowGap: spaces.md,
  },
  row: {
    flexDirection: "row",
    width: "100%",
    columnGap: spaces.md,
  },
});
