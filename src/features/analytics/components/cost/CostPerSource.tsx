import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, View } from "react-native";
import { borderRadius, colors, spaces } from "@/src/theme";
import { Heading } from "@/src/shared/ui/Heading";
import { AppText } from "@/src/shared/ui/AppText";

interface CostPerSourceProps {
  sourceName: string;
  message: string;
  cost: number;
  invert?: boolean;
}

export default function CostPerSource({
  sourceName,
  message,
  cost,
  invert = false,
}: CostPerSourceProps) {
  const mainColor = invert ? "white" : colors.primary[500];
  const backgroundColor = invert ? colors.primary[500] : "white";
  const textColor = invert ? "white" : colors.text;
  const brighterColor = invert ? "rgba(255,255,255,0.4)" : colors.primary[100];
  const secondaryColor = invert ? "rgba(255,255,255,0.7)" : colors.gray[400];

  return (
    <View style={[styles.container, { backgroundColor: backgroundColor }]}>
      <View style={styles.containerTitle}>
        <View
          style={[styles.iconContainer, { backgroundColor: brighterColor }]}
        >
          <Ionicons name="flash" size={20} color={mainColor} />
        </View>

        <View style={{ flex: 1 }}>
          <Heading variant="h6" style={{ color: mainColor }} numberOfLines={2}>
            {sourceName}
          </Heading>
        </View>
      </View>
      <View>
        <Heading variant="h2" style={{ color: textColor }}>
          ${cost.toFixed(2)}
        </Heading>
        <AppText style={{ color: secondaryColor }}>{message}</AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    borderRadius: borderRadius.sm,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spaces.xxs,
    paddingVertical: spaces.xs,
    height: 40,
  },
  container: {
    borderRadius: borderRadius.md,
    padding: spaces.sm,
    rowGap: spaces.sm,
    flex: 1,
    justifyContent: "space-between",
  },
  containerTitle: {
    flexDirection: "row",
    columnGap: spaces.sm,
    alignItems: "center",
  },
});
