import { View, StyleSheet, ViewStyle, StyleProp } from "react-native";
import { borderRadius, spaces, colors } from "@/src/theme";
import { Heading } from "@/src/shared/ui/Heading";
import { AppText } from "@/src/shared/ui/AppText";
import { plugStable, plugWarning } from "@/src/icons";

type SourceType = "EDL" | "Generator";

interface SupplySourceInfoProps {
  style?: StyleProp<ViewStyle>;
  source: SourceType;
  voltage: number;
  isStable: boolean;
}

export default function SupplySourceInfo({
  style,
  source,
  voltage,
  isStable,
}: SupplySourceInfoProps) {
  const stabilityColor = isStable ? colors.status.success : colors.status.fail;

  return (
    <View style={[styles.supplySourceContainer, style]}>
      {isStable
        ? plugStable(stabilityColor, 38)
        : plugWarning(stabilityColor, 38)}
      <View>
        <Heading variant="h4">Supply Source</Heading>

        <View style={styles.supplySourceInfoContainer}>
          <AppText>
            {source} {voltage}V
          </AppText>

          <View style={styles.supplySourceStatusContainer}>
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
  supplySourceContainer: {
    flexDirection: "row",
    columnGap: spaces.md,
    alignItems: "center",
    padding: spaces.md,
    paddingRight: spaces.lg,
  },
  supplySourceHeadingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    rowGap: spaces.xxxs,
  },
  stabilityContainer: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: spaces.xxs,
  },
  stabilityIndicator: {
    width: 8,
    height: 8,
    borderRadius: "50%",
  },
  supplySourceInfoContainer: {
    flexDirection: "column",
    width: "100%",
    columnGap: spaces.xs,
    marginTop: spaces.xs,
  },
  supplySourceStatusContainer: {
    flexDirection: "row",
    columnGap: spaces.xxs,
  },
});
