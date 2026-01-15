import { View } from "react-native";
import dayjs from "dayjs";
import { ScheduleDTO } from "@/src/features/schedule/types/AllSchedulesDTO";
import { Heading } from "@/src/shared/ui/Heading";
import FeatureRow from "@/src/shared/components/FeatureRow";
import { spaces } from "@/src/theme";
import { Href } from "expo-router";

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
        {schedules.map((schedule) => (
          <FeatureRow
            key={schedule.id}
            headingText={schedule.name}
            hasExtraScreen={true}
            extraScreen={`/schedules/${schedule.id}` as Href}
            subtitleText={`${schedule.deviceCount} Plugs`}
          />
        ))}
      </View>
    </View>
  );
}
