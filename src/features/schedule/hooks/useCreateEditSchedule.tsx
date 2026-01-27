import { SingleSchedule } from "@/src/features/schedule/types/SingleScheduleDTO";
import { Dispatch, SetStateAction, useCallback } from "react";
import useSchedules from "@/src/features/schedule/hooks/useSchedules";
import { SmallBasePlug } from "@/src/features/schedule/types/SmallBasePlug";
import { useFocusEffect } from "expo-router";
import { useScheduleDateEdit } from "@/src/features/schedule/hooks/useScheduleDateEdit";
import { FormError } from "@/src/shared/errors/FormError";
import dayjs from "dayjs";
import { StatusBoxInfo } from "@/src/features/schedule/types/ScheduleUI";

interface HookProps {
  schedule: SingleSchedule;
  setSchedule: Dispatch<SetStateAction<SingleSchedule>>;
  fetchSchedule?: () => void;
  setError: Dispatch<SetStateAction<FormError | null>>;
  setStatusBoxProps: (status: StatusBoxInfo) => void;
  scrollToTop?: () => void;
}

export function useCreateEditSchedule({
  schedule,
  setSchedule,
  fetchSchedule,
  setError,
  setStatusBoxProps,
  scrollToTop,
}: HookProps) {
  const { toggleSchedule, editSchedule } = useSchedules(schedule.id);
  const { date } = useScheduleDateEdit();

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
  const updateOnPlugs = (plugs: SmallBasePlug[]) => {
    setSchedule((prev) => ({
      ...prev,
      onPlugs: plugs,
    }));
  };

  const updateOffPlugs = (plugs: SmallBasePlug[]) => {
    setSchedule((prev) => ({
      ...prev,
      offPlugs: plugs,
    }));
  };

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

  // Show success message
  const showSuccess = (isCreating: boolean) => {
    setStatusBoxProps({
      isVisible: true,
      isError: false,
      title: "Success",
      message: `Your schedule was ${isCreating ? "created" : "saved"} successfully!`,
    });
  };

  // Reset schedule if created
  const resetScheduleIfCreated = () => {
    setSchedule({
      name: "",
      time: date?.toISOString() || dayjs().toISOString(),
      onPlugs: [],
      offPlugs: [],
      isActive: true,
    });
  };

  // Handle the error on edit
  const handleEditError = (error: unknown) => {
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
  };

  // Edit or create a schedule
  const onEdit = async (isCreating: boolean) => {
    try {
      await editSchedule(schedule, isCreating);
      showSuccess(isCreating);

      if (isCreating) {
        resetScheduleIfCreated();
      }
    } catch (error) {
      handleEditError(error);
    }
  };

  return {
    updateName,
    updateOnPlugs,
    updateOffPlugs,
    toggleStatus,
    onEdit,
  };
}
