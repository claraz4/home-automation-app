import { StyleSheet, View } from "react-native";
import { spaces, colors, borderRadius, boxShadow } from "@/src/theme";
import { AppText } from "@/src/shared/ui/AppText";
import { roomIcons } from "../../home/data/roomIcons";
import { RoomDTO } from "@/src/features/home/types/RoomDTO";

interface RoomListBoxProps {
  room: RoomDTO;
}

export default function RoomListBox({ room }: RoomListBoxProps) {
  return (
    <View style={styles.roomBoxContainer} key={room.id}>
      {roomIcons(colors.primary[500], 45)[room.roomType]}
      <View style={styles.roomInfoContainer}>
        <AppText variant="body">{room.name}</AppText>
        <View style={styles.deviceCountContainer}>
          <AppText variant="bodySecondary">
            {room.totalPlugsCount} devices
          </AppText>
          <View style={styles.activePlugsContainer}>
            <View style={styles.greenCircle}></View>
            <AppText variant="bodySecondary">
              {room.activePlugsCount} active
            </AppText>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  roomBoxContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    columnGap: spaces.md,
    backgroundColor: "white",
    padding: spaces.sm,
    borderRadius: borderRadius.md,
    flexGrow: 1,
    ...boxShadow.normal,
  },
  roomInfoContainer: {
    flexDirection: "column",
    rowGap: spaces.xxs,
    alignItems: "flex-start",
    flexGrow: 1,
  },
  deviceCountContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flexGrow: 1,
    alignSelf: "stretch",
  },
  activePlugsContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    columnGap: spaces.xs - spaces.xxxs,
  },
  greenCircle: {
    borderRadius: "50%",
    width: 10,
    height: 10,
    backgroundColor: colors.status.success,
  },
});
