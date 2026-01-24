import ScreenView from "@/src/shared/ui/ScreenView";
import { paddings, spaces } from "@/src/theme";
import { useEffect, useState } from "react";
import { SmallBasePlug } from "@/src/features/schedule/types/SmallBasePlug";
import { api } from "@/src/api/api";
import dayjs from "dayjs";
import { CreateEditSchedule } from "@/src/features/schedule/components/create/CreateEditSchedule";
import { useScheduleDateEdit } from "@/src/features/schedule/hooks/useScheduleDateEdit";

export default function CreateSchedule() {
  const [scheduleName, setScheduleName] = useState("");
  const [onPlugs, setOnPlugs] = useState<SmallBasePlug[]>([]);
  const [offPlugs, setOffPlugs] = useState<SmallBasePlug[]>([]);

  const { setMode, setDate, date } = useScheduleDateEdit();

  useEffect(() => {
    setMode("create");

    if (!date) {
      setDate(dayjs());
    }
  }, []);

  // Create schedule
  const createSchedule = async () => {
    if (!scheduleName.trim() && !date) return;

    if (onPlugs.length === 0 && offPlugs.length === 0) {
      console.error("A schedule needs at least one plug");
      return;
    }

    try {
      await api.post("/schedules", {
        name: scheduleName,
        time: date?.toISOString(),
        onPlugIds: onPlugs.map((p) => p.id),
        offPlugIds: offPlugs.map((p) => p.id),
        isActive: true,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ScreenView style={{ padding: paddings.page, rowGap: spaces.lg }}>
      <CreateEditSchedule
        scheduleName={scheduleName}
        headingText={"Create Schedule"}
        onPlugs={onPlugs}
        offPlugs={offPlugs}
        setOnPlugs={setOnPlugs}
        setOffPlugs={setOffPlugs}
        onCreate={createSchedule}
        setIsDeleteSchedule={() => {}}
        setScheduleName={setScheduleName}
      />
    </ScreenView>
  );
}
