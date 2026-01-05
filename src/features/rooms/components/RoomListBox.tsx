import { Pressable, StyleSheet, View } from "react-native";
import { spaces, colors, borderRadius, boxShadow } from "@/src/theme";
import { AppText } from "@/src/shared/ui/AppText";
import { roomIcons } from "@/src/shared/data/roomIcons";
import { RoomDTO } from "@/src/features/home/types/RoomDTO";
import { router } from "expo-router";
import { Heading } from "@/src/shared/ui/Heading";

interface RoomListBoxProps {
  room: RoomDTO;
}

export default function RoomListBox({ room }: RoomListBoxProps) {
  return (
    <Pressable
      style={styles.roomBoxContainer}
      key={room.roomId}
      onPress={() =>
        router.push({
          pathname: "/rooms/[roomId]",
          params: {
            roomId: room.roomId,
          },
        })
      }
    >
      <View
        style={{
          backgroundColor: colors.primary[500],
          borderRadius: borderRadius.sm,
          width: 60,
          height: 60,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {roomIcons("white", 30)[room.roomType]}
      </View>
      <View style={styles.roomInfoContainer}>
        <Heading variant="h5">{room.name}</Heading>
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
    </Pressable>
  );
}

const styles = StyleSheet.create({
  roomBoxContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    columnGap: spaces.md + spaces.xs,
    backgroundColor: "white",
    borderRadius: borderRadius.md,
    flexGrow: 1,
    boxShadow: "0.5px 0.5px 5px 0px rgba(0, 0, 0, 0.1)",
    paddingHorizontal: spaces.md,
    paddingVertical: spaces.sm,
  },
  roomInfoContainer: {
    flexDirection: "column",
    rowGap: spaces.xs,
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
