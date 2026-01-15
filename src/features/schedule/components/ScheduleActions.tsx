import { colors, spaces } from "@/src/theme";
import Button from "@/src/shared/components/Button";
import { areSchedulesEqual } from "@/src/features/schedule/utils/schedulesHelper";
import { View } from "react-native";
import { SingleScheduleDTO } from "@/src/features/schedule/types/SingleScheduleDTO";

interface ScheduleActionsProps {
  originalSchedule: SingleScheduleDTO;
  editedSchedule: SingleScheduleDTO;
  onEdit: (schedule: SingleScheduleDTO) => void;
  onDelete: () => void;
}

export default function ScheduleActions({
  originalSchedule,
  editedSchedule,
  onEdit,
  onDelete,
}: ScheduleActionsProps) {
  return (
    <View style={{ rowGap: spaces.sm, marginTop: spaces.sm }}>
      <Button
        text="Save Changes"
        invertColors
        onPress={() => onEdit(editedSchedule)}
        disabled={areSchedulesEqual(originalSchedule, editedSchedule)}
      />
      <Button
        text="Delete Schedule"
        onPress={onDelete}
        textStyle={{ color: colors.status.fail }}
      />
    </View>
  );
}
