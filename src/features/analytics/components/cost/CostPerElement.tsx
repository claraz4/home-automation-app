import { api } from "@/src/api/api";
import ConsumptionHierarchy from "@/src/shared/components/consumption-hierarchy/ConsumptionHierarchy";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useCallback, useState } from "react";
import { useFocusEffect } from "expo-router";
import { CostDTO } from "@/src/features/analytics/types/CostDTO";
import AppActivityIndicator from "@/src/shared/ui/AppActivityIndicator";
import StatusBox from "@/src/shared/components/StatusBox";

interface CostPerElementProps {
  element: "plugs" | "rooms";
}

export default function CostPerElement({ element }: CostPerElementProps) {
  const [costs, setCosts] = useState<CostDTO[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getCosts = async () => {
    try {
      setLoading(true);
      if (element === "rooms") {
        const { data } = await api.get(`/analytics/${element}/daily/costs`);
        setCosts(data.rooms);
      } else {
        const { data } = await api.get(`/analytics/${element}/daily/costs`);
        setCosts(data.plugs);
      }
    } catch (error) {
      setError("An error occurred while getting daily costs.");
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      void getCosts();
    }, []),
  );

  if (loading) return <AppActivityIndicator />;
  if (error) return <StatusBox message={error} />;
  if (!costs) return;

  return (
    <ConsumptionHierarchy
      items={costs.map((c) => {
        const { name, percentage, cost } = c;

        return {
          title: name,
          percent: percentage,
          consumption: cost,
          unit: "$",
          icon: {
            icon: FontAwesome6,
            name: element === "rooms" ? "door-closed" : "plug",
          },
        };
      })}
    />
  );
}
