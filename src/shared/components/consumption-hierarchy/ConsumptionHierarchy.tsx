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
  let highest: ConsumptionHierarchyItem | null = null;
  let secondHighest: ConsumptionHierarchyItem | null = null;
  let thirdHighest: ConsumptionHierarchyItem | null = null;

  items.forEach((item) => {
    if (!highest || item.percent > highest.percent) {
      thirdHighest = secondHighest;
      secondHighest = highest;
      highest = item;
    } else if (!secondHighest || item.percent > secondHighest.percent) {
      thirdHighest = secondHighest;
      secondHighest = item;
    } else if (!thirdHighest || item.percent > thirdHighest.percent) {
      thirdHighest = item;
    }
  });

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
