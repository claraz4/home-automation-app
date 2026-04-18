import { useCallback, useState } from "react";
import { api } from "@/src/api/api";
import { AllPlugsDTO } from "@/src/features/schedule/types/AllPlugsDTO";

export default function usePlugs() {
  const [allPlugs, setAllPlugs] = useState<AllPlugsDTO>({ plugs: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getAllPlugs = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await api.get<AllPlugsDTO>("/plugs");
      setAllPlugs(res.data);
      return res;
    } catch (error) {
      setError("An error occurred while fetching plugs.");
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    allPlugs,
    loading,
    error,
    getAllPlugs,
  };
}
