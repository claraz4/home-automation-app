import { ChipOption } from "@/src/shared/components/ChipOptions";

export function getTimeout(option: number): ChipOption {
  if (option < 60) {
    return {
      id: String(option),
      text: `${option} min`,
    };
  }

  return {
    id: String(option),
    text: `${option / 60} hour${option === 60 ? "" : "s"}`,
  };
}

export function minutesToHHMMSS(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:00`;
}

export function HHMMSSToHoursMinutes(time: string): {
  hours: number;
  minutes: number;
} {
  const hhmmssArray = time.split(":");
  return { hours: Number(hhmmssArray[0]), minutes: Number(hhmmssArray[1]) };
}
