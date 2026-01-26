import ScreenView from "@/src/shared/ui/ScreenView";
import { paddings, spaces } from "@/src/theme";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  SingleSchedule,
  SingleScheduleDTO,
} from "@/src/features/schedule/types/SingleScheduleDTO";
import dayjs from "dayjs";
import { areSchedulesEqual } from "@/src/features/schedule/utils/schedulesHelper";
import useSchedules from "@/src/features/schedule/hooks/useSchedules";
import ConfirmationMessagePopUp from "@/src/shared/components/ConfirmationMessagePopUp";
import { CreateEditSchedule } from "@/src/features/schedule/components/create/CreateEditSchedule";
import { useScheduleDateEdit } from "@/src/features/schedule/hooks/useScheduleDateEdit";

export default function SingleScheduleScreen() {
  const { scheduleId } = useLocalSearchParams<{ scheduleId: string }>();
  const { getSchedule, deleteSchedule } = useSchedules(Number(scheduleId));
  const [originalScheduleInfo, setOriginalScheduleInfo] =
    useState<SingleScheduleDTO>();
  const [isDeleteSchedule, setIsDeleteSchedule] = useState(false);
  const { date, setMode, setDate } = useScheduleDateEdit();
  const [scheduleInfo, setScheduleInfo] = useState<SingleSchedule>({
    name: "",
    time: date?.toISOString() || dayjs().toISOString(),
    onPlugs: [],
    offPlugs: [],
    isActive: true,
  });

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
      setDate(dayjs(res.data.time));
    };

    void fetchSchedule();
  }, [scheduleId]);

  if (!originalScheduleInfo || !scheduleInfo) {
    return <ScreenView />;
  }

  return (
    <ScreenView style={{ padding: paddings.page, rowGap: spaces.lg }}>
      <CreateEditSchedule
        schedule={scheduleInfo}
        setSchedule={setScheduleInfo}
        isScheduleEdited={hasChanged}
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
