import { useEffect, useState } from "react";
import { SourceDTO } from "@/src/features/automation/types/SourceDTO";
import { api } from "@/src/api/api";

export default function useSources() {
  const [sources, setSources] = useState<SourceDTO[]>([]);

  // Get power sources
  const getPowerSources = async () => {
    try {
      const res = await api.get<{ sources: SourceDTO[] }>("/mains/sources");
      const { sources: sourcesData } = res.data;
      setSources(sourcesData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    void getPowerSources();
  }, []);

  return { sources };
}
