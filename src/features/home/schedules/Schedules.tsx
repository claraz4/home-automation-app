import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { Heading } from "@/src/shared/ui/Heading";
import { ScheduleDay } from "@/src/features/home/schedules/ScheduleDay";
import { ScheduleTimeSlot } from "@/src/features/home/schedules/ScheduleTimeSlot";
import { ScheduleItem } from "@/src/features/home/schedules/ScheduleItem";
import { spaces } from "@/src/theme";
import { useFocusEffect } from "expo-router";
import useSchedules from "@/src/features/schedule/hooks/useSchedules";
import { useCallback, useState } from "react";
// import { AllSchedulesDTO } from "@/src/features/schedule/types/DaySchedulesDTO";
import dayjs from "dayjs";
import { AppText } from "@/src/shared/ui/AppText";

interface SchedulesProps {
  style: StyleProp<ViewStyle>;
}

export default function Schedules({ style }: SchedulesProps) {
  // const { getAllSchedules } = useSchedules();
  const [schedules, setSchedules] = useState();

  // const fetchAllSchedules = async () => {
  //   try {
  //     const res = await getAllSchedules();
  //
  //     if (res) {
  //       setSchedules(res.data);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // useFocusEffect(
  //   useCallback(() => {
  //     void fetchAllSchedules();
  //   }, []),
  // );

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

      {schedules && schedules.totalDays !== 0 ? (
        <View style={styles.subContainer}>
          {schedules.days.slice(0, 2).map((day) => {
            const date = dayjs(day.date);

            return (
              <ScheduleDay
                key={day.date}
                title={`${date.format("DD")} ${date.format("MMMM")}`}
              >
                {day.schedules.map((schedule) => {
                  if (!schedule.isActive) return;

                  const newDate = dayjs(schedule.time);
                  const time = `${newDate.format("HH")}:${newDate.format("mm")}`;

                  return (
                    <ScheduleTimeSlot key={time} time={time}>
                      <ScheduleItem
                        key={schedule.id}
                        name={schedule.name}
                        deviceCount={schedule.deviceCount}
                      />
                    </ScheduleTimeSlot>
                  );
                })}
              </ScheduleDay>
            );
          })}
        </View>
      ) : (
        <AppText variant="bodySecondary">
          There are no schedules planned.
        </AppText>
      )}
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
