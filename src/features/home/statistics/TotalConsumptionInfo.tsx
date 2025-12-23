import { View, StyleSheet, ViewStyle, StyleProp } from "react-native";
import { spaces, colors } from "@/src/theme";
import { Heading } from "@/src/shared/ui/Heading";
import { AppText } from "@/src/shared/ui/AppText";
import { plugStable, plugWarning } from "@/src/icons";
import { statisticsCommonStyles } from "@/src/features/home/statistics/statisticsCommonStyles";

interface TotalConsumptionInfoProps {
  style?: StyleProp<ViewStyle>;
  consumption: number;
}

export default function TotalConsumptionInfo({
  style,
  consumption,
}: TotalConsumptionInfoProps) {
  const isStable = true;
  const stabilityColor = isStable ? colors.status.success : colors.status.fail;

  return (
    <View style={[statisticsCommonStyles.supplySourceContainer, style]}>
      {plugStable(stabilityColor, 40)}
      <View>
        <Heading variant="h4">Daily Consumption</Heading>
        <View style={statisticsCommonStyles.supplySourceInfoContainer}>
          <AppText>{consumption} kWh</AppText>

          <View style={statisticsCommonStyles.supplySourceStatusContainer}>
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
