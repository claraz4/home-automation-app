import { useCallback, useState } from "react";
import { MainsMonthlySummaryDTO } from "@/src/features/analytics/types/MainsMonthlySummaryDTO";
import { api } from "@/src/api/api";
import { useFocusEffect } from "expo-router";

export default function useMainsSummary() {
  const [mainsSummary, setMainsSummary] =
    useState<MainsMonthlySummaryDTO | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getMainsSummary = async () => {
    try {
      const { data } = await api.get<MainsMonthlySummaryDTO>(
        "/analytics/mains/monthly",
      );
      setMainsSummary(data);
    } catch (error) {
      setError("An error occurred while getting mains summary.");
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      void getMainsSummary();
    }, []),
  );

  const totalConsumption = mainsSummary?.totalConsumptionThisMonth ?? 0;
  const consumptionDiff = mainsSummary?.differenceFromLastMonth ?? null;

  const totalCost = mainsSummary?.totalCostThisMonth ?? 0;
  const costDiff = mainsSummary?.costDifferenceFromLastMonth ?? null;

  return {
    totalConsumptionThisMonth: totalConsumption,
    differenceFromLastMonth: consumptionDiff,
    totalCostThisMonth: totalCost,
    costDifferenceFromLastMonth: costDiff,
    error,
    loading,
  };
}
