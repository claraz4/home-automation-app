import { View, StyleSheet, Pressable } from "react-native";
import { useEffect, useState } from "react";
import PlugBox from "@/src/features/rooms/components/PlugBox";
import { router, useLocalSearchParams } from "expo-router";
import { borderRadius, boxShadow } from "@/src/theme";
import { api } from "@/src/api/api";
import { RoomPlugsDTO } from "../types/RoomPlugsDTO";

export default function RoomPlugsList() {
  const { roomId } = useLocalSearchParams<{ roomId: string }>();

  const [roomPlugs, setRoomPlugs] = useState<RoomPlugsDTO>({ plugs: [] });

  useEffect(() => {
    if (!roomId) return;

    const getRoomPlugs = async () => {
      try {
        const { data } = await api.get<RoomPlugsDTO>(`/rooms/${roomId}/plugs`);
        setRoomPlugs(data);
      } catch (e) {
        console.error(e);
      }
    };

    void getRoomPlugs();
  }, [roomId]);

  return (
    <View style={styles.container}>
      {roomPlugs.plugs.map((plug) => (
        <Pressable
          key={plug.id}
          onPress={() =>
            router.push({
              pathname: `/rooms/[roomId]/plugs/[plugId]`,
              params: {
                roomId: String(roomId),
                plugId: String(plug.id),
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
