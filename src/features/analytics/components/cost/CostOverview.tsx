import { StyleSheet, View } from "react-native";
import { colors, fontWeight, spaces } from "@/src/theme";
import { AppText } from "@/src/shared/ui/AppText";
import { Heading } from "@/src/shared/ui/Heading";
import CostPerSource from "@/src/features/analytics/components/cost/CostPerSource";
import React from "react";

export default function CostOverview() {
  return (
    <View>
      <View style={{ padding: spaces.sm }}>
        <AppText style={styles.monthlyBillTitle}>CURRENT MONTHLY BILL</AppText>
        <Heading variant="h1">217.98$</Heading>
      </View>
      <View style={styles.totalCostsContainer}>
        <CostPerSource sourceName="EDL" message="192 kWh total" cost={42} />
        <CostPerSource
          sourceName="Generator"
          message="10A subscription"
          cost={123}
          invert={true}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  monthlyBillTitle: {
    color: colors.gray[600],
    fontFamily: fontWeight[500],
  },
  totalCostsContainer: {
    flexDirection: "row",
    columnGap: spaces.sm,
    width: "100%",
  },
});
