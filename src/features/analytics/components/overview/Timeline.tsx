import { View, StyleSheet } from "react-native";
import TimelineCard from "@/src/features/analytics/components/overview/TimelineCard";
import { spaces, colors } from "@/src/theme";
import { Heading } from "@/src/shared/ui/Heading";
import { TimelineItem } from "@/src/features/analytics/types/TimelineItem";
import { tagColor } from "@/src/features/analytics/types/TimelineTag";

const data: TimelineItem[] = [
  {
    time: "14:22",
    date: "Aug 24, 2024",
    title: "EDL Outage Detected",
    description: "Switch to private generator.",
    tag: "critical",
  },
  {
    time: "12:05",
    date: "Aug 24, 2024",
    title: "Solar Contribution Peak",
    description:
      "Maximum solar production reached 4.8kW. Home batteries at 100% capacity.",
    tag: "info",
  },
];

export default function Timeline() {
  return (
    <View style={{ rowGap: spaces.md }}>
      <Heading variant="h3">Timeline</Heading>
      <View style={styles.container}>
        <View style={styles.line} />
        {data.map((item, index) => (
          <View key={index} style={styles.row}>
            <View
              style={[styles.dot, { backgroundColor: tagColor[item.tag] }]}
            />
            <TimelineCard item={item} />
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spaces.md,
    paddingVertical: spaces.sm,
    flexDirection: "column",
    rowGap: spaces.md,
  },
  row: {
    flexDirection: "row",
  },
  line: {
    position: "absolute",
    width: 2,
    backgroundColor: colors.gray[300],
    top: 0,
    bottom: 0,
    left: spaces.md,
  },
  dot: {
    width: 20,
    height: 20,
    borderRadius: "50%",
    marginTop: spaces.sm,
    borderWidth: 4,
    borderColor: "white",
    position: "relative",
    right: 8,
  },
});
