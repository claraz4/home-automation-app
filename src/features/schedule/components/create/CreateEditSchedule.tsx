import { Heading } from "@/src/shared/ui/Heading";
import { View } from "react-native";
import FeatureRow from "@/src/shared/components/FeatureRow";
import { fontWeight, spaces } from "@/src/theme";
import { getFormattedDateTime } from "@/src/features/schedule/utils/daysHelper";
import { BasePlug } from "@/src/shared/types/BasePlug";
import dayjs from "dayjs";
import PlugsStateSchedule from "@/src/features/schedule/components/create/PlugsStateSchedule";
import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { SmallBasePlug } from "@/src/features/schedule/types/SmallBasePlug";
import ScheduleActions from "@/src/features/schedule/components/ScheduleActions";
import Button from "@/src/shared/components/Button";
import AddPlugModal from "@/src/features/schedule/components/create/AddPlugModal";
import { useScheduleDateEdit } from "@/src/features/schedule/hooks/useScheduleDateEdit";

interface CreateEditScheduleProps {
  scheduleName: string;
  onPlugs: BasePlug[];
  offPlugs: BasePlug[];
  setOnPlugs: Dispatch<SetStateAction<SmallBasePlug[]>>;
  setOffPlugs: Dispatch<SetStateAction<SmallBasePlug[]>>;
  isCreating?: boolean;
  isScheduleEdited?: boolean;
  onEdit: () => void;
  setIsDeleteSchedule: (isDelete: boolean) => void;
}

export function CreateEditSchedule({
  scheduleName,
  onPlugs,
  offPlugs,
  setOnPlugs,
  setOffPlugs,
  isCreating = false,
  isScheduleEdited = false,
  onEdit,
  setIsDeleteSchedule,
}: CreateEditScheduleProps) {
  const { date } = useScheduleDateEdit();
  const { formattedDate, formattedTime } = getFormattedDateTime(dayjs(date));
  const [showAddPlug, setShowAddPlug] = useState(false);

  return (
    <View style={{ rowGap: spaces.lg }}>
      <Heading variant="h2" hasBackButton={true}>
        {scheduleName}
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
        <FeatureRow
          headingText={`${formattedDate} at ${formattedTime}`}
          subtitleText="Repeats: Never"
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
        {!isCreating && (
          <ScheduleActions
            isScheduleEdited={isScheduleEdited}
            onEdit={onEdit}
            onDelete={() => setIsDeleteSchedule(true)}
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
