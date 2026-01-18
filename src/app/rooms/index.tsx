import { Heading } from "@/src/shared/ui/Heading";
import RoomsList from "@/src/features/rooms/components/RoomsList";
import ScreenView from "@/src/shared/ui/ScreenView";
import { View, StyleSheet } from "react-native";
import { borderRadius, paddings } from "@/src/theme";
import { AppText } from "@/src/shared/ui/AppText";
import { colors, spaces } from "@/src/theme";

export default function AllRooms() {
  return (
    <ScreenView style={{ padding: paddings.page }}>
      <Heading variant="h2" hasBackButton={true}>
        All Rooms
      </Heading>
      <View style={styles.componentsContainer}>
        <View style={styles.statsContainer}>
          <View style={styles.statsSubcontainer}>
            <AppText variant="bodyWhite">Total Rooms</AppText>
            <Heading variant={"h3"}>20</Heading>
          </View>
          <View style={styles.statsSubcontainer}>
            <AppText variant="bodyWhite">Active Devices</AppText>
            <Heading variant={"h3"}>20</Heading>
          </View>
          <View style={styles.statsSubcontainer}>
            <AppText variant="bodyWhite">Consumption</AppText>
            <Heading variant={"h3"}>120 kWh</Heading>
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
    paddingVertical: spaces.md,
    paddingHorizontal: spaces.md,
    flexDirection: "column",
    rowGap: spaces.sm,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: spaces.sm,
    marginBottom: spaces.md,
  },
  statsSubcontainer: {
    backgroundColor: colors.primary[500],
    height: 80,
    width: "32%",
    borderRadius: borderRadius.sm,
    justifyContent: "center",
    alignItems: "center",
  },
});
