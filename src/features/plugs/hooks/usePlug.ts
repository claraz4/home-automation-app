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
    setPlugInfo((prevState: any) => ({ ...prevState, isOn: !prevState.isOn }));
    await api.put(`plugs/status/set`, {
      plugId,
      switchOn: !plugInfo.isOn,
    });
    await fetchPlug(); // refresh after mutation
  };

  return {
    plugInfo,
    togglePlugStatus,
    refetch: fetchPlug,
  };
}
