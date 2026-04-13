import { StyleSheet, View } from "react-native";
import { colors, fontWeight, spaces } from "@/src/theme";
import { AppText } from "@/src/shared/ui/AppText";
import { Heading } from "@/src/shared/ui/Heading";
import CostPerSource from "@/src/features/analytics/components/cost/CostPerSource";
import React, { useCallback, useState } from "react";
import { api } from "@/src/api/api";
import { MonthlyBillDTO } from "@/src/features/analytics/types/MonthlyBillDTO";
import { useFocusEffect } from "expo-router";

export default function CostOverview() {
  const [monthlyBill, setMonthlyBill] = useState<MonthlyBillDTO | null>(null);

  const getMonthlyBill = async () => {
    try {
      const { data } = await api.get("/analytics/mains/monthly/bill");
      setMonthlyBill(data);
    } catch (error) {
      console.error(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      void getMonthlyBill();
    }, []),
  );

  if (!monthlyBill) {
    return;
  }

  return (
    <View>
      <View style={{ padding: spaces.sm }}>
        <AppText style={styles.monthlyBillTitle}>CURRENT MONTHLY BILL</AppText>
        <Heading variant="h1">${monthlyBill?.totalCost.toFixed(2)}</Heading>
      </View>
      <View style={styles.totalCostsContainer}>
        {monthlyBill.powerSources.map((powerSource, idx) => (
          <CostPerSource
            key={idx}
            sourceName={powerSource.name}
            message={`${powerSource.kwh.toFixed(2)} kWh this month`}
            cost={powerSource.cost}
            invert={idx % 2 !== 0}
          />
        ))}
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
