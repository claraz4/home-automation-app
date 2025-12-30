import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import { colors, spaces } from "@/src/theme";
import { Heading } from "@/src/shared/ui/Heading";
import {
  getMaxValue,
  getNextMultiple,
} from "@/src/features/home/utils/consumptionGraphUtils";
import ConsumptionBarChart from "./ConsumptionBarChart";
import { householdApi } from "@/src/api/api";
import { RoomConsumptionGroupedDTO } from "@/src/features/home/types/RoomConsumptionGroupedDTO";

interface ConsumptionGraphProps {
  style?: StyleProp<ViewStyle>;
}

export default function ConsumptionGraph({ style }: ConsumptionGraphProps) {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [roomsConsumptions, setRoomsConsumptions] = useState<
    RoomConsumptionGroupedDTO[]
  >([]);
  const [roomsConsumptionsEdited, setRoomsConsumptionEdited] =
    useState<any>(null);
  const [maxValue, setMaxValue] = useState<number>(0);

  useEffect(() => {
    // Get the grouped rooms
    const getRoomsConsumption = (isGrouped: boolean) => {
      householdApi
        .get(`/rooms/consumption/daily?groupByRoomType=${isGrouped}`)
        .then((res) => {
          setRoomsConsumptions(
            isGrouped ? res.data.groupedRooms : res.data.rooms,
          );
        })
        .catch((err) =>
          console.error("Failed to fetch rooms consumption:", err),
        );
    };

    getRoomsConsumption(true);
  }, []);

  useEffect(() => {
    setRoomsConsumptionEdited(() =>
      roomsConsumptions.map((item, index) => ({
        label: item.roomType,
        value: item.consumption,
        frontColor:
          selectedIndex !== index ? colors.primary[500] : colors.secondary[500],
        onPress: () => {
          setSelectedIndex(index);
        },
      })),
    );
  }, [roomsConsumptions, selectedIndex]);

  useEffect(() => {
    if (roomsConsumptionsEdited)
      setMaxValue(getNextMultiple(10, getMaxValue(roomsConsumptionsEdited)));
  }, [roomsConsumptionsEdited]);

  if (!roomsConsumptionsEdited || roomsConsumptions.length === 0) {
    return <View>Loading</View>;
  }

  if (roomsConsumptionsEdited.length === 0)
    return <View>No current consumption</View>;

  return (
    <View style={[style, styles.consumptionGraphContainer]}>
      <Heading variant="h3">Daily Power Consumption</Heading>
      <View>
        <Heading
          variant="h2"
          style={{ color: colors.secondary[500], marginBottom: spaces.md }}
        >
          {roomsConsumptionsEdited[selectedIndex].label}:{" "}
          {roomsConsumptionsEdited[selectedIndex].value} kW
        </Heading>
        <ScrollView showsVerticalScrollIndicator={false}>
          <ConsumptionBarChart
            data={roomsConsumptionsEdited}
            maxValue={maxValue}
          />
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  consumptionGraphContainer: {
    width: "100%",
    rowGap: spaces.md,
    padding: spaces.lg,
    paddingLeft: spaces.md,
  },
});
