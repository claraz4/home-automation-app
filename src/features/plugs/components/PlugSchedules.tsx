import { Heading } from "@/src/shared/ui/Heading";
import { View, StyleSheet } from "react-native";
import PlugScheduleRow from "@/src/features/plugs/components/PlugScheduleRow";
import { spaces } from "@/src/theme";
import useSchedules from "@/src/features/schedule/hooks/useSchedules";
import { useCallback, useState } from "react";
import { UpcomingSchedulesDTO } from "@/src/features/schedule/types/UpcomingSchedulesDTO";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import { AppText } from "@/src/shared/ui/AppText";
import AppActivityIndicator from "@/src/shared/ui/AppActivityIndicator";
import StatusBox from "@/src/shared/components/StatusBox";

interface PlugSchedulesProps {
  plugName?: string;
  includeHeading?: boolean;
}

export default function PlugSchedules({
  plugName,
  includeHeading = true,
}: PlugSchedulesProps) {
  const { getUpcomingSchedules } = useSchedules();
  const [schedules, setSchedules] = useState<UpcomingSchedulesDTO>([]);
  const { plugId } = useLocalSearchParams<{ plugId?: string }>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUpcomingSchedules = async () => {
    try {
      const res = await getUpcomingSchedules(plugId ?? plugId);

      if (res) {
        setSchedules(res);
      }
    } catch (error) {
      setError("An error occurred while fetching upcoming schedules.");
    } finally {
      setLoading(false);
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
        <Heading
          variant="h3"
          hasLink={true}
          linkPlaceholder={"Manage"}
          href={{ pathname: "/schedules", params: { plugId, plugName } }}
        >
          Schedules
        </Heading>
      )}

      {loading && <AppActivityIndicator />}
      {error && <StatusBox message={error} />}

      {schedules &&
        (schedules.length !== 0 ? (
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
        ))}
    </View>
  );
}

const styles = StyleSheet.create({
  schedulesContainer: {
    rowGap: spaces.sm,
  },
});
