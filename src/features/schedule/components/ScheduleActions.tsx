import { colors, spaces } from "@/src/theme";
import Button from "@/src/shared/components/Button";
import { View } from "react-native";

interface ScheduleActionsProps {
  isSaveEnabled: boolean;
  onEdit: () => void;
  onDelete: () => void;
}

export default function ScheduleActions({
  isSaveEnabled,
  onEdit,
  onDelete,
}: ScheduleActionsProps) {
  return (
    <View style={{ rowGap: spaces.sm, marginTop: spaces.sm }}>
      <Button
        text="Save Changes"
        invertColors
        onPress={onEdit}
        disabled={!isSaveEnabled}
      />
      <Button
        text="Delete Schedule"
        onPress={onDelete}
        textStyle={{ color: colors.status.fail }}
      />
    </View>
  );
}
