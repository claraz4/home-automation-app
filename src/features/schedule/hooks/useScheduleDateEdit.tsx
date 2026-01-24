import { useContext } from "react";
import { ScheduleDateEditContext } from "@/src/features/schedule/contexts/ScheduleDateEditContext";

export function useScheduleDateEdit() {
  const context = useContext(ScheduleDateEditContext);
  if (!context) {
    throw new Error("useScheduleFlow must be used within ScheduleFlowProvider");
  }
  return context;
}
