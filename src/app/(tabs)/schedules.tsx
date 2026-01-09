import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import ScreenView from "@/src/shared/ui/ScreenView";
import { Heading } from "@/src/shared/ui/Heading";
import { paddings, spaces } from "@/src/theme";
import CalendarDays from "@/src/features/schedule/components/CalendarDays";
import dayjs from "dayjs";
import { api } from "@/src/api/api";
import {
  AllSchedulesDTO,
  ScheduleDTO,
} from "@/src/features/schedule/types/AllSchedulesDTO";
import DaySchedule from "@/src/features/schedule/components/DaySchedule";

export default function Schedules() {
  const [currentDay, setCurrentDay] = useState<dayjs.Dayjs>(
    dayjs().startOf("day"),
  );
  const [allSchedules, setAllSchedules] = useState<ScheduleDTO[]>([]);

  // Get all schedules
  useEffect(() => {
    const getAllSchedules = async () => {
      try {
        const res = await api.get<AllSchedulesDTO>("/schedules");
        setAllSchedules(res.data.schedules);
      } catch (error) {
        console.error(error);
      }
    };

    void getAllSchedules();
  }, []);

  return (
    <ScreenView style={styles.container}>
      <Heading variant="h2">Schedules</Heading>
      <CalendarDays
        currentDay={currentDay}
        setCurrentDay={setCurrentDay}
        allSchedules={allSchedules}
      />
      <DaySchedule currentDay={currentDay} schedules={allSchedules} />
    </ScreenView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: paddings.page,
    rowGap: spaces.md,
  },
});
