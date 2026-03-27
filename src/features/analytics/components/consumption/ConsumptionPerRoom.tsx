import ConsumptionHierarchy from "@/src/shared/components/consumption-hierarchy/ConsumptionHierarchy";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

export default function ConsumptionPerRoom() {
  return (
    <ConsumptionHierarchy
      items={[
        {
          title: "Kitchen",
          icon: { icon: FontAwesome6, name: "door-closed" },
          percent: 23,
          consumption: 178,
          unit: "kWh",
        },
        {
          title: "Bedroom",
          icon: { icon: FontAwesome6, name: "door-closed" },
          percent: 35,
          consumption: 289,
          unit: "kWh",
        },
        {
          title: "Bathroom",
          icon: { icon: FontAwesome6, name: "door-closed" },
          percent: 12,
          consumption: 123,
          unit: "kWh",
        },
      ]}
    />
  );
}
