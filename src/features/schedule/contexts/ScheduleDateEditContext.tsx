import { createContext } from "react";
import { Dayjs } from "dayjs";

export interface ScheduleDateEditState {
  scheduleId: string | null;
  date: Dayjs | null;
  mode: "create" | "edit";
  setScheduleId: (id: string) => void;
  setDate: (date: Dayjs) => void;
  setMode: (mode: "create" | "edit") => void;
  reset: () => void;
}

export const ScheduleDateEditContext =
  createContext<ScheduleDateEditState | null>(null);
