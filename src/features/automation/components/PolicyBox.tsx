import { StyleSheet, View } from "react-native";
import FeatureRow from "@/src/shared/components/FeatureRow";
import { borderRadius, colors, spaces } from "@/src/theme";
import { AppText } from "@/src/shared/ui/AppText";

interface PolicyBoxProps {
  name: string;
  status: boolean;
  plugNumber: number;
}

export default function PolicyBox({
  name,
  status,
  plugNumber,
}: PolicyBoxProps) {
  return (
    <View
      style={{
        backgroundColor: "white",
        padding: spaces.sm + spaces.xxxs,
        borderRadius: borderRadius.md,
        rowGap: spaces.sm,
        paddingTop: spaces.sm,
      }}
    >
      <FeatureRow
        headingText={name}
        hasStatus={true}
        status={status}
        hasExtra={true}
        containerStyles={{ padding: 0, rowGap: 0 }}
      />
      <View
        style={{ flexDirection: "row", columnGap: spaces.xs + spaces.xxxs }}
      >
        <View style={styles.conditionContainer}>
          <AppText variant="bodyWhite">{plugNumber} Plugs</AppText>
        </View>
        <View style={styles.conditionContainer}>
          <AppText variant="bodyWhite">EDL</AppText>
        </View>
        <View style={styles.conditionContainer}>
          <AppText variant="bodyWhite">{">"} 28 C</AppText>
        </View>
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
});
