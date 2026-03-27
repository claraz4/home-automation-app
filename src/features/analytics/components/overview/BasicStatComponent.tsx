import { View, StyleSheet } from "react-native";
import { AppText } from "@/src/shared/ui/AppText";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Heading } from "@/src/shared/ui/Heading";
import { borderRadius, spaces } from "@/src/theme";

interface BasicStatComponentProps {
  title: string;
  subtitle: string;
  subtitleSecondary?: string;
  isIncreasing: boolean;
  percent: number;
}

export default function BasicStatComponent({
  title,
  subtitle,
  subtitleSecondary,
  isIncreasing,
  percent,
}: BasicStatComponentProps) {
  return (
    <View>
      <View style={styles.titleContainer}>
        <AppText style={styles.title}>{title.toUpperCase()}</AppText>
        <View style={styles.titleIndicator}>
          <FontAwesome6
            name={`arrow-trend-${isIncreasing ? "up" : "down"}`}
            size={20}
            color="white"
          />
          <AppText variant="bodyWhite">{percent}%</AppText>
        </View>
      </View>
      <View style={styles.subtitleContainer}>
        <Heading variant="h1" style={styles.subtitle}>
          {subtitle}
        </Heading>
        {subtitleSecondary && (
          <AppText style={styles.subtitleSecondary}>
            {subtitleSecondary}
          </AppText>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  subtitle: {
    color: "white",
  },
  title: {
    color: "rgba(255,255,255,0.7)",
  },
  subtitleContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    columnGap: spaces.xs,
  },
  subtitleSecondary: {
    color: "rgba(255,255,255,0.8)",
    marginBottom: spaces.xs * 1.1,
    fontSize: 20,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleIndicator: {
    backgroundColor: "rgba(255,255,255,0.25)",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: borderRadius.lg,
    paddingHorizontal: spaces.sm,
    paddingVertical: spaces.xxs,
    columnGap: spaces.xs,
  },
});
