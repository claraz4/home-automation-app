import ConsumptionHierarchy from "@/src/shared/components/consumption-hierarchy/ConsumptionHierarchy";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useCallback, useState } from "react";
import { api } from "@/src/api/api";
import { RoomsDailyConsumptionDTO } from "@/src/features/analytics/types/RoomsDailyConsumptionDTO";
import { useFocusEffect } from "expo-router";
import { ConsumptionDTO } from "@/src/features/analytics/types/ConsumptionDTO";
import { PlugsDailyConsumptionDTO } from "@/src/features/analytics/types/PlugsDailyConsumptionDTO";

interface ConsumptionPerElementProps {
  element: "plugs" | "rooms";
}

export default function ConsumptionPerElement({
  element,
}: ConsumptionPerElementProps) {
  const [consumptions, setConsumptions] = useState<ConsumptionDTO[] | null>(
    null,
  );

  const getConsumptions = async () => {
    try {
      if (element === "rooms") {
        const { data } = await api.get<RoomsDailyConsumptionDTO>(
          `/analytics/${element}/daily/consumptions`,
        );
        setConsumptions(data.rooms);
      } else {
        const { data } = await api.get<PlugsDailyConsumptionDTO>(
          `/analytics/${element}/daily/consumptions`,
        );
        setConsumptions(data.plugs);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      void getConsumptions();
    }, []),
  );

  if (!consumptions) {
    return;
  }

  return (
    <ConsumptionHierarchy
      items={consumptions.map((room) => {
        const { name, percentage, kwh } = room;

        return {
          title: name,
          percent: percentage,
          consumption: kwh,
          unit: "kWh",
          icon: {
            icon: FontAwesome6,
            name: element === "rooms" ? "door-closed" : "plug",
          },
        };
      })}
    />
  );
}
