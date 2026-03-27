import { View, StyleSheet } from "react-native";
import { AppText } from "@/src/shared/ui/AppText";
import { borderRadius, colors, fontWeight, spaces } from "@/src/theme";

const COLORS: string[] = [colors.primary[500], "#FF7F97", "#3BE9DE", "#8F80F3"];

export type ProgressListItem = {
  label: string;
  value: number;
};

interface ProgressListProps {
  data: ProgressListItem[];
}

export default function ProgressList({ data }: ProgressListProps) {
  return (
    <View style={styles.container}>
      {data.map((item, index) => {
        const safeValue = Math.max(0, Math.min(100, item.value));
        const color = COLORS[index];

        return (
          <View key={index} style={styles.row}>
            <View style={styles.header}>
              <AppText style={styles.label}>{item.label}</AppText>
              <AppText style={[styles.value, { color }]}>{safeValue}%</AppText>
            </View>

            <View style={styles.barBackground}>
              <View
                style={[
                  styles.barFill,
                  {
                    width: `${safeValue}%`,
                    backgroundColor: color,
                  },
                ]}
              />
            </View>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "white",
    padding: spaces.lg,
    borderRadius: borderRadius.md,
    rowGap: spaces.lg,
  },
  row: {
    rowGap: spaces.xs,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  label: {
    fontFamily: fontWeight[500],
  },
  value: {
    fontFamily: fontWeight[700],
  },
  barBackground: {
    height: 14,
    borderRadius: 10,
    backgroundColor: colors.gray[200],
    overflow: "hidden",
  },
  barFill: {
    height: "100%",
    borderRadius: 10,
  },
});
