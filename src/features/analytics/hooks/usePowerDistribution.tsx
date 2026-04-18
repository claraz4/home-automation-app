import { useCallback, useState } from "react";
import { PowerSourceDistributionDTO } from "@/src/features/analytics/types/PowerSourceDistributionDTO";
import { api } from "@/src/api/api";
import { useFocusEffect } from "expo-router";

export default function usePowerSourceDistribution() {
  const [powerSourceDistribution, setPowerSourceDistribution] =
    useState<PowerSourceDistributionDTO | null>(null);
  const [cleanedPowerSourceDistribution, setCleanedPowerSourceDistribution] =
    useState<{ value: number; label: string }[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getPowerSourceDistribution = async () => {
    try {
      const { data } = await api.get<PowerSourceDistributionDTO>(
        "/analytics/mains/weekly/percentages",
      );
      setPowerSourceDistribution(data);
      setCleanedPowerSourceDistribution(
        data.powerSources.map((source) => ({
          value: source.percentage,
          label: source.name,
        })),
      );
    } catch (error) {
      setError("An error occurred while getting power distribution.");
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      void getPowerSourceDistribution();
    }, []),
  );

  return {
    powerSourceDistribution,
    cleanedPowerSourceDistribution,
    error,
    loading,
  };
}
