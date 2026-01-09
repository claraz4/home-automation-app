import React from "react";
import { StyleSheet } from "react-native";
import ScreenView from "@/src/shared/ui/ScreenView";
import { Heading } from "@/src/shared/ui/Heading";
import { paddings, spaces } from "@/src/theme";
import CalendarDays from "@/src/features/schedule/components/CalendarDays";
import dayjs from "dayjs";

export default function Schedules() {
  const [currentDay, setCurrentDay] = React.useState<dayjs.Dayjs>(
    dayjs().startOf("day"),
  );

  return (
    <ScreenView style={styles.container}>
      <Heading variant="h2">Schedules</Heading>
      <CalendarDays currentDay={currentDay} setCurrentDay={setCurrentDay} />
    </ScreenView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: paddings.page,
    rowGap: spaces.md,
  },
});
