import { StyleSheet } from "react-native";
import { borderRadius, colors, spaces } from "@/src/theme";

export const conditionStyles = StyleSheet.create({
  container: {
    borderRadius: borderRadius.sm,
    backgroundColor: "white",
    padding: spaces.sm,
    columnGap: spaces.md,
    flexDirection: "column",
    rowGap: spaces.sm,
  },
  infoContainer: {
    flex: 1,
    rowGap: spaces.xs,
    flexDirection: "row",
  },
  titleContainer: {
    backgroundColor: colors.primary[500],
    borderRadius: borderRadius.sm,
    flexDirection: "row",
    columnGap: spaces.xs,
    padding: spaces.xxs,
    paddingRight: spaces.xs,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-start",
  },
});
