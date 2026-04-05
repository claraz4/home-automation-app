import WeeklyChart from "@/src/features/analytics/components/WeeklyChart";
import useSources from "@/src/hooks/useSources";
import { useEffect, useState } from "react";
import { api } from "@/src/api/api";
import { PowerSourceWeeklyHoursDTO } from "@/src/features/analytics/types/PowerSourceWeeklyHoursDTO";

export default function WeeklyHourChart() {
  const { sources } = useSources();
  const [data1, setData1] = useState<number[]>([]);
  const [data2, setData2] = useState<number[]>([]);
  const [data1Title, setData1Title] = useState("");
  const [data2Title, setData2Title] = useState("");

  const getSourceHours = async (powerSourceId: number) => {
    try {
      const { data } = await api.get<PowerSourceWeeklyHoursDTO>(
        `/analytics/mains/weekly/powersources/${powerSourceId}/hours`,
      );
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (sources.length !== 0) {
      getSourceHours(sources[0].id).then((data) => {
        if (data) {
          setData1Title(data.powerSourceName);
          setData1(data.days.map((day) => day.hours));
        }
      });
    }

    if (sources.length > 1) {
      getSourceHours(sources[1].id).then((data) => {
        if (data) {
          setData2Title(data.powerSourceName);
          setData2(data.days.map((day) => day.hours));
        }
      });
    }
  }, [sources]);

  return (
    <WeeklyChart
      data1Title={data1Title}
      data2Title={data2Title}
      data1={data1}
      data2={data2}
      unit={" h"}
      unitBefore={false}
    />
  );
}
