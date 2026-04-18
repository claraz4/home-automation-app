import { View, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { RoomDTO } from "@/src/features/home/types/RoomDTO";
import { householdApi } from "@/src/api/api";
import RoomListBox from "@/src/features/rooms/components/RoomListBox";
import { spaces } from "@/src/theme";
import StatusBox from "@/src/shared/components/StatusBox";
import AppActivityIndicator from "@/src/shared/ui/AppActivityIndicator";

export default function RoomsList() {
  const [roomsInfo, setRoomsInfo] = useState<RoomDTO[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getRoomsInfo = async () => {
      try {
        setLoading(true);
        const { data } = await householdApi.get("/rooms/plugs/details");
        setRoomsInfo(data.rooms);
      } catch (error) {
        setError("An error occurred while fetching room details.");
      } finally {
        setLoading(false);
      }
    };

    void getRoomsInfo();
  }, []);

  if (loading) return <AppActivityIndicator />;
  if (error) return <StatusBox message={error} />;

  return (
    <View style={styles.roomsListContainer} key={1}>
      {roomsInfo.map((room) => (
        <RoomListBox key={room.roomId} room={room} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  roomsListContainer: {
    flexDirection: "column",
    alignItems: "center",
    rowGap: spaces.sm,
    width: "100%",
  },
});
