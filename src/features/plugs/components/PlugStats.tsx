import { StyleSheet, View } from "react-native";
import { spaces } from "@/src/theme";
import InfoBox from "@/src/shared/components/InfoBox";

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
      <InfoBox
        style={styles.statsSubcontainer}
        title="Consumption"
        subtitle={`${currentConsumption} kWh`}
      />
      <InfoBox
        style={styles.statsSubcontainer}
        title="Connection"
        subtitle={isDeviceConnected ? "Connected" : "No Device"}
      />
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
    width: "49%",
  },
});
