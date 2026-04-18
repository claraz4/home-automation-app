import { View, StyleSheet, Pressable } from "react-native";
import { useCallback, useState } from "react";
import PlugBox from "@/src/features/rooms/components/PlugBox";
import {
  Href,
  router,
  useFocusEffect,
  useLocalSearchParams,
} from "expo-router";
import { borderRadius, spaces } from "@/src/theme";
import { api } from "@/src/api/api";
import { RoomPlugsDTO } from "../types/RoomPlugsDTO";
import AppActivityIndicator from "@/src/shared/ui/AppActivityIndicator";
import StatusBox from "@/src/shared/components/StatusBox";

export default function RoomPlugsList() {
  const { roomId } = useLocalSearchParams<{ roomId: string }>();

  const [roomPlugs, setRoomPlugs] = useState<RoomPlugsDTO>({ plugs: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getRoomPlugs = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await api.get<RoomPlugsDTO>(`/rooms/${roomId}/plugs`);
      setRoomPlugs(data);
    } catch (error) {
      setError("An error occurred while fetching plugs.");
    } finally {
      setLoading(false);
    }
  }, [roomId]);

  useFocusEffect(
    useCallback(() => {
      void getRoomPlugs();
    }, [getRoomPlugs]),
  );

  if (loading) return <AppActivityIndicator />;
  if (error) return <StatusBox message={error} />;

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
