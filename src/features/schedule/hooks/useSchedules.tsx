import { api } from "@/src/api/api";
import { router } from "expo-router";
import {
  SingleSchedule,
  SingleScheduleDTO,
} from "@/src/features/schedule/types/SingleScheduleDTO";
import {
  SingleScheduleCreateDTO,
  SingleScheduleEditDTO,
} from "@/src/features/schedule/types/SingleScheduleEditDTO";
import {
  DETAILS_TYPES,
  ERROR_TYPES,
  ErrorDTO,
} from "@/src/shared/types/ErrorDTO";
import { isErrorDTO } from "@/src/shared/utils/errorHelpers";
import { FormError } from "@/src/shared/errors/FormError";
import { isAxiosError } from "axios";
import { DaySchedulesDTO } from "@/src/features/schedule/types/DaySchedulesDTO";

export default function useSchedules(scheduleId?: number) {
  // Fetch all schedules
  const getScheduledDays = async () => {
    try {
      return await api.get<{ scheduledDates: string[] }>("/schedules");
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch the current day schedule
  const getCurrentDaySchedules = async (currentDay: string) => {
    try {
      if (!currentDay) throw new Error("No date was provided");

      return await api.get<DaySchedulesDTO>("/schedules/day", {
        params: { date: currentDay },
      });
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch the current schedule information
  const getSchedule = async () => {
    try {
      return await api.get<SingleScheduleDTO>(`/schedules/${scheduleId}`);
    } catch (error) {
      console.error(error);
    }
  };

  // Delete the current schedule
  const deleteSchedule = async () => {
    try {
      await api.delete(`/schedules/${scheduleId}`);
      router.push("/schedules");
    } catch (error) {
      console.error(error);
    }
  };

  // Toggle the state of a schedule
  const toggleSchedule = async (status: boolean) => {
    try {
      await api.put("/schedules/toggle", { scheduleId, isEnabled: status });
    } catch (error) {
      console.error(error);
    }
  };

  // Edit/Create the current schedule
  const editSchedule = async (
    editedSchedule: SingleSchedule,
    isCreate = false,
  ) => {
    try {
      const { id, name, time, onPlugs, offPlugs, isActive } = editedSchedule;
      const onPlugIds: number[] = onPlugs.map((schedule) => schedule.id);
      const offPlugIds: number[] = offPlugs.map((schedule) => schedule.id);

      if (!name.trim() && !time) return;

      if (onPlugs.length === 0 && offPlugs.length === 0) {
        console.error("A schedule needs at least one plug");
        return;
      }

      const scheduleDTO: SingleScheduleCreateDTO = {
        name,
        time,
        onPlugIds,
        offPlugIds,
        isActive,
      };

      if (isCreate) {
        await api.post<SingleScheduleCreateDTO>("/schedules", scheduleDTO);
      } else {
        await api.put<SingleScheduleEditDTO>("/schedules", {
          ...scheduleDTO,
          id,
        });
      }
    } catch (error: unknown) {
      console.error(error);

      if (isAxiosError(error) && error.response) {
        const { data } = error.response;

        if (isErrorDTO(data) && data.type === ERROR_TYPES.ARGUMENT_EXCEPTION) {
          if (data.detail.includes(DETAILS_TYPES.DUPLICATE_SCHEDULE_TIME)) {
            throw new FormError("time", data.detail);
          } else if (
            data.detail.includes(DETAILS_TYPES.DUPLICATE_SCHEDULE_NAME)
          ) {
            throw new FormError("name", data.detail);
          }
        }
      }
    }
  };

  return {
    getSchedule,
    editSchedule,
    deleteSchedule,
    toggleSchedule,
    getScheduledDays,
    getCurrentDaySchedules,
  };
}
