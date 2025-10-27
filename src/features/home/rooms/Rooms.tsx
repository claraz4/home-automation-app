import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { Heading } from "@/src/shared/ui/Heading";
import { AppText } from "@/src/shared/ui/AppText";
import RoomsCarousel from "@/src/features/home/rooms/RoomsCarousel";
import { roomsList } from "@/src/features/home/data/roomsList";

interface RoomsProps {
  style?: StyleProp<ViewStyle>;
}

export default function Rooms({ style }: RoomsProps) {
  return (
    <View style={[roomsStyle.roomsContainer, style]}>
      <View style={roomsStyle.roomsHeaderContainer}>
        <Heading variant="h2">Rooms</Heading>
        <AppText variant="emphasis">See All</AppText>
      </View>
      <RoomsCarousel rooms={roomsList}></RoomsCarousel>
    </View>
  );
}

const roomsStyle = StyleSheet.create({
  roomsContainer: {
    flexDirection: "column",
    justifyContent: "flex-start",
    width: "100%",
  },
  roomsHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
  },
});
