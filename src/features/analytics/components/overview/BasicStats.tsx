import { View, StyleSheet } from "react-native";
import { borderRadius, colors, spaces } from "@/src/theme";
import BasicStatComponent from "@/src/features/analytics/components/overview/BasicStatComponent";

export default function BasicStats() {
  return (
    <View style={styles.container}>
      <BasicStatComponent
        title="Total Consumption"
        subtitle="189"
        subtitleSecondary="kWh"
        isIncreasing={true}
        percent={10}
      />
      <View style={styles.hr} />
      <BasicStatComponent
        title="Current Cost"
        subtitle="$129.18"
        isIncreasing={false}
        percent={10}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary[500],
    borderRadius: borderRadius.md,
    paddingHorizontal: spaces.xl,
    paddingVertical: spaces.lg,
    flexDirection: "column",
    rowGap: spaces.md,
  },
  hr: {
    backgroundColor: "rgba(255,255,255,0.6)",
    width: "100%",
    height: 2,
    alignSelf: "center",
  },
});
