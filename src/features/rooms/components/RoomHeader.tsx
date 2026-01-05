import { View, StyleSheet } from "react-native";
import { RoomType } from "@/src/features/home/types/RoomDTO";
import { roomIcons } from "@/src/shared/data/roomIcons";
import { borderRadius, colors, spaces } from "@/src/theme";
import { Heading } from "@/src/shared/ui/Heading";

interface RoomHeaderProps {
  roomType: RoomType;
}

export default function RoomHeader({ roomType }: RoomHeaderProps) {
  return (
    <View style={styles.container}>
      {roomIcons("white", 50)[roomType]}
      <Heading variant="h4" style={styles.heading}>
        {roomType}
      </Heading>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary[500],
    borderRadius: borderRadius.md,
    padding: spaces.md,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    rowGap: spaces.sm,
  },
  heading: {
    color: "white",
    textTransform: "capitalize",
  },
});
