import { Heading } from "@/src/shared/ui/Heading";
import RoomsList from "@/src/features/rooms/components/RoomsList";
import ScreenView from "@/src/shared/ui/ScreenView";
import { View, StyleSheet } from "react-native";
import { borderRadius, paddings } from "@/src/theme";
import { AppText } from "@/src/shared/ui/AppText";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { colors, spaces } from "@/src/theme";
import InfoBox from "@/src/shared/components/InfoBox";

export default function AllRooms() {
  const isIncreasing = true;
  const consumptionColor = isIncreasing
    ? colors.status.fail
    : colors.status.success;

  return (
    <ScreenView style={{ padding: paddings.page }}>
      <Heading variant="h2" hasBackButton={true}>
        All Rooms
      </Heading>
      <View style={styles.componentsContainer}>
        <View style={styles.statsContainer}>
          <InfoBox style={{ flex: 1 }} title="Devices" subtitle="20 Active" />
          <InfoBox style={{ width: 120 }} title="Rooms" subtitle="20" />
          <View style={styles.consumptionContainer}>
            <InfoBox
              style={styles.currentConsumptionBox}
              title="Current Consumption"
              subtitle="120 kWh"
              titleStyle={{ width: 130 }}
            />
            <View style={styles.consumptionPercentageContainer}>
              <FontAwesome6
                name={`arrow-trend-${isIncreasing ? "up" : "down"}`}
                size={24}
                color={consumptionColor}
              />
              <AppText style={{ color: consumptionColor }}>
                1% {isIncreasing ? "increase" : "decrease"} from yesterday
              </AppText>
            </View>
          </View>
        </View>

        <RoomsList />
      </View>
    </ScreenView>
  );
}

const styles = StyleSheet.create({
  componentsContainer: {
    width: "100%",
    position: "relative",
  },
  headerSubcontainer: {
    backgroundColor: "white",
    borderRadius: borderRadius.sm,
    padding: spaces.md,
    flexDirection: "column",
    rowGap: spaces.sm,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: spaces.md,
    flexWrap: "wrap",
    gap: spaces.sm,
    marginBottom: spaces.lg,
  },
  consumptionContainer: {
    flexDirection: "row",
    width: "100%",
    backgroundColor: colors.primary[500],
    borderRadius: borderRadius.md,
    padding: spaces.sm,
    justifyContent: "space-between",
    columnGap: spaces.xs,
  },
  consumptionPercentageContainer: {
    backgroundColor: "white",
    borderRadius: borderRadius.sm,
    flex: 1,
    padding: spaces.sm,
    rowGap: spaces.xxs,
  },
  currentConsumptionBox: {
    padding: 0,
    justifyContent: "center",
    rowGap: spaces.xs,
  },
});
