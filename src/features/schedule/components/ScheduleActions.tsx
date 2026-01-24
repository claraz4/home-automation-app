import { colors, spaces } from "@/src/theme";
import Button from "@/src/shared/components/Button";
import { areSchedulesEqual } from "@/src/features/schedule/utils/schedulesHelper";
import { View } from "react-native";
import { SingleScheduleDTO } from "@/src/features/schedule/types/SingleScheduleDTO";

interface ScheduleActionsProps {
  isScheduleEdited: boolean;
  onEdit: () => void;
  onDelete: () => void;
}

export default function ScheduleActions({
  isScheduleEdited,
  onEdit,
  onDelete,
}: ScheduleActionsProps) {
  return (
    <View style={{ rowGap: spaces.sm, marginTop: spaces.sm }}>
      <Button
        text="Save Changes"
        invertColors
        onPress={onEdit}
        disabled={!isScheduleEdited}
      />
      <Button
        text="Delete Schedule"
        onPress={onDelete}
        textStyle={{ color: colors.status.fail }}
      />
    </View>
  );
}
