import FeatureRow from "@/src/shared/components/FeatureRow";
import { ScheduleDTO } from "@/src/features/schedule/types/DaySchedulesDTO";
import dayjs from "dayjs";

interface PlugScheduleRowProps {
  schedule: ScheduleDTO;
}

export default function PlugScheduleRow({ schedule }: PlugScheduleRowProps) {
  const { name, time, isActive, id, deviceCount } = schedule;
  const timeAsDayjs = dayjs(time);
  const formattedTime = timeAsDayjs.format("ddd, DD MMM [at] H:mm");

  return (
    <FeatureRow
      headingText={`${name}  •  ${deviceCount} Plug${deviceCount === 1 ? "" : "s"}`}
      subtitleText={formattedTime}
      status={isActive}
      hasExtra={true}
      extraScreen={{
        pathname: "/schedules/[scheduleId]",
        params: { scheduleId: id + "" },
      }}
    />
  );
}
