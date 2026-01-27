import ScreenView, { ScreenViewRef } from "@/src/shared/ui/ScreenView";
import { paddings, spaces } from "@/src/theme";
import { useEffect, useRef, useState } from "react";
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
  const screenRef = useRef<ScreenViewRef>(null);

  // Set the necessary variables
  useEffect(() => {
    setMode("create");

    if (!date) {
      setDate(dayjs());
    }
  }, []);

  // Scroll to top
  const scrollToTop = () => screenRef.current?.scrollToTop();

  return (
    <ScreenView
      style={{ padding: paddings.page, rowGap: spaces.lg }}
      scroll
      ref={screenRef}
    >
      <CreateEditSchedule
        headingText={"Create Schedule"}
        schedule={schedule}
        setSchedule={setSchedule}
        setIsDeleteSchedule={() => {}}
        scrollToTop={scrollToTop}
      />
    </ScreenView>
  );
}
