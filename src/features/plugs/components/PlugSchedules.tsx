import { Heading } from "@/src/shared/ui/Heading";
import { View, StyleSheet } from "react-native";
import PlugScheduleRow from "@/src/features/plugs/components/PlugScheduleRow";
import { spaces } from "@/src/theme";
import useSchedules from "@/src/features/schedule/hooks/useSchedules";
import { useCallback, useState } from "react";
import { UpcomingSchedulesDTO } from "@/src/features/schedule/types/UpcomingSchedulesDTO";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import { AppText } from "@/src/shared/ui/AppText";

interface PlugSchedulesProps {
  includeHeading?: boolean;
}

export default function PlugSchedules({
  includeHeading = true,
}: PlugSchedulesProps) {
  const { getUpcomingSchedules } = useSchedules();
  const [schedules, setSchedules] = useState<UpcomingSchedulesDTO>([]);
  const { plugId } = useLocalSearchParams<{ plugId?: string }>();

  const fetchUpcomingSchedules = async () => {
    try {
      const res = await getUpcomingSchedules(plugId ?? plugId);

      if (res) {
        setSchedules(res);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      void fetchUpcomingSchedules();
    }, []),
  );

  return (
    <View>
      {includeHeading && (
        <Heading variant="h3" hasLink={true} linkPlaceholder={"Manage"}>
          Schedules
        </Heading>
      )}
      {schedules && schedules.length !== 0 ? (
        <View style={styles.schedulesContainer}>
          {schedules.map((scheduleDate) =>
            scheduleDate.schedules.map((schedule) => (
              <PlugScheduleRow key={schedule.id} schedule={schedule} />
            )),
          )}
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
  schedulesContainer: {
    rowGap: spaces.sm,
  },
});
