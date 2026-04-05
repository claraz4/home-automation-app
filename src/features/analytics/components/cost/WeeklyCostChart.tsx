import WeeklyChart from "@/src/features/analytics/components/WeeklyChart";
import { useCallback, useState } from "react";
import { api } from "@/src/api/api";
import { useFocusEffect } from "expo-router";
import { WeeklyCostDTO } from "@/src/features/analytics/types/WeeklyCostDTO";

function weeklyDataToSeriesMap(data: WeeklyCostDTO): Record<string, number[]> {
  const result: Record<string, number[]> = {};

  data.days.forEach((day, dayIndex) => {
    day.powerSources.forEach((ps) => {
      if (!result[ps.name]) {
        result[ps.name] = Array(data.days.length).fill(0);
      }

      result[ps.name][dayIndex] = ps.cost ?? 0;
    });
  });

  return result;
}

export default function WeeklyCostChart() {
  const [data1, setData1] = useState<number[]>([]);
  const [data2, setData2] = useState<number[]>([]);
  const [data1Title, setData1Title] = useState("");
  const [data2Title, setData2Title] = useState("");

  const getWeeklyCostData = async () => {
    try {
      const { data } = await api.get<WeeklyCostDTO>(
        "/analytics/mains/weekly/costs",
      );
      const series = weeklyDataToSeriesMap(data);
      const keys = Object.keys(series);
      setData1(series[keys[0]]);
      setData2(series[keys[1]]);
      setData1Title(keys[0]);
      setData2Title(keys[1]);
    } catch (error) {
      console.error(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      void getWeeklyCostData();
    }, []),
  );

  if (data1.length === 0) {
    return;
  }

  return (
    <WeeklyChart
      data1={data1}
      data2={data2}
      data1Title={data1Title}
      data2Title={data2Title}
      unit="$"
    />
  );
}
