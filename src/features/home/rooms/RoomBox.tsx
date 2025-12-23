import { StyleSheet, View } from "react-native";
import { spaces, colors, borderRadius } from "@/src/theme";
import { AppText } from "@/src/shared/ui/AppText";
import { roomIcons } from "../data/roomIcons";
import { RoomDTO } from "@/src/features/home/types/RoomDTO";

interface RoomBoxProps {
  room: RoomDTO;
  size?: number;
  color?: string;
}

export default function RoomBox({
  size = spaces.xxl,
  color = "white",
  room,
}: RoomBoxProps) {
  return (
    <View style={roomBoxStyles.roomBoxContainer} key={room.roomId}>
      <View style={roomBoxStyles.roomIconContainer}>
        {roomIcons(color, size)[room.roomType]}
      </View>
      <View style={roomBoxStyles.roomInfoContainer}>
        <AppText variant="bodyWhite">{room.name}</AppText>
        <AppText variant="bodyWhite" opacity={0.7}>
          {room.totalPlugsCount} devices
        </AppText>
      </View>
    </View>
  );
}

const roomBoxStyles = StyleSheet.create({
  roomBoxContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    columnGap: spaces.sm,
    backgroundColor: colors.primary[500],
    color: "white",
    padding: spaces.sm,
    borderRadius: borderRadius.md,
    width: spaces.xl * 4.5,
    rowGap: spaces.sm,
  },
  roomInfoContainer: {
    flexDirection: "column",
    rowGap: spaces.xxs,
    alignItems: "flex-start",
    width: "100%",
  },
  roomIconContainer: {
    backgroundColor: "rgba(255,255,255,0.3)",
    borderRadius: borderRadius.md,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    height: spaces.xxxl * 1.5,
  },
});
