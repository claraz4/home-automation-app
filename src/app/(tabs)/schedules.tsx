import React, { useCallback, useEffect, useState } from "react";
import { Pressable, StyleSheet } from "react-native";
import ScreenView from "@/src/shared/ui/ScreenView";
import { Heading } from "@/src/shared/ui/Heading";
import { colors, fontWeight, paddings, spaces } from "@/src/theme";
import CalendarDays from "@/src/features/schedule/components/CalendarDays";
import dayjs from "dayjs";
import { api } from "@/src/api/api";
import {
  AllSchedulesDTO,
  ScheduleDTO,
} from "@/src/features/schedule/types/AllSchedulesDTO";
import DaySchedule from "@/src/features/schedule/components/DaySchedule";
import { AppText } from "@/src/shared/ui/AppText";
import { router, useFocusEffect } from "expo-router";

export default function Schedules() {
  const [currentDay, setCurrentDay] = useState<dayjs.Dayjs>(
    dayjs().startOf("day"),
  );
  const [allSchedules, setAllSchedules] = useState<AllSchedulesDTO>();

  // Get all schedules
  useFocusEffect(
    useCallback(() => {
      const getAllSchedules = async () => {
        try {
          const res = await api.get<AllSchedulesDTO>("/schedules");
          setAllSchedules(res.data);
        } catch (error) {
          console.error(error);
        }
      };

      void getAllSchedules();
    }, []),
  );

  if (!allSchedules) return null;

  // Get all the days
  const scheduledDates = new Set(
    allSchedules.days
      .filter((day) => day.schedules.length > 0)
      .map((day) => day.date),
  );

  // Get the schedules for the current day
  const getCurrentDaySchedules = (currentDay: dayjs.Dayjs): ScheduleDTO[] => {
    const key = currentDay.format("YYYY-MM-DD");

    return (
      allSchedules.days.find(
        (day) => dayjs(day.date).format("YYYY-MM-DD") === key,
      )?.schedules ?? []
    );
  };

  return (
    <ScreenView style={styles.container}>
      <Heading
        variant="h2"
        hasBackButton={true}
        hasCustomLinkComponent={true}
        customLinkComponent={
          <Pressable
            style={styles.addButton}
            onPress={() => router.push("/schedules/create")}
          >
            <AppText style={styles.addButtonText}>+</AppText>
          </Pressable>
        }
      >
        Schedules
      </Heading>
      <CalendarDays
        currentDay={currentDay}
        setCurrentDay={setCurrentDay}
        allSchedules={scheduledDates}
      />
      <DaySchedule
        currentDay={currentDay}
        schedules={getCurrentDaySchedules(currentDay)}
      />
    </ScreenView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: paddings.page,
    rowGap: spaces.lg,
  },
  addButton: {
    backgroundColor: colors.primary[500],
    borderRadius: "50%",
    height: 36,
    width: 36,
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonText: {
    color: "white",
    fontSize: 30,
    fontFamily: fontWeight[500],
    lineHeight: 40,
  },
});
