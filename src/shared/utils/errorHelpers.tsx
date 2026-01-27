import { ErrorDTO } from "@/src/shared/types/ErrorDTO";

export function isErrorDTO(error: unknown): error is ErrorDTO {
  return (
    typeof error === "object" &&
    error !== null &&
    "type" in error &&
    "title" in error &&
    "detail" in error &&
    typeof (error as any).type === "string" &&
    typeof (error as any).title === "string" &&
    typeof (error as any).detail === "string"
  );
}
