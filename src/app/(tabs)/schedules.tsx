import React, { useCallback, useState } from "react";
import { Pressable, StyleSheet } from "react-native";
import ScreenView from "@/src/shared/ui/ScreenView";
import { Heading } from "@/src/shared/ui/Heading";
import { colors, fontWeight, paddings, spaces } from "@/src/theme";
import CalendarDays from "@/src/features/schedule/components/CalendarDays";
import dayjs from "dayjs";
import { DaySchedulesDTO } from "@/src/features/schedule/types/DaySchedulesDTO";
import DaySchedule from "@/src/features/schedule/components/DaySchedule";
import { AppText } from "@/src/shared/ui/AppText";
import { router, useFocusEffect } from "expo-router";
import useSchedules from "@/src/features/schedule/hooks/useSchedules";
import AddButton from "@/src/shared/components/AddButton";

export default function Schedules() {
  const [currentDay, setCurrentDay] = useState<dayjs.Dayjs>(
    dayjs().startOf("day"),
  );
  const [scheduledDays, setScheduledDays] = useState<string[]>([]);
  const [currentDaySchedules, setCurrentDaySchedules] =
    useState<DaySchedulesDTO>({ schedules: [] });
  const { getScheduledDays, getCurrentDaySchedules } = useSchedules();

  // Get all days with  schedules
  const fetchScheduledDays = useCallback(async () => {
    const res = await getScheduledDays();

    if (res) {
      setScheduledDays(res.data.scheduledDates);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      void fetchScheduledDays();
    }, [fetchScheduledDays]),
  );

  // Get all the schedules of the selected day
  const fetchDaySchedules = useCallback(async () => {
    setCurrentDaySchedules({ schedules: [] });
    let currentDayFormatted = currentDay.format("YYYY-MM-DD");
    const res = await getCurrentDaySchedules(currentDayFormatted);

    if (res) {
      setCurrentDaySchedules(res.data);
    }
  }, [currentDay]);

  // Get all schedules
  useFocusEffect(
    useCallback(() => {
      void fetchDaySchedules();
    }, [fetchDaySchedules, currentDay]),
  );

  if (!scheduledDays && !currentDaySchedules) return null;

  return (
    <ScreenView style={styles.container}>
      <Heading
        variant="h2"
        hasBackButton={true}
        hasCustomLinkComponent={true}
        customLinkComponent={
          <AddButton onPress={() => router.push("/schedules/create")} />
        }
      >
        Schedules
      </Heading>
      <CalendarDays
        currentDay={currentDay}
        setCurrentDay={setCurrentDay}
        allSchedules={scheduledDays}
      />
      <DaySchedule
        currentDay={currentDay}
        schedules={currentDaySchedules.schedules}
      />
    </ScreenView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: paddings.page,
    rowGap: spaces.lg,
  },
});
