import ConsumptionHierarchy from "@/src/shared/components/consumption-hierarchy/ConsumptionHierarchy";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

export default function CostPerAppliance() {
  return (
    <ConsumptionHierarchy
      items={[
        {
          title: "AC",
          icon: { icon: FontAwesome6, name: "plug" },
          percent: 23,
          consumption: 178,
          unit: "$",
        },
        {
          title: "Heater",
          icon: { icon: FontAwesome6, name: "plug" },
          percent: 35,
          consumption: 289,
          unit: "$",
        },
        {
          title: "Kettle",
          icon: { icon: FontAwesome6, name: "plug" },
          percent: 12,
          consumption: 123,
          unit: "$",
        },
      ]}
    />
  );
}
