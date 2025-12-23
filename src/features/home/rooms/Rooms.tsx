import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { Heading } from "@/src/shared/ui/Heading";
import { AppText } from "@/src/shared/ui/AppText";
import RoomsCarousel from "@/src/features/home/rooms/RoomsCarousel";
import { householdApi } from "@/src/api/api";
import { useEffect, useState } from "react";
import { RoomDTO } from "@/src/features/home/types/RoomDTO";

interface RoomsProps {
  style?: StyleProp<ViewStyle>;
}

export default function Rooms({ style }: RoomsProps) {
  const [roomsInfo, setRoomsInfo] = useState<RoomDTO[]>([]);

  useEffect(() => {
    // Get the general rooms info
    const getRoomsInfo = () => {
      householdApi
        .get("/rooms/plugs/details")
        .then((res) => setRoomsInfo(res.data.rooms))
        .catch((err) => console.error("Failed to fetch rooms info:", err));
    };

    getRoomsInfo();
  }, []);

  return (
    <View style={[roomsStyle.roomsContainer, style]}>
      <Heading variant="h2" hasLink={true} href="/" linkPlaceholder="Show All">
        Rooms
      </Heading>
      <RoomsCarousel rooms={roomsInfo}></RoomsCarousel>
    </View>
  );
}

const roomsStyle = StyleSheet.create({
  roomsContainer: {
    flexDirection: "column",
    justifyContent: "flex-start",
    width: "100%",
  },
});
