import { View, StyleSheet } from "react-native";
import { PieChart } from "react-native-gifted-charts";
import { colors, spaces, fontWeight, borderRadius } from "@/src/theme";
import { AppText } from "@/src/shared/ui/AppText";
import { ReactNode, useState } from "react";

const COLORS_USED = [
  {
    gradientCenterColor: colors.primary[500],
    color: colors.primary[300],
  },
  { color: "#FFA5BA", gradientCenterColor: "#FF7F97" },
  { color: "#93FCF8", gradientCenterColor: "#3BE9DE" },
  { color: "#BDB2FA", gradientCenterColor: "#8F80F3" },
];

type DataItem = {
  value: number;
  label: string;
};

interface AppPieChartProps {
  title?: ReactNode;
  data: DataItem[];
  showLegend?: boolean;
}

export default function AppPieChart({
  title,
  data,
  showLegend = true,
}: AppPieChartProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const pieData = data.map((item, index) => ({
    value: item.value,
    color: COLORS_USED[index % COLORS_USED.length].color,
    gradientCenterColor:
      COLORS_USED[index % COLORS_USED.length].gradientCenterColor,
    focused: index === selectedIndex,
  }));

  const renderDot = (color: string) => {
    return <View style={[styles.dot, { backgroundColor: color }]} />;
  };

  return (
    <View style={styles.container}>
      {title}
      <PieChart
        data={pieData}
        donut
        showGradient
        radius={100}
        innerRadius={70}
        sectionAutoFocus={true}
        innerCircleColor="white"
        centerLabelComponent={() => {
          return (
            <View style={styles.centerLabel}>
              <AppText
                style={[
                  styles.centerValue,
                  { color: COLORS_USED[selectedIndex].gradientCenterColor },
                ]}
              >
                {data[selectedIndex].value}%
              </AppText>
              <AppText
                style={[
                  styles.centerLabelText,
                  { color: COLORS_USED[selectedIndex].gradientCenterColor },
                ]}
              >
                {data[selectedIndex].label}
              </AppText>
            </View>
          );
        }}
        onPress={(item: DataItem, index: number) => {
          setSelectedIndex(index);
        }}
        toggleFocusOnPress={true}
      />

      {showLegend && (
        <View style={styles.legendContainer}>
          {data.map((item, index) => (
            <View key={index} style={styles.legendItemWithMargin}>
              {renderDot(
                COLORS_USED[index % COLORS_USED.length].gradientCenterColor,
              )}
              <AppText>
                {item.label}: {item.value}%
              </AppText>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    rowGap: spaces.md,
    borderRadius: borderRadius.md,
    padding: spaces.lg,
  },
  centerLabel: {
    justifyContent: "center",
    alignItems: "center",
  },
  centerValue: {
    fontSize: 30,
    color: colors.text,
    fontFamily: fontWeight[600],
  },
  centerLabelText: {
    fontSize: 16,
    color: colors.text,
    fontFamily: fontWeight[500],
  },
  legendContainer: {
    alignItems: "center",
  },
  legendItemWithMargin: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spaces.sm,
  },
  dot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    marginRight: spaces.sm,
  },
});
