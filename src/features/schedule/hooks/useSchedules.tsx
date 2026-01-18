import { api } from "@/src/api/api";
import { router } from "expo-router";
import { SingleScheduleDTO } from "@/src/features/schedule/types/SingleScheduleDTO";

export default function useSchedules(scheduleId: number) {
  // Fetch the current schedule information
  const getSchedule = async () => {
    try {
      return await api.get(`/schedules/${scheduleId}`);
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
      console.log(editedSchedule);
      // await api.put("/schedules", editedSchedule);
    } catch (error) {
      console.error(error);
    }
  };

  return { getSchedule, editSchedule, deleteSchedule };
}
