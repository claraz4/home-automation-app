import { ReactNode, useState } from "react";
import { Dayjs } from "dayjs";
import { ScheduleDateEditContext } from "@/src/features/schedule/contexts/ScheduleDateEditContext";

export function ScheduleDateEditProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [scheduleId, setScheduleId] = useState<string | null>(null);
  const [date, setDate] = useState<Dayjs | null>(null);
  const [mode, setMode] = useState<"create" | "edit">("create");

  const reset = () => {
    setDate(null);
    setMode("create");
    setScheduleId(null);
  };

  return (
    <ScheduleDateEditContext.Provider
      value={{
        scheduleId,
        date,
        mode,
        setScheduleId,
        setDate,
        setMode,
        reset,
      }}
    >
      {children}
    </ScheduleDateEditContext.Provider>
  );
}
