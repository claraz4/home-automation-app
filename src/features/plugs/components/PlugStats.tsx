import { StyleSheet, View } from "react-native";
import { spaces } from "@/src/theme";
import InfoBox from "@/src/shared/components/InfoBox";

interface PlugStatsProps {
  currentConsumption: number;
  isDeviceConnected: boolean;
  currentTemperature: number;
}

export default function PlugStats({
  currentConsumption,
  isDeviceConnected,
  currentTemperature,
}: PlugStatsProps) {
  return (
    <View>
      <View style={styles.statsContainer}>
        <InfoBox
          style={styles.statsSubcontainer}
          title="Consumption"
          subtitle={
            isDeviceConnected
              ? `${currentConsumption < 1000 ? currentConsumption.toFixed(2) : (currentConsumption / 1000).toFixed()} ${currentConsumption < 1000 ? "Wh" : "kWh"}`
              : "No Device"
          }
        />
        <InfoBox
          style={styles.statsSubcontainer}
          title="Connection"
          subtitle={isDeviceConnected ? "Connected" : "No Device"}
        />
      </View>
      <View style={styles.statsContainer}>
        <InfoBox
          style={styles.statsSubcontainer}
          title="Temperature"
          subtitle={`${currentTemperature} °C`}
        />
        <InfoBox
          style={styles.statsSubcontainer}
          title="Humidity"
          subtitle={"58%"}
        />
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
    marginBottom: spaces.sm,
  },
  statsSubcontainer: {
    width: "49%",
  },
});
