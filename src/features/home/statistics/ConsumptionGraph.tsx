import React, { useEffect, useMemo, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { borderRadius, boxShadow, colors, spaces } from "@/src/theme";
import { Heading } from "@/src/shared/ui/Heading";
import {
  getMaxValue,
  getNextMultiple,
} from "@/src/features/home/utils/consumptionGraphUtils";
import ConsumptionBarChart from "./ConsumptionBarChart";
import { householdApi } from "@/src/api/api";
import { RoomConsumptionGroupedDTO } from "@/src/features/home/types/RoomConsumptionGroupedDTO";
import NoConsumptionData from "@/src/features/home/statistics/NoConsumptionData";
import SegmentedControl from "@/src/shared/components/SegmentedControl";

type ChartItem = {
  label: string;
  value: number;
  frontColor: string;
  onPress: () => void;
};

export default function ConsumptionGraph() {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [roomsConsumptions, setRoomsConsumptions] = useState<
    RoomConsumptionGroupedDTO[]
  >([]);
  const segmentedControlOptions = ["Individual", "By Type"];
  const [selectedOption, setSelectedOption] = useState<string>(
    segmentedControlOptions[0],
  );

  // Get the grouped rooms
  useEffect(() => {
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

    getRoomsConsumption(selectedOption === "By Type");
  }, [selectedOption]);

  // Get chart data (sorted by consumption descending)
  const chartData = useMemo<ChartItem[]>(() => {
    return [...roomsConsumptions]
      .sort((a, b) => b.consumption - a.consumption)
      .map((item, index) => ({
        label:
          item.roomType.charAt(0).toUpperCase() + item.roomType.substring(1),
        value: item.consumption,
        frontColor:
          selectedIndex === index ? colors.secondary[500] : colors.primary[500],
        onPress: () => setSelectedIndex(index),
      }));
  }, [roomsConsumptions, selectedIndex]);

  // Get chart max value
  const maxValue = useMemo(() => {
    if (chartData.length === 0) return 0;
    return getNextMultiple(10, getMaxValue(chartData));
  }, [chartData]);

  const selectedItem = chartData[selectedIndex];

  return (
    <View style={styles.consumptionGraphContainer}>
      <Heading variant="h4">Daily Consumption</Heading>
      {maxValue === 0 ? (
        <NoConsumptionData />
      ) : (
        <View>
          <Heading
            variant="h3"
            style={{ color: colors.secondary[500], marginBottom: spaces.md }}
          >
            {selectedItem.label}: {selectedItem.value} kW
          </Heading>
          <SegmentedControl
            options={segmentedControlOptions}
            value={selectedOption}
            onPress={setSelectedOption}
            style={{ marginBottom: spaces.md }}
          />
          <ScrollView showsHorizontalScrollIndicator={false} horizontal>
            <ConsumptionBarChart data={chartData} maxValue={maxValue} />
          </ScrollView>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  consumptionGraphContainer: {
    width: "100%",
    rowGap: spaces.md,
    padding: spaces.md,
    paddingLeft: spaces.md,
    borderRadius: borderRadius.md,
    backgroundColor: "white",
    ...boxShadow.normal,
  },
  noDataContainer: {
    justifyContent: "center",
    alignItems: "center",
    rowGap: spaces.sm,
  },
});
