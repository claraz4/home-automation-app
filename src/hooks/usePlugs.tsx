import { useCallback, useState } from "react";
import { api } from "@/src/api/api";
import { AllPlugsDTO } from "@/src/features/schedule/types/AllPlugsDTO";

export default function usePlugs() {
  const [allPlugs, setAllPlugs] = useState<AllPlugsDTO>({ plugs: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  const getAllPlugs = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await api.get<AllPlugsDTO>("/plugs");
      setAllPlugs(res.data);
      return res;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    allPlugs,
    isLoading,
    error,
    getAllPlugs,
  };
}
