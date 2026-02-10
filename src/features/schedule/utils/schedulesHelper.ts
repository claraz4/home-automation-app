import { SingleSchedule } from "@/src/features/schedule/types/SingleScheduleDTO";
import dayjs from "dayjs";
import { arePlugArraysEqual } from "@/src/shared/utils/arePlugsArrayEqual";

export function areSchedulesEqual(
  schedule1: SingleSchedule,
  schedule2: SingleSchedule,
): boolean {
  if (schedule1.id !== schedule2.id) return false;
  if (schedule1.name !== schedule2.name) return false;

  const t1 = dayjs(schedule1.time).toISOString();
  const t2 = dayjs(schedule2.time).toISOString();
  if (t1 !== t2) return false;

  return (
    arePlugArraysEqual(schedule1.onPlugs, schedule2.onPlugs) &&
    arePlugArraysEqual(schedule1.offPlugs, schedule2.offPlugs)
  );
}
