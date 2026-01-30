import { View } from "react-native";
import dayjs from "dayjs";
import { ScheduleDTO } from "@/src/features/schedule/types/DaySchedulesDTO";
import { Heading } from "@/src/shared/ui/Heading";
import FeatureRow from "@/src/shared/components/FeatureRow";
import { spaces } from "@/src/theme";
import { AppText } from "@/src/shared/ui/AppText";

interface DayScheduleProps {
  currentDay: dayjs.Dayjs;
  schedules: ScheduleDTO[];
}

export default function DaySchedule({
  currentDay,
  schedules,
}: DayScheduleProps) {
  return (
    <View>
      <Heading
        variant="h3"
        style={{ marginBottom: spaces.sm }}
      >{`${currentDay.format("dddd")}, ${currentDay.format("MMMM")} ${currentDay.date()}`}</Heading>
      <View style={{ rowGap: spaces.sm }}>
        {schedules.length === 0 ? (
          <AppText variant="bodySecondary">
            No schedules are planned for this day.
          </AppText>
        ) : (
          schedules.map((schedule) => (
            <FeatureRow
              key={schedule.id}
              headingText={schedule.name}
              hasExtra={true}
              extraScreen={{
                pathname: "/schedules/[scheduleId]",
                params: {
                  scheduleId: schedule.id,
                },
              }}
              hasStatus={true}
              status={schedule.isActive}
              subtitleText={`${schedule.deviceCount} Plugs`}
            />
          ))
        )}
      </View>
    </View>
  );
}
