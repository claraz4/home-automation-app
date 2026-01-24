import { Heading } from "@/src/shared/ui/Heading";
import { View } from "react-native";
import FeatureRow from "@/src/shared/components/FeatureRow";
import { fontWeight, spaces } from "@/src/theme";
import { getFormattedDateTime } from "@/src/features/schedule/utils/daysHelper";
import { BasePlug } from "@/src/shared/types/BasePlug";
import dayjs from "dayjs";
import PlugsStateSchedule from "@/src/features/schedule/components/create/PlugsStateSchedule";
import { Dispatch, SetStateAction, useState } from "react";
import { SmallBasePlug } from "@/src/features/schedule/types/SmallBasePlug";
import ScheduleActions from "@/src/features/schedule/components/ScheduleActions";
import Button from "@/src/shared/components/Button";
import AddPlugModal from "@/src/features/schedule/components/create/AddPlugModal";
import { useScheduleDateEdit } from "@/src/features/schedule/hooks/useScheduleDateEdit";
import AppTextInput from "@/src/shared/components/AppTextInput";

interface CreateEditScheduleProps {
  scheduleName: string;
  headingText?: string;
  setScheduleName?: (name: string) => void;
  onPlugs: BasePlug[];
  offPlugs: BasePlug[];
  setOnPlugs: Dispatch<SetStateAction<SmallBasePlug[]>>;
  setOffPlugs: Dispatch<SetStateAction<SmallBasePlug[]>>;
  isScheduleEdited?: boolean;
  onEdit?: () => void;
  onCreate?: () => void;
  setIsDeleteSchedule: (isDelete: boolean) => void;
}

export function CreateEditSchedule({
  scheduleName,
  headingText,
  setScheduleName,
  onPlugs,
  offPlugs,
  setOnPlugs,
  setOffPlugs,
  isScheduleEdited = false,
  onEdit,
  onCreate,
  setIsDeleteSchedule,
}: CreateEditScheduleProps) {
  const { date, mode } = useScheduleDateEdit();
  const { formattedDate, formattedTime } = getFormattedDateTime(dayjs(date));
  const [showAddPlug, setShowAddPlug] = useState(false);
  const isCreating = mode === "create";

  return (
    <View style={{ rowGap: spaces.md }}>
      <Heading variant="h2" hasBackButton={true}>
        {isCreating ? headingText : scheduleName}
      </Heading>

      <View style={{ rowGap: spaces.lg }}>
        {!isCreating && (
          <FeatureRow
            headingText="Current State"
            hasSwitch
            status={true}
            setStatus={() => {}}
          />
        )}
        {isCreating && setScheduleName && (
          <AppTextInput
            label="Schedule Name"
            value={scheduleName}
            onChange={(newName: string) => setScheduleName(newName)}
            containerStyle={{ marginTop: spaces.md }}
          />
        )}
        <FeatureRow
          headingText={
            date ? `${formattedDate} at ${formattedTime}` : "Schedule Date"
          }
          subtitleText={date ? "Repeats: Never" : "Select a date and time"}
          hasStatus={false}
          hasExtra
          extraScreen={"/schedules/datetime"}
        />
        <View style={{ rowGap: spaces.sm }}>
          <PlugsStateSchedule isOn plugs={onPlugs} setPlugs={setOnPlugs} />
          <PlugsStateSchedule
            isOn={false}
            plugs={offPlugs}
            setPlugs={setOffPlugs}
          />
          <Button
            text="+ Add Plugs"
            onPress={() => setShowAddPlug(true)}
            textStyle={{ fontFamily: fontWeight[600] }}
          />
        </View>
        {!isCreating && onEdit && (
          <ScheduleActions
            isScheduleEdited={isScheduleEdited}
            onEdit={onEdit}
            onDelete={() => setIsDeleteSchedule(true)}
          />
        )}
        {isCreating && onCreate && (
          <Button
            text="Create Schedule"
            onPress={onCreate}
            invertColors
            disabled={
              !scheduleName.trim() ||
              (onPlugs.length === 0 && offPlugs.length === 0)
            }
            textStyle={{ fontFamily: fontWeight[600] }}
          />
        )}

        <AddPlugModal
          visible={showAddPlug}
          setVisible={setShowAddPlug}
          onPlugs={onPlugs}
          offPlugs={offPlugs}
          setOnPlugs={setOnPlugs}
          setOffPlugs={setOffPlugs}
        />
      </View>
    </View>
  );
}
