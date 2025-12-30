import { View, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { RoomDTO } from "@/src/features/home/types/RoomDTO";
import { householdApi } from "@/src/api/api";
import RoomListBox from "@/src/features/rooms/components/RoomListBox";
import { spaces } from "@/src/theme";

export default function RoomsList() {
  const [roomsInfo, setRoomsInfo] = useState<RoomDTO[]>([]);

  useEffect(() => {
    // Get the general rooms info
    const getRoomsInfo = () => {
      householdApi
        .get("/rooms/plugs/details")
        .then((res) => setRoomsInfo(res.data.rooms))
        .catch((err) => console.error("Failed to fetch rooms info:", err));
    };

    getRoomsInfo();
  }, []);

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
    rowGap: spaces.md,
    width: "100%",
  },
});
