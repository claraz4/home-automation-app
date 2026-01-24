import ScreenView from "@/src/shared/ui/ScreenView";
import { paddings, spaces } from "@/src/theme";
import { useEffect, useState } from "react";
import { api } from "@/src/api/api";
import dayjs from "dayjs";
import { CreateEditSchedule } from "@/src/features/schedule/components/create/CreateEditSchedule";
import { useScheduleDateEdit } from "@/src/features/schedule/hooks/useScheduleDateEdit";
import { SingleSchedule } from "@/src/features/schedule/types/SingleScheduleDTO";

export default function CreateSchedule() {
  const { setMode, setDate, date } = useScheduleDateEdit();
  const [schedule, setSchedule] = useState<SingleSchedule>({
    name: "",
    time: date?.toISOString() || dayjs().toISOString(),
    onPlugs: [],
    offPlugs: [],
    isActive: true,
  });
  useEffect(() => {
    setMode("create");

    if (!date) {
      setDate(dayjs());
    }
  }, []);

  return (
    <ScreenView style={{ padding: paddings.page, rowGap: spaces.lg }}>
      <CreateEditSchedule
        headingText={"Create Schedule"}
        schedule={schedule}
        setSchedule={setSchedule}
        setIsDeleteSchedule={() => {}}
      />
    </ScreenView>
  );
}
