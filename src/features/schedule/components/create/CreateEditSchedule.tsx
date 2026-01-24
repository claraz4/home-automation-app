import { Heading } from "@/src/shared/ui/Heading";
import { View } from "react-native";
import FeatureRow from "@/src/shared/components/FeatureRow";
import { fontWeight, spaces } from "@/src/theme";
import { getFormattedDateTime } from "@/src/features/schedule/utils/daysHelper";
import dayjs from "dayjs";
import PlugsStateSchedule from "@/src/features/schedule/components/create/PlugsStateSchedule";
import { Dispatch, SetStateAction, useCallback, useState } from "react";
import ScheduleActions from "@/src/features/schedule/components/ScheduleActions";
import Button from "@/src/shared/components/Button";
import AddPlugModal from "@/src/features/schedule/components/create/AddPlugModal";
import { useScheduleDateEdit } from "@/src/features/schedule/hooks/useScheduleDateEdit";
import AppTextInput from "@/src/shared/components/AppTextInput";
import { SingleSchedule } from "@/src/features/schedule/types/SingleScheduleDTO";
import { SmallBasePlug } from "@/src/features/schedule/types/SmallBasePlug";
import useSchedules from "@/src/features/schedule/hooks/useSchedules";
import { useFocusEffect } from "expo-router";

interface CreateEditScheduleProps {
  headingText?: string;
  schedule: SingleSchedule;
  setSchedule: Dispatch<SetStateAction<SingleSchedule>>;
  isScheduleEdited?: boolean;
  setIsDeleteSchedule: (isDelete: boolean) => void;
  fetchSchedule?: () => void;
}

export function CreateEditSchedule({
  headingText,
  schedule,
  setSchedule,
  isScheduleEdited = false,
  setIsDeleteSchedule,
  fetchSchedule,
}: CreateEditScheduleProps) {
  const { date, mode } = useScheduleDateEdit();
  const { formattedDate, formattedTime } = getFormattedDateTime(dayjs(date));
  const [showAddPlug, setShowAddPlug] = useState(false);
  const isCreating = mode === "create";
  const { name, onPlugs, offPlugs, id, isActive } = schedule;

  const { editSchedule, toggleSchedule } = useSchedules(id);

  const updateName = (name: string) =>
    setSchedule((prevState) => ({ ...prevState, name }));

  const toggleStatus = async () => {
    const isActive = !schedule.isActive;
    const updatedSchedule = {
      ...schedule,
      isActive,
    };

    setSchedule(updatedSchedule);

    try {
      await toggleSchedule(isActive);
      if (fetchSchedule) {
        void fetchSchedule();
      }
    } catch (error) {
      // rollback on failure
      setSchedule(schedule);
    }
  };

  const updateOnPlugs = (plugs: SmallBasePlug[]) =>
    setSchedule((prevState) => ({ ...prevState, onPlugs: plugs }));

  const updateOffPlugs = (plugs: SmallBasePlug[]) =>
    setSchedule((prevState) => ({ ...prevState, offPlugs: plugs }));

  // Edit the time
  useFocusEffect(
    useCallback(() => {
      setSchedule((prevState) => {
        if (!prevState || !date) return prevState;

        const newTime = date.toISOString();

        if (prevState.time === newTime) {
          return prevState; // no change
        }

        return {
          ...prevState,
          time: newTime,
        };
      });
    }, [date]),
  );

  return (
    <View style={{ rowGap: spaces.md }}>
      <Heading variant="h2" hasBackButton={true}>
        {isCreating ? headingText : name}
      </Heading>

      <View style={{ rowGap: spaces.lg }}>
        {!isCreating && (
          <FeatureRow
            headingText="Current State"
            hasSwitch
            status={isActive}
            setStatus={toggleStatus}
          />
        )}
        {isActive && (
          <View>
            {isCreating && (
              <AppTextInput
                label="Schedule Name"
                value={name}
                onChange={updateName}
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
              <PlugsStateSchedule
                isOn
                plugs={onPlugs}
                setPlugs={updateOnPlugs}
              />
              <PlugsStateSchedule
                isOn={false}
                plugs={offPlugs}
                setPlugs={updateOffPlugs}
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
                onEdit={() => editSchedule(schedule)}
                onDelete={() => setIsDeleteSchedule(true)}
              />
            )}
            {isCreating && (
              <Button
                text="Create Schedule"
                onPress={() => editSchedule(schedule, true)}
                invertColors
                disabled={
                  !name.trim() ||
                  (onPlugs.length === 0 && offPlugs.length === 0)
                }
                textStyle={{ fontFamily: fontWeight[600] }}
              />
            )}
          </View>
        )}
        <AddPlugModal
          visible={showAddPlug}
          setVisible={setShowAddPlug}
          onPlugs={onPlugs}
          offPlugs={offPlugs}
          setOnPlugs={updateOnPlugs}
          setOffPlugs={updateOffPlugs}
        />
      </View>
    </View>
  );
}
