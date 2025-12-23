import { View, StyleSheet, ScrollView } from "react-native";
import RoomBox from "@/src/features/home/rooms/RoomBox";
import { RoomDTO } from "../types/RoomDTO";
import { spaces } from "@/src/theme";

interface RoomsCarouselProps {
  rooms: RoomDTO[];
}

export default function RoomsCarousel({ rooms }: RoomsCarouselProps) {
  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      <View style={roomsCarouselStyles.roomsCarouselContainer}>
        {rooms.map((room) => (
          <RoomBox key={room.roomId} room={room}></RoomBox>
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
