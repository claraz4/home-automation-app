import { Pressable, StyleSheet, View } from "react-native";
import { Heading } from "@/src/shared/ui/Heading";
import FeatureRow from "@/src/shared/components/FeatureRow";
import ScreenView from "@/src/shared/ui/ScreenView";
import { paddings, spaces, colors } from "@/src/theme";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { SingleScheduleDTO } from "@/src/features/schedule/types/SingleScheduleDTO";
import dayjs from "dayjs";
import { getFormattedDateTime } from "@/src/features/schedule/utils/daysHelper";
import SchedulePlugList from "@/src/features/schedule/components/SchedulePlugList";
import { BasePlug } from "@/src/shared/types/BasePlug";
import { editPlugState } from "@/src/features/schedule/utils/schedulesHelper";
import useSchedules from "@/src/features/schedule/hooks/useSchedules";
import ScheduleActions from "@/src/features/schedule/components/ScheduleActions";
import { AppText } from "@/src/shared/ui/AppText";
import ConfirmationMessagePopUp from "@/src/shared/components/ConfirmationMessagePopUp";

export default function SingleScheduleScreen() {
  const { scheduleId } = useLocalSearchParams<{ scheduleId: string }>();
  const { getSchedule, deleteSchedule, editSchedule } = useSchedules(
    Number(scheduleId),
  );
  const [originalScheduleInfo, setOriginalScheduleInfo] =
    useState<SingleScheduleDTO>();
  const [scheduleInfo, setScheduleInfo] = useState<SingleScheduleDTO>();
  const [isDeleteSchedule, setIsDeleteSchedule] = useState(false);

  // Fetch schedule
  useEffect(() => {
    const fetchSchedule = async () => {
      const res = await getSchedule();
      if (!res) return;

      setOriginalScheduleInfo(res.data);
      setScheduleInfo(res.data);
    };

    void fetchSchedule();
  }, [scheduleId]);

  // Create the date to display
  const day = dayjs(scheduleInfo?.time);
  const { date, time } = getFormattedDateTime(day);

  // Toggle schedule
  const toggleSchedule = (plug: BasePlug, newState: boolean) =>
    setScheduleInfo((prev) =>
      prev ? editPlugState(plug, newState, prev) : prev,
    );

  if (!originalScheduleInfo || !scheduleInfo) {
    return <ScreenView />;
  }

  return (
    <ScreenView>
      <Heading variant="h2" hasBackButton={true}>
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
          hasExtra
          extraScreen="/"
        />
        <SchedulePlugList
          plugList={scheduleInfo.onPlugs}
          editPlugState={toggleSchedule}
        />
        <SchedulePlugList
          plugList={scheduleInfo.offPlugs}
          isOn={false}
          editPlugState={toggleSchedule}
        />
        <ScheduleActions
          originalSchedule={originalScheduleInfo}
          editedSchedule={scheduleInfo}
          onEdit={editSchedule}
          onDelete={() => setIsDeleteSchedule(true)}
        />
        <ConfirmationMessagePopUp
          headingText="Delete Schedule"
          message={`Are you sure you want to delete ${scheduleInfo.name}?`}
          onConfirm={deleteSchedule}
          visible={isDeleteSchedule}
          setVisible={setIsDeleteSchedule}
        />
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
