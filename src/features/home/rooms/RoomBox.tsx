import { StyleSheet, View } from "react-native";
import { spaces, colors, borderRadius } from "@/src/theme";
import { AppText } from "@/src/shared/ui/AppText";
import { RoomType } from "@/src/features/home/types/Room";
import { roomIcons } from "../data/roomIcons";

interface RoomBoxProps {
  roomType?: RoomType;
  size?: number;
  color?: string;
  roomName: string;
  deviceNumber: number;
  roomId: number;
}

export default function RoomBox({
  roomType = "default",
  size = spaces.xxl,
  color = "white",
  roomName,
  deviceNumber,
  roomId,
}: RoomBoxProps) {
  return (
    <View style={roomBoxStyles.roomBoxContainer} key={roomId}>
      <View style={roomBoxStyles.roomIconContainer}>
        {roomIcons(color, size)[roomType]}
      </View>
      <View style={roomBoxStyles.roomInfoContainer}>
        <AppText variant="bodyWhite">{roomName}</AppText>
        <AppText variant="bodyWhite" opacity={0.7}>
          {deviceNumber} devices
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
