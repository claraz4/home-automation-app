import { StyleSheet } from "react-native";
import { borderRadius, spaces } from "@/src/theme";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import FeatureRow, {
  FeatureRowProps,
} from "@/src/shared/components/FeatureRow";
import { BasePlug } from "@/src/shared/types/BasePlug";

interface PlugBoxProps<T extends BasePlug> extends FeatureRowProps {
  plug: T;
  iconSize?: number;
}

export default function PlugBox<T extends BasePlug>({
  plug,
  hasExtra = true,
  extraScreen,
  status,
  hasStatus = true,
  setStatus,
  hasSwitch,
  onRemove,
  iconSize = 24,
  containerStyles,
}: PlugBoxProps<T>) {
  return (
    <FeatureRow
      headingText={plug.name}
      subtitleText={
        "isConstant" in plug && plug.isConstant ? "Constant Plug" : undefined
      }
      hasSwitch={hasSwitch}
      hasStatus={hasStatus}
      hasExtra={hasExtra}
      extraScreen={extraScreen}
      status={status ?? plug.isOn}
      setStatus={setStatus}
      hasIcon={true}
      icon={<FontAwesome6 name="plug" size={iconSize} color="white" />}
      iconContainerStyles={styles.iconContainer}
      onRemove={onRemove}
      containerStyles={containerStyles}
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
