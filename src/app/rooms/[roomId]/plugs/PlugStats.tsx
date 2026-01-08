import { StyleSheet, View } from "react-native";
import { AppText } from "@/src/shared/ui/AppText";
import { Heading } from "@/src/shared/ui/Heading";
import { borderRadius, colors, paddings, spaces } from "@/src/theme";

export default function PlugStats() {
  return (
    <View style={styles.statsContainer}>
      <View style={styles.statsSubcontainer}>
        <AppText variant="bodyWhite">Consumption</AppText>
        <Heading variant="h4" style={{ color: "white" }}>
          129 kWh
        </Heading>
      </View>
      <View style={styles.statsSubcontainer}>
        <AppText variant="bodyWhite">Connection</AppText>
        <Heading variant="h4" style={{ color: "white" }}>
          No Device
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
