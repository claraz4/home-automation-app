import { Dispatch, SetStateAction } from "react";

export default interface TimeSelectorProps {
  maxHourValue: number;
  minHourValue: number;
  maxMinuteValue: number;
  minMinuteValue: number;
  stepHour?: number;
  stepMinute?: number;
  selectedHour: number;
  selectedMinute: number;
  onSelectedHourChange: Dispatch<SetStateAction<number>>;
  onSelectedMinuteChange: Dispatch<SetStateAction<number>>;
  padStart?: number;
}
