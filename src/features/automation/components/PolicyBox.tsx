import { StyleSheet, View } from "react-native";
import FeatureRow from "@/src/shared/components/FeatureRow";
import { borderRadius, colors, spaces } from "@/src/theme";
import { AppText } from "@/src/shared/ui/AppText";
import { PolicyDTO } from "@/src/features/automation/types/PolicyDTO";

interface PolicyBoxProps {
  policy: PolicyDTO;
}

export default function PolicyBox({ policy }: PolicyBoxProps) {
  const {
    name,
    powerSourceName,
    powerSourceId,
    tempGreaterThan,
    tempLessThan,
    id,
    offPlugs,
    onPlugs,
    numOfPlugs,
    isActive,
  } = policy;

  return (
    <View style={styles.container}>
      <FeatureRow
        headingText={name}
        hasStatus={true}
        status={isActive}
        hasExtra={true}
        containerStyles={{ padding: 0, rowGap: 0 }}
      />
      <View style={styles.conditionsContainer}>
        <View style={styles.conditionContainer}>
          <AppText variant="bodyWhite">{`${numOfPlugs} Plug${numOfPlugs !== 1 ? "s" : ""}`}</AppText>
        </View>
        {powerSourceId && powerSourceName && (
          <View style={styles.conditionContainer}>
            <AppText variant="bodyWhite">{powerSourceName}</AppText>
          </View>
        )}
        {tempLessThan !== null && (
          <View style={styles.conditionContainer}>
            <AppText variant="bodyWhite">{`< ${tempLessThan}°C`}</AppText>
          </View>
        )}
        {tempGreaterThan !== null && (
          <View style={styles.conditionContainer}>
            <AppText variant="bodyWhite">{`> ${tempGreaterThan}°C`}</AppText>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  conditionContainer: {
    borderRadius: borderRadius.sm,
    backgroundColor: colors.primary[500],
    paddingVertical: spaces.xxxs,
    paddingHorizontal: spaces.sm,
  },
  conditionsContainer: {
    flexDirection: "row",
    columnGap: spaces.xs - spaces.xxxs,
  },
  container: {
    backgroundColor: "white",
    padding: spaces.sm + spaces.xxxs,
    borderRadius: borderRadius.md,
    rowGap: spaces.sm,
    paddingTop: spaces.sm,
  },
});
