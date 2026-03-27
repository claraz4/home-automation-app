import { colors } from "@/src/theme";

export type Tag = "critical" | "info";

export const tagColor = {
  critical: colors.status.fail,
  info: colors.primary[500],
};
