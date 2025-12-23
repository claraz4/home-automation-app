import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { Heading } from "@/src/shared/ui/Heading";
import { schedulesData } from "@/src/features/home/data/schedulesData";
import { monthMapping } from "@/src/shared/data/monthMapping";
import { ScheduleDay } from "@/src/features/home/schedules/ScheduleDay";
import { ScheduleTimeSlot } from "@/src/features/home/schedules/ScheduleTimeSlot";
import { ScheduleItem } from "@/src/features/home/schedules/ScheduleItem";
import { spaces } from "@/src/theme";

export default function Schedules() {
  return (
    <View>
      <Heading
        variant="h2"
        containerStyles={styles.heading}
        hasLink={true}
        href="/"
        linkPlaceholder="Show All"
      >
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
