import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { Heading } from "@/src/shared/ui/Heading";
import { ScheduleDay } from "@/src/features/home/schedules/ScheduleDay";
import { ScheduleTimeSlot } from "@/src/features/home/schedules/ScheduleTimeSlot";
import { ScheduleItem } from "@/src/features/home/schedules/ScheduleItem";
import { spaces } from "@/src/theme";
import { useFocusEffect } from "expo-router";
import useSchedules from "@/src/features/schedule/hooks/useSchedules";
import { useCallback, useState } from "react";
import dayjs from "dayjs";
import { AppText } from "@/src/shared/ui/AppText";
import { UpcomingSchedulesDTO } from "@/src/features/schedule/types/UpcomingSchedulesDTO";
import PlugSchedules from "@/src/features/plugs/components/PlugSchedules";

interface SchedulesProps {
  style: StyleProp<ViewStyle>;
}

export default function Schedules({ style }: SchedulesProps) {
  return (
    <View>
      <Heading
        variant="h2"
        containerStyles={styles.heading}
        hasLink={true}
        href="/schedules"
        linkPlaceholder="Show All"
      >
        Schedules
      </Heading>

      <PlugSchedules includeHeading={false} />
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    marginBottom: spaces.xs,
  },
  subContainer: {
    flexDirection: "column",
    rowGap: spaces.md,
  },
});
