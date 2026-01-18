import { View, StyleSheet, Pressable } from "react-native";
import { useEffect, useState } from "react";
import PlugBox from "@/src/features/rooms/components/PlugBox";
import { Href, router, useLocalSearchParams, usePathname } from "expo-router";
import { borderRadius, spaces } from "@/src/theme";
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
      {roomPlugs.plugs.map((plug) => {
        const extraScreen: Href = `/rooms/${roomId}/plugs/${plug.id}`;

        return (
          <Pressable
            key={plug.id}
            style={{ width: "100%" }}
            onPress={() => router.push(extraScreen)}
          >
            <PlugBox
              plug={plug}
              hasExtra={true}
              extraScreen={extraScreen}
              status={plug.isOn}
            />
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "space-between",
    borderRadius: borderRadius.md,
    rowGap: spaces.sm,
  },
});
