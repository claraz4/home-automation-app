import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { Heading } from "@/src/shared/ui/Heading";
import { schedulesData } from "@/src/features/home/data/schedulesData";
import { monthMapping } from "@/src/shared/data/monthMapping";
import { ScheduleDay } from "@/src/features/home/schedules/ScheduleDay";
import { ScheduleTimeSlot } from "@/src/features/home/schedules/ScheduleTimeSlot";
import { ScheduleItem } from "@/src/features/home/schedules/ScheduleItem";
import { spaces } from "@/src/theme";
import { AppText } from "@/src/shared/ui/AppText";
import { Link } from "expo-router";

interface SchedulesProps {
  style?: StyleProp<ViewStyle>;
}

export default function Schedules() {
  return (
    <View>
      <Heading variant="h2" style={styles.heading}>
        Schedules
      </Heading>

      <View style={styles.subContainer}>
        {schedulesData.days.map((day) => (
          <ScheduleDay
            key={day.date.toISOString()}
            title={`${day.date.getDate()} ${monthMapping[day.date.getMonth()]}`}
          >
            {day.timeSlots.map((slot) => (
              <ScheduleTimeSlot key={slot.time} time={slot.time}>
                {slot.schedules.map((schedule) => (
                  <ScheduleItem
                    key={schedule.id}
                    name={schedule.name}
                    deviceCount={schedule.deviceCount}
                  />
                ))}
              </ScheduleTimeSlot>
            ))}
          </ScheduleDay>
        ))}
      </View>
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
