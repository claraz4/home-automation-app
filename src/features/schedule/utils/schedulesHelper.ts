import { SingleScheduleDTO } from "@/src/features/schedule/types/SingleScheduleDTO";
import { BasePlug } from "@/src/shared/types/BasePlug";

export function areSchedulesEqual(
  schedule1: SingleScheduleDTO,
  schedule2: SingleScheduleDTO,
): boolean {
  if (schedule1.id !== schedule2.id) return false;
  if (schedule1.name !== schedule2.name) return false;
  if (schedule1.time !== schedule2.time) return false;

  return (
    arePlugArraysEqual(schedule1.onPlugs, schedule2.onPlugs) &&
    arePlugArraysEqual(schedule1.offPlugs, schedule2.offPlugs)
  );
}

function arePlugArraysEqual(
  plugArray1: BasePlug[],
  plugArray2: BasePlug[],
): boolean {
  if (plugArray1.length !== plugArray2.length) return false;

  return plugArray1.every((plug, idx) => {
    const otherPlug = plugArray2[idx];

    return (
      plug.id === otherPlug.id &&
      plug.name === otherPlug.name &&
      plug.isOn === otherPlug.isOn
    );
  });
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
