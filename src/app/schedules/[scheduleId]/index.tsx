import { StyleSheet, View } from "react-native";
import { Heading } from "@/src/shared/ui/Heading";
import FeatureRow from "@/src/shared/components/FeatureRow";
import ScreenView from "@/src/shared/ui/ScreenView";
import { paddings, spaces } from "@/src/theme";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { api } from "@/src/api/api";
import { SingleScheduleDTO } from "@/src/features/schedule/types/SingleScheduleDTO";
import dayjs from "dayjs";
import { getFormattedDateTime } from "@/src/features/schedule/utils/daysHelper";
import SchedulePlugList from "@/src/features/schedule/components/SchedulePlugList";

export default function SingleScheduleScreen() {
  const { scheduleId } = useLocalSearchParams<{ scheduleId: string }>();
  const [scheduleInfo, setScheduleInfo] = useState<SingleScheduleDTO>();

  // Fetch the current schedule information
  const getSchedule = async () => {
    try {
      const res = await api.get(`/schedules/${scheduleId}`);
      setScheduleInfo(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    void getSchedule();
  }, []);

  // Create the date to display
  const day = dayjs(scheduleInfo?.time);
  const { date, time } = getFormattedDateTime(day);

  return (
    <ScreenView>
      <Heading variant="h2" hasBackButton>
        {scheduleInfo?.name}
      </Heading>

      <View style={styles.container}>
        <FeatureRow
          headingText="Current State"
          hasSwitch
          status={true}
          setStatus={() => {}}
        />
        <FeatureRow
          headingText={`${date} at ${time}`}
          subtitleText="Repeats: Never"
          hasStatus={false}
          hasExtraScreen
          extraScreen="/"
        />
        {scheduleInfo && scheduleInfo.onPlugs && (
          <SchedulePlugList plugList={scheduleInfo.onPlugs} />
        )}
        {scheduleInfo && scheduleInfo.offPlugs && (
          <SchedulePlugList plugList={scheduleInfo.offPlugs} isOn={false} />
        )}
      </View>
    </ScreenView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: paddings.page,
    rowGap: spaces.lg,
  },
});
