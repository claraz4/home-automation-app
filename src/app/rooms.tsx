import { Heading } from "@/src/shared/ui/Heading";
import RoomsList from "@/src/features/rooms/components/RoomsList";
import ScreenView from "@/src/shared/ui/ScreenView";
import { View, StyleSheet } from "react-native";
import { paddings } from "@/src/theme";

export default function AllRooms() {
  return (
    <ScreenView>
      <Heading variant="h3" hasBackButton={true}>
        All Rooms
      </Heading>
      <View style={styles.componentsContainer}>
        <RoomsList />
      </View>
    </ScreenView>
  );
}

const styles = StyleSheet.create({
  componentsContainer: {
    padding: paddings.page,
    width: "100%",
  },
});
