import { Heading } from "@/src/shared/ui/Heading";
import { View } from "react-native";
import FeatureRow from "@/src/shared/components/FeatureRow";
import { colors, fontWeight, spaces } from "@/src/theme";
import { getFormattedDateTime } from "@/src/features/schedule/utils/daysHelper";
import dayjs from "dayjs";
import PlugsStateSchedule from "@/src/features/schedule/components/create/PlugsStateSchedule";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import ScheduleActions from "@/src/features/schedule/components/ScheduleActions";
import Button from "@/src/shared/components/Button";
import AddPlugModal from "@/src/features/schedule/components/create/AddPlugModal";
import { useScheduleDateEdit } from "@/src/features/schedule/hooks/useScheduleDateEdit";
import AppTextInput from "@/src/shared/components/AppTextInput";
import { SingleSchedule } from "@/src/features/schedule/types/SingleScheduleDTO";
import { SmallBasePlug } from "@/src/features/schedule/types/SmallBasePlug";
import useSchedules from "@/src/features/schedule/hooks/useSchedules";
import { useFocusEffect } from "expo-router";
import { FormError } from "@/src/shared/errors/FormError";
import StatusBox from "@/src/shared/components/StatusBox";

interface StatusBoxInfo {
  isVisible: boolean;
  isError: boolean;
  title?: string;
  message: string;
}

const statusBoxInfoClean = {
  isVisible: false,
  isError: false,
  title: "",
  message: "",
};

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
  const { name, onPlugs, offPlugs, id, isActive } = schedule;
  const { editSchedule, toggleSchedule } = useSchedules(id);

  const [showAddPlug, setShowAddPlug] = useState(false);
  const [error, setError] = useState<FormError | null>(null);
  const [statusBoxProps, setStatusBoxProps] =
    useState<StatusBoxInfo>(statusBoxInfoClean);

  // Update the name
  const updateName = (name: string) =>
    setSchedule((prevState) => ({ ...prevState, name }));

  // Toggle the schedule status
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

  // Update plug lists
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

  // Define the edit function
  const onEdit = async (isCreating: boolean) => {
    try {
      await editSchedule(schedule, isCreating);
      setStatusBoxProps({
        isVisible: true,
        isError: false,
        title: "Success",
        message: `Your schedule was ${isCreating ? "created" : "saved"} successfully!`,
      });

      if (isCreating) {
        setSchedule({
          name: "",
          time: date?.toISOString() || dayjs().toISOString(),
          onPlugs: [],
          offPlugs: [],
          isActive: true,
        });
      }
    } catch (error) {
      if (error instanceof FormError) {
        setError(error);
        setStatusBoxProps({
          isVisible: true,
          message: error.message,
          isError: true,
        });

        if (scrollToTop) {
          scrollToTop();
        }
      } else {
        setStatusBoxProps({
          isVisible: true,
          isError: true,
          title: "Error",
          message: "An error occurred while creating your schedule",
        });
      }
    }
  };

  // Clear the error on change of schedule
  useEffect(() => {
    if (error) {
      setStatusBoxProps(statusBoxInfoClean);
    }

    setError(null);
  }, [schedule]);

  // Enable the save changes button only if the schedule was edited and there is at least one plug in the schedule
  const isSaveEnabled =
    isScheduleEdited &&
    schedule.offPlugs.length > 0 &&
    schedule.onPlugs.length > 0;

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
            <View style={{ rowGap: spaces.md }}>
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
