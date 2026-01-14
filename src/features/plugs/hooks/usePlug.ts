import { useCallback, useEffect, useState } from "react";
import { useFocusEffect } from "expo-router";
import { api } from "@/src/api/api";

export function usePlug(plugId: number) {
  const [plugInfo, setPlugInfo] = useState<any>(null);

  const fetchPlug = async () => {
    const { data } = await api.get(`plugs/${plugId}`);
    setPlugInfo(data);
  };

  // Fetch on mount
  useEffect(() => {
    void fetchPlug();
  }, [plugId]);

  // Fetch every time screen gains focus
  useFocusEffect(
    useCallback(() => {
      void fetchPlug();
    }, [plugId]),
  );

  const togglePlugStatus = async () => {
    await api.post(`plugs/${plugId}/toggle`);
    await fetchPlug(); // refresh after mutation
  };

  return {
    plugInfo,
    togglePlugStatus,
    refetch: fetchPlug,
  };
}
