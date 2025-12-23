import { spaces } from "@/src/theme";
import { StyleSheet } from "react-native";

export const statisticsCommonStyles = StyleSheet.create({
  supplySourceContainer: {
    flexDirection: "row",
    columnGap: spaces.md,
    alignItems: "center",
    padding: spaces.md,
    paddingRight: spaces.lg,
    height: 100,
  },
  supplySourceInfoContainer: {
    flexDirection: "column",
    width: "100%",
    columnGap: spaces.xs,
    marginTop: spaces.xs,
  },
  supplySourceStatusContainer: {
    flexDirection: "row",
    columnGap: spaces.xxs,
  },
});
