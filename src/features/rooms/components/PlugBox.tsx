import { StyleSheet } from "react-native";
import { RoomPlugDTO } from "../types/RoomPlugsDTO";
import { borderRadius, colors, spaces } from "@/src/theme";
import { useState } from "react";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import FeatureRow from "@/src/shared/components/FeatureRow";
import { Href, usePathname } from "expo-router";

interface PlugBoxProps {
  plug: RoomPlugDTO;
}

export default function PlugBox({ plug }: PlugBoxProps) {
  const [isEnabled, setIsEnabled] = useState(plug.isOn);
  const pathname = usePathname();

  return (
    <FeatureRow
      headingText={plug.name}
      subtitleText={plug.isConstant ? "Constant Plug" : undefined}
      hasExtraScreen={true}
      extraScreen={`${pathname}/plugs/${plug.id}` as Href}
      status={isEnabled}
      setStatus={setIsEnabled}
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
