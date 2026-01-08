import { View, StyleSheet } from "react-native";
import { RoomType } from "@/src/features/home/types/RoomDTO";
import { spaces } from "@/src/theme";
import InfoBox from "@/src/shared/components/InfoBox";

interface RoomHeaderProps {
  roomType: RoomType;
}

export default function RoomHeader({ roomType }: RoomHeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.statsContainer}>
        <InfoBox
          style={styles.statsSubContainer}
          title="Plugs"
          subtitle="4 Active"
        />
        <InfoBox
          style={styles.statsSubContainer}
          title="Consumption"
          subtitle="120 kWh"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    columnGap: spaces.sm,
  },
  statsContainer: {
    flexDirection: "row",
    rowGap: spaces.sm,
    flex: 4,
    justifyContent: "space-between",
  },
  statsSubContainer: {
    width: "49%",
  },
});
