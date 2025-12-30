import { Heading } from "@/src/shared/ui/Heading";
import ScreenView from "@/src/shared/ui/ScreenView";
import { View, StyleSheet } from "react-native";
import { paddings } from "@/src/theme";
import RoomPlugsList from "@/src/features/rooms/components/RoomPlugsList";

export default function RoomPlugs() {
  return (
    <ScreenView>
      <Heading variant="h3" hasBackButton={true}>
        Room 1
      </Heading>
      <View style={styles.componentsContainer}>
        <RoomPlugsList />
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
