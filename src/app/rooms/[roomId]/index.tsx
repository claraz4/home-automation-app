import { Heading } from "@/src/shared/ui/Heading";
import ScreenView from "@/src/shared/ui/ScreenView";
import { View, StyleSheet } from "react-native";
import { paddings, spaces } from "@/src/theme";
import RoomPlugsList from "@/src/features/rooms/components/RoomPlugsList";
import RoomHeader from "@/src/features/rooms/components/RoomHeader";

export default function RoomPlugs() {
  return (
    <ScreenView>
      <Heading variant="h2" hasBackButton={true}>
        Room 1
      </Heading>
      <View style={styles.componentsContainer}>
        <RoomHeader roomType={"kitchen"} />
        <View>
          <Heading variant="h3" style={{ marginVertical: spaces.sm }}>
            Plugs
          </Heading>
          <RoomPlugsList />
        </View>
      </View>
    </ScreenView>
  );
}

const styles = StyleSheet.create({
  componentsContainer: {
    padding: paddings.page,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    rowGap: spaces.md,
  },
});
