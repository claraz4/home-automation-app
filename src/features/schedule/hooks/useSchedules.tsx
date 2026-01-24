import { api } from "@/src/api/api";
import { router } from "expo-router";
import { SingleScheduleDTO } from "@/src/features/schedule/types/SingleScheduleDTO";
import { SingleScheduleUploadDTO } from "@/src/features/schedule/types/SingleScheduleUploadDTO";

export default function useSchedules(scheduleId: number) {
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

  // Edit the current schedule
  const editSchedule = async (editedSchedule: SingleScheduleDTO) => {
    try {
      const { id, name, time, onPlugs, offPlugs } = editedSchedule;
      const onPlugIds: number[] = onPlugs.map((schedule) => schedule.id);
      const offPlugIds: number[] = offPlugs.map((schedule) => schedule.id);

      const scheduleDTO: SingleScheduleUploadDTO = {
        id,
        name,
        time,
        onPlugIds,
        offPlugIds,
      };
      await api.put<SingleScheduleUploadDTO>("/schedules", scheduleDTO);
    } catch (error) {
      console.error(error);
    }
  };

  return { getSchedule, editSchedule, deleteSchedule };
}
