import ScreenView from "@/src/shared/ui/ScreenView";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Heading } from "@/src/shared/ui/Heading";
import { colors, paddings, spaces } from "@/src/theme";
import { View, StyleSheet } from "react-native";
import PlugStats from "@/src/app/rooms/[roomId]/plugs/PlugStats";
import PlugAutomation from "@/src/app/rooms/[roomId]/plugs/PlugAutomation";
import PlugSchedules from "@/src/app/rooms/[roomId]/plugs/PlugSchedules";

export default function Plug() {
  return (
    <ScreenView>
      <Heading variant="h2" hasBackButton={true}>
        Plug 1
      </Heading>
      <View style={styles.componentsContainer}>
        <Ionicons
          name="power"
          size={150}
          color={colors.primary[500]}
          style={{ alignSelf: "center" }}
        />
        <PlugStats />
        <PlugAutomation />
        <PlugSchedules />
      </View>
    </ScreenView>
  );
}

const styles = StyleSheet.create({
  componentsContainer: {
    flexDirection: "column",
    justifyContent: "center",
    padding: paddings.page,
    rowGap: spaces.md,
  },
});
