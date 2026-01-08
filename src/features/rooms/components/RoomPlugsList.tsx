import { View, StyleSheet, Pressable } from "react-native";
import { useEffect, useState } from "react";
import { RoomPlugDTO } from "@/src/features/rooms/data/RoomPlugDTO";
import PlugBox from "@/src/features/rooms/components/PlugBox";
import { router, useLocalSearchParams } from "expo-router";
import { borderRadius, boxShadow } from "@/src/theme";

export default function RoomPlugsList() {
  const { roomId } = useLocalSearchParams<{ roomId: string }>();

  const [roomPlugs, setRoomPlugs] = useState<RoomPlugDTO[]>([]);

  useEffect(() => {
    setRoomPlugs([
      { plugId: 1, name: "Plug 1", isOn: true, isConstant: true },
      {
        plugId: 2,
        name: "Plug 2",
        isOn: false,
        isConstant: false,
      },
      {
        plugId: 3,
        name: "Plug 3",
        isOn: false,
        isConstant: false,
      },
    ]);
  }, []);

  return (
    <View style={styles.container}>
      {roomPlugs.map((plug) => (
        <Pressable
          key={plug.plugId}
          onPress={() =>
            router.push({
              pathname: `/rooms/[roomId]/plugs/[plugId]`,
              params: {
                roomId: String(roomId),
                plugId: String(plug.plugId),
              },
            })
          }
        >
          <PlugBox plug={plug} />
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    justifyContent: "space-between",
    backgroundColor: "white",
    ...boxShadow.normal,
    borderRadius: borderRadius.md,
  },
});
