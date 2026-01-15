import { StyleSheet, View } from "react-native";
import { Heading } from "@/src/shared/ui/Heading";
import FeatureRow from "@/src/shared/components/FeatureRow";
import ScreenView from "@/src/shared/ui/ScreenView";
import { paddings, spaces, colors } from "@/src/theme";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { api } from "@/src/api/api";
import { SingleScheduleDTO } from "@/src/features/schedule/types/SingleScheduleDTO";
import dayjs from "dayjs";
import { getFormattedDateTime } from "@/src/features/schedule/utils/daysHelper";
import SchedulePlugList from "@/src/features/schedule/components/SchedulePlugList";
import { BasePlug } from "@/src/shared/types/BasePlug";
import Button from "@/src/shared/components/Button";
import { areSchedulesEqual } from "@/src/features/schedule/utils/schedulesHelper";

export default function SingleScheduleScreen() {
  const { scheduleId } = useLocalSearchParams<{ scheduleId: string }>();
  const [originalScheduleInfo, setOriginalScheduleInfo] =
    useState<SingleScheduleDTO>();
  const [scheduleInfo, setScheduleInfo] = useState<SingleScheduleDTO>();

  // Fetch the current schedule information
  const getSchedule = async () => {
    try {
      const res = await api.get(`/schedules/${scheduleId}`);
      setOriginalScheduleInfo(res.data);
      setScheduleInfo(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Delete the current schedule
  const deleteSchedule = async () => {
    try {
      await api.delete(`/schedules/${scheduleId}`);
      router.push("/schedules");
    } catch (error) {
      console.error(error);
    }
  };

  // Edit the current schedule
  const editSchedule = async () => {
    try {
      await api.put("/schedules", scheduleInfo);
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

  // Edit the state of the plugs
  const editPlugState = (plug: BasePlug, newState: boolean) => {
    setScheduleInfo((prevState) => {
      if (!prevState) return prevState;

      const isCurrentlyOn = prevState.onPlugs.some((p) => p.id === plug.id);

      // No-op guard (prevents useless re-renders)
      if (isCurrentlyOn === newState) return prevState;

      if (newState) {
        // OFF ➜ ON
        return {
          ...prevState,
          offPlugs: prevState.offPlugs.filter((p) => p.id !== plug.id),
          onPlugs: [...prevState.onPlugs, plug],
        };
      } else {
        // ON ➜ OFF
        return {
          ...prevState,
          onPlugs: prevState.onPlugs.filter((p) => p.id !== plug.id),
          offPlugs: [...prevState.offPlugs, plug],
        };
      }
    });
  };

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
          <SchedulePlugList
            plugList={scheduleInfo.onPlugs}
            editPlugState={editPlugState}
          />
        )}
        {scheduleInfo && scheduleInfo.offPlugs && (
          <SchedulePlugList
            plugList={scheduleInfo.offPlugs}
            isOn={false}
            editPlugState={editPlugState}
          />
        )}
        {originalScheduleInfo && scheduleInfo && (
          <View style={{ rowGap: spaces.sm, marginTop: spaces.sm }}>
            <Button
              text="Save Changes"
              invertColors
              onPress={editSchedule}
              disabled={areSchedulesEqual(originalScheduleInfo, scheduleInfo)}
            ></Button>
            <Button
              text="Delete Schedule"
              onPress={deleteSchedule}
              textStyle={{ color: colors.status.fail }}
            ></Button>
          </View>
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
