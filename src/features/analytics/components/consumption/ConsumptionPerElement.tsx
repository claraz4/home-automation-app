import ConsumptionHierarchy from "@/src/shared/components/consumption-hierarchy/ConsumptionHierarchy";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useCallback, useState } from "react";
import { api } from "@/src/api/api";
import { RoomsDailyConsumptionDTO } from "@/src/features/analytics/types/RoomsDailyConsumptionDTO";
import { useFocusEffect } from "expo-router";
import { ConsumptionDTO } from "@/src/features/analytics/types/ConsumptionDTO";
import { PlugsDailyConsumptionDTO } from "@/src/features/analytics/types/PlugsDailyConsumptionDTO";
import AppActivityIndicator from "@/src/shared/ui/AppActivityIndicator";
import StatusBox from "@/src/shared/components/StatusBox";

interface ConsumptionPerElementProps {
  element: "plugs" | "rooms";
}

export default function ConsumptionPerElement({
  element,
}: ConsumptionPerElementProps) {
  const [consumptions, setConsumptions] = useState<ConsumptionDTO[] | null>(
    null,
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getConsumptions = async () => {
    try {
      setLoading(true);
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
      setError("An error occurred while fetching daily consumptions.");
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      void getConsumptions();
    }, []),
  );

  if (loading) return <AppActivityIndicator />;
  if (error) return <StatusBox message={error} />;
  if (!consumptions) return;

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
