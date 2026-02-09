import {
  SingleSchedule,
  SingleScheduleDTO,
} from "@/src/features/schedule/types/SingleScheduleDTO";
import { BasePlug } from "@/src/shared/types/BasePlug";
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

export function editPlugState(
  plug: BasePlug,
  newState: boolean,
  prevSchedule: SingleScheduleDTO,
) {
  if (!prevSchedule) return prevSchedule;

  const isCurrentlyOn = prevSchedule.onPlugs.some((p) => p.id === plug.id);

  // No-op guard (prevents useless re-renders)
  if (isCurrentlyOn === newState) return prevSchedule;

  if (newState) {
    // OFF ➜ ON
    return {
      ...prevSchedule,
      offPlugs: prevSchedule.offPlugs.filter((p) => p.id !== plug.id),
      onPlugs: [...prevSchedule.onPlugs, plug],
    };
  } else {
    // ON ➜ OFF
    return {
      ...prevSchedule,
      onPlugs: prevSchedule.onPlugs.filter((p) => p.id !== plug.id),
      offPlugs: [...prevSchedule.offPlugs, plug],
    };
  }
}
