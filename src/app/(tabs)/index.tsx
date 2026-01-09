import { StyleSheet, View } from "react-native";
import AppHeader from "../../features/home/AppHeader";
import ScreenView from "@/src/shared/ui/ScreenView";
import Rooms from "../../features/home/rooms/Rooms";
import { paddings, spaces } from "@/src/theme";
import Statistics from "@/src/features/home/statistics/Statistics";
import Schedules from "@/src/features/home/schedules/Schedules";

export default function App() {
  return (
    <ScreenView>
      <AppHeader />
      <View style={styles.componentsContainer}>
        <Rooms style={styles.componentsSubContainer} />
        <Statistics style={styles.componentsSubContainer} />
        <Schedules style={styles.componentsSubContainer} />
      </View>
    </ScreenView>
  );
}

const styles = StyleSheet.create({
  componentsContainer: {
    padding: paddings.page,
    height: "100%",
    rowGap: spaces.lg,
  },
  componentsSubContainer: {
    rowGap: spaces.md,
  },
});
