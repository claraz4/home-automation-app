import { View, StyleSheet, ScrollView } from "react-native";
import RoomBox from "@/src/features/home/rooms/RoomBox";
import { Room } from "../types/Room";
import { spaces } from "@/src/theme";

interface RoomsCarouselProps {
  rooms: Room[];
}

export default function RoomsCarousel({ rooms }: RoomsCarouselProps) {
  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      <View style={roomsCarouselStyles.roomsCarouselContainer}>
        {rooms.map((room) => (
          <RoomBox
            key={room.id}
            roomId={room.id}
            roomName={room.name}
            deviceNumber={room.deviceNumber}
            roomType={room.type}
          ></RoomBox>
        ))}
      </View>
    </ScrollView>
  );
}

const roomsCarouselStyles = StyleSheet.create({
  roomsCarouselContainer: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: spaces.sm,
  },
});
