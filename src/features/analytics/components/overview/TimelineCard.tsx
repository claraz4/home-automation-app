import { View, StyleSheet } from "react-native";
import { TimelineItem } from "@/src/features/analytics/types/TimelineItem";
import { borderRadius, fontWeight, spaces, colors } from "@/src/theme";
import { tagColor } from "@/src/features/analytics/types/TimelineTag";
import { AppText } from "@/src/shared/ui/AppText";

interface TimelineCardProps {
  item: TimelineItem;
  showTag?: boolean;
}

export default function TimelineCard({
  item,
  showTag = false,
}: TimelineCardProps) {
  const color = tagColor[item.tag];

  return (
    <View style={styles.card}>
      <AppText style={styles.time}>{item.time}</AppText>
      <AppText style={styles.date}>{item.date}</AppText>

      <AppText style={[styles.title, { color }]}>{item.title}</AppText>
      <AppText style={styles.description}>{item.description}</AppText>

      {showTag && (
        <View style={[styles.tag, { backgroundColor: color + "20" }]}>
          <AppText style={{ color: color, fontSize: 14 }}>
            {item.tag.charAt(0).toUpperCase() + item.tag.substring(1)}
          </AppText>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: borderRadius.md,
    paddingHorizontal: spaces.lg,
    paddingVertical: spaces.md,
    flex: 1,
  },
  time: {
    fontFamily: fontWeight[600],
  },
  date: {
    color: colors.gray[500],
    marginBottom: spaces.sm,
  },
  title: {
    fontFamily: fontWeight[600],
    fontSize: 18,
  },
  description: {
    marginVertical: spaces.sm,
    color: colors.gray[500],
    fontFamily: fontWeight[400],
  },
  tag: {
    fontFamily: fontWeight[400],
    alignSelf: "flex-start",
    paddingHorizontal: spaces.md,
    paddingVertical: spaces.xs,
    borderRadius: spaces.sm,
  },
});
