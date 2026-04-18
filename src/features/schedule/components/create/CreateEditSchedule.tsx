import { Heading } from "@/src/shared/ui/Heading";
import { View } from "react-native";
import FeatureRow from "@/src/shared/components/FeatureRow";
import { colors, fontWeight, spaces } from "@/src/theme";
import { getFormattedDateTime } from "@/src/features/schedule/utils/daysHelper";
import dayjs from "dayjs";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import ScheduleActions from "@/src/features/schedule/components/ScheduleActions";
import Button from "@/src/shared/components/Button";
import { useScheduleDateEdit } from "@/src/features/schedule/hooks/useScheduleDateEdit";
import AppTextInput from "@/src/shared/components/AppTextInput";
import { SingleSchedule } from "@/src/features/schedule/types/SingleScheduleDTO";
import { FormError } from "@/src/shared/errors/FormError";
import StatusBox from "@/src/shared/components/StatusBox";
import { SchedulePlugsList } from "@/src/features/schedule/components/create/SchedulePlugsList";
import { useCreateEditSchedule } from "@/src/features/schedule/hooks/useCreateEditSchedule";
import {
  StatusBoxInfo,
  statusBoxInfoClean,
} from "@/src/features/schedule/types/ScheduleUI";

interface CreateEditScheduleProps {
  headingText?: string;
  schedule: SingleSchedule;
  setSchedule: Dispatch<SetStateAction<SingleSchedule>>;
  isScheduleEdited?: boolean;
  setIsDeleteSchedule: (isDelete: boolean) => void;
  fetchSchedule?: () => void;
  scrollToTop?: () => void;
}

export function CreateEditSchedule({
  headingText,
  schedule,
  setSchedule,
  isScheduleEdited = false,
  setIsDeleteSchedule,
  fetchSchedule,
  scrollToTop,
}: CreateEditScheduleProps) {
  const { date, mode } = useScheduleDateEdit();
  const isCreating = mode === "create";
  const { formattedDate, formattedTime } = getFormattedDateTime(dayjs(date));
  const { name, onPlugs, offPlugs, isActive } = schedule;

  const [error, setError] = useState<FormError | null>(null);
  const [statusBoxProps, setStatusBoxProps] =
    useState<StatusBoxInfo>(statusBoxInfoClean);
  const { updateName, updateOnPlugs, updateOffPlugs, toggleStatus, onEdit } =
    useCreateEditSchedule({
      schedule,
      setSchedule,
      fetchSchedule,
      setError,
      setStatusBoxProps,
      scrollToTop,
    });

  // Clear the error on change of schedule
  useEffect(() => {
    if (error) {
      setStatusBoxProps(statusBoxInfoClean);
    }

    setError(null);
  }, [schedule]);

  // Enable the save changes button only if the schedule was edited and there is at least one plug in the schedule
  const isSaveEnabled = useMemo(
    () =>
      isScheduleEdited &&
      schedule.offPlugs.length > 0 &&
      schedule.onPlugs.length > 0,
    [isScheduleEdited, schedule.offPlugs.length, schedule.onPlugs.length],
  );

  return (
    <View style={{ rowGap: spaces.md }}>
      <Heading variant="h2" hasBackButton={true}>
        {isCreating ? headingText : name}
      </Heading>

      {statusBoxProps.isVisible && (
        <StatusBox
          title={statusBoxProps.title}
          isError={statusBoxProps.isError}
          message={statusBoxProps.message}
          hasClose={true}
          onClose={() => setStatusBoxProps(statusBoxInfoClean)}
        />
      )}
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
          <View style={{ rowGap: spaces.lg }}>
            {isCreating && (
              <AppTextInput
                label="Schedule Name"
                value={name}
                onChange={updateName}
                containerStyle={{ marginTop: spaces.md }}
                hasError={error?.component === "name"}
              />
            )}
            <View style={{ rowGap: spaces.xxs }}>
              <Heading variant="h6" style={{ color: colors.gray[700] }}>
                Date & Time
              </Heading>
              <FeatureRow
                headingText={
                  date
                    ? `${formattedDate} at ${formattedTime}`
                    : "Schedule Date"
                }
                subtitleText={
                  date ? "Repeats: Never" : "Select a date and time"
                }
                hasStatus={false}
                hasExtra
                extraScreen={"/schedules/datetime"}
                hasError={error?.component === "time"}
              />
            </View>

            <SchedulePlugsList
              onPlugs={onPlugs}
              offPlugs={offPlugs}
              updateOnPlugs={updateOnPlugs}
              updateOffPlugs={updateOffPlugs}
            />

            {!isCreating && (
              <ScheduleActions
                isSaveEnabled={isSaveEnabled}
                onEdit={() => onEdit(false)}
                onDelete={() => setIsDeleteSchedule(true)}
              />
            )}
            {isCreating && (
              <Button
                text="Create Schedule"
                onPress={() => onEdit(true)}
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
      </View>
    </View>
  );
}
