import { StatusBoxInfo } from "@/src/features/schedule/types/ScheduleUI";

// Show success message
export const showSuccess = (isCreating: boolean): StatusBoxInfo => {
  return {
    isVisible: true,
    isError: false,
    title: "Success",
    message: `Your schedule was ${isCreating ? "created" : "saved"} successfully!`,
  };
};
