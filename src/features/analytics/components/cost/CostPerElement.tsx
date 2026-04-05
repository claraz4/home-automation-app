import { api } from "@/src/api/api";
import ConsumptionHierarchy from "@/src/shared/components/consumption-hierarchy/ConsumptionHierarchy";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useCallback, useState } from "react";
import { useFocusEffect } from "expo-router";
import { CostDTO } from "@/src/features/analytics/types/CostDTO";

interface CostPerElementProps {
  element: "plugs" | "rooms";
}

export default function CostPerElement({ element }: CostPerElementProps) {
  const [costs, setCosts] = useState<CostDTO[] | null>(null);

  const getCosts = async () => {
    try {
      if (element === "rooms") {
        const { data } = await api.get(`/analytics/${element}/daily/costs`);
        setCosts(data.rooms);
      } else {
        const { data } = await api.get(`/analytics/${element}/daily/costs`);
        setCosts(data.plugs);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      void getCosts();
    }, []),
  );

  if (!costs) {
    return;
  }

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
