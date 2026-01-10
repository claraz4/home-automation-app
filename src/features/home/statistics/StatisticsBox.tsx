import { View, ViewStyle, StyleProp, StyleSheet } from "react-native";
import { borderRadius, boxShadow, colors, spaces } from "@/src/theme";
import { Heading } from "@/src/shared/ui/Heading";
import { AppText } from "@/src/shared/ui/AppText";
import { plugStable, plugWarning } from "@/src/icons";

type SourceType = "EDL" | "Generator";

interface SupplySourceInfoProps {
  style?: StyleProp<ViewStyle>;
  title: string;
  number: number;
  unit: string;
  isSupplySource?: boolean;
  source?: SourceType;
  isStable: boolean;
}

export default function StatisticsBox({
  style,
  title,
  source,
  number,
  unit,
  isSupplySource,
  isStable,
}: SupplySourceInfoProps) {
  const stabilityColor = isStable ? colors.status.success : colors.status.fail;

  return (
    <View style={[styles.container, style]}>
      {isStable
        ? plugStable(stabilityColor, 38)
        : plugWarning(stabilityColor, 38)}
      <View>
        <Heading variant="h4">{title}</Heading>

        <View style={styles.infoContainer}>
          <AppText>
            {`${isSupplySource ? source + " " : ""}${number} ${unit}`}
          </AppText>

          <View style={styles.statusContainer}>
            <AppText>Status:</AppText>
            <AppText style={{ color: stabilityColor }}>
              {isStable ? "Stable" : "Unstable"}
            </AppText>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    columnGap: spaces.md,
    alignItems: "center",
    padding: spaces.sm,
    paddingRight: spaces.lg,
    borderRadius: borderRadius.md,
    backgroundColor: "white",
    ...boxShadow.normal,
  },
  infoContainer: {
    flexDirection: "column",
    width: "100%",
    columnGap: spaces.xs,
    marginTop: spaces.xs,
  },
  statusContainer: {
    flexDirection: "row",
    columnGap: spaces.xxs,
  },
});
