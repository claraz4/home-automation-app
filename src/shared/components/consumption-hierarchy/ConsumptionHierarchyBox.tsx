import { ConsumptionHierarchyItem } from "@/src/shared/components/consumption-hierarchy/ConsumptionHierarchy";
import { StyleSheet, View } from "react-native";
import { borderRadius, spaces, colors, fontWeight } from "@/src/theme";
import { AppText } from "@/src/shared/ui/AppText";
import { Heading } from "@/src/shared/ui/Heading";

const COLORS: string[] = [colors.primary[500], "#FF7F97", "#3BE9DE", "#8F80F3"];

interface ConsumptionHierarchyBoxProps {
  item: ConsumptionHierarchyItem;
  isHighest?: boolean;
  idx: number;
}

export default function ConsumptionHierarchyBox({
  item,
  isHighest = false,
  idx,
}: ConsumptionHierarchyBoxProps) {
  const { icon: Icon, name } = item.icon;
  const color = COLORS[idx % COLORS.length];

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isHighest ? color + 20 : "white" },
      ]}
    >
      <View style={styles.header}>
        <View style={[styles.iconContainer, { backgroundColor: color + 25 }]}>
          <Icon name={name} color={color} size={isHighest ? 35 : 25} />
        </View>
        <View style={styles.percentContainer}>
          {isHighest && (
            <AppText
              style={{
                color: colors.primary[500],
                fontFamily: fontWeight[500],
              }}
            >
              HIGHEST USAGE
            </AppText>
          )}
          <Heading variant={isHighest ? "h2" : "h3"}>
            {Math.round(item.percent)}%
          </Heading>
        </View>
      </View>
      <View>
        <Heading
          variant={isHighest ? "h4" : "h5"}
          style={{ fontFamily: fontWeight[600] }}
        >
          {item.title}
        </Heading>
        <AppText style={{ color: colors.gray[500] }}>
          {item.consumption} {item.unit} {isHighest ? "total today" : ""}
        </AppText>
      </View>
      {!isHighest && (
        <View style={styles.barBackground}>
          <View
            style={[
              styles.barFill,
              {
                width: `${item.percent}%`,
                backgroundColor: color,
              },
            ]}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: borderRadius.md,
    padding: spaces.md,
    flex: 1,
    rowGap: spaces.md,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconContainer: {
    padding: spaces.sm,
    borderRadius: borderRadius.md,
  },
  percentContainer: {
    flexDirection: "column",
  },
  barBackground: {
    height: 8,
    borderRadius: borderRadius.md,
    backgroundColor: colors.gray[150],
    overflow: "hidden",
  },
  barFill: {
    height: "100%",
    borderRadius: borderRadius.md,
  },
});
