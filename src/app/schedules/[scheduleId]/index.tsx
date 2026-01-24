import ScreenView from "@/src/shared/ui/ScreenView";
import { paddings, spaces } from "@/src/theme";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { SingleScheduleDTO } from "@/src/features/schedule/types/SingleScheduleDTO";
import dayjs from "dayjs";
import { BasePlug } from "@/src/shared/types/BasePlug";
import { areSchedulesEqual } from "@/src/features/schedule/utils/schedulesHelper";
import useSchedules from "@/src/features/schedule/hooks/useSchedules";
import ConfirmationMessagePopUp from "@/src/shared/components/ConfirmationMessagePopUp";
import { CreateEditSchedule } from "@/src/features/schedule/components/create/CreateEditSchedule";
import { useScheduleDateEdit } from "@/src/features/schedule/hooks/useScheduleDateEdit";

export default function SingleScheduleScreen() {
  const { scheduleId } = useLocalSearchParams<{ scheduleId: string }>();
  const { getSchedule, deleteSchedule, editSchedule } = useSchedules(
    Number(scheduleId),
  );
  const [originalScheduleInfo, setOriginalScheduleInfo] =
    useState<SingleScheduleDTO>();
  const [scheduleInfo, setScheduleInfo] = useState<SingleScheduleDTO>();
  const [isDeleteSchedule, setIsDeleteSchedule] = useState(false);
  const [onPlugs, setOnPlugs] = useState<BasePlug[]>([]);
  const [offPlugs, setOffPlugs] = useState<BasePlug[]>([]);
  const { date, setMode, setDate } = useScheduleDateEdit();

  // Set edit mode
  useEffect(() => {
    setMode("edit");
  }, []);

  // Check if the schedule has been edited
  const [hasChanged, setHasChanged] = useState(false);
  useEffect(() => {
    if (originalScheduleInfo && scheduleInfo) {
      setHasChanged(!areSchedulesEqual(originalScheduleInfo, scheduleInfo));
    }
  }, [scheduleInfo, originalScheduleInfo]);

  // Fetch schedule
  useEffect(() => {
    const fetchSchedule = async () => {
      const res = await getSchedule();
      if (!res) return;

      setOriginalScheduleInfo(res.data);
      setScheduleInfo(res.data);
      setOnPlugs(res.data.onPlugs);
      setOffPlugs(res.data.offPlugs);
      setDate(dayjs(res.data.time));
    };

    void fetchSchedule();
  }, [scheduleId]);

  // Create the date to display
  const day = scheduleInfo ? dayjs(scheduleInfo.time).toDate() : new Date();

  // Edit the time
  useFocusEffect(
    useCallback(() => {
      setScheduleInfo((prevState) => {
        if (!prevState || !date) return prevState;

        const newTime = date.toISOString();

        if (prevState.time === newTime) {
          return prevState; // no change
        }

        return {
          ...prevState,
          time: newTime,
        };
      });
    }, [date]),
  );

  // Edit the on and off plug list
  useFocusEffect(
    useCallback(() => {
      setScheduleInfo((prevState) => {
        if (!prevState || !date) return prevState;

        return {
          ...prevState,
          onPlugs,
          offPlugs,
        };
      });
    }, [onPlugs, offPlugs]),
  );

  if (!originalScheduleInfo || !scheduleInfo) {
    return <ScreenView />;
  }

  return (
    <ScreenView style={{ padding: paddings.page, rowGap: spaces.lg }}>
      <CreateEditSchedule
        scheduleName={scheduleInfo.name}
        onPlugs={onPlugs}
        offPlugs={offPlugs}
        isScheduleEdited={hasChanged}
        setOnPlugs={setOnPlugs}
        setOffPlugs={setOffPlugs}
        onEdit={() => editSchedule(scheduleInfo)}
        setIsDeleteSchedule={setIsDeleteSchedule}
      />
      <ConfirmationMessagePopUp
        headingText="Delete Schedule"
        message={`Are you sure you want to delete ${scheduleInfo.name}?`}
        onConfirm={deleteSchedule}
        visible={isDeleteSchedule}
        setVisible={setIsDeleteSchedule}
      />
    </ScreenView>
  );
}
