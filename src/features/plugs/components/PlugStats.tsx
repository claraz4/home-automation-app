import { StyleSheet, View } from "react-native";
import { AppText } from "@/src/shared/ui/AppText";
import { Heading } from "@/src/shared/ui/Heading";
import { borderRadius, colors, spaces } from "@/src/theme";

interface PlugStatsProps {
  currentConsumption: number;
  isDeviceConnected: boolean;
}

export default function PlugStats({
  currentConsumption,
  isDeviceConnected,
}: PlugStatsProps) {
  return (
    <View style={styles.statsContainer}>
      <View style={styles.statsSubcontainer}>
        <AppText variant="bodyWhite">Consumption</AppText>
        <Heading variant="h4" style={{ color: "white" }}>
          {currentConsumption} kWh
        </Heading>
      </View>
      <View style={styles.statsSubcontainer}>
        <AppText variant="bodyWhite">Connection</AppText>
        <Heading variant="h4" style={{ color: "white" }}>
          {isDeviceConnected ? "Connected" : "No Device"}
        </Heading>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    columnGap: spaces.sm,
    width: "100%",
  },
  statsSubcontainer: {
    backgroundColor: colors.primary[500],
    borderRadius: borderRadius.sm,
    width: "49%",
    padding: spaces.sm,
  },
});
