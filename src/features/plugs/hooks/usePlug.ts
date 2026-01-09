import { useEffect, useState } from "react";
import { PlugDTO } from "@/src/features/plugs/types/PlugDTO";
import { api } from "@/src/api/api";

export function usePlug(plugId: number) {
  const [plugInfo, setPlugInfo] = useState<PlugDTO | null>(null);

  useEffect(() => {
    api.get<PlugDTO>(`/plugs/${plugId}`).then((r) => setPlugInfo(r.data));
  }, [plugId]);

  const togglePlugStatus = async (isCurrentlyOn: boolean) => {
    const payload = {
      plugId,
      switchOn: !isCurrentlyOn,
    };

    setPlugInfo((p) => (p ? { ...p, isOn: !isCurrentlyOn } : p));

    try {
      await api.put("/plugs/status/set", payload);
    } catch {
      setPlugInfo((p) => (p ? { ...p, isOn: isCurrentlyOn } : p));
    }
  };

  return { plugInfo, togglePlugStatus };
}
