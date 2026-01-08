import { Heading } from "@/src/shared/ui/Heading";
import { View, StyleSheet } from "react-native";
import PlugScheduleRow from "@/src/features/plugs/components/PlugScheduleRow";
import { spaces } from "@/src/theme";

export default function PlugSchedules() {
  const schedules = [
    { scheduleName: "Schedule 1", action: "Turn off", time: "Monday" },
    {
      scheduleName: "Schedule 2",
      action: "Turn on",
      time: "Wednesday",
    },
  ];
  return (
    <View>
      <Heading variant="h3" hasLink={true} linkPlaceholder={"Manage"}>
        Schedules
      </Heading>
      <View style={styles.schedulesContainer}>
        {schedules.map((schedule) => (
          <PlugScheduleRow
            scheduleName={schedule.scheduleName}
            action={schedule.action}
            time={schedule.time}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  schedulesContainer: {
    rowGap: spaces.sm,
  },
});
