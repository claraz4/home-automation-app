import { StyleSheet } from "react-native";
import { borderRadius, colors, spaces } from "@/src/theme";
import { useState } from "react";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import FeatureRow from "@/src/shared/components/FeatureRow";
import { Href } from "expo-router";
import { BasePlug } from "@/src/shared/types/BasePlug";

interface PlugBoxProps<T extends BasePlug> {
  plug: T;
  hasExtraScreen?: boolean;
  hasSwitch?: boolean;
  extraScreen?: Href;
  hasStatus?: boolean;
  status?: boolean;
  setStatus?: (status: boolean) => void;
}

export default function PlugBox<T extends BasePlug>({
  plug,
  hasExtraScreen = true,
  extraScreen,
  status,
  hasStatus = true,
  setStatus,
  hasSwitch,
}: PlugBoxProps<T>) {
  return (
    <FeatureRow
      headingText={plug.name}
      subtitleText={
        "isConstant" in plug && plug.isConstant ? "Constant Plug" : undefined
      }
      hasSwitch={hasSwitch}
      hasStatus={hasStatus}
      hasExtraScreen={hasExtraScreen}
      extraScreen={extraScreen}
      status={status ?? plug.isOn}
      setStatus={setStatus}
      hasIcon={true}
      icon={<FontAwesome6 name="plug" size={24} color="white" />}
      iconContainerStyles={styles.iconContainer}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    borderRadius: borderRadius.md,
    padding: spaces.sm,
    flexGrow: 1,
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    columnGap: spaces.sm + spaces.xxxs,
    alignItems: "center",
  },
  iconContainer: {
    paddingVertical: spaces.xs,
    paddingHorizontal: spaces.sm,
  },
});
