import { StyleSheet, View } from "react-native";
import { colors, fontWeight, spaces } from "@/src/theme";
import { AppText } from "@/src/shared/ui/AppText";
import { Heading } from "@/src/shared/ui/Heading";
import CostPerSource from "@/src/features/analytics/components/cost/CostPerSource";
import React, { useCallback, useState } from "react";
import { api } from "@/src/api/api";
import { MonthlyBillDTO } from "@/src/features/analytics/types/MonthlyBillDTO";
import { useFocusEffect } from "expo-router";
import AppActivityIndicator from "@/src/shared/ui/AppActivityIndicator";
import StatusBox from "@/src/shared/components/StatusBox";

export default function CostOverview() {
  const [monthlyBill, setMonthlyBill] = useState<MonthlyBillDTO | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getMonthlyBill = async () => {
    try {
      const { data } = await api.get("/analytics/mains/monthly/bill");
      setMonthlyBill(data);
    } catch (error) {
      setError("An error occurred while getting monthly bills.");
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      void getMonthlyBill();
    }, []),
  );

  if (loading) return <AppActivityIndicator />;
  if (error) return <StatusBox message={error} />;
  if (!monthlyBill) return;

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
